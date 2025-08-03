import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

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
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="card w-full max-w-md bg-base-100 shadow-luxury"
      >
        <div className="card-body">
          <div className="text-center mb-6">
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-3xl font-bold gradient-primary bg-clip-text text-transparent"
            >
              🏨 HotelPro
            </motion.div>
            <p className="text-base-content/70 mt-2">Hotel Management System</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div className="divider">Demo Accounts</div>
          
          <div className="space-y-2">
            {demoCredentials.map((cred, index) => (
              <motion.button
                key={cred.role}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => fillDemo(cred.email, cred.password)}
                className="btn btn-outline btn-sm w-full justify-start"
              >
                <span className="font-semibold">{cred.role}:</span>
                <span className="text-xs opacity-70">{cred.email}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}