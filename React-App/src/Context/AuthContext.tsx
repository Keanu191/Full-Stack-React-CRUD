// Context provider for authentication state management.
// Handles user, role, and email data, and integrates with the backend API.

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import authAPI from '../API/authAPI';

interface AuthContextType {
  user: string | null;
  role: string | null;
  email: string | null;
  setUser: (user: string | null, role: string | null, email: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<string | null>(null);
  const [role, setRoleState] = useState<string | null>(null);
  const [email, setEmailState] = useState<string | null>(null);

  const setUser = (user: string | null, role: string | null, email: string | null) => {
    setUserState(user);
    setRoleState(role);
    setEmailState(email);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      try {
        const response = await authAPI.get('/Authentication/User', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { user, role, email } = response.data;
        setUser(user, role, email);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    console.log('AuthContext user:', user);
    console.log('AuthContext role:', role);
    console.log('AuthContext email:', email);
  }, [user, role, email]);

  return (
    <AuthContext.Provider value={{ user, role, email, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};