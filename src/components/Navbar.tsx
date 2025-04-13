import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const Navbar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    queryClient.clear();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Medium
          </Link>
          
          <div className="flex items-center space-x-4">
            {token ? (
              <>
                <Link to="/create" className="text-gray-600 hover:text-gray-800">
                  Write
                </Link>
                <Link to="/profile" className="text-gray-600 hover:text-gray-800">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-800">
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 