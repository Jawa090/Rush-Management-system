import { Request, Response, NextFunction } from 'express';
import { jwtService, JWTError } from '@/config/jwt';
import { prisma } from '@/config/database';
import { logger, logSecurityEvent } from '@/utils/logger';

// Extend Request interface to include user
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    department?: string;
    position?: string;
  };
}

export class AuthenticationError extends Error {
  constructor(message: string, public code: string = 'AUTHENTICATION_FAILED') {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends Error {
  constructor(message: string, public code: string = 'AUTHORIZATION_FAILED') {
    super(message);
    this.name = 'AuthorizationError';
  }
}

// Authentication middleware
export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    const token = jwtService.extractTokenFromHeader(authHeader);

    if (!token) {
      throw new AuthenticationError('No authentication token provided', 'MISSING_TOKEN');
    }

    // Verify the token
    const payload = jwtService.verifyAccessToken(token);

    // Fetch user from database to ensure they exist and are active
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
        department: true,
        position: true,
        isActive: true,
      },
    });

    if (!user) {
      throw new AuthenticationError('User not found', 'USER_NOT_FOUND');
    }

    if (!user.isActive) {
      throw new AuthenticationError('User account is deactivated', 'USER_DEACTIVATED');
    }

    // Attach user to request object
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      department: user.department || undefined,
      position: user.position || undefined,
    };

    // Log successful authentication
    logger.debug(`User authenticated: ${user.email} (${user.id})`);

    next();
  } catch (error) {
    if (error instanceof JWTError) {
      // Log security event for invalid tokens
      logSecurityEvent(
        'Invalid JWT token',
        undefined,
        req.ip,
        {
          error: error.message,
          code: error.code,
          userAgent: req.get('User-Agent'),
          url: req.url,
          method: req.method
        }
      );

      if (error.code === 'ACCESS_TOKEN_EXPIRED') {
        res.status(401).json({
          success: false,
          error: 'Access token expired',
          code: 'TOKEN_EXPIRED',
          requiresRefresh: true,
        });
      } else {
        res.status(401).json({
          success: false,
          error: 'Invalid authentication token',
          code: 'INVALID_TOKEN',
        });
      }
    } else if (error instanceof AuthenticationError) {
      logSecurityEvent(
        'Authentication failed',
        undefined,
        req.ip,
        {
          error: error.message,
          code: error.code,
          userAgent: req.get('User-Agent'),
          url: req.url,
          method: req.method
        }
      );

      res.status(401).json({
        success: false,
        error: error.message,
        code: error.code,
      });
    } else {
      logger.error('Authentication middleware error:', error);
      res.status(500).json({
        success: false,
        error: 'Authentication error',
        code: 'INTERNAL_AUTH_ERROR',
      });
    }
  }
};

// Optional authentication - doesn't fail if no token provided
export const optionalAuthenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = jwtService.extractTokenFromHeader(authHeader);

    if (token) {
      const payload = jwtService.verifyAccessToken(token);
      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: {
          id: true,
          email: true,
          role: true,
          firstName: true,
          lastName: true,
          department: true,
          position: true,
          isActive: true,
        },
      });

      if (user && user.isActive) {
        req.user = {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          department: user.department || undefined,
          position: user.position || undefined,
        };
        logger.debug(`User optionally authenticated: ${user.email} (${user.id})`);
      }
    }

    next();
  } catch (error) {
    // For optional authentication, we just log the error and continue
    logger.debug('Optional authentication failed:', error);
    next();
  }
};

// Rate limiting middleware for authentication endpoints
const authAttempts = new Map<string, { count: number; resetTime: number }>();

export const authRateLimit = (maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip || 'unknown';
    const now = Date.now();
    const attempts = authAttempts.get(key);

    if (!attempts || now > attempts.resetTime) {
      // New window or window expired
      authAttempts.set(key, {
        count: 1,
        resetTime: now + windowMs,
      });
      return next();
    }

    if (attempts.count >= maxAttempts) {
      const remainingTime = Math.ceil((attempts.resetTime - now) / 1000);

      logSecurityEvent(
        'Authentication rate limit exceeded',
        undefined,
        req.ip,
        {
          attempts: attempts.count,
          maxAttempts,
          remainingTime,
          userAgent: req.get('User-Agent'),
          url: req.url,
          method: req.method
        }
      );

      return res.status(429).json({
        success: false,
        error: 'Too many authentication attempts',
        code: 'RATE_LIMIT_EXCEEDED',
        retryAfter: remainingTime,
      });
    }

    attempts.count++;
    next();
  };
};

// Clean up expired rate limit entries
setInterval(() => {
  const now = Date.now();
  for (const [key, attempts] of authAttempts.entries()) {
    if (now > attempts.resetTime) {
      authAttempts.delete(key);
    }
  }
}, 5 * 60 * 1000); // Clean up every 5 minutes

export default authenticate;