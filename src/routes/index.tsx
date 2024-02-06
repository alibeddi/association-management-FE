import { Navigate, Outlet, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config-global';
//
import { MethodCode, ModelCode } from '../@types/Permission';
import PermissionGuard from '../auth/PermissionsGuard';
import {
  Calendar,
  KpiEdit,
  KpiNew,
  Kpis,
  KpiView,
  LoginPage,
  OperatorList,
  Page404,
  PermissionGroup,
} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'login',
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
        {
          path: 'operators',
          element: (
            <PermissionGuard model={ModelCode.USER} method={MethodCode.LIST}>
              <Outlet />
            </PermissionGuard>
          ),
          children: [{ path: '', element: <OperatorList /> }],
        },

        {
          path: 'kpis',
          element: (
            <PermissionGuard model={ModelCode.KPI} method={MethodCode.LIST}>
              <Outlet />
            </PermissionGuard>
          ),
          children: [
            { path: '', element: <Kpis /> },
            { path: 'new', element: <KpiNew /> },
            {
              path: 'edit/:id',
              element: <KpiEdit />,
            },
            {
              path: 'view/:id',
              element: <KpiView />,
            },
          ],
        },
        {
          path: 'permissions',
          element: (
            <PermissionGuard model={ModelCode.PERMISSION_GROUP} method={MethodCode.LIST}>
              <PermissionGroup />
            </PermissionGuard>
          ),
        },
        {
          path: 'calendar',
          element: <Calendar />,
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
