'use client';

import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { mockUsers, mockCourses, mockPayments, mockEnrollments } from '@/lib/mock/data';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  UserCheck,
  UserX,
  CreditCard,
  PlayCircle,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function AdminDashboard() {
  const [localUsers, setLocalUsers] = useState(mockUsers);

  // Calculate statistics
  const totalUsers = mockUsers.length;
  const paidUsers = mockUsers.filter(u => u.paid).length;
  const pendingUsers = mockUsers.filter(u => !u.paid).length;
  const totalRevenue = mockPayments
    .filter(p => p.status === 'paid' || p.status === 'manual')
    .reduce((sum, p) => sum + p.amount, 0);
  const totalEnrollments = mockEnrollments.length;
  const publishedCourses = mockCourses.filter(c => c.published).length;

  const handleApproveUser = (userId: string) => {
    setLocalUsers(prev =>
      prev.map(u =>
        u.id === userId
          ? { ...u, paid: true, paymentStatus: 'manual' as const, paidAt: new Date().toISOString() }
          : u
      )
    );
  };

  const handleRevokeAccess = (userId: string) => {
    setLocalUsers(prev =>
      prev.map(u =>
        u.id === userId
          ? { ...u, paid: false, paymentStatus: 'pending' as const, paidAt: undefined }
          : u
      )
    );
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your courses, users, and payments</p>
        </div>
        <Link href="/admin/courses/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Course
          </Button>
        </Link>
      </div>

      {/* Statistics Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div variants={item}>
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none">
            <CardBody>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-100 text-sm">Total Users</p>
                  <p className="text-3xl font-bold mt-2">{totalUsers}</p>
                  <p className="text-blue-100 text-xs mt-1">{paidUsers} paid, {pendingUsers} pending</p>
                </div>
                <Users className="w-8 h-8 text-blue-100" />
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-none">
            <CardBody>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-green-100 text-sm">Total Revenue</p>
                  <p className="text-3xl font-bold mt-2">{formatCurrency(totalRevenue)}</p>
                  <p className="text-green-100 text-xs mt-1">From {mockPayments.length} payments</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-100" />
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-none">
            <CardBody>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-purple-100 text-sm">Active Courses</p>
                  <p className="text-3xl font-bold mt-2">{publishedCourses}</p>
                  <p className="text-purple-100 text-xs mt-1">{mockCourses.length} total courses</p>
                </div>
                <BookOpen className="w-8 h-8 text-purple-100" />
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-none">
            <CardBody>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-orange-100 text-sm">Enrollments</p>
                  <p className="text-3xl font-bold mt-2">{totalEnrollments}</p>
                  <p className="text-orange-100 text-xs mt-1">Across all courses</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-100" />
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </motion.div>

      {/* Pending Users */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
          </div>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">User</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Payment</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Joined</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {localUsers.filter(u => u.role !== 'admin').map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-semibold">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{user.email}</td>
                    <td className="py-4 px-4">
                      {user.paid ? (
                        <Badge variant="success">Active</Badge>
                      ) : (
                        <Badge variant="warning">Pending</Badge>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={
                        user.paymentStatus === 'paid' ? 'success' :
                        user.paymentStatus === 'manual' ? 'info' :
                        'warning'
                      }>
                        {user.paymentStatus}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        {!user.paid ? (
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => handleApproveUser(user.id)}
                            className="flex items-center gap-1"
                          >
                            <UserCheck className="w-3 h-3" />
                            Approve
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleRevokeAccess(user.id)}
                            className="flex items-center gap-1"
                          >
                            <UserX className="w-3 h-3" />
                            Revoke
                          </Button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* Recent Payments */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">Recent Payments</h2>
          </div>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {mockPayments.map((payment, index) => {
              const user = mockUsers.find(u => u.id === payment.userId);
              return (
                <motion.div
                  key={payment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(payment.amount)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={
                        payment.status === 'paid' ? 'success' :
                        payment.status === 'manual' ? 'info' :
                        payment.status === 'pending' ? 'warning' :
                        'danger'
                      }>
                        {payment.status}
                      </Badge>
                      <span className="text-xs text-gray-500">{payment.method}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      {/* Courses Overview */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-gray-700" />
              <h2 className="text-xl font-semibold text-gray-900">Courses</h2>
            </div>
            <Link href="/admin/courses">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockCourses.slice(0, 4).map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-8 h-8 text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{course.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{course.videos.length} videos</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={course.published ? 'success' : 'warning'}>
                      {course.published ? 'Published' : 'Draft'}
                    </Badge>
                    <span className="text-sm text-gray-600">{formatCurrency(course.price)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
