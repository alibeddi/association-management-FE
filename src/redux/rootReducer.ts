import { combineReducers } from '@reduxjs/toolkit';

import { reducer as colorReducer } from './slices/color';
import permissionsGroupsReducer from './slices/groupPermissions';
import usersReducer from './slices/users';
import kpisReducer from './slices/kpis';
import permissionReducer from './slices/permissions';
import workTimeReducer from './slices/workTimes';
import statClientResReducer from './slices/statClientResponse';

// ----------------------------------------------------------------------

const combinedReducer = combineReducers({
  color: colorReducer,
  permissions: permissionReducer,
  permissions_groups: permissionsGroupsReducer,
  users: usersReducer,
  workTimes: workTimeReducer,
  kpis: kpisReducer,
  statClientResponses: statClientResReducer,
});
const rootReducer = (state: any, action: any) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }
  return combinedReducer(state, action);
};
export default rootReducer;
