import { Request, Response } from 'express';
import { authService, AuthenticationError } from '@/services/authService';
import { AuthenticatedRequest } from '@/middleware/auth';
import { logger, logSecurityEvent } from '@/utils/logger';

export class AuthController {
  // User registration
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, firstName, lastName, department, position } = req.body;

      const result = await authService.register({
        email,
        password,
        firstName,
        lastName,
        department,
        position,
      });

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: result.user,
          accessToken: result.accessToken,
        },
      });

      // Note: In production, you might want to set the refresh token as an httpOnly cookie
      // For now, we'll include it in the response body
      logger.info(`New user registered: ${result.user.email}`);
    } catch (error) {
      if (error instanceof AuthenticationError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
          code: error.code,
        });
        return;
      }

      logger.error('Registration controller error:', error);
      res.status(500).json({
        success: false,
        error: 'Registration failed',
        code: 'REGISTRATION_ERROR',
      });
    }
  }

  // User login
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, rememberMe } = req.body;
      const ipAddress = req.ip;
      const userAgent = req.get('User-Agent');

      const result = await authService.login({
        email,
        password,
        rememberMe,
      });

      // Log security event
      logSecurityEvent('USER_LOGIN_SUCCESS', result.user.id, ipAddress, {
        email: result.user.email,
        userAgent,
      });

      // Set refresh token in httpOnly cookie if in production
      if (process.env.NODE_ENV === 'production') {
        res.cookie('refreshToken', result.refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
      }

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: result.user,
          accessToken: result.accessToken,
          refreshToken: process.env.NODE_ENV === 'development' ? result.refreshToken : undefined,
        },
      });

      logger.info(`User logged in: ${result.user.email} from IP: ${ipAddress}`);
    } catch (error) {
      if (error instanceof AuthenticationError) {
        // Log failed login attempt
        logSecurityEvent('USER_LOGIN_FAILED', undefined, req.ip, {
          email: req.body.email,
          userAgent: req.get('User-Agent'),
          error: error.message,
        });

        res.status(error.statusCode).json({
          success: false,
          error: error.message,
          code: error.code,
        });
        return;
      }

      logger.error('Login controller error:', error);
      res.status(500).json({
        success: false,
        error: 'Login failed',
        code: 'LOGIN_ERROR',
      });
    }
  }

  // Refresh access token
  public async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        // Try to get from cookie
        const cookieToken = req.cookies.refreshToken;
        if (!cookieToken) {
          res.status(401).json({
            success: false,
            error: 'Refresh token required',
            code: 'MISSING_REFRESH_TOKEN',
          });
          return;
        }
        req.body.refreshToken = cookieToken;
      }

      const result = await authService.refreshToken(refreshToken);

      // Set new refresh token in httpOnly cookie if in production
      if (process.env.NODE_ENV === 'production') {
        res.cookie('refreshToken', result.refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
      }

      res.json({
        success: true,
        message: 'Token refreshed successfully',
        data: {
          accessToken: result.accessToken,
          refreshToken: process.env.NODE_ENV === 'development' ? result.refreshToken : undefined,
        },
      });

      logger.debug('Access token refreshed successfully');
    } catch (error) {
      if (error instanceof AuthenticationError) {
        // Clear invalid refresh token cookie
        res.clearCookie('refreshToken');

        res.status(error.statusCode).json({
          success: false,
          error: error.message,
          code: error.code,
        });
        return;
      }

      logger.error('Token refresh controller error:', error);
      res.status(500).json({
        success: false,
        error: 'Token refresh failed',
        code: 'TOKEN_REFRESH_ERROR',
      });
    }
  }

  // User logout
  public async logout(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;
      const userId = req.user?.id;

      // Get refresh token from cookie if not in body
      let tokenToInvalidate = refreshToken;
      if (!tokenToInvalidate && req.cookies.refreshToken) {
        tokenToInvalidate = req.cookies.refreshToken;
      }

      await authService.logout(tokenToInvalidate, userId);

      // Clear refresh token cookie
      res.clearCookie('refreshToken');

      res.json({
        success: true,
        message: 'Logout successful',
      });

      if (userId) {
        logger.info(`User logged out: ${userId}`);
      }
    } catch (error) {
      logger.error('Logout controller error:', error);
      // Always return success for logout to prevent client-side issues
      res.json({
        success: true,
        message: 'Logout successful',
      });
    }
  }

  // Get current user profile
  public async getCurrentUser(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'User not authenticated',
          code: 'NOT_AUTHENTICATED',
        });
        return;
      }

      // Get fresh user data from service
      const user = await authService.getUserById(req.user.id);

      if (!user) {
        res.status(404).json({
          success: false,
          error: 'User not found',
          code: 'USER_NOT_FOUND',
        });
        return;
      }

      res.json({
        success: true,
        data: {
          user,
        },
      });
    } catch (error) {
      logger.error('Get current user controller error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get user profile',
        code: 'GET_USER_ERROR',
      });
    }
  }

  // Change password
  public async changePassword(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'User not authenticated',
          code: 'NOT_AUTHENTICATED',
        });
        return;
      }

      const { currentPassword, newPassword } = req.body;

      await authService.changePassword(req.user.id, currentPassword, newPassword);

      res.json({
        success: true,
        message: 'Password changed successfully',
      });

      logger.info(`Password changed for user: ${req.user.id}`);
    } catch (error) {
      if (error instanceof AuthenticationError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
          code: error.code,
        });
        return;
      }

      logger.error('Change password controller error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to change password',
        code: 'CHANGE_PASSWORD_ERROR',
      });
    }
  }

  // Request password reset
  public async requestPasswordReset(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      // For now, we'll just return success to prevent email enumeration attacks
      // In a real implementation, you would generate a reset token and send an email

      logSecurityEvent('PASSWORD_RESET_REQUESTED', undefined, req.ip, {
        email,
        userAgent: req.get('User-Agent'),
      });

      res.json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent',
      });

      logger.info(`Password reset requested for email: ${email}`);
    } catch (error) {
      logger.error('Password reset request controller error:', error);
      res.json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent',
      });
    }
  }

  // Reset password
  public async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { token, password } = req.body;

      // For now, this is a placeholder implementation
      // In a real implementation, you would verify the reset token and update the password

      logSecurityEvent('PASSWORD_RESET_COMPLETED', undefined, req.ip, {
        token: token?.substring(0, 10) + '...',
        userAgent: req.get('User-Agent'),
      });

      res.json({
        success: true,
        message: 'Password reset successful',
      });

      logger.info('Password reset completed');
    } catch (error) {
      logger.error('Password reset controller error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to reset password',
        code: 'RESET_PASSWORD_ERROR',
      });
    }
  }

  // Logout from all devices
  public async logoutAllDevices(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'User not authenticated',
          code: 'NOT_AUTHENTICATED',
        });
        return;
      }

      await authService.invalidateAllUserTokens(req.user.id);

      // Clear refresh token cookie
      res.clearCookie('refreshToken');

      res.json({
        success: true,
        message: 'Logged out from all devices successfully',
      });

      logger.info(`User logged out from all devices: ${req.user.id}`);
    } catch (error) {
      logger.error('Logout all devices controller error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to logout from all devices',
        code: 'LOGOUT_ALL_ERROR',
      });
    }
  }
}

export const authController = new AuthController();
export default authController;