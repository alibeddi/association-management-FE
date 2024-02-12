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
export const PermissionGroup = Loadable(lazy(() => import('../pages/PermissionGroup')));
export const OperatorList = Loadable(lazy(() => import('../pages/User')));
export const Calendar = Loadable(lazy(() => import('../pages/Calendar')));
// kpis
export const Kpis = Loadable(lazy(() => import('../pages/Kpis/KpisListPage')));
export const KpiNew = Loadable(lazy(() => import('../pages/Kpis/KpiNewPage')));
export const KpiEdit = Loadable(lazy(() => import('../pages/Kpis/KpiEditPage')));
export const KpiView = Loadable(lazy(() => import('../pages/Kpis/KpiDetailsPage')));
// client status
export const ClienStatusList = Loadable(
  lazy(() => import('../pages/ClientStatus/StatClientListPage'))
);
export const ClienStatusNew = Loadable(
  lazy(() => import('../pages/ClientStatus/StatClientNewPage'))
);

export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
