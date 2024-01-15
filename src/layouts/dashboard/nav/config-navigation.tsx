// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  customers: icon('ic_customers'),
  fleet: icon('ic_vehicle'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  branches: icon('ic_branches'),
  reservations: icon('ic_reservations'),
  pricing: icon('ic_pricing'),
  settings: icon('ic_settings'),
  groupPermissions: icon('ic_settings'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: '',
    items: [
      { title: 'dashboard', path: PATH_DASHBOARD.app, icon: ICONS.dashboard },
      { title: 'branches', path: PATH_DASHBOARD.branches, icon: ICONS.branches },
      {
        title: 'fleet',
        path: PATH_DASHBOARD.fleet.root,
        icon: ICONS.fleet,
        children: [
          { title: 'vehicles', path: PATH_DASHBOARD.fleet.vehicles },
          { title: 'categories', path: PATH_DASHBOARD.fleet.categories },
          { title: 'leasingContracacts', path: PATH_DASHBOARD.fleet.leasingContracts },
        ],
      },
      {
        title: 'pricing',
        path: PATH_DASHBOARD.pricing.root,
        icon: ICONS.pricing,
        children: [
          { title: 'vehicleGroups', path: PATH_DASHBOARD.pricing.vehicleGroups },
          { title: 'seasons', path: PATH_DASHBOARD.pricing.seasons },
        ],
      },
      {
        title: 'reservation',
        path: PATH_DASHBOARD.reservation.root,
        icon: ICONS.reservations,
        children: [
          { title: 'list', path: PATH_DASHBOARD.reservation.list },
          { title: 'calendar', path: PATH_DASHBOARD.reservation.calendar },
        ],
      },
      { title: 'customers', path: PATH_DASHBOARD.customers, icon: ICONS.customers },
      {
        title: 'settings',
        path: PATH_DASHBOARD.settings.root,
        icon: ICONS.settings,
        children: [
          { title: 'agency', path: PATH_DASHBOARD.settings.agency },
          { title: 'users', path: PATH_DASHBOARD.settings.users },
          { title: 'bookableExtras', path: PATH_DASHBOARD.settings.bookableExtras },
        ],
      },
      {
        title: 'group permissions',
        path: PATH_DASHBOARD.groupPermissions,
        icon: ICONS.settings,
      },
    ],
  },
];

export default navConfig;
