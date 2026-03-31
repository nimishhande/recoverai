import { Link, useLocation } from 'react-router-dom';
import { Activity, Brain, Calendar, Home, ArrowRight, LayoutDashboard } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  if (isLanding) return null; // Landing has its own nav

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Explainability', path: '/xai', icon: Brain },
    { name: 'Recovery Calendar', path: '/calendar', icon: Calendar },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-8 py-6">
      <nav className="max-w-7xl mx-auto glass rounded-2xl border border-white/10 px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform shadow-blue-glow">
            <Activity className="text-primary w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-heading font-bold text-white tracking-tight">RecoverAI</h1>
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-medium">Internal Agent v1.0</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                ${location.pathname === item.path 
                  ? 'bg-primary/10 text-primary shadow-blue-glow border border-primary/20' 
                  : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </div>

        <button className="hidden lg:flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest hover:text-white transition-colors">
          Support Agent Active
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-blue-glow" />
        </button>
      </nav>
    </header>
  );
}
