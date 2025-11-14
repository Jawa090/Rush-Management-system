import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from '@/utils/validation';
import {
  authSchemas,
  userSchemas,
  leaveSchemas,
  documentSchemas,
  notificationSchemas,
} from '@/utils/validation';

// Re-export validation function for easy access
export { validate };

// Authentication validation middleware
export const validateRegister = validate(authSchemas.register, 'body');
export const validateLogin = validate(authSchemas.login, 'body');
export const validateRefreshToken = validate(authSchemas.refreshToken, 'body');
export const validateChangePassword = validate(authSchemas.changePassword, 'body');
export const validateRequestPasswordReset = validate(authSchemas.requestPasswordReset, 'body');
export const validateResetPassword = validate(authSchemas.resetPassword, 'body');

// User management validation middleware
export const validateUpdateProfile = validate(userSchemas.updateProfile, 'body');
export const validateCreateUser = validate(userSchemas.createUser, 'body');
export const validateUserQuery = validate(userSchemas.userQuery, 'query');

// UUID parameter validation
export const validateUserIdParam = validate(
  { id: require('joi').string().uuid().required() },
  'params'
);

// Leave management validation middleware
export const validateCreateLeaveRequest = validate(leaveSchemas.createRequest, 'body');
export const validateUpdateLeaveRequest = validate(leaveSchemas.updateRequest, 'body');
export const validateLeaveAction = validate(leaveSchemas.actionRequest, 'body');
export const validateLeaveQuery = validate(leaveSchemas.leaveQuery, 'query');
export const validateLeaveRequestIdParam = validate(
  { id: require('joi').string().uuid().required() },
  'params'
);

// Document management validation middleware
export const validateUpdateDocument = validate(documentSchemas.updateDocument, 'body');
export const validateDocumentQuery = validate(documentSchemas.documentQuery, 'query');
export const validateDocumentIdParam = validate(
  { id: require('joi').string().uuid().required() },
  'params'
);

// Notification validation middleware
export const validateCreateNotification = validate(notificationSchemas.createNotification, 'body');
export const validateNotificationQuery = validate(notificationSchemas.notificationQuery, 'query');
export const validateNotificationIdParam = validate(
  { id: require('joi').string().uuid().required() },
  'params'
);

// Pagination query validation
export const validatePagination = validate(
  {
    page: require('joi').number().integer().min(1).default(1),
    limit: require('joi').number().integer().min(1).max(100).default(10),
    sortBy: require('joi').string().optional(),
    sortOrder: require('joi').string().valid('asc', 'desc').default('desc'),
  },
  'query'
);

// Global validation error handler
export const validationErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof ValidationError) {
    res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: error.details,
      code: 'VALIDATION_ERROR',
    });
    return;
  }

  // Pass other errors to the next error handler
  next(error);
};

// Custom validation middleware for file uploads
export const validateFileUpload = (allowedTypes: string[], maxSize: number = 10 * 1024 * 1024) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const file = req.file;

    if (!file) {
      res.status(400).json({
        success: false,
        error: 'No file uploaded',
        code: 'NO_FILE_UPLOADED',
      });
      return;
    }

    // Check file size
    if (file.size > maxSize) {
      res.status(400).json({
        success: false,
        error: `File size exceeds maximum allowed size of ${Math.round(maxSize / 1024 / 1024)}MB`,
        code: 'FILE_TOO_LARGE',
      });
      return;
    }

    // Check file type
    const fileExtension = file.originalname.split('.').pop()?.toLowerCase();
    if (!fileExtension || !allowedTypes.includes(fileExtension)) {
      res.status(400).json({
        success: false,
        error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`,
        code: 'FILE_TYPE_NOT_ALLOWED',
      });
      return;
    }

    // Check MIME type
    if (!file.mimetype || !allowedTypes.some(type => file.mimetype!.includes(type))) {
      res.status(400).json({
        success: false,
        error: 'Invalid file MIME type',
        code: 'INVALID_MIME_TYPE',
      });
      return;
    }

    next();
  };
};

// Custom validation middleware for multiple file uploads
export const validateMultipleFileUpload = (
  allowedTypes: string[],
  maxSize: number = 10 * 1024 * 1024,
  maxFiles: number = 5
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      res.status(400).json({
        success: false,
        error: 'No files uploaded',
        code: 'NO_FILES_UPLOADED',
      });
      return;
    }

    if (files.length > maxFiles) {
      res.status(400).json({
        success: false,
        error: `Maximum ${maxFiles} files allowed per upload`,
        code: 'TOO_MANY_FILES',
      });
      return;
    }

    for (const file of files) {
      // Check file size
      if (file.size > maxSize) {
        res.status(400).json({
          success: false,
          error: `File ${file.originalname} exceeds maximum allowed size of ${Math.round(maxSize / 1024 / 1024)}MB`,
          code: 'FILE_TOO_LARGE',
        });
        return;
      }

      // Check file type
      const fileExtension = file.originalname.split('.').pop()?.toLowerCase();
      if (!fileExtension || !allowedTypes.includes(fileExtension)) {
        res.status(400).json({
          success: false,
          error: `File ${file.originalname} type not allowed. Allowed types: ${allowedTypes.join(', ')}`,
          code: 'FILE_TYPE_NOT_ALLOWED',
        });
        return;
      }

      // Check MIME type
      if (!file.mimetype || !allowedTypes.some(type => file.mimetype!.includes(type))) {
        res.status(400).json({
          success: false,
          error: `File ${file.originalname} has invalid MIME type`,
          code: 'INVALID_MIME_TYPE',
        });
        return;
      }
    }

    next();
  };
};

// Custom validation middleware for date ranges
export const validateDateRange = (startDateField: string = 'startDate', endDateField: string = 'endDate') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const startDate = new Date(req.body[startDateField]);
    const endDate = new Date(req.body[endDateField]);

    if (startDate && endDate) {
      if (startDate >= endDate) {
        res.status(400).json({
          success: false,
          error: 'Start date must be before end date',
          code: 'INVALID_DATE_RANGE',
        });
        return;
      }

      // Check if start date is in the past
      const now = new Date();
      if (startDate < now.setHours(0, 0, 0, 0)) {
        res.status(400).json({
          success: false,
          error: 'Start date cannot be in the past',
          code: 'PAST_START_DATE',
        });
        return;
      }
    }

    next();
  };
};

// Custom validation middleware for business hours
export const validateBusinessHours = (startTime: string = '09:00', endTime: string = '17:00') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const date = new Date(req.body.startDate || req.body.date);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeInMinutes = hours * 60 + minutes;

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const startTimeInMinutes = startHour * 60 + startMinute;
    const endTimeInMinutes = endHour * 60 + endMinute;

    if (timeInMinutes < startTimeInMinutes || timeInMinutes > endTimeInMinutes) {
      res.status(400).json({
        success: false,
        error: `Date/time must be within business hours (${startTime} - ${endTime})`,
        code: 'OUTSIDE_BUSINESS_HOURS',
      });
      return;
    }

    next();
  };
};

export default validate;