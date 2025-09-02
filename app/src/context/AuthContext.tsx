'use client';

import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { User, UserRole } from '@/src/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  isLoading: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  role: UserRole;
  companyName: string;
  taxId: string;
  address: string;
  phone: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (token && savedUser) {
        try {
          const user = JSON.parse(savedUser);
          setUser(user);
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    if (isLoading) return; // Prevent multiple rapid clicks
    
    setIsLoading(true);
    try {
      // Demo credentials for quick testing
      const demoUsers = {
        'admin@farmadepom.com': {
          role: 'admin' as UserRole,
          companyName: 'FarmaDepom Admin Panel'
        },
        'eczane@test.com': {
          role: 'pharmacy' as UserRole,
          companyName: 'Test Eczanesi Ltd.'
        },
        'depo@test.com': {
          role: 'warehouse' as UserRole,
          companyName: 'Ana Depo A.Ş.'
        }
      };

      // Quick login for demo users
      const demoUser = demoUsers[email as keyof typeof demoUsers];
      if (demoUser && password === '123456') {
        const mockUser: User = {
          id: '1',
          email,
          role: demoUser.role,
          companyName: demoUser.companyName,
          isVerified: true,
        };

        const token = 'demo-jwt-token';
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        setIsLoading(false);
        return;
      }

      // Simulate API call for other emails
      await new Promise(resolve => setTimeout(resolve, 300)); // Faster response
      
      // Mock user data based on email pattern
      const mockUser: User = {
        id: '1',
        email,
        role: email.includes('admin') ? 'admin' : email.includes('depo') ? 'warehouse' : 'pharmacy',
        companyName: email.includes('admin') ? 'FarmaDepom Admin' : email.includes('depo') ? 'Depo A.Ş.' : 'Eczane Ltd.',
        isVerified: true,
      };

      const token = 'mock-jwt-token';
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      throw new Error('Giriş yapılırken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    if (isLoading) return; // Prevent multiple rapid clicks
    
    setIsLoading(true);
    try {
      // Faster simulation for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Mock user creation
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        role: userData.role,
        companyName: userData.companyName,
        isVerified: true, // Auto-verify for demo
      };

      const token = 'demo-jwt-token';
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      throw new Error('Kayıt olurken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      register,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};