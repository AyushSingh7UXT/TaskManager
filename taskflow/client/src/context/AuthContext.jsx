import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const token = localStorage.getItem('taskflow_token');
    if (!token) return setLoading(false);

    api.get('/auth/me')
      .then((res) => setUser(res.data))
      .catch(() => localStorage.removeItem('taskflow_token'))
      .finally(() => setLoading(false));
  }, []);

  const login = async (payload) => {
    const { data } = await api.post('/auth/login', payload);
    localStorage.setItem('taskflow_token', data.token);
    setUser(data.user);
    toast.success('Welcome back!');
  };

  const signup = async (payload) => {
    const { data } = await api.post('/auth/register', payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    localStorage.setItem('taskflow_token', data.token);
    setUser(data.user);
    toast.success('Account created!');
  };

  const logout = async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('taskflow_token');
    setUser(null);
    toast.success('Logged out');
  };

  const value = useMemo(() => ({ user, loading, login, signup, logout, darkMode, setDarkMode }), [user, loading, darkMode]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
