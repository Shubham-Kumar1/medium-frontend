import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    image: string;
  };
  createdAt: string;
  likes: { id: string }[];
  comments: {
    id: string;
    content: string;
    user: {
      name: string;
      image: string;
    };
    createdAt: string;
  }[];
}

const Post = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const token = localStorage.getItem('token');

  const { data: post, isLoading, error } = useQuery<Post>({
    queryKey: ['post', id],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: token || ""
        },
      });
      return response.data;
    },
  });

  const { mutate: likePost } = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/blog/${id}/like`,
        {},
        {
          headers: {
            Authorization: token || ""
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', id] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to like post');
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading post</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <article className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{post?.title}</h1>
        <div className="flex items-center mb-6">
          <img
            src={post?.author.image || '/default-avatar.png'}
            alt={post?.author.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-medium">{post?.author.name}</p>
            <p className="text-gray-500 text-sm">
              {format(new Date(post?.createdAt || ''), 'MMM d, yyyy')}
            </p>
          </div>
        </div>
        <div className="prose max-w-none mb-6">{post?.content}</div>
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => likePost()}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-500"
          >
            <span>❤️</span>
            <span>{post?.likes.length} likes</span>
          </button>
        </div>
        <div className="border-t pt-6">
          <h2 className="text-xl font-bold mb-4">Comments</h2>
          {post?.comments.map((comment) => (
            <div key={comment.id} className="mb-4">
              <div className="flex items-center mb-2">
                <img
                  src={comment.user.image || '/default-avatar.png'}
                  alt={comment.user.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                  <p className="font-medium">{comment.user.name}</p>
                  <p className="text-gray-500 text-sm">
                    {format(new Date(comment.createdAt), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
};

export default Post; 