import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  userID: string | null;
  login: (token: string, role: string, userID: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userID, setUserID] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const storedUserID = localStorage.getItem('userID');
    if (token && role && storedUserID) {
      setIsAuthenticated(true);
      setUserRole(role);
      setUserID(storedUserID);
    }
  }, []);

  const login = (token: string, role: string, userID: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('userID', userID);
    setIsAuthenticated(true);
    setUserRole(role);
    setUserID(userID);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userID');
    setIsAuthenticated(false);
    setUserRole(null);
    setUserID(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, userID, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
