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
  operators: path(ROOTS_DASHBOARD, '/operators'),
  kpis: {
    root: path(ROOTS_DASHBOARD, '/kpis'),
    edit: path(ROOTS_DASHBOARD, '/kpis/edit'),
    view: path(ROOTS_DASHBOARD, '/kpis/view'),
    new: path(ROOTS_DASHBOARD, '/kpis/new'),
  },
  groupPermissions: path(ROOTS_DASHBOARD, '/permissions'),
  calender: path(ROOTS_DASHBOARD, '/calendar'),
  calls: path(ROOTS_DASHBOARD, '/calls'),
  statsClient: {
    root: path(ROOTS_DASHBOARD, '/stats-client'),
    new: path(ROOTS_DASHBOARD, '/stats-client/new'),
    edit: path(ROOTS_DASHBOARD, '/stats-client/edit'),
    view: path(ROOTS_DASHBOARD, '/stats-client/view'),
  },
  statClientResponse: {
    root: path(ROOTS_DASHBOARD, '/stat-client-response'),
    edit: path(ROOTS_DASHBOARD, '/stat-client-response/edit'),
    view: path(ROOTS_DASHBOARD, '/stat-client-response/view'),
    new: path(ROOTS_DASHBOARD, '/stat-client-response/new'),
  },
};
