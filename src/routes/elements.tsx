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
///
export const UserList = Loadable(lazy(() => import('../pages/User/UserList')));
export const UserView = Loadable(lazy(()=>import('../pages/User/UserView')))
export const UserEdit = Loadable(lazy(()=> import('../pages/User/UserEdit')))


export const Calendar = Loadable(lazy(() => import('../pages/Calendar')));
// kpis
export const Kpis = Loadable(lazy(() => import('../pages/Kpis/KpisListPage')));
export const KpiNew = Loadable(lazy(() => import('../pages/Kpis/KpiNewPage')));
export const KpiEdit = Loadable(lazy(() => import('../pages/Kpis/KpiEditPage')));
export const KpiView = Loadable(lazy(() => import('../pages/Kpis/KpiDetailsPage')));
// client status response
export const StatClientResponseList = Loadable(
  lazy(() => import('../pages/StatClientResponse/StatClientResListPage'))
);
export const StatClientResponseNew = Loadable(
  lazy(() => import('../pages/StatClientResponse/StatClientResNewPage'))
);
export const StatClientResponseView = Loadable(
  lazy(() => import('../pages/StatClientResponse/StatClientResponseView'))
);
export const StatClientResponseEdit = Loadable(
  lazy(() => import('../pages/StatClientResponse/StatClientResponseEdit'))
);
export const Call = Loadable(lazy(()=>import('../pages/Calls')));
export const StatsClient = Loadable(lazy(()=>import('../pages/statsClient')))
export const StatsClientNew = Loadable(lazy(()=>import('../pages/statsClient/statsClientNew')))
export const StatsClientEdit = Loadable(lazy(()=>import('../pages/statsClient/statsClientEdit')))
export const StatsClientShow = Loadable(lazy(()=>import('../pages/statsClient/statsClientShow')))

export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
