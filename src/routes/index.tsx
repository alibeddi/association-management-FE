import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config-global';
//
import {
  Page404,
  LoginPage,
  Branches,
  Categories,
  Dashboard,
  Vehicles,
  PermissionGroup,
  OperatorList,
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
        { path: 'app', element: <Dashboard /> },
        { path: 'branches', element: <Branches /> },
        {
          path: 'fleet',
          children: [
            { element: <Navigate to="/dashboard/fleet/vehicles" replace />, index: true },
            { path: 'vehicles', element: <Vehicles /> },
            { path: 'categories', element: <Categories /> },
            { path: 'leasingContracts', element: <Dashboard /> },
          ],
        },
        {
          path: 'pricing',
          children: [
            { element: <Navigate to="/dashboard/pricing/vehicleGroups" replace />, index: true },
            { path: 'vehicleGroups', element: <Dashboard /> },
            { path: 'seasons', element: <Dashboard /> },
          ],
        },
        {
          path: 'reservation',
          children: [
            { element: <Navigate to="/dashboard/reservation/list" replace />, index: true },
            { path: 'list', element: <Dashboard /> },
            { path: 'calendar', element: <Dashboard /> },
          ],
        },
        {
          path: 'operators',
          element: <OperatorList />,
          children: [
            { element: <Navigate to="/dashboard/operators" replace />, index: true },
            { path: ':id', element: <Dashboard /> },
            { path: 'calendar', element: <Dashboard /> },
          ],
        },

        {
          path: 'settings',
          children: [
            { element: <Navigate to="/dashboard/settings/agency" replace />, index: true },
            { path: 'agency', element: <Dashboard /> },
            { path: 'users', element: <Dashboard /> },
            { path: 'bookableExtras', element: <Dashboard /> },
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
