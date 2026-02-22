import { Response, NextFunction } from 'express';
import { AuthenticatedRequest, AuthorizationError } from './auth';
import { logger } from '@/utils/logger';

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE',
}

// Role hierarchy (higher number = higher privilege)
const roleHierarchy: Record<UserRole, number> = {
  [UserRole.ADMIN]: 3,
  [UserRole.MANAGER]: 2,
  [UserRole.EMPLOYEE]: 1,
};

// Check if user has required role or higher
export const hasRole = (userRole: UserRole, requiredRole: UserRole): boolean => {
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};

// Check if user has any of the required roles
export const hasAnyRole = (userRole: UserRole, requiredRoles: UserRole[]): boolean => {
  return requiredRoles.some(requiredRole => hasRole(userRole, requiredRole));
};

// Authorization middleware factory
export const authorize = (requiredRoles: UserRole | UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        throw new AuthorizationError('User not authenticated', 'NOT_AUTHENTICATED');
      }

      const userRole = req.user.role as UserRole;
      const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

      if (!hasAnyRole(userRole, roles)) {
        logger.warn(`Authorization failed for user ${req.user.email}. Required roles: ${roles.join(', ')}, User role: ${userRole}`);

        throw new AuthorizationError(
          `Access denied. Required role(s): ${roles.join(' or ')}`,
          'INSUFFICIENT_PERMISSIONS'
        );
      }

      logger.debug(`User ${req.user.email} authorized with role ${userRole}`);
      next();
    } catch (error) {
      if (error instanceof AuthorizationError) {
        res.status(403).json({
          success: false,
          error: error.message,
          code: error.code,
        });
      } else {
        logger.error('Authorization middleware error:', error);
        res.status(500).json({
          success: false,
          error: 'Authorization error',
          code: 'INTERNAL_AUTH_ERROR',
        });
      }
    }
  };
};

// Admin only middleware
export const adminOnly = authorize([UserRole.ADMIN]);

// Manager or Admin middleware
export const managerOrAdmin = authorize([UserRole.MANAGER, UserRole.ADMIN]);

// All authenticated users middleware
export const authenticatedOnly = authorize([UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN]);

// Department-based authorization
export const departmentAuthorize = (
  action: 'view' | 'edit' | 'delete',
  resourceDepartment?: string
) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        throw new AuthorizationError('User not authenticated', 'NOT_AUTHENTICATED');
      }

      const userRole = req.user.role as UserRole;
      const userDepartment = req.user.department;

      // Admins can access everything
      if (userRole === UserRole.ADMIN) {
        return next();
      }

      // If no department specified, allow access
      if (!resourceDepartment) {
        return next();
      }

      // Managers can access their own department
      if (userRole === UserRole.MANAGER && userDepartment === resourceDepartment) {
        return next();
      }

      // Users can only access their own department for view actions
      if (userRole === UserRole.EMPLOYEE &&
          action === 'view' &&
          userDepartment === resourceDepartment) {
        return next();
      }

      throw new AuthorizationError(
        'Access denied: insufficient department permissions',
        'DEPARTMENT_ACCESS_DENIED'
      );
    } catch (error) {
      if (error instanceof AuthorizationError) {
        res.status(403).json({
          success: false,
          error: error.message,
          code: error.code,
        });
      } else {
        logger.error('Department authorization middleware error:', error);
        res.status(500).json({
          success: false,
          error: 'Department authorization error',
          code: 'INTERNAL_AUTH_ERROR',
        });
      }
    }
  };
};

// Resource owner authorization
export const resourceOwnerOrAdmin = (resourceUserId: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        throw new AuthorizationError('User not authenticated', 'NOT_AUTHENTICATED');
      }

      const userId = req.user.id;
      const userRole = req.user.role as UserRole;

      // Admin can access everything
      if (userRole === UserRole.ADMIN) {
        return next();
      }

      // Users can only access their own resources
      if (userId === resourceUserId) {
        return next();
      }

      throw new AuthorizationError(
        'Access denied: you can only access your own resources',
        'RESOURCE_ACCESS_DENIED'
      );
    } catch (error) {
      if (error instanceof AuthorizationError) {
        res.status(403).json({
          success: false,
          error: error.message,
          code: error.code,
        });
      } else {
        logger.error('Resource owner authorization middleware error:', error);
        res.status(500).json({
          success: false,
          error: 'Resource owner authorization error',
          code: 'INTERNAL_AUTH_ERROR',
        });
      }
    }
  };
};

// Custom authorization middleware for complex scenarios
export const customAuthorize = (
  checkFunction: (user: any, req: AuthenticatedRequest) => boolean | Promise<boolean>
) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        throw new AuthorizationError('User not authenticated', 'NOT_AUTHENTICATED');
      }

      const isAuthorized = await checkFunction(req.user, req);

      if (!isAuthorized) {
        throw new AuthorizationError(
          'Access denied: custom authorization check failed',
          'CUSTOM_AUTHORIZATION_FAILED'
        );
      }

      next();
    } catch (error) {
      if (error instanceof AuthorizationError) {
        res.status(403).json({
          success: false,
          error: error.message,
          code: error.code,
        });
      } else {
        logger.error('Custom authorization middleware error:', error);
        res.status(500).json({
          success: false,
          error: 'Custom authorization error',
          code: 'INTERNAL_AUTH_ERROR',
        });
      }
    }
  };
};

// Utility function to check if user can perform action on resource
export const canPerformAction = (
  userRole: UserRole,
  action: string,
  resourceType: string
): boolean => {
  const permissions: Record<string, Record<UserRole, string[]>> = {
    user: {
      [UserRole.ADMIN]: ['create', 'read', 'update', 'delete'],
      [UserRole.MANAGER]: ['read', 'update'],
      [UserRole.EMPLOYEE]: ['read'],
    },
    leave: {
      [UserRole.ADMIN]: ['read', 'approve', 'reject', 'delete'],
      [UserRole.MANAGER]: ['read', 'approve', 'reject'],
      [UserRole.EMPLOYEE]: ['create', 'read', 'update', 'delete'],
    },
    document: {
      [UserRole.ADMIN]: ['create', 'read', 'update', 'delete'],
      [UserRole.MANAGER]: ['create', 'read', 'update', 'delete'],
      [UserRole.EMPLOYEE]: ['create', 'read', 'update', 'delete'],
    },
    notification: {
      [UserRole.ADMIN]: ['create', 'read', 'update', 'delete'],
      [UserRole.MANAGER]: ['create', 'read'],
      [UserRole.EMPLOYEE]: ['read'],
    },
  };

  const resourcePermissions = permissions[resourceType];
  if (!resourcePermissions) {
    return false;
  }

  const rolePermissions = resourcePermissions[userRole];
  return rolePermissions.includes(action);
};

export {
  UserRole,
};
export default authorize;