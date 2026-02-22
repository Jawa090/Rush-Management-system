import expressApp from './app';
import { logger } from '@/utils/logger';
import { authService } from '@/services/authService';

// Graceful shutdown handling
const gracefulShutdown = (signal: string) => {
  logger.info(`Received ${signal}. Starting graceful shutdown...`);

  // Close the server
  server.close(() => {
    logger.info('HTTP server closed');

    // Perform cleanup operations
    Promise.all([
      // Cleanup expired tokens
      authService.cleanupExpiredTokens(),
      // Add other cleanup operations here
      new Promise<void>((resolve) => {
        // Close database connections, etc.
        setTimeout(resolve, 1000); // Give some time for cleanup
      }),
    ])
      .then(() => {
        logger.info('Cleanup completed. Shutting down.');
        process.exit(0);
      })
      .catch((error) => {
        logger.error('Error during cleanup:', error);
        process.exit(1);
      });
  });

  // Force shutdown after 30 seconds
  setTimeout(() => {
    logger.error('Forced shutdown due to timeout');
    process.exit(1);
  }, 30000);
};

// Initialize and start the server
const startServer = async () => {
  try {
    // Initialize the Express app (connect to database, Redis, etc.)
    await expressApp.initialize();

    // Start the server
    const server = expressApp.getApp().listen(process.env.PORT || 3001);

    // Store server reference for graceful shutdown
    (global as any).server = server;

    // Setup graceful shutdown handlers
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Schedule periodic cleanup tasks
    setInterval(async () => {
      try {
        await authService.cleanupExpiredTokens();
      } catch (error) {
        logger.error('Failed to cleanup expired tokens:', error);
      }
    }, 60 * 60 * 1000); // Run every hour

    logger.info('Server startup completed successfully');
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // In production, you might want to gracefully shutdown
  if (process.env.NODE_ENV === 'production') {
    gracefulShutdown('unhandledRejection');
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception:', error);
  // In production, you might want to gracefully shutdown
  if (process.env.NODE_ENV === 'production') {
    gracefulShutdown('uncaughtException');
  }
});

export default startServer;