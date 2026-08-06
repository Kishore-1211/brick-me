import { useAuth } from '../context/AuthContext';

export function useRole() {
  const { auth } = useAuth();
  return {
    isAdmin: auth.role === 'admin',
    isManager: auth.role === 'manager',
    isLabour: auth.role === 'labour',
    role: auth.role,
  };
}
