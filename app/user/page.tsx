'use client';

import { useAuth } from '@/lib/mock/auth-context';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { mockCourses, mockEnrollments } from '@/lib/mock/data';
import { formatCurrency, calculateProgress } from '@/lib/utils';
import { BookOpen, Lock, PlayCircle, Clock, CheckCircle, CreditCard, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function UserDashboard() {
  const { user } = useAuth();

  if (!user) return null;

  const userEnrollments = mockEnrollments.filter(e => e.userId === user.id);
  const enrolledCourseIds = userEnrollments.map(e => e.courseId);
  const enrolledCourses = mockCourses.filter(c => enrolledCourseIds.includes(c.id));
  const availableCourses = mockCourses.filter(
    c => c.published && !enrolledCourseIds.includes(c.id)
  );

  const getEnrollmentProgress = (courseId: string) => {
    const enrollment = userEnrollments.find(e => e.courseId === courseId);
    if (!enrollment) return 0;

    const course = mockCourses.find(c => c.id === courseId);
    if (!course) return 0;

    const totalVideos = course.videos.length;
    const completedVideos = enrollment.progress.filter(p => p.completed).length;

    return calculateProgress(completedVideos, totalVideos);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
        <p className="text-gray-600 mt-1">Continue learning or explore new courses</p>
      </div>

      {/* Payment Status Banner */}
      {!user.paid && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-yellow-50 border-yellow-200">
            <CardBody>
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-yellow-900">Payment Pending</h3>
                  <p className="text-sm text-yellow-800 mt-1">
                    Your payment is pending approval. You'll get access to all courses once your payment is confirmed.
                  </p>
                  <Link href="/user/payment">
                    <Button size="sm" className="mt-3 flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Complete Payment
                    </Button>
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      )}

      {/* My Courses */}
      {user.paid && enrolledCourses.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">My Courses</h2>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {enrolledCourses.map((course) => {
              const progress = getEnrollmentProgress(course.id);
              return (
                <motion.div key={course.id} variants={item}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                    <div className="relative h-48">
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Link href={`/user/courses/${course.id}`}>
                          <Button className="flex items-center gap-2">
                            <PlayCircle className="w-5 h-5" />
                            Continue Learning
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <CardBody>
                      <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                        {course.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium text-primary-600">{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="bg-primary-600 h-2 rounded-full"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <PlayCircle className="w-4 h-4" />
                          <span>{course.videos.length} videos</span>
                        </div>
                        {progress === 100 && (
                          <Badge variant="success" className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Completed
                          </Badge>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      )}

      {/* Available Courses */}
      {availableCourses.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {user.paid ? 'More Courses' : 'Available Courses'}
          </h2>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {availableCourses.map((course) => (
              <motion.div key={course.id} variants={item}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <div className="relative h-48">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                    {!user.paid && (
                      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Lock className="w-12 h-12 mx-auto mb-2" />
                          <p className="text-sm font-medium">Payment Required</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <CardBody>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 flex-1">{course.title}</h3>
                      <span className="text-lg font-bold text-primary-600 ml-2">
                        {formatCurrency(course.price)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <PlayCircle className="w-4 h-4" />
                        <span>{course.videos.length} videos</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          {Math.floor(course.videos.reduce((sum, v) => sum + v.duration, 0) / 60)} min
                        </span>
                      </div>
                    </div>

                    {user.paid && (
                      <Link href={`/user/courses/${course.id}`}>
                        <Button className="w-full mt-4 flex items-center justify-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Start Course
                        </Button>
                      </Link>
                    )}
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Empty State */}
      {user.paid && enrolledCourses.length === 0 && availableCourses.length === 0 && (
        <Card>
          <CardBody className="py-16">
            <div className="text-center">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No courses available</h3>
              <p className="text-gray-600 mt-2">Check back soon for new courses!</p>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
