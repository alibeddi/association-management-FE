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
  clientStatus: {
    root: path(ROOTS_DASHBOARD, '/client-status'),
    edit: path(ROOTS_DASHBOARD, '/client-status/edit'),
    view: path(ROOTS_DASHBOARD, '/client-status/view'),
    new: path(ROOTS_DASHBOARD, '/client-status/new'),
  },
};
