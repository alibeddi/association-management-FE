import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

import userSlice from './slices/user/userSlice';
import projectSlice from './slices/posts/projectSlice';
import userTypeSlice from './slices/userType/userTypeSlice';


export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

export const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  project: projectSlice,
  user: userSlice,
  userType:userTypeSlice
  
});

export default rootReducer;
