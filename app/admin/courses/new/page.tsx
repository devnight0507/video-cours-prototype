'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ArrowLeft, Plus, X } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NewCoursePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    thumbnail: '',
  });

  const [videos, setVideos] = useState([
    { title: '', description: '', muxPlaybackId: '' },
  ]);

  const addVideo = () => {
    setVideos([...videos, { title: '', description: '', muxPlaybackId: '' }]);
  };

  const removeVideo = (index: number) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Course created successfully! (Mock action)');
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
          <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
          <p className="text-gray-600 mt-1">Add course details and videos</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Course Information</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input
              label="Course Title"
              placeholder="e.g., Complete Next.js Masterclass"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                rows={4}
                placeholder="Describe your course..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Price (USD)"
                type="number"
                step="0.01"
                placeholder="99.99"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />

              <Input
                label="Thumbnail URL"
                placeholder="https://example.com/image.jpg"
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                required
              />
            </div>
          </CardBody>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Course Videos</h2>
              <Button type="button" variant="outline" size="sm" onClick={addVideo}>
                <Plus className="w-4 h-4 mr-2" />
                Add Video
              </Button>
            </div>
          </CardHeader>
          <CardBody className="space-y-6">
            {videos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border border-gray-200 rounded-lg space-y-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">Video {index + 1}</h3>
                  {videos.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeVideo(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <Input
                  label="Video Title"
                  placeholder="e.g., Introduction to Next.js"
                  value={video.title}
                  onChange={(e) => {
                    const newVideos = [...videos];
                    newVideos[index].title = e.target.value;
                    setVideos(newVideos);
                  }}
                  required
                />

                <Input
                  label="Video Description"
                  placeholder="Brief description of the video"
                  value={video.description}
                  onChange={(e) => {
                    const newVideos = [...videos];
                    newVideos[index].description = e.target.value;
                    setVideos(newVideos);
                  }}
                  required
                />

                <Input
                  label="Mux Playback ID"
                  placeholder="abc123def456"
                  value={video.muxPlaybackId}
                  onChange={(e) => {
                    const newVideos = [...videos];
                    newVideos[index].muxPlaybackId = e.target.value;
                    setVideos(newVideos);
                  }}
                  required
                />
              </motion.div>
            ))}
          </CardBody>
        </Card>

        <div className="flex items-center gap-4 mt-6">
          <Button type="submit" className="flex-1">
            Create Course
          </Button>
          <Link href="/admin/courses" className="flex-1">
            <Button type="button" variant="outline" className="w-full">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
