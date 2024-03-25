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
  Call,
  KpiEdit,
  KpiNew,
  Kpis,
  KpiView,
  LoginPage,
  MyTodoList,
  UserList,
  Page404,
  PermissionGroup,
  StatClientResponseEdit,
  StatClientResponseList,
  StatClientResponseNew,
  StatClientResponseView,
  StatsClient,
  StatsClientEdit,
  StatsClientNew,
  StatsClientShow,
  UserEdit,
  UserView,
  Analytics,
  Notifications,
  Offices,
} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      children: [
        { element: <Navigate to="/login" replace />, index: true },
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
          children: [
            { path: '', element: <UserList /> },
            {
              path: 'view/:id',
              element: <UserView />,
            },
            {
              path: 'edit/:id',
              element: <UserEdit />,
            },
          ],
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
          path: 'stat-client-response',
          element: <Outlet />,
          children: [
            { path: '', element: <StatClientResponseList /> },
            { path: 'new/:statClientId', element: <StatClientResponseNew /> },
            {
              path: 'edit/:statClientRestId',
              element: <StatClientResponseEdit />,
            },
            {
              path: 'view/:statClientRestId',
              element: <StatClientResponseView />,
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
        {
          path: 'calls',
          element: <Call />,
        },
        {
          path: 'stats-client',
          element: <Outlet />,
          children: [
            { path: '', element: <StatsClient /> },
            { path: 'new', element: <StatsClientNew /> },
            { path: 'view/:id', element: <StatsClientShow /> },
            { path: 'edit/:id', element: <StatsClientEdit /> },
          ],
        },
        {
          path: 'todo-list',
          element: <Outlet />,
          children: [{ path: '', element: <MyTodoList /> }],
        },
        {
          path: 'analytics',
          element: (
            <PermissionGuard model={ModelCode.ANALYTICS} method={MethodCode.LIST}>
              <Analytics />
            </PermissionGuard>
          ),
        },
        {
          path: 'notifications',
          element: (
            <PermissionGuard model={ModelCode.NOTIFICATION} method={MethodCode.LIST}>
              <Notifications />
            </PermissionGuard>
          ),
        },
        {
          path: 'offices',
          element: (
            <PermissionGuard model={ModelCode.OFFICE} method={MethodCode.LIST}>
              <Offices />
            </PermissionGuard>
          ),
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
