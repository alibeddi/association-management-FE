import { combineReducers } from '@reduxjs/toolkit';

import { reducer as colorReducer } from './slices/color';

// ----------------------------------------------------------------------

const combinedReducer = combineReducers({
  color: colorReducer,
});
const rootReducer = (state: any, action: any) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }
  return combinedReducer(state, action);
};
export default rootReducer;
