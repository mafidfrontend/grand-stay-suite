import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      
      // Redirect based on role (mock logic for demo)
      if (email === 'director@hotel.com') {
        navigate('/director');
      } else if (email === 'admin@hotel.com') {
        navigate('/admin');
      } else {
        navigate('/client');
      }
      
      toast({
        title: "Login successful",
        description: "Welcome to the hotel management system",
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const demoCredentials = [
    { role: 'Director', email: 'director@hotel.com', password: 'password123' },
    { role: 'Admin', email: 'admin@hotel.com', password: 'password123' },
    { role: 'Client', email: 'client@hotel.com', password: 'password123' },
  ];

  const fillDemo = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-200 p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Theme Toggle in top-right corner */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="card w-full max-w-md bg-base-100/95 backdrop-blur-md shadow-elevated border border-base-300/50 relative z-10"
      >
        <div className="card-body p-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl font-bold gradient-primary bg-clip-text text-transparent flex items-center justify-center gap-3 mb-2"
            >
              <span className="text-5xl">🏨</span>
              <span>HotelPro</span>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-base-content/70 text-lg"
            >
              Hotel Management System
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="form-control"
            >
              <label className="label">
                <span className="label-text font-semibold text-base-content">Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full bg-base-100/50 backdrop-blur-sm border-base-300/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                placeholder="Enter your email"
                required
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="form-control"
            >
              <label className="label">
                <span className="label-text font-semibold text-base-content">Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full bg-base-100/50 backdrop-blur-sm border-base-300/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                placeholder="Enter your password"
                required
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full btn-enhanced shadow-soft hover:shadow-elevated transition-all duration-300"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login
                </>
              )}
            </motion.button>
          </form>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="divider text-base-content/60 font-medium"
          >
            Demo Accounts
          </motion.div>
          
          <div className="space-y-3">
            {demoCredentials.map((cred, index) => (
              <motion.button
                key={cred.role}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                onClick={() => fillDemo(cred.email, cred.password)}
                className="btn btn-outline w-full justify-start bg-base-100/50 backdrop-blur-sm border-base-300/50 hover:bg-primary hover:text-primary-content hover:border-primary transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <span className="text-xs font-bold text-primary group-hover:text-primary-content">
                      {cred.role[0]}
                    </span>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold">{cred.role}</div>
                    <div className="text-xs opacity-70">{cred.email}</div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}