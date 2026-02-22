import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { config } from 'dotenv';
import path from 'path';

// Import middleware
import { errorHandler, notFoundHandler, setupUnhandledRejectionHandler } from '@/middleware/errorHandler';
import { validationErrorHandler } from '@/middleware/validation';

// Import routes
import authRoutes from '@/routes/auth';

// Import utilities
import { logger, morganStream } from '@/utils/logger';
import { connectDatabase } from '@/config/database';
import { connectRedis } from '@/config/redis';

// Load environment variables
config();

class ExpressApp {
  public app: express.Application;
  private port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;

    // Setup unhandled rejection handlers
    setupUnhandledRejectionHandler();

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    // Security middleware
    this.app.use(helmet({
      crossOriginEmbedderPolicy: false, // Required for some file uploads
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
    }));

    // CORS configuration
    this.app.use(cors({
      origin: (origin, callback) => {
        const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173'];

        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Request-ID'],
      exposedHeaders: ['X-Request-ID'],
    }));

    // Compression middleware
    this.app.use(compression({
      level: 6,
      threshold: 1024,
    }));

    // Body parsing middleware
    this.app.use(express.json({
      limit: '10mb',
      verify: (req, res, buf) => {
        // Verify JSON body
        try {
          JSON.parse(buf.toString());
        } catch (e) {
          res.status(400).json({
            success: false,
            error: 'Invalid JSON',
            code: 'INVALID_JSON',
          });
          return;
        }
      },
    }));

    this.app.use(express.urlencoded({
      extended: true,
      limit: '10mb',
      parameterLimit: 1000,
    }));

    // Request logging
    this.app.use(morgan('combined', { stream: morganStream }));

    // Request ID middleware
    this.app.use((req, res, next) => {
      const requestId = req.headers['x-request-id'] as string ||
                       Math.random().toString(36).substring(2, 15);
      req.headers['x-request-id'] = requestId;
      res.setHeader('X-Request-ID', requestId);
      next();
    });

    // Rate limiting
    const limiter = rateLimit({
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
      max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
      message: {
        success: false,
        error: 'Too many requests from this IP, please try again later.',
        code: 'RATE_LIMIT_EXCEEDED',
      },
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
      skip: (req) => {
        // Skip rate limiting for health checks
        return req.path === '/api/health' || req.path === '/api/health/ready';
      },
    });

    this.app.use('/api/', limiter);

    // Trust proxy for IP detection
    this.app.set('trust proxy', 1);

    // Static files for uploads
    this.app.use('/uploads', express.static(path.join(__dirname, '../uploads'), {
      maxAge: '1d', // Cache for 1 day
      etag: true,
      lastModified: true,
    }));

    // Health check endpoint (before authentication)
    this.app.get('/api/health', (req, res) => {
      res.status(200).json({
        success: true,
        message: 'Server is healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        version: process.env.npm_package_version || '1.0.0',
      });
    });

    // Ready check endpoint
    this.app.get('/api/health/ready', async (req, res) => {
      try {
        // Check database connectivity
        const isDatabaseHealthy = await this.checkDatabaseHealth();
        const isRedisHealthy = await this.checkRedisHealth();

        const isReady = isDatabaseHealthy && isRedisHealthy;

        res.status(isReady ? 200 : 503).json({
          success: isReady,
          message: isReady ? 'Server is ready' : 'Server is not ready',
          timestamp: new Date().toISOString(),
          checks: {
            database: isDatabaseHealthy,
            redis: isRedisHealthy,
          },
        });
      } catch (error) {
        logger.error('Health check failed:', error);
        res.status(503).json({
          success: false,
          message: 'Health check failed',
          timestamp: new Date().toISOString(),
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    });
  }

  private initializeRoutes(): void {
    // API routes
    this.app.use('/api/auth', authRoutes);

    // API documentation placeholder
    this.app.get('/api', (req, res) => {
      res.json({
        success: true,
        message: 'Rush Management System API',
        version: '1.0.0',
        endpoints: {
          auth: '/api/auth',
          health: '/api/health',
          docs: '/api/docs', // Placeholder for future API documentation
        },
        documentation: 'https://api.rushmanagement.com/docs',
      });
    });

    // Root endpoint
    this.app.get('/', (req, res) => {
      res.json({
        success: true,
        message: 'Rush Management System Backend API',
        status: 'running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
      });
    });
  }

  private initializeErrorHandling(): void {
    // Validation error handler (must be before global error handler)
    this.app.use(validationErrorHandler);

    // 404 handler
    this.app.use(notFoundHandler);

    // Global error handler
    this.app.use(errorHandler);
  }

  private async checkDatabaseHealth(): Promise<boolean> {
    try {
      const { checkDatabaseHealth } = await import('@/config/database');
      return await checkDatabaseHealth();
    } catch (error) {
      logger.error('Database health check failed:', error);
      return false;
    }
  }

  private async checkRedisHealth(): Promise<boolean> {
    try {
      const { checkRedisHealth } = await import('@/config/redis');
      return await checkRedisHealth();
    } catch (error) {
      logger.error('Redis health check failed:', error);
      return false;
    }
  }

  public async initialize(): Promise<void> {
    try {
      // Connect to database
      await connectDatabase();

      // Connect to Redis
      await connectRedis();

      logger.info('Express application initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize Express application:', error);
      throw error;
    }
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      logger.info(`Server is running on port ${this.port} in ${process.env.NODE_ENV || 'development'} mode`);
      logger.info(`Health check available at http://localhost:${this.port}/api/health`);
      logger.info(`API endpoints available at http://localhost:${this.port}/api`);
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
}

// Create and export app instance
const expressApp = new ExpressApp();

export default expressApp;