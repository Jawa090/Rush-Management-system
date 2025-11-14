import jwt from 'jsonwebtoken';
import { logger } from '@/utils/logger';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export class JWTError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'JWTError';
  }
}

class JWTService {
  private accessSecret: string;
  private refreshSecret: string;
  private accessExpiresIn: string;
  private refreshExpiresIn: string;

  constructor() {
    this.accessSecret = process.env.JWT_ACCESS_SECRET!;
    this.refreshSecret = process.env.JWT_REFRESH_SECRET!;
    this.accessExpiresIn = process.env.JWT_ACCESS_EXPIRES || '15m';
    this.refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES || '7d';

    if (!this.accessSecret || !this.refreshSecret) {
      throw new Error('JWT secrets are not configured in environment variables');
    }
  }

  // Generate access token
  public generateAccessToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
    try {
      return jwt.sign(payload, this.accessSecret, {
        expiresIn: this.accessExpiresIn,
        issuer: process.env.APP_NAME || 'Rush Management System',
        audience: process.env.APP_URL || 'http://localhost:5173',
      });
    } catch (error) {
      logger.error('Failed to generate access token:', error);
      throw new JWTError('Failed to generate access token', 'ACCESS_TOKEN_GENERATION_FAILED');
    }
  }

  // Generate refresh token
  public generateRefreshToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
    try {
      return jwt.sign(payload, this.refreshSecret, {
        expiresIn: this.refreshExpiresIn,
        issuer: process.env.APP_NAME || 'Rush Management System',
        audience: process.env.APP_URL || 'http://localhost:5173',
      });
    } catch (error) {
      logger.error('Failed to generate refresh token:', error);
      throw new JWTError('Failed to generate refresh token', 'REFRESH_TOKEN_GENERATION_FAILED');
    }
  }

  // Generate token pair
  public generateTokenPair(payload: Omit<JWTPayload, 'iat' | 'exp'>): TokenPair {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  // Verify access token
  public verifyAccessToken(token: string): JWTPayload {
    try {
      const decoded = jwt.verify(token, this.accessSecret, {
        issuer: process.env.APP_NAME || 'Rush Management System',
        audience: process.env.APP_URL || 'http://localhost:5173',
      }) as JWTPayload;

      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new JWTError('Access token expired', 'ACCESS_TOKEN_EXPIRED');
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new JWTError('Invalid access token', 'INVALID_ACCESS_TOKEN');
      } else {
        logger.error('Access token verification failed:', error);
        throw new JWTError('Access token verification failed', 'ACCESS_TOKEN_VERIFICATION_FAILED');
      }
    }
  }

  // Verify refresh token
  public verifyRefreshToken(token: string): JWTPayload {
    try {
      const decoded = jwt.verify(token, this.refreshSecret, {
        issuer: process.env.APP_NAME || 'Rush Management System',
        audience: process.env.APP_URL || 'http://localhost:5173',
      }) as JWTPayload;

      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new JWTError('Refresh token expired', 'REFRESH_TOKEN_EXPIRED');
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new JWTError('Invalid refresh token', 'INVALID_REFRESH_TOKEN');
      } else {
        logger.error('Refresh token verification failed:', error);
        throw new JWTError('Refresh token verification failed', 'REFRESH_TOKEN_VERIFICATION_FAILED');
      }
    }
  }

  // Extract token from Authorization header
  public extractTokenFromHeader(authHeader: string | undefined): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.substring(7);
  }

  // Decode token without verification (for debugging)
  public decodeToken(token: string): JWTPayload | null {
    try {
      const decoded = jwt.decode(token) as JWTPayload;
      return decoded;
    } catch (error) {
      logger.error('Token decoding failed:', error);
      return null;
    }
  }

  // Get token expiration time
  public getTokenExpiration(token: string): Date | null {
    try {
      const decoded = jwt.decode(token) as any;
      if (decoded && decoded.exp) {
        return new Date(decoded.exp * 1000);
      }
      return null;
    } catch (error) {
      logger.error('Failed to get token expiration:', error);
      return null;
    }
  }

  // Check if token is expired
  public isTokenExpired(token: string): boolean {
    try {
      const expiration = this.getTokenExpiration(token);
      if (!expiration) {
        return true;
      }
      return expiration <= new Date();
    } catch (error) {
      return true;
    }
  }

  // Get time until token expires (in seconds)
  public getTimeUntilExpiration(token: string): number {
    try {
      const expiration = this.getTokenExpiration(token);
      if (!expiration) {
        return 0;
      }
      const now = new Date();
      const diffInSeconds = Math.floor((expiration.getTime() - now.getTime()) / 1000);
      return Math.max(0, diffInSeconds);
    } catch (error) {
      return 0;
    }
  }
}

// Export singleton instance
export const jwtService = new JWTService();
export default jwtService;