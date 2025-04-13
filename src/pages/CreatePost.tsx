import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const { mutate: createPost, isPending } = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/blog`,
        {
          title,
          content,
          isPrivate,
        },
        {
          headers: {
            Authorization: token || ""
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success('Post created successfully');
      navigate(`/post/${data.id}`);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create post');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPost();
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create a new post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="private"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <label htmlFor="private" className="ml-2 block text-sm text-gray-700">
            Make this post private
          </label>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          {isPending ? 'Creating post...' : 'Create post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost; 