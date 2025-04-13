# Medium Clone Frontend

A modern frontend for a Medium clone built with React, TypeScript, and Vite.

## Features

- User authentication (signup, login, logout)
- Create, read, update, and delete blog posts
- Like posts
- Comment on posts
- User profiles
- Private posts
- Responsive design

## Tech Stack

- React
- TypeScript
- Vite
- React Query
- React Router
- Tailwind CSS
- Axios
- React Hot Toast

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd medium-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
VITE_API_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
  ├── components/     # Reusable components
  ├── pages/         # Page components
  ├── App.tsx        # Main application component
  ├── main.tsx       # Application entry point
  └── index.css      # Global styles
```

## API Endpoints

The frontend communicates with the following API endpoints:

- Authentication:
  - POST `/api/v1/user/signup` - User registration
  - POST `/api/v1/user/signin` - User login
  - GET `/api/v1/user/me` - Get current user

- Blog:
  - GET `/api/v1/blog/posts` - Get all posts
  - GET `/api/v1/blog/posts/:id` - Get a single post
  - POST `/api/v1/blog/posts` - Create a new post
  - PUT `/api/v1/blog/posts/:id` - Update a post
  - POST `/api/v1/blog/posts/:id/like` - Like/unlike a post
  - POST `/api/v1/blog/posts/:id/comment` - Add a comment

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
