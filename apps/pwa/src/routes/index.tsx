// ----------------------------------------------------------------------

import GuestGuard from "@/auth/GuestGuard";
import { Navigate, useRoutes } from "react-router-dom";
import {
  Page404,
  PageOne,
  LoginPage,
} from './elements';
import AuthGuard from "@/auth/AuthGuard";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { PATH_AFTER_LOGIN } from "@/app-config";
import CompactLayout from "@/layouts/compact/CompactLayout";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: '/auth/login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: '/dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'one', element: <PageOne /> },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/hello" replace />, index: true },
          ],
        },
      ],
    },
    {
      element: <CompactLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
