import winston from 'winston';
import path from 'path';

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define colors for each level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

// Add colors to winston
winston.addColors(colors);

// Define format for logs
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}${
      info.stack ? '\n' + info.stack : ''
    }${info.splat !== undefined ? ' ' + info.splat : ''}`
  )
);

// Define which transports the logger must use
const transports = [
  // Console transport
  new winston.transports.Console({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }),
];

// Add file transports only in production or if LOG_FILE is set
if (process.env.NODE_ENV === 'production' || process.env.LOG_FILE) {
  const logFile = process.env.LOG_FILE || './logs/app.log';

  // Ensure log directory exists
  const logDir = path.dirname(logFile);

  transports.push(
    // File transport for all logs
    new winston.transports.File({
      filename: logFile,
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
      maxsize: parseInt(process.env.LOG_MAX_SIZE?.replace('m', '') || '20') * 1024 * 1024, // Convert MB to bytes
      maxFiles: parseInt(process.env.LOG_MAX_FILES?.replace('d', '') || '14'),
    }),

    // Separate file for error logs
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
      maxsize: 20 * 1024 * 1024, // 20MB
      maxFiles: 14,
    })
  );
}

// Create the logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
  levels,
  format,
  transports,
  exitOnError: false,
});

// Create a stream object for Morgan HTTP logging
export const morganStream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

// Helper functions for structured logging
export const logError = (error: Error, context?: string, metadata?: any) => {
  logger.error({
    message: error.message,
    stack: error.stack,
    context,
    metadata,
    timestamp: new Date().toISOString(),
  });
};

export const logInfo = (message: string, metadata?: any) => {
  logger.info({
    message,
    metadata,
    timestamp: new Date().toISOString(),
  });
};

export const logWarn = (message: string, metadata?: any) => {
  logger.warn({
    message,
    metadata,
    timestamp: new Date().toISOString(),
  });
};

export const logDebug = (message: string, metadata?: any) => {
  logger.debug({
    message,
    metadata,
    timestamp: new Date().toISOString(),
  });
};

export const logHttp = (message: string, metadata?: any) => {
  logger.http({
    message,
    metadata,
    timestamp: new Date().toISOString(),
  });
};

// Security logging
export const logSecurityEvent = (event: string, userId?: string, ipAddress?: string, metadata?: any) => {
  logger.warn({
    message: `Security Event: ${event}`,
    securityEvent: true,
    userId,
    ipAddress,
    metadata,
    timestamp: new Date().toISOString(),
  });
};

// Audit logging
export const logAuditEvent = (
  action: string,
  resource: string,
  userId?: string,
  metadata?: any
) => {
  logger.info({
    message: `Audit: ${action} on ${resource}`,
    auditEvent: true,
    action,
    resource,
    userId,
    metadata,
    timestamp: new Date().toISOString(),
  });
};

// Performance logging
export const logPerformance = (operation: string, duration: number, metadata?: any) => {
  logger.info({
    message: `Performance: ${operation} took ${duration}ms`,
    performance: true,
    operation,
    duration,
    metadata,
    timestamp: new Date().toISOString(),
  });
};

// Request logging middleware helper
export const createRequestLogger = () => {
  return (req: any, res: any, next: any) => {
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      const logData = {
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        userAgent: req.get('User-Agent'),
        ip: req.ip || req.connection.remoteAddress,
        userId: req.user?.id,
      };

      if (res.statusCode >= 400) {
        logError(new Error(`HTTP ${res.statusCode} for ${req.method} ${req.url}`), 'HTTP_ERROR', logData);
      } else {
        logHttp(`${req.method} ${req.url} ${res.statusCode} ${logData.duration}`, logData);
      }
    });

    next();
  };
};

// Development logger for debugging
export const devLog = (message: string, data?: any) => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_MODE === 'true') {
    logger.debug(message, data);
  }
};

export { logger };
export default logger;