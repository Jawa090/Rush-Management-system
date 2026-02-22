# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Install system dependencies
RUN apk add --no-cache \
    dumb-init \
    curl

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S rush -u 1001

# Set working directory
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder --chown=rush:nodejs /app/dist ./dist
COPY --from=builder --chown=rush:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=rush:nodejs /app/package*.json ./
COPY --from=builder --chown=rush:nodejs /app/prisma ./prisma

# Create necessary directories
RUN mkdir -p /app/uploads/documents /app/uploads/avatars /app/uploads/temp /app/logs && \
    chown -R rush:nodejs /app/uploads /app/logs

# Switch to non-root user
USER rush

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3001/api/health || exit 1

# Start the application with dumb-init
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/server.js"]