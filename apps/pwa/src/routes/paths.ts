// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/auth/login',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  one: path(ROOTS_DASHBOARD, '/one'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
  },
};
