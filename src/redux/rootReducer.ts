import { combineReducers } from '@reduxjs/toolkit';

import { reducer as colorReducer } from './slices/color';
import permissionReducer from './slices/permissions';
import permissionsGroupsReducer from './slices/groupPermissions';

// ----------------------------------------------------------------------

const combinedReducer = combineReducers({
  color: colorReducer,
  permissions: permissionReducer,
  permissions_groups: permissionsGroupsReducer,
});
const rootReducer = (state: any, action: any) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }
  return combinedReducer(state, action);
};
export default rootReducer;
