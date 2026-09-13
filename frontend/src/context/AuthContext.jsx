import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { login as loginRequest, fetchMe } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('sms_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('sms_token');
    if (!token) {
      setLoading(false);
      return;
    }

    fetchMe()
      .then(({ user: freshUser }) => {
        setUser(freshUser);
        localStorage.setItem('sms_user', JSON.stringify(freshUser));
      })
      .catch(() => {
        localStorage.removeItem('sms_token');
        localStorage.removeItem('sms_user');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const { token, user: loggedInUser } = await loginRequest(email, password);
    localStorage.setItem('sms_token', token);
    localStorage.setItem('sms_user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    return loggedInUser;
  };

  const logout = () => {
    localStorage.removeItem('sms_token');
    localStorage.removeItem('sms_user');
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
