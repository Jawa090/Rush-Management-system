import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { logger, logError } from '@/utils/logger';
import { ValidationError } from '@/utils/validation';
import { JWTError } from '@/config/jwt';
import { AuthenticationError, AuthorizationError } from './auth';

// Custom error classes
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code: string = 'INTERNAL_ERROR',
    public isOperational: boolean = true
  ) {
    super(message);
    this.name = 'AppError';

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, originalError?: any) {
    super(message, 500, 'DATABASE_ERROR');
    this.name = 'DatabaseError';

    if (originalError) {
      this.stack = originalError.stack;
    }
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT');
    this.name = 'ConflictError';
  }
}

export class BusinessLogicError extends AppError {
  constructor(message: string, code: string = 'BUSINESS_LOGIC_ERROR') {
    super(message, 400, code);
    this.name = 'BusinessLogicError';
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: string, message: string = 'External service error') {
    super(`${service}: ${message}`, 502, 'EXTERNAL_SERVICE_ERROR');
    this.name = 'ExternalServiceError';
  }
}

// Error handling middleware
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log the error
  logError(error, 'ERROR_HANDLER', {
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    userId: (req as any).user?.id,
  });

  // Default error response
  let statusCode = 500;
  let errorCode = 'INTERNAL_ERROR';
  let message = 'Internal server error';
  let details: any = undefined;

  // Handle specific error types
  if (error instanceof ValidationError) {
    statusCode = 400;
    errorCode = 'VALIDATION_ERROR';
    message = 'Validation failed';
    details = error.details;
  } else if (error instanceof JWTError) {
    statusCode = 401;
    errorCode = error.code;
    message = error.message;
  } else if (error instanceof AuthenticationError) {
    statusCode = error.statusCode;
    errorCode = error.code;
    message = error.message;
  } else if (error instanceof AuthorizationError) {
    statusCode = error.statusCode;
    errorCode = error.code;
    message = error.message;
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    errorCode = error.code;
    message = error.message;

    // Include stack trace in development for operational errors
    if (process.env.NODE_ENV === 'development' && error.isOperational) {
      details = {
        stack: error.stack,
      };
    }
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle Prisma known errors
    switch (error.code) {
      case 'P2002':
        statusCode = 409;
        errorCode = 'UNIQUE_CONSTRAINT_VIOLATION';
        message = 'Resource already exists';
        details = {
          field: error.meta?.target,
        };
        break;
      case 'P2025':
        statusCode = 404;
        errorCode = 'RECORD_NOT_FOUND';
        message = 'Record not found';
        break;
      case 'P2003':
        statusCode = 400;
        errorCode = 'FOREIGN_KEY_CONSTRAINT_VIOLATION';
        message = 'Referenced resource does not exist';
        break;
      case 'P2014':
        statusCode = 400;
        errorCode = 'RELATION_VIOLATION';
        message = 'Cannot delete or update referenced resource';
        break;
      default:
        statusCode = 500;
        errorCode = 'DATABASE_ERROR';
        message = 'Database operation failed';
    }
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    statusCode = 500;
    errorCode = 'DATABASE_UNKNOWN_ERROR';
    message = 'Unknown database error occurred';
  } else if (error instanceof Prisma.PrismaClientRustPanicError) {
    statusCode = 500;
    errorCode = 'DATABASE_PANIC';
    message = 'Database engine panicked';
  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    statusCode = 503;
    errorCode = 'DATABASE_CONNECTION_ERROR';
    message = 'Database connection failed';
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    errorCode = 'DATABASE_VALIDATION_ERROR';
    message = 'Database validation error';
  }

  // Build error response
  const errorResponse: any = {
    success: false,
    error: message,
    code: errorCode,
  };

  // Include details if available
  if (details) {
    errorResponse.details = details;
  }

  // Include stack trace in development for non-operational errors
  if (process.env.NODE_ENV === 'development' && !error.isOperational) {
    errorResponse.stack = error.stack;
  }

  // Add request ID if available
  const requestId = req.headers['x-request-id'];
  if (requestId) {
    errorResponse.requestId = requestId;
  }

  res.status(statusCode).json(errorResponse);
};

// Async error wrapper for route handlers
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// 404 handler
export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  const error = new NotFoundError('Route');
  error.message = `Route ${req.originalUrl} not found`;
  next(error);
};

// Production error handler (without stack traces)
export const productionErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log the error
  logError(error, 'PRODUCTION_ERROR_HANDLER', {
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    userId: (req as any).user?.id,
  });

  // Don't leak error details in production
  let statusCode = 500;
  let errorCode = 'INTERNAL_ERROR';
  let message = 'Something went wrong';

  if (error instanceof AppError && error.isOperational) {
    statusCode = error.statusCode;
    errorCode = error.code;
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    code: errorCode,
  });
};

// Development error handler (with full stack traces)
export const developmentErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logError(error, 'DEVELOPMENT_ERROR_HANDLER', {
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    userId: (req as any).user?.id,
  });

  let statusCode = 500;
  let errorCode = 'INTERNAL_ERROR';
  let message = error.message || 'Internal server error';

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    errorCode = error.code;
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    code: errorCode,
    stack: error.stack,
    details: error,
  });
};

// Error response helper function
export const createErrorResponse = (
  message: string,
  statusCode: number = 500,
  code: string = 'ERROR',
  details?: any
) => {
  const error = new AppError(message, statusCode, code);
  if (details) {
    return { ...error, details };
  }
  return error;
};

// Unhandled promise rejection handler
export const setupUnhandledRejectionHandler = (): void => {
  process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);

    // In production, you might want to gracefully shutdown
    if (process.env.NODE_ENV === 'production') {
      logger.error('Shutting down due to unhandled promise rejection');
      process.exit(1);
    }
  });

  process.on('uncaughtException', (error: Error) => {
    logger.error('Uncaught Exception:', error);

    // In production, you might want to gracefully shutdown
    if (process.env.NODE_ENV === 'production') {
      logger.error('Shutting down due to uncaught exception');
      process.exit(1);
    }
  });
};

export {
  AppError,
  DatabaseError,
  NotFoundError,
  ConflictError,
  BusinessLogicError,
  ExternalServiceError,
};

export default errorHandler;