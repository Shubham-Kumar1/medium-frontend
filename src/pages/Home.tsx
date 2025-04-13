import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
  createdAt: string;
}

const Home = () => {
  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/blog`, {
        headers: {
          Authorization: token || ""
        },
      });
      return response.data.posts;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <div className="posts-container">
      {posts?.map((post: Post) => (
        <div key={post.id} className="post-card">
          <h2>{post.title}</h2>
          <p className="post-meta">
            By {post.author.name} • {format(new Date(post.createdAt), 'MMM d, yyyy')}
          </p>
          <p className="post-content">{post.content}</p>
          <Link to={`/post/${post.id}`} className="read-more">
            Read more
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home; 