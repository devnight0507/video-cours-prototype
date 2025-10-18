export type UserRole = 'admin' | 'user';

export type PaymentStatus = 'pending' | 'paid' | 'manual' | 'failed';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  paid: boolean;
  paymentStatus: PaymentStatus;
  createdAt: string;
  paidAt?: string;
  stripeSessionId?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  videos: Video[];
  price: number;
}

export interface Video {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: number; // in seconds
  order: number;
  muxPlaybackId: string;
  thumbnailUrl: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  progress: {
    videoId: string;
    watchedSeconds: number;
    completed: boolean;
  }[];
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  status: PaymentStatus;
  createdAt: string;
  method: 'stripe' | 'bank_transfer' | 'manual';
  stripeSessionId?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'payment_success' | 'access_granted' | 'course_enrolled' | 'admin_approval';
  message: string;
  read: boolean;
  createdAt: string;
}
