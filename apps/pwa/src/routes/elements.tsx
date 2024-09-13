import LoadingScreen from '@/component/loading-screen';
import { Suspense, lazy, ElementType } from 'react';
// components

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));

export const PageOne = Loadable(lazy(() => import('../pages/PageOne')));

export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
