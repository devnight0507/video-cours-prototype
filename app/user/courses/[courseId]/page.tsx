'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/mock/auth-context';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardBody } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import VideoPlayer from '@/components/course/VideoPlayer';
import { mockCourses, mockEnrollments } from '@/lib/mock/data';
import { formatDuration } from '@/lib/utils';
import { PlayCircle, CheckCircle, Lock, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const courseId = params.courseId as string;

  const course = mockCourses.find(c => c.id === courseId);
  const enrollment = mockEnrollments.find(
    e => e.userId === user?.id && e.courseId === courseId
  );

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoProgress, setVideoProgress] = useState(
    enrollment?.progress || []
  );

  if (!course) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900">Course not found</h2>
        <Link href="/user">
          <Button className="mt-4">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  if (!user?.paid) {
    return (
      <div className="text-center py-16">
        <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Payment Required</h2>
        <p className="text-gray-600 mt-2">Please complete payment to access this course</p>
        <Link href="/user/payment">
          <Button className="mt-4">Complete Payment</Button>
        </Link>
      </div>
    );
  }

  const currentVideo = course.videos[currentVideoIndex];

  const handleVideoProgress = (seconds: number) => {
    setVideoProgress(prev => {
      const existing = prev.find(p => p.videoId === currentVideo.id);
      if (existing) {
        return prev.map(p =>
          p.videoId === currentVideo.id
            ? { ...p, watchedSeconds: seconds }
            : p
        );
      }
      return [...prev, { videoId: currentVideo.id, watchedSeconds: seconds, completed: false }];
    });
  };

  const handleVideoComplete = () => {
    setVideoProgress(prev => {
      const existing = prev.find(p => p.videoId === currentVideo.id);
      if (existing) {
        return prev.map(p =>
          p.videoId === currentVideo.id
            ? { ...p, watchedSeconds: currentVideo.duration, completed: true }
            : p
        );
      }
      return [...prev, {
        videoId: currentVideo.id,
        watchedSeconds: currentVideo.duration,
        completed: true
      }];
    });

    // Auto-play next video
    if (currentVideoIndex < course.videos.length - 1) {
      setTimeout(() => {
        setCurrentVideoIndex(currentVideoIndex + 1);
      }, 2000);
    }
  };

  const isVideoCompleted = (videoId: string) => {
    return videoProgress.find(p => p.videoId === videoId)?.completed || false;
  };

  const courseProgress = Math.round(
    (videoProgress.filter(p => p.completed).length / course.videos.length) * 100
  );

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/user">
        <Button variant="ghost" className="flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" />
          Back to Courses
        </Button>
      </Link>

      {/* Course Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
        <p className="text-gray-600 mt-2">{course.description}</p>
        <div className="flex items-center gap-4 mt-4">
          <Badge variant="info">{course.videos.length} videos</Badge>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Progress:</span>
            <span className="font-semibold text-primary-600">{courseProgress}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardBody className="p-0">
              <VideoPlayer
                videoUrl={currentVideo.muxPlaybackId}
                thumbnailUrl={currentVideo.thumbnailUrl}
                onProgress={handleVideoProgress}
                onComplete={handleVideoComplete}
              />
            </CardBody>
          </Card>

          {/* Current Video Info */}
          <Card>
            <CardBody>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {currentVideo.title}
                  </h2>
                  <p className="text-gray-600 mt-2">{currentVideo.description}</p>
                </div>
                <Badge variant={isVideoCompleted(currentVideo.id) ? 'success' : 'default'}>
                  {isVideoCompleted(currentVideo.id) ? (
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Completed
                    </span>
                  ) : (
                    'In Progress'
                  )}
                </Badge>
              </div>

              <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                <span>Duration: {formatDuration(currentVideo.duration)}</span>
                <span>•</span>
                <span>Video {currentVideoIndex + 1} of {course.videos.length}</span>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  disabled={currentVideoIndex === 0}
                  onClick={() => setCurrentVideoIndex(currentVideoIndex - 1)}
                  className="flex-1"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button
                  disabled={currentVideoIndex === course.videos.length - 1}
                  onClick={() => setCurrentVideoIndex(currentVideoIndex + 1)}
                  className="flex-1"
                >
                  Next
                  <ChevronLeft className="w-4 h-4 ml-2 rotate-180" />
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Playlist */}
        <div>
          <Card>
            <CardBody>
              <h3 className="font-semibold text-gray-900 mb-4">Course Content</h3>
              <div className="space-y-2">
                {course.videos.map((video, index) => {
                  const isCompleted = isVideoCompleted(video.id);
                  const isCurrent = index === currentVideoIndex;

                  return (
                    <motion.button
                      key={video.id}
                      onClick={() => setCurrentVideoIndex(index)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        isCurrent
                          ? 'bg-primary-50 border-2 border-primary-600'
                          : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : isCurrent ? (
                            <PlayCircle className="w-5 h-5 text-primary-600" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${
                            isCurrent ? 'text-primary-900' : 'text-gray-900'
                          }`}>
                            {video.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDuration(video.duration)}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Overall Progress */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Overall Progress</span>
                  <span className="font-semibold text-primary-600">{courseProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${courseProgress}%` }}
                    className="bg-primary-600 h-2 rounded-full"
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
