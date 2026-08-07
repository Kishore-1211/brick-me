import { useAuth } from '../context/AuthContext';

export function useRole() {
  const { auth } = useAuth();
  return {
    isAdmin: auth.role === 'admin',
    isEngineer: auth.role === 'engineer',
    isLabour: auth.role === 'labour',
    role: auth.role,
  };
}
