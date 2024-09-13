import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
// components
import { useAuthContext } from '@/auth/useAuthContext';
import LoadingScreen from '@/component/loading-screen';
//

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated, isInitialized } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return <> {children} </>;
}
