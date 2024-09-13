import { AuthContext } from '@/auth/AuthProvider';
import { AuthContextType } from '@/auth/types';
import { useContext } from 'react';

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuthContext context must be use inside AuthProvider');

  return context;
};
