import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Employee } from '../data/users';

export type UserRole = 'admin' | 'manager' | 'engineer' | 'labour';

interface AuthUser {
  role: UserRole;
  employee: Employee | null;
}

interface AuthContextValue {
  auth: AuthUser;
  login: (role: UserRole, employee: Employee | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const defaultAuth: AuthUser = { role: 'admin', employee: null };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthUser>(defaultAuth);

  function login(role: UserRole, employee: Employee | null) {
    setAuth({ role, employee });
  }

  function logout() {
    setAuth(defaultAuth);
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
