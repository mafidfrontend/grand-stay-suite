import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function Layout({ children, title, subtitle }: LayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getRoleColor = (role?: string) => {
    switch (role) {
      case 'director': return 'badge-primary';
      case 'admin': return 'badge-secondary';
      case 'client': return 'badge-accent';
      default: return 'badge-neutral';
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <header className="navbar bg-base-100 shadow-sm border-b">
        <div className="flex-1">
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="text-xl font-bold gradient-primary bg-clip-text text-transparent"
          >
            🏨 HotelPro
          </motion.div>
        </div>
        
        <div className="flex-none gap-2">
          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium">{user?.email}</div>
              <div className={`badge badge-sm ${getRoleColor(user?.role)}`}>
                {user?.role?.toUpperCase()}
              </div>
            </div>
            
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                  {user?.email?.[0]?.toUpperCase()}
                </div>
              </div>
              <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li><a onClick={handleLogout}>Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-base-content">{title}</h1>
            {subtitle && (
              <p className="text-base-content/70 mt-1">{subtitle}</p>
            )}
          </div>
          
          {children}
        </motion.div>
      </main>
    </div>
  );
}