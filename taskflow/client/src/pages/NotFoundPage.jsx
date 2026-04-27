import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-black">404</h1>
        <p className="mb-4">Page not found</p>
        <Link to="/" className="text-brand">Go Home</Link>
      </div>
    </div>
  );
}
