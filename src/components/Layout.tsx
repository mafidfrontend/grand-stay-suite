import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { LayoutProps } from '@/types';

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
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      {/* Header */}
      <header className="navbar bg-base-100/80 backdrop-blur-md shadow-soft border-b border-base-300/50 sticky top-0 z-50">
        <div className="flex-1">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="text-2xl font-bold gradient-primary bg-clip-text text-transparent flex items-center gap-2"
          >
            <span className="text-3xl">🏨</span>
            <span>HotelPro</span>
          </motion.div>
        </div>
        
        <div className="flex-none gap-3">
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-base-content">{user?.email}</div>
              <div className={`p-2 badge badge-sm ${getRoleColor(user?.role)} shadow-soft`}>
                {user?.role?.toUpperCase()}
              </div>
            </div>
            
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 p-2 rounded-full bg-gradient-primary text-primary-content flex items-center justify-center font-semibold shadow-soft">
                  {user?.email?.[0]?.toUpperCase()}
                </div>
              </div>
              <ul tabIndex={0} className="menu dropdown-content bg-base-100/95 backdrop-blur-md rounded-box z-[1] w-52 p-2 shadow-elevated border border-base-300/50">
                <li>
                  <a onClick={handleLogout} className="transition-all duration-200 hover:bg-primary hover:text-primary-content">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <div className="mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl font-bold text-base-content bg-gradient-to-r from-base-content to-base-content/70 bg-clip-text"
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-base-content/70 mt-2 text-lg"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {children}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}