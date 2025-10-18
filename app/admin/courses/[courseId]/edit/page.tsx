'use client';

import { useParams, useRouter } from 'next/navigation';
import { Card, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ArrowLeft, Edit } from 'lucide-react';
import Link from 'next/link';
import { mockCourses } from '@/lib/mock/data';

export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  const course = mockCourses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900">Course not found</h2>
        <Link href="/admin/courses">
          <Button className="mt-4">Back to Courses</Button>
        </Link>
      </div>
    );
  }

  const handleSave = () => {
    alert('Course updated successfully! (Mock action)');
    router.push('/admin/courses');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/courses">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Course</h1>
          <p className="text-gray-600 mt-1">{course.title}</p>
        </div>
      </div>

      <Card>
        <CardBody className="py-16 text-center">
          <Edit className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Edit Course Form</h3>
          <p className="text-gray-600 mt-2 max-w-md mx-auto">
            This would be a full course editing interface similar to the create page.
            For this prototype, it's a placeholder.
          </p>
          <div className="flex items-center gap-4 justify-center mt-6">
            <Button onClick={handleSave}>
              Save Changes (Mock)
            </Button>
            <Link href="/admin/courses">
              <Button variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
