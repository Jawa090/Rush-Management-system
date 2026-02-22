import { PrismaClient, User, LeaveRequest, Document, Notification } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Seed data
const users: Omit<User, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    email: 'admin@rushmanagement.com',
    passwordHash: '', // Will be hashed
    firstName: 'System',
    lastName: 'Administrator',
    role: 'ADMIN',
    department: 'IT',
    position: 'System Administrator',
    avatarUrl: null,
    isActive: true,
  },
  {
    email: 'manager@rushmanagement.com',
    passwordHash: '', // Will be hashed
    firstName: 'John',
    lastName: 'Manager',
    role: 'MANAGER',
    department: 'HR',
    position: 'HR Manager',
    avatarUrl: null,
    isActive: true,
  },
  {
    email: 'employee@rushmanagement.com',
    passwordHash: '', // Will be hashed
    firstName: 'Jane',
    lastName: 'Employee',
    role: 'EMPLOYEE',
    department: 'Engineering',
    position: 'Software Developer',
    avatarUrl: null,
    isActive: true,
  },
];

const leaveRequests: Omit<LeaveRequest, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    userId: '', // Will be set after creating users
    leaveType: 'VACATION',
    startDate: new Date('2024-12-20'),
    endDate: new Date('2024-12-25'),
    reason: 'Christmas vacation with family',
    status: 'APPROVED',
    approvedBy: '', // Will be set after creating users
    approvedAt: new Date('2024-11-15'),
    rejectionReason: null,
  },
  {
    userId: '', // Will be set after creating users
    leaveType: 'SICK',
    startDate: new Date('2024-11-10'),
    endDate: new Date('2024-11-11'),
    reason: 'Flu symptoms',
    status: 'PENDING',
    approvedBy: null,
    approvedAt: null,
    rejectionReason: null,
  },
];

const documents: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    userId: '', // Will be set after creating users
    title: 'Employee Handbook 2024',
    description: 'Company policies and procedures',
    filePath: '/uploads/documents/employee-handbook-2024.pdf',
    fileSize: 2048576, // 2MB
    fileType: 'application/pdf',
    category: 'HR',
    accessLevel: 'PUBLIC',
    downloadCount: 15,
    version: 1,
    isDeleted: false,
  },
  {
    userId: '', // Will be set after creating users
    title: 'Project Timeline Q4 2024',
    description: 'Engineering project timeline and milestones',
    filePath: '/uploads/documents/project-timeline-q4.xlsx',
    fileSize: 1024000, // 1MB
    fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    category: 'Projects',
    accessLevel: 'DEPARTMENT',
    downloadCount: 8,
    version: 2,
    isDeleted: false,
  },
];

const notifications: Omit<Notification, 'id' | 'createdAt'>[] = [
  {
    userId: '', // Will be set after creating users
    title: 'Welcome to Rush Management System',
    message: 'Your account has been successfully created. Please explore the system and let us know if you have any questions.',
    type: 'INFO',
    isRead: false,
  },
  {
    userId: '', // Will be set after creating users
    title: 'Leave Request Approved',
    message: 'Your vacation leave request for December 20-25 has been approved.',
    type: 'SUCCESS',
    isRead: true,
  },
];

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

async function main() {
  console.log('Starting database seeding...');

  // Clean up existing data
  console.log('Cleaning up existing data...');
  await prisma.notification.deleteMany();
  await prisma.document.deleteMany();
  await prisma.leaveRequest.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  console.log('Creating users...');
  const createdUsers: User[] = [];

  for (const userData of users) {
    const passwordHash = await hashPassword('password123'); // Default password for seed data
    const user = await prisma.user.create({
      data: {
        ...userData,
        passwordHash,
      },
    });
    createdUsers.push(user);
    console.log(`Created user: ${user.email} (${user.role})`);
  }

  // Create leave requests
  console.log('Creating leave requests...');
  for (let i = 0; i < leaveRequests.length; i++) {
    const leaveRequest = leaveRequests[i];
    const user = createdUsers[i % createdUsers.length];
    const approver = createdUsers.find(u => u.role === 'MANAGER' || u.role === 'ADMIN');

    const createdLeaveRequest = await prisma.leaveRequest.create({
      data: {
        ...leaveRequest,
        userId: user.id,
        approvedBy: approver?.id || null,
      },
    });
    console.log(`Created leave request for ${user.email}: ${leaveRequest.leaveType}`);
  }

  // Create documents
  console.log('Creating documents...');
  for (let i = 0; i < documents.length; i++) {
    const document = documents[i];
    const user = createdUsers[i % createdUsers.length];

    const createdDocument = await prisma.document.create({
      data: {
        ...document,
        userId: user.id,
      },
    });
    console.log(`Created document: ${document.title} by ${user.email}`);
  }

  // Create notifications
  console.log('Creating notifications...');
  for (let i = 0; i < notifications.length; i++) {
    const notification = notifications[i];
    const user = createdUsers[i % createdUsers.length];

    const createdNotification = await prisma.notification.create({
      data: {
        ...notification,
        userId: user.id,
      },
    });
    console.log(`Created notification for ${user.email}: ${notification.title}`);
  }

  // Create audit logs for user creation
  console.log('Creating audit logs...');
  for (const user of createdUsers) {
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'USER_CREATED',
        resource: 'user',
        ipAddress: '127.0.0.1',
        userAgent: 'Database Seed Script',
        details: {
          email: user.email,
          role: user.role,
        },
      },
    });
  }

  console.log('Database seeding completed successfully!');
  console.log('\n=== Seed Data Summary ===');
  console.log(`Users created: ${createdUsers.length}`);
  console.log('Login credentials:');
  console.log('  Admin: admin@rushmanagement.com / password123');
  console.log('  Manager: manager@rushmanagement.com / password123');
  console.log('  Employee: employee@rushmanagement.com / password123');
  console.log('\n⚠️  IMPORTANT: Change default passwords in production!');
}

main()
  .catch((e) => {
    console.error('Database seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default main;