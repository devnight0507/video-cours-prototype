'use client';

import { useState } from 'react';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { mockCourses } from '@/lib/mock/data';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Plus, Edit, Trash2, Eye, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function CoursesPage() {
  const [courses, setCourses] = useState(mockCourses);

  const handleTogglePublish = (courseId: string) => {
    setCourses(prev =>
      prev.map(c =>
        c.id === courseId ? { ...c, published: !c.published } : c
      )
    );
  };

  const handleDeleteCourse = (courseId: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      setCourses(prev => prev.filter(c => c.id !== courseId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-600 mt-1">Create and manage your video courses</p>
        </div>
        <Link href="/admin/courses/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Course
          </Button>
        </Link>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Course Thumbnail */}
              <div className="relative h-48 bg-gray-200">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant={course.published ? 'success' : 'warning'}>
                    {course.published ? 'Published' : 'Draft'}
                  </Badge>
                </div>
              </div>

              <CardBody>
                <div className="space-y-4">
                  {/* Course Info */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                    <p className="text-gray-600 mt-2 line-clamp-2">{course.description}</p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <PlayCircle className="w-4 h-4" />
                      <span>{course.videos.length} videos</span>
                    </div>
                    <div>
                      <span className="font-semibold text-primary-600">
                        {formatCurrency(course.price)}
                      </span>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="text-xs text-gray-500">
                    Updated {formatDate(course.updatedAt)}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 flex items-center justify-center gap-1"
                      onClick={() => handleTogglePublish(course.id)}
                    >
                      <Eye className="w-3 h-3" />
                      {course.published ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Link href={`/admin/courses/${course.id}/edit`} className="flex-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full flex items-center justify-center gap-1"
                      >
                        <Edit className="w-3 h-3" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDeleteCourse(course.id)}
                      className="flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {courses.length === 0 && (
        <Card>
          <CardBody className="py-16">
            <div className="text-center">
              <PlayCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No courses yet</h3>
              <p className="text-gray-600 mt-2">Create your first course to get started</p>
              <Link href="/admin/courses/new">
                <Button className="mt-4">Create Course</Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
