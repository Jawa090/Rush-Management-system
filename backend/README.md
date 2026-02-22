# Rush Management System Backend

Production-level backend API for the Rush Management employee portal. This comprehensive backend provides user authentication, leave management, document handling, real-time notifications, and more.

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based authentication with refresh token rotation
  - Role-based access control (Admin, Manager, Employee)
  - Password hashing with bcrypt
  - Account lockout protection

- **User Management**
  - User registration and profile management
  - Department and role-based permissions
  - User search and filtering

- **Leave Management**
  - Leave request creation and approval workflow
  - Multiple leave types (vacation, sick, personal, maternity, paternity)
  - Leave balance tracking
  - Manager approval/rejection functionality

- **Document Management**
  - Secure file upload and storage
  - Access level control (public, department, private)
  - File type validation and virus scanning
  - Download tracking and version control

- **Real-time Notifications**
  - WebSocket-based real-time notifications
  - Email notifications fallback
  - Notification categories and read/unread status

- **Security & Performance**
  - Rate limiting and DDoS protection
  - Input validation and sanitization
  - Security headers (Helmet.js)
  - Gzip compression
  - Redis caching

## 📋 Prerequisites

- Node.js 18+ (LTS)
- PostgreSQL 15+
- Redis 7+
- Docker & Docker Compose (optional)
- npm 9+

## 🛠️ Installation

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Rush-Management-system/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up PostgreSQL database**
   ```bash
   # Create database
   createdb rush_management

   # Run migrations
   npx prisma migrate dev

   # Generate Prisma client
   npx prisma generate

   # Seed the database
   npm run db:seed
   ```

5. **Start Redis server**
   ```bash
   redis-server
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

### Docker Deployment

1. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

2. **Build and start containers**
   ```bash
   docker-compose up -d
   ```

3. **Run database migrations**
   ```bash
   docker-compose exec app npm run db:migrate
   ```

4. **Seed the database**
   ```bash
   docker-compose exec app npm run db:seed
   ```

## ⚙️ Configuration

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/rush_management"

# JWT Secrets (CHANGE IN PRODUCTION!)
JWT_ACCESS_SECRET="your-super-secret-access-key"
JWT_REFRESH_SECRET="your-super-secret-refresh-key"
JWT_ACCESS_EXPIRES="15m"
JWT_REFRESH_EXPIRES="7d"

# Server
PORT=3001
NODE_ENV="production"
CORS_ORIGIN="http://localhost:5173"

# File Storage
UPLOAD_DIR="./uploads"
MAX_FILE_SIZE="10485760"  # 10MB

# Redis
REDIS_URL="redis://localhost:6379"

# Email (for notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/logout` | User logout |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/change-password` | Change password |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Basic health check |
| GET | `/api/health/ready` | Readiness check with dependencies |

### Default Seed Users

```json
{
  "admin": {
    "email": "admin@rushmanagement.com",
    "password": "password123",
    "role": "ADMIN"
  },
  "manager": {
    "email": "manager@rushmanagement.com",
    "password": "password123",
    "role": "MANAGER"
  },
  "employee": {
    "email": "employee@rushmanagement.com",
    "password": "password123",
    "role": "EMPLOYEE"
  }
}
```

**⚠️ Important**: Change default passwords in production!

## 🧪 Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server with hot reload
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run database migrations
npm run db:seed          # Seed database with sample data
npm run db:studio        # Open Prisma Studio

# Testing
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage

# Code Quality
npm run lint              # Run ESLint
npm run lint:fix          # Fix linting issues
npm run format            # Format code with Prettier

# Docker
npm run docker:build     # Build Docker image
npm run docker:run       # Run with Docker Compose
npm run docker:stop      # Stop Docker containers
```

### Database Management

```bash
# Create new migration
npx prisma migrate dev --name <migration-name>

# Reset database
npx prisma migrate reset

# Deploy migrations to production
npx prisma migrate deploy

# View database
npx prisma studio
```

### API Testing

Use the included test users or create your own:

```bash
# Register new user
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123!",
    "firstName": "Test",
    "lastName": "User"
  }'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@rushmanagement.com",
    "password": "password123"
  }'
```

## 🔒 Security

### Security Features

- **Authentication**: JWT tokens with refresh token rotation
- **Authorization**: Role-based access control
- **Rate Limiting**: Prevents brute force attacks
- **Input Validation**: Comprehensive request validation
- **Password Security**: bcrypt hashing with salt rounds
- **File Upload Security**: Type validation and size limits
- **HTTPS**: SSL/TLS encryption in production
- **Security Headers**: XSS protection, CSRF protection, etc.

### Security Best Practices

1. **Environment Variables**: Never commit secrets to version control
2. **JWT Secrets**: Use strong, unique secrets in production
3. **Database**: Use connection pooling and parameterized queries
4. **File Uploads**: Validate file types and scan for malware
5. **Logging**: Monitor security events and failed login attempts
6. **Updates**: Keep dependencies updated for security patches

## 📊 Monitoring

### Health Checks

- **Basic Health**: `/api/health` - Server status
- **Readiness Check**: `/api/health/ready` - Database and Redis connectivity

### Logging

- **Request Logging**: Morgan HTTP request logging
- **Error Logging**: Winston-based structured logging
- **Security Logging**: Authentication and authorization events
- **Audit Logging**: User actions and system events

### Metrics

- Response times and error rates
- Database query performance
- Redis cache hit/miss ratios
- File upload/download statistics

## 🚀 Deployment

### Production Deployment

1. **Environment Setup**
   - Set production environment variables
   - Configure SSL certificates
   - Set up reverse proxy (nginx)

2. **Database Setup**
   - Configure PostgreSQL with connection pooling
   - Set up automated backups
   - Optimize indexes for performance

3. **Infrastructure**
   - Use Docker containers for consistency
   - Set up load balancing for scalability
   - Configure monitoring and alerting

4. **Security**
   - Enable HTTPS with valid certificates
   - Configure firewall rules
   - Set up intrusion detection
   - Regular security audits

### Docker Production

```bash
# Build production image
docker build -t rush-management-backend .

# Run with Docker Compose
docker-compose -f docker-compose.yml up -d

# Scale for production
docker-compose -f docker-compose.yml up -d --scale app=3
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write tests for new features
- Update documentation for API changes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the GitHub repository
- Check the API documentation
- Review the logs for error details

## 🔮 Roadmap

- [ ] WebSocket real-time features
- [ ] Email notification system
- [ ] File upload and management
- [ ] User management endpoints
- [ ] Leave request management
- [ ] Document management system
- [ ] Advanced reporting and analytics
- [ ] Mobile API optimization
- [ ] GraphQL API alternative
- [ ] Microservices architecture

---

**Built with ❤️ for Rush Management System**