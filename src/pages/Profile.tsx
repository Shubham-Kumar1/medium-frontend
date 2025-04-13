import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
  image: string;
  _count: {
    posts: number;
    likes: number;
    comments: number;
  };
}

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  isPrivate: boolean;
}

const Profile = () => {
  const token = localStorage.getItem('token');

  const { data: user, isLoading: userLoading } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });

  const { data: posts, isLoading: postsLoading } = useQuery<Post[]>({
    queryKey: ['userPosts'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/blog/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.posts;
    },
  });

  if (userLoading || postsLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center space-x-4">
          <img
            src={user?.image || '/default-avatar.png'}
            alt={user?.name}
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-gray-700 mt-2">{user?.bio}</p>
          </div>
        </div>
        <div className="flex justify-between mt-6 text-gray-600">
          <div>
            <span className="font-bold">{user?._count.posts}</span> Posts
          </div>
          <div>
            <span className="font-bold">{user?._count.likes}</span> Likes
          </div>
          <div>
            <span className="font-bold">{user?._count.comments}</span> Comments
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Your Posts</h2>
      <div className="space-y-4">
        {posts?.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-gray-500 text-sm">
                  {format(new Date(post.createdAt), 'MMM d, yyyy')}
                </p>
              </div>
              {post.isPrivate && (
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
                  Private
                </span>
              )}
            </div>
            <p className="mt-2 text-gray-700 line-clamp-2">{post.content}</p>
            <Link
              to={`/post/${post.id}`}
              className="text-green-600 hover:text-green-700 mt-2 inline-block"
            >
              Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile; 