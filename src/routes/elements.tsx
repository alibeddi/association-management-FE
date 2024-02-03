import { Suspense, lazy, ElementType } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

export const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));

export const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));
export const Vehicles = Loadable(lazy(() => import('../pages/Vehicles')));
export const Categories = Loadable(lazy(() => import('../pages/Categories')));
export const Branches = Loadable(lazy(() => import('../pages/Branches')));
export const PermissionGroup = Loadable(lazy(() => import('../pages/PermissionGroup')));
export const OperatorList = Loadable(lazy(() => import('../pages/user')));
export const Kpis = Loadable(lazy(() => import('../pages/Kpis/KpisListPage')));
export const KpiEditNew = Loadable(lazy(() => import('../pages/Kpis/KpiEditNewtPage')));

export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
