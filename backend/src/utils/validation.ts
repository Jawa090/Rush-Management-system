import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

// Validation error class
export class ValidationError extends Error {
  constructor(message: string, public details: any) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Common validation schemas
export const commonSchemas = {
  // UUID validation
  uuid: Joi.string().uuid().required().messages({
    'string.uuid': 'Must be a valid UUID',
    'any.required': 'ID is required',
  }),

  // Email validation
  email: Joi.string().email().required().messages({
    'string.email': 'Must be a valid email address',
    'any.required': 'Email is required',
  }),

  // Password validation
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]'))
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'Password is required',
    }),

  // Name validation
  name: Joi.string().min(2).max(50).pattern(new RegExp('^[a-zA-Z\\s\\-\\']+$')).required().messages({
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name cannot exceed 50 characters',
    'string.pattern.base': 'Name can only contain letters, spaces, hyphens, and apostrophes',
    'any.required': 'Name is required',
  }),

  // Pagination validation
  pagination: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sortBy: Joi.string().optional(),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
  }),

  // Date validation
  date: Joi.date().iso().required().messages({
    'date.format': 'Must be a valid ISO date',
    'any.required': 'Date is required',
  }),

  // Optional date validation
  optionalDate: Joi.date().iso().optional().allow(''),

  // Role validation
  role: Joi.string().valid('ADMIN', 'MANAGER', 'EMPLOYEE').required().messages({
    'any.only': 'Role must be one of: ADMIN, MANAGER, EMPLOYEE',
    'any.required': 'Role is required',
  }),
};

// Authentication validation schemas
export const authSchemas = {
  // User registration
  register: Joi.object({
    email: commonSchemas.email,
    password: commonSchemas.password,
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
      'any.only': 'Passwords do not match',
      'any.required': 'Password confirmation is required',
    }),
    firstName: commonSchemas.name,
    lastName: commonSchemas.name,
    department: Joi.string().max(50).optional().allow('').messages({
      'string.max': 'Department cannot exceed 50 characters',
    }),
    position: Joi.string().max(50).optional().allow('').messages({
      'string.max': 'Position cannot exceed 50 characters',
    }),
  }),

  // User login
  login: Joi.object({
    email: commonSchemas.email,
    password: Joi.string().required().messages({
      'any.required': 'Password is required',
    }),
    rememberMe: Joi.boolean().optional().default(false),
  }),

  // Refresh token
  refreshToken: Joi.object({
    refreshToken: Joi.string().required().messages({
      'any.required': 'Refresh token is required',
    }),
  }),

  // Password change
  changePassword: Joi.object({
    currentPassword: Joi.string().required().messages({
      'any.required': 'Current password is required',
    }),
    newPassword: commonSchemas.password,
    confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required().messages({
      'any.only': 'Passwords do not match',
      'any.required': 'Password confirmation is required',
    }),
  }),

  // Password reset request
  requestPasswordReset: Joi.object({
    email: commonSchemas.email,
  }),

  // Password reset
  resetPassword: Joi.object({
    token: Joi.string().required().messages({
      'any.required': 'Reset token is required',
    }),
    password: commonSchemas.password,
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
      'any.only': 'Passwords do not match',
      'any.required': 'Password confirmation is required',
    }),
  }),
};

// User management validation schemas
export const userSchemas = {
  // Update user profile
  updateProfile: Joi.object({
    firstName: commonSchemas.name.optional(),
    lastName: commonSchemas.name.optional(),
    department: Joi.string().max(50).optional().allow(''),
    position: Joi.string().max(50).optional().allow(''),
    role: commonSchemas.role.optional(),
  }).min(1).messages({
    'object.min': 'At least one field must be provided for update',
  }),

  // Create user (admin only)
  createUser: Joi.object({
    email: commonSchemas.email,
    password: commonSchemas.password,
    firstName: commonSchemas.name,
    lastName: commonSchemas.name,
    role: commonSchemas.role,
    department: Joi.string().max(50).optional().allow(''),
    position: Joi.string().max(50).optional().allow(''),
  }),

  // User search/filter
  userQuery: Joi.object({
    ...commonSchemas.pagination.describe().keys,
    search: Joi.string().max(100).optional().allow(''),
    department: Joi.string().max(50).optional().allow(''),
    role: Joi.string().valid('ADMIN', 'MANAGER', 'EMPLOYEE').optional(),
    isActive: Joi.boolean().optional(),
  }),
};

// Leave management validation schemas
export const leaveSchemas = {
  // Create leave request
  createRequest: Joi.object({
    leaveType: Joi.string().valid('SICK', 'VACATION', 'PERSONAL', 'MATERNITY', 'PATERNITY').required().messages({
      'any.only': 'Leave type must be one of: SICK, VACATION, PERSONAL, MATERNITY, PATERNITY',
      'any.required': 'Leave type is required',
    }),
    startDate: commonSchemas.date,
    endDate: Joi.date().iso().min(Joi.ref('startDate')).required().messages({
      'date.format': 'Must be a valid ISO date',
      'date.min': 'End date must be after or same as start date',
      'any.required': 'End date is required',
    }),
    reason: Joi.string().max(500).optional().allow('').messages({
      'string.max': 'Reason cannot exceed 500 characters',
    }),
  }),

  // Update leave request
  updateRequest: Joi.object({
    leaveType: Joi.string().valid('SICK', 'VACATION', 'PERSONAL', 'MATERNITY', 'PATERNITY').optional(),
    startDate: commonSchemas.optionalDate,
    endDate: commonSchemas.optionalDate,
    reason: Joi.string().max(500).optional().allow(''),
  }).min(1).messages({
    'object.min': 'At least one field must be provided for update',
  }),

  // Approve/reject leave request
  actionRequest: Joi.object({
    action: Joi.string().valid('approve', 'reject').required().messages({
      'any.only': 'Action must be either approve or reject',
      'any.required': 'Action is required',
    }),
    reason: Joi.string().when('action', {
      is: 'reject',
      then: Joi.string().min(10).max(500).required().messages({
        'string.min': 'Rejection reason must be at least 10 characters long',
        'string.max': 'Rejection reason cannot exceed 500 characters',
        'any.required': 'Rejection reason is required for rejection',
      }),
      otherwise: Joi.string().max(500).optional().allow(''),
    }),
  }),

  // Leave request query
  leaveQuery: Joi.object({
    ...commonSchemas.pagination.describe().keys,
    status: Joi.string().valid('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED').optional(),
    type: Joi.string().valid('SICK', 'VACATION', 'PERSONAL', 'MATERNITY', 'PATERNITY').optional(),
    userId: Joi.string().uuid().optional(),
    department: Joi.string().max(50).optional(),
    year: Joi.number().integer().min(2020).max(2030).optional(),
    startDate: commonSchemas.optionalDate,
    endDate: commonSchemas.optionalDate,
  }),
};

// Document management validation schemas
export const documentSchemas = {
  // Update document metadata
  updateDocument: Joi.object({
    title: Joi.string().min(1).max(200).optional().messages({
      'string.min': 'Title cannot be empty',
      'string.max': 'Title cannot exceed 200 characters',
    }),
    description: Joi.string().max(1000).optional().allow(''),
    category: Joi.string().max(50).optional().allow(''),
    accessLevel: Joi.string().valid('PUBLIC', 'DEPARTMENT', 'PRIVATE').optional().messages({
      'any.only': 'Access level must be one of: PUBLIC, DEPARTMENT, PRIVATE',
    }),
  }).min(1).messages({
    'object.min': 'At least one field must be provided for update',
  }),

  // Document query
  documentQuery: Joi.object({
    ...commonSchemas.pagination.describe().keys,
    search: Joi.string().max(100).optional().allow(''),
    category: Joi.string().max(50).optional().allow(''),
    accessLevel: Joi.string().valid('PUBLIC', 'DEPARTMENT', 'PRIVATE').optional(),
    fileType: Joi.string().max(20).optional(),
    userId: Joi.string().uuid().optional(),
  }),
};

// Notification validation schemas
export const notificationSchemas = {
  // Create notification
  createNotification: Joi.object({
    userId: commonSchemas.uuid,
    title: Joi.string().min(1).max(200).required().messages({
      'string.min': 'Title cannot be empty',
      'string.max': 'Title cannot exceed 200 characters',
      'any.required': 'Title is required',
    }),
    message: Joi.string().min(1).max(1000).required().messages({
      'string.min': 'Message cannot be empty',
      'string.max': 'Message cannot exceed 1000 characters',
      'any.required': 'Message is required',
    }),
    type: Joi.string().valid('INFO', 'SUCCESS', 'WARNING', 'ERROR').required().messages({
      'any.only': 'Type must be one of: INFO, SUCCESS, WARNING, ERROR',
      'any.required': 'Type is required',
    }),
  }),

  // Notification query
  notificationQuery: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(20),
    isRead: Joi.boolean().optional(),
    type: Joi.string().valid('INFO', 'SUCCESS', 'WARNING', 'ERROR').optional(),
  }),
};

// Validation middleware factory
export const validate = (schema: Joi.ObjectSchema, source: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const data = req[source];
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    });

    if (error) {
      const details = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        value: detail.context?.value,
      }));

      const validationError = new ValidationError('Validation failed', details);

      res.status(400).json({
        success: false,
        error: 'Validation failed',
        details,
      });
      return;
    }

    // Replace request data with validated and sanitized data
    req[source] = value;
    next();
  };
};

// Async validation middleware
export const validateAsync = async (
  schema: Joi.ObjectSchema,
  data: any,
  options?: Joi.AsyncValidationOptions
): Promise<any> => {
  const { error, value } = await schema.validateAsync(data, {
    abortEarly: false,
    stripUnknown: true,
    convert: true,
    ...options,
  });

  if (error) {
    const details = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message,
      value: detail.context?.value,
    }));

    throw new ValidationError('Validation failed', details);
  }

  return value;
};

// Sanitization helpers
export const sanitize = {
  // Sanitize string input
  string: (input: string): string => {
    return input.trim().replace(/\s+/g, ' ');
  },

  // Sanitize email
  email: (input: string): string => {
    return input.toLowerCase().trim();
  },

  // Sanitize HTML content (basic XSS prevention)
  html: (input: string): string => {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  },

  // Sanitize filename
  filename: (input: string): string => {
    return input.replace(/[^a-zA-Z0-9.\-_]/g, '_');
  },
};

export {
  authSchemas,
  userSchemas,
  leaveSchemas,
  documentSchemas,
  notificationSchemas,
  commonSchemas,
};

export default validate;