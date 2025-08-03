import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { userService } from '@/lib/firebaseService';
import { UserRole, AuthUser, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fallback user roles for demo purposes (if Firebase user data is not available)
const fallbackUserRoles: Record<string, { role: UserRole; branchId?: string; permissions?: string[] }> = {
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
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Try to get user data from Firestore
          const userData = await userService.getUserByEmail(firebaseUser.email || '');
          
          if (userData) {
            const authUser: AuthUser = {
              ...firebaseUser,
              role: userData.role,
              branchId: userData.branchId,
              permissions: getPermissionsForRole(userData.role),
            };
            setUser(authUser);
          } else {
            // Fallback to demo roles if user not found in Firestore
            const userRole = fallbackUserRoles[firebaseUser.email || ''];
            const authUser: AuthUser = {
              ...firebaseUser,
              role: userRole?.role || 'client',
              branchId: userRole?.branchId,
              permissions: userRole?.permissions || [],
            };
            setUser(authUser);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Fallback to demo roles on error
          const userRole = fallbackUserRoles[firebaseUser.email || ''];
          const authUser: AuthUser = {
            ...firebaseUser,
            role: userRole?.role || 'client',
            branchId: userRole?.branchId,
            permissions: userRole?.permissions || [],
          };
          setUser(authUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const getPermissionsForRole = (role: UserRole): string[] => {
    switch (role) {
      case 'director':
        return ['manage_all', 'view_reports', 'manage_staff', 'manage_branches'];
      case 'admin':
        return ['manage_rooms', 'view_clients', 'handle_complaints', 'manage_bookings'];
      case 'client':
        return ['view_booking', 'request_service', 'view_room'];
      default:
        return [];
    }
  };

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