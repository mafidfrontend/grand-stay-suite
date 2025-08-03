import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card w-full max-w-md bg-base-100 shadow-luxury"
      >
        <div className="card-body text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 mx-auto bg-error/10 rounded-full flex items-center justify-center mb-4"
          >
            <ShieldAlert className="h-8 w-8 text-error" />
          </motion.div>
          
          <h1 className="text-2xl font-bold text-base-content mb-2">Access Denied</h1>
          <p className="text-base-content/70 mb-6">
            You don't have permission to access this page. Please contact your administrator.
          </p>
          
          <div className="space-y-2">
            <button 
              onClick={() => navigate('/login')}
              className="btn btn-primary w-full"
            >
              Back to Login
            </button>
            <button 
              onClick={() => window.history.back()}
              className="btn btn-outline w-full"
            >
              Go Back
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}