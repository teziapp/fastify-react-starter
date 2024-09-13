import { useState, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// components
import LoadingScreen from '@/component/loading-screen';
//
import Login from '@/pages/auth/login';
import { useAuthContext } from './useAuthContext';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isInitialized } = useAuthContext();

  const { pathname } = useLocation();

  // basically this is used to redirect to the page after login
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <> {children} </>;
}
