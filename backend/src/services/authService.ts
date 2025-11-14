import bcrypt from 'bcryptjs';
import { PrismaClient, User, RefreshToken } from '@prisma/client';
import { jwtService, JWTError } from '@/config/jwt';
import { logger, logSecurityEvent, logAuditEvent } from '@/utils/logger';
import { prisma } from '@/config/database';
import { setCache, deleteCache, setCacheWithObject } from '@/config/redis';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  department?: string;
  position?: string;
}

export interface AuthResponse {
  user: Omit<User, 'passwordHash'>;
  accessToken: string;
  refreshToken: string;
}

export class AuthenticationError extends Error {
  constructor(message: string, public code: string, public statusCode: number = 401) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends Error {
  constructor(message: string, public code: string, public statusCode: number = 403) {
    super(message);
    this.name = 'AuthorizationError';
  }
}

class AuthService {
  private readonly saltRounds: number;

  constructor() {
    this.saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
  }

  // Password hashing
  public async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, this.saltRounds);
    } catch (error) {
      logger.error('Password hashing failed:', error);
      throw new AuthenticationError('Password processing failed', 'PASSWORD_HASH_FAILED');
    }
  }

  // Password verification
  public async verifyPassword(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      logger.error('Password verification failed:', error);
      throw new AuthenticationError('Password verification failed', 'PASSWORD_VERIFY_FAILED');
    }
  }

  // User registration
  public async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email.toLowerCase() },
      });

      if (existingUser) {
        throw new AuthenticationError('User with this email already exists', 'EMAIL_EXISTS', 409);
      }

      // Hash the password
      const passwordHash = await this.hashPassword(userData.password);

      // Create user
      const user = await prisma.user.create({
        data: {
          email: userData.email.toLowerCase(),
          passwordHash,
          firstName: userData.firstName,
          lastName: userData.lastName,
          department: userData.department || null,
          position: userData.position || null,
          role: 'EMPLOYEE', // Default role for new registrations
        },
      });

      // Generate tokens
      const tokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
      };

      const { accessToken, refreshToken } = jwtService.generateTokenPair(tokenPayload);

      // Store refresh token in database
      await this.storeRefreshToken(user.id, refreshToken);

      // Log audit event
      logAuditEvent('USER_REGISTER', 'user', user.id, {
        email: user.email,
        role: user.role,
      });

      // Remove password hash from user object
      const { passwordHash: _, ...userWithoutPassword } = user;

      // Cache user data
      await setCacheWithObject(`user:${user.id}`, userWithoutPassword, 300); // 5 minutes

      logger.info(`User registered successfully: ${user.email}`);

      return {
        user: userWithoutPassword,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      if (error instanceof AuthenticationError) {
        throw error;
      }
      logger.error('User registration failed:', error);
      throw new AuthenticationError('Registration failed', 'REGISTRATION_FAILED');
    }
  }

  // User login
  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email: credentials.email.toLowerCase() },
      });

      if (!user) {
        throw new AuthenticationError('Invalid email or password', 'INVALID_CREDENTIALS');
      }

      // Check if user is active
      if (!user.isActive) {
        logSecurityEvent('LOGIN_ATTEMPT_INACTIVE_USER', user.id, undefined, {
          email: user.email,
        });
        throw new AuthenticationError('Account is deactivated', 'ACCOUNT_DEACTIVATED');
      }

      // Verify password
      const isPasswordValid = await this.verifyPassword(credentials.password, user.passwordHash);

      if (!isPasswordValid) {
        logSecurityEvent('LOGIN_ATTEMPT_INVALID_PASSWORD', user.id, undefined, {
          email: user.email,
        });
        throw new AuthenticationError('Invalid email or password', 'INVALID_CREDENTIALS');
      }

      // Generate tokens
      const tokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
      };

      const { accessToken, refreshToken } = jwtService.generateTokenPair(tokenPayload);

      // Store refresh token in database
      await this.storeRefreshToken(user.id, refreshToken);

      // Update last login time
      await prisma.user.update({
        where: { id: user.id },
        data: { updatedAt: new Date() },
      });

      // Log audit event
      logAuditEvent('USER_LOGIN', 'user', user.id, {
        email: user.email,
        rememberMe: credentials.rememberMe,
      });

      // Remove password hash from user object
      const { passwordHash: _, ...userWithoutPassword } = user;

      // Cache user data
      await setCacheWithObject(`user:${user.id}`, userWithoutPassword, 300); // 5 minutes

      logger.info(`User logged in successfully: ${user.email}`);

      return {
        user: userWithoutPassword,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      if (error instanceof AuthenticationError) {
        throw error;
      }
      logger.error('User login failed:', error);
      throw new AuthenticationError('Login failed', 'LOGIN_FAILED');
    }
  }

  // Refresh access token
  public async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      // Verify refresh token
      const payload = jwtService.verifyRefreshToken(refreshToken);

      // Check if refresh token exists in database
      const storedToken = await prisma.refreshToken.findFirst({
        where: {
          token: refreshToken,
          userId: payload.userId,
          expiresAt: { gt: new Date() },
        },
      });

      if (!storedToken) {
        logSecurityEvent('INVALID_REFRESH_TOKEN', payload.userId, undefined, {
          token: refreshToken.substring(0, 10) + '...',
        });
        throw new AuthenticationError('Invalid or expired refresh token', 'INVALID_REFRESH_TOKEN');
      }

      // Get user to ensure they're still active
      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
      });

      if (!user || !user.isActive) {
        // Invalidate the refresh token
        await this.invalidateRefreshToken(refreshToken);
        throw new AuthenticationError('User account not found or deactivated', 'USER_NOT_FOUND');
      }

      // Generate new tokens
      const tokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
      };

      const newTokenPair = jwtService.generateTokenPair(tokenPayload);

      // Invalidate old refresh token and store new one
      await this.invalidateRefreshToken(refreshToken);
      await this.storeRefreshToken(user.id, newTokenPair.refreshToken);

      // Log audit event
      logAuditEvent('TOKEN_REFRESH', 'user', user.id, {
        email: user.email,
      });

      logger.debug(`Token refreshed for user: ${user.email}`);

      return newTokenPair;
    } catch (error) {
      if (error instanceof AuthenticationError || error instanceof JWTError) {
        throw error;
      }
      logger.error('Token refresh failed:', error);
      throw new AuthenticationError('Token refresh failed', 'TOKEN_REFRESH_FAILED');
    }
  }

  // User logout
  public async logout(refreshToken: string, userId?: string): Promise<void> {
    try {
      if (refreshToken) {
        await this.invalidateRefreshToken(refreshToken);
      }

      // Clear user cache
      if (userId) {
        await deleteCache(`user:${userId}`);
      }

      if (userId) {
        logAuditEvent('USER_LOGOUT', 'user', userId, {});
        logger.debug(`User logged out: ${userId}`);
      }

      logger.debug('Logout completed');
    } catch (error) {
      logger.error('Logout failed:', error);
      // Don't throw error for logout - always succeed from client perspective
    }
  }

  // Store refresh token in database
  private async storeRefreshToken(userId: string, token: string): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

    await prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });
  }

  // Invalidate refresh token
  private async invalidateRefreshToken(token: string): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: { token },
    });
  }

  // Invalidate all refresh tokens for a user
  public async invalidateAllUserTokens(userId: string): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: { userId },
    });

    // Clear user cache
    await deleteCache(`user:${userId}`);

    logAuditEvent('TOKENS_INVALIDATED', 'user', userId, {
      allTokens: true,
    });

    logger.info(`All tokens invalidated for user: ${userId}`);
  }

  // Change password
  public async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      // Get user
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new AuthenticationError('User not found', 'USER_NOT_FOUND');
      }

      // Verify current password
      const isCurrentPasswordValid = await this.verifyPassword(currentPassword, user.passwordHash);

      if (!isCurrentPasswordValid) {
        logSecurityEvent('INVALID_CURRENT_PASSWORD', userId, undefined, {
          email: user.email,
        });
        throw new AuthenticationError('Current password is incorrect', 'INVALID_CURRENT_PASSWORD');
      }

      // Hash new password
      const newPasswordHash = await this.hashPassword(newPassword);

      // Update password
      await prisma.user.update({
        where: { id: userId },
        data: {
          passwordHash: newPasswordHash,
          updatedAt: new Date(),
        },
      });

      // Invalidate all refresh tokens (force re-login on all devices)
      await this.invalidateAllUserTokens(userId);

      // Log audit event
      logAuditEvent('PASSWORD_CHANGED', 'user', userId, {
        email: user.email,
      });

      logger.info(`Password changed successfully for user: ${user.email}`);
    } catch (error) {
      if (error instanceof AuthenticationError) {
        throw error;
      }
      logger.error('Password change failed:', error);
      throw new AuthenticationError('Password change failed', 'PASSWORD_CHANGE_FAILED');
    }
  }

  // Get user by ID (from cache or database)
  public async getUserById(userId: string): Promise<Omit<User, 'passwordHash'> | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          department: true,
          position: true,
          avatarUrl: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (user) {
        // Cache user data
        await setCacheWithObject(`user:${userId}`, user, 300); // 5 minutes
      }

      return user;
    } catch (error) {
      logger.error('Failed to get user by ID:', error);
      return null;
    }
  }

  // Clean up expired refresh tokens
  public async cleanupExpiredTokens(): Promise<void> {
    try {
      const result = await prisma.refreshToken.deleteMany({
        where: {
          expiresAt: { lt: new Date() },
        },
      });

      if (result.count > 0) {
        logger.info(`Cleaned up ${result.count} expired refresh tokens`);
      }
    } catch (error) {
      logger.error('Failed to cleanup expired tokens:', error);
    }
  }
}

// Create and export singleton instance
export const authService = new AuthService();
export default authService;