import { Link, useLocation } from 'react-router-dom';

// Navigation component
export default function Navigation() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="fixed top-16 w-full z-40 backdrop-blur-md glass border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-8 overflow-x-auto">
          <Link 
            to="/" 
            className={`py-4 px-2 text-sm font-medium transition-all ${
              isActive('/') 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-primary/60 border-b-2 border-transparent hover:text-primary'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className={`py-4 px-2 text-sm font-medium transition-all ${
              isActive('/dashboard') 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-primary/60 border-b-2 border-transparent hover:text-primary'
            }`}
          >
            Dashboard
          </Link>
          <Link 
            to="/xai" 
            className={`py-4 px-2 text-sm font-medium transition-all ${
              isActive('/xai') 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-primary/60 border-b-2 border-transparent hover:text-primary'
            }`}
          >
            AI Insights
          </Link>
          <Link 
            to="/calendar" 
            className={`py-4 px-2 text-sm font-medium transition-all ${
              isActive('/calendar') 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-primary/60 border-b-2 border-transparent hover:text-primary'
            }`}
          >
            Calendar
          </Link>
        </div>
      </div>
    </nav>
  );
}
