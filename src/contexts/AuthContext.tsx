import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export type UserRole = 'director' | 'admin' | 'client';

export interface AuthUser extends User {
  role?: UserRole;
  branchId?: string;
  permissions?: string[];
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user roles for demo purposes
const mockUserRoles: Record<string, { role: UserRole; branchId?: string; permissions?: string[] }> = {
  'director@hotel.com': { 
    role: 'director', 
    permissions: ['manage_all', 'view_reports', 'manage_staff'] 
  },
  'admin@hotel.com': { 
    role: 'admin', 
    branchId: 'branch-1',
    permissions: ['manage_rooms', 'view_clients', 'handle_complaints'] 
  },
  'client@hotel.com': { 
    role: 'client', 
    branchId: 'branch-1',
    permissions: ['view_booking', 'request_service'] 
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userRole = mockUserRoles[firebaseUser.email || ''];
        const authUser: AuthUser = {
          ...firebaseUser,
          role: userRole?.role || 'client',
          branchId: userRole?.branchId,
          permissions: userRole?.permissions || [],
        };
        setUser(authUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const hasRole = (role: UserRole) => {
    return user?.role === role;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}