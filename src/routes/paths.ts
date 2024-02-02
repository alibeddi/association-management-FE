// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  app: path(ROOTS_DASHBOARD, '/app'),
  branches: path(ROOTS_DASHBOARD, '/branches'),
  fleet: {
    root: path(ROOTS_DASHBOARD, '/fleet'),
    categories: path(ROOTS_DASHBOARD, '/fleet/categories'),
    vehicles: path(ROOTS_DASHBOARD, '/fleet/vehicles'),
    leasingContracts: path(ROOTS_DASHBOARD, '/fleet/leasingContracts'),
  },
  pricing: {
    root: path(ROOTS_DASHBOARD, '/pricing'),
    vehicleGroups: path(ROOTS_DASHBOARD, '/pricing/vehicleGroups'),
    seasons: path(ROOTS_DASHBOARD, '/pricing/seasons'),
  },
  reservation: {
    root: path(ROOTS_DASHBOARD, '/reservation'),
    list: path(ROOTS_DASHBOARD, '/reservation/list'),
    calendar: path(ROOTS_DASHBOARD, '/reservation/calendar'),
  },
  operators: path(ROOTS_DASHBOARD, '/operators'),
  settings: {
    root: path(ROOTS_DASHBOARD, '/settings'),
    kpis: path(ROOTS_DASHBOARD, '/settings/kpis'),
    kpiEdit: path(ROOTS_DASHBOARD, '/settings/kpis/edit'),
    kpiView: path(ROOTS_DASHBOARD, '/settings/kpis/view'),
    users: path(ROOTS_DASHBOARD, '/settings/users'),
    bookableExtras: path(ROOTS_DASHBOARD, '/settings/bookableExtras'),
  },
  groupPermissions: path(ROOTS_DASHBOARD, '/permissions'),
};
