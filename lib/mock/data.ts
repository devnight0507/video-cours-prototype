import { User, Course, Video, Enrollment, Payment, Notification } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    paid: true,
    paymentStatus: 'paid',
    createdAt: '2024-01-15T10:00:00Z',
    paidAt: '2024-01-15T10:05:00Z',
  },
  {
    id: 'user-2',
    email: 'john@example.com',
    name: 'John Doe',
    role: 'user',
    paid: true,
    paymentStatus: 'paid',
    createdAt: '2024-02-01T14:30:00Z',
    paidAt: '2024-02-01T14:35:00Z',
    stripeSessionId: 'cs_test_123456',
  },
  {
    id: 'user-3',
    email: 'jane@example.com',
    name: 'Jane Smith',
    role: 'user',
    paid: true,
    paymentStatus: 'manual',
    createdAt: '2024-02-10T09:15:00Z',
    paidAt: '2024-02-11T16:20:00Z',
  },
  {
    id: 'user-4',
    email: 'bob@example.com',
    name: 'Bob Johnson',
    role: 'user',
    paid: false,
    paymentStatus: 'pending',
    createdAt: '2024-03-05T11:45:00Z',
  },
  {
    id: 'user-5',
    email: 'alice@example.com',
    name: 'Alice Williams',
    role: 'user',
    paid: false,
    paymentStatus: 'pending',
    createdAt: '2024-03-08T08:20:00Z',
  },
];

// Mock Videos
export const mockVideos: Video[] = [
  {
    id: 'video-1',
    courseId: 'course-1',
    title: 'Introduction to Next.js',
    description: 'Learn the basics of Next.js framework',
    duration: 1200, // 20 minutes
    order: 1,
    muxPlaybackId: 'mock-playback-id-1',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
  },
  {
    id: 'video-2',
    courseId: 'course-1',
    title: 'App Router Deep Dive',
    description: 'Understanding the new App Router in Next.js 14',
    duration: 1800, // 30 minutes
    order: 2,
    muxPlaybackId: 'mock-playback-id-2',
    thumbnailUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=450&fit=crop',
  },
  {
    id: 'video-3',
    courseId: 'course-1',
    title: 'Server Components',
    description: 'Working with React Server Components',
    duration: 2100, // 35 minutes
    order: 3,
    muxPlaybackId: 'mock-playback-id-3',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop',
  },
  {
    id: 'video-4',
    courseId: 'course-1',
    title: 'Data Fetching Strategies',
    description: 'Learn different approaches to fetch data in Next.js',
    duration: 1500, // 25 minutes
    order: 4,
    muxPlaybackId: 'mock-playback-id-4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop',
  },
  {
    id: 'video-5',
    courseId: 'course-2',
    title: 'Firebase Authentication Setup',
    description: 'Setting up Firebase Auth in your application',
    duration: 1350, // 22.5 minutes
    order: 1,
    muxPlaybackId: 'mock-playback-id-5',
    thumbnailUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=450&fit=crop',
  },
  {
    id: 'video-6',
    courseId: 'course-2',
    title: 'Firestore Database Design',
    description: 'Best practices for structuring your Firestore database',
    duration: 2400, // 40 minutes
    order: 2,
    muxPlaybackId: 'mock-playback-id-6',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=450&fit=crop',
  },
  {
    id: 'video-7',
    courseId: 'course-2',
    title: 'Security Rules',
    description: 'Implementing secure Firestore security rules',
    duration: 1650, // 27.5 minutes
    order: 3,
    muxPlaybackId: 'mock-playback-id-7',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=450&fit=crop',
  },
  {
    id: 'video-8',
    courseId: 'course-3',
    title: 'Stripe Integration Basics',
    description: 'Getting started with Stripe payments',
    duration: 1440, // 24 minutes
    order: 1,
    muxPlaybackId: 'mock-playback-id-8',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop',
  },
  {
    id: 'video-9',
    courseId: 'course-3',
    title: 'Checkout Sessions',
    description: 'Creating and managing Stripe Checkout sessions',
    duration: 1920, // 32 minutes
    order: 2,
    muxPlaybackId: 'mock-playback-id-9',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=450&fit=crop',
  },
];

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Complete Next.js 14 Masterclass',
    description: 'Master Next.js 14 with App Router, Server Components, and modern best practices. Build production-ready applications from scratch.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=630&fit=crop',
    published: true,
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-02-15T10:30:00Z',
    price: 99.99,
    videos: mockVideos.filter(v => v.courseId === 'course-1'),
  },
  {
    id: 'course-2',
    title: 'Firebase for Modern Web Apps',
    description: 'Learn Firebase Authentication, Firestore, Storage, and Cloud Functions. Build real-time applications with ease.',
    thumbnail: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&h=630&fit=crop',
    published: true,
    createdAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-02-20T14:00:00Z',
    price: 79.99,
    videos: mockVideos.filter(v => v.courseId === 'course-2'),
  },
  {
    id: 'course-3',
    title: 'Stripe Payment Integration',
    description: 'Complete guide to integrating Stripe payments in your SaaS applications. Handle subscriptions, webhooks, and more.',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=630&fit=crop',
    published: true,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-25T16:00:00Z',
    price: 89.99,
    videos: mockVideos.filter(v => v.courseId === 'course-3'),
  },
  {
    id: 'course-4',
    title: 'Advanced TypeScript Patterns',
    description: 'Deep dive into advanced TypeScript patterns and techniques for enterprise applications.',
    thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1200&h=630&fit=crop',
    published: false, // Draft course
    createdAt: '2024-03-01T12:00:00Z',
    updatedAt: '2024-03-05T09:00:00Z',
    price: 119.99,
    videos: [],
  },
];

// Mock Enrollments
export const mockEnrollments: Enrollment[] = [
  {
    id: 'enroll-1',
    userId: 'user-2',
    courseId: 'course-1',
    enrolledAt: '2024-02-01T14:40:00Z',
    progress: [
      { videoId: 'video-1', watchedSeconds: 1200, completed: true },
      { videoId: 'video-2', watchedSeconds: 900, completed: false },
      { videoId: 'video-3', watchedSeconds: 0, completed: false },
      { videoId: 'video-4', watchedSeconds: 0, completed: false },
    ],
  },
  {
    id: 'enroll-2',
    userId: 'user-2',
    courseId: 'course-2',
    enrolledAt: '2024-02-05T10:20:00Z',
    progress: [
      { videoId: 'video-5', watchedSeconds: 1350, completed: true },
      { videoId: 'video-6', watchedSeconds: 2400, completed: true },
      { videoId: 'video-7', watchedSeconds: 450, completed: false },
    ],
  },
  {
    id: 'enroll-3',
    userId: 'user-3',
    courseId: 'course-1',
    enrolledAt: '2024-02-11T16:30:00Z',
    progress: [
      { videoId: 'video-1', watchedSeconds: 300, completed: false },
      { videoId: 'video-2', watchedSeconds: 0, completed: false },
      { videoId: 'video-3', watchedSeconds: 0, completed: false },
      { videoId: 'video-4', watchedSeconds: 0, completed: false },
    ],
  },
];

// Mock Payments
export const mockPayments: Payment[] = [
  {
    id: 'pay-1',
    userId: 'user-2',
    amount: 99.99,
    status: 'paid',
    createdAt: '2024-02-01T14:35:00Z',
    method: 'stripe',
    stripeSessionId: 'cs_test_123456',
  },
  {
    id: 'pay-2',
    userId: 'user-3',
    amount: 99.99,
    status: 'manual',
    createdAt: '2024-02-11T16:20:00Z',
    method: 'bank_transfer',
  },
  {
    id: 'pay-3',
    userId: 'user-4',
    amount: 99.99,
    status: 'pending',
    createdAt: '2024-03-05T11:50:00Z',
    method: 'stripe',
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-2',
    type: 'payment_success',
    message: 'Your payment of $99.99 was successful!',
    read: true,
    createdAt: '2024-02-01T14:35:00Z',
  },
  {
    id: 'notif-2',
    userId: 'user-2',
    type: 'access_granted',
    message: 'You now have access to all course content.',
    read: true,
    createdAt: '2024-02-01T14:36:00Z',
  },
  {
    id: 'notif-3',
    userId: 'user-3',
    type: 'admin_approval',
    message: 'Your payment has been manually approved by admin.',
    read: false,
    createdAt: '2024-02-11T16:20:00Z',
  },
  {
    id: 'notif-4',
    userId: 'user-1',
    type: 'admin_approval',
    message: 'New user pending approval: bob@example.com',
    read: false,
    createdAt: '2024-03-05T11:50:00Z',
  },
];
