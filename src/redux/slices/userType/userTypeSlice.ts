import { createSlice } from '@reduxjs/toolkit';
import { fetchUserType } from './userTypeThunks';
import { IUserTypes } from './userTypeTypes';

interface UserType {
  me: IUserTypes;
  userType: IUserTypes[];
  loading: boolean;
  error: string;
}

const initialState: UserType = {
  me: {
    email: '',
    organization: '',
    username: '',
  },
  userType: [],
  loading: false,
  error: '',
};

export const UserTypeSlice = createSlice({
  name: 'userType',
  initialState,
  reducers: {
    // Define reducers if needed
  },
  extraReducers: (builder) => {
    builder
  
       .addCase(fetchUserType.pending, (state) => {
        state.loading = true;

      })
      .addCase(fetchUserType.fulfilled, (state, { payload }) => {

 
        
        state.loading = false;
        state.userType =  payload.docs;

      })
      .addCase(fetchUserType.rejected, (state, action) => {
        state.loading = false;
        //   state.error = error;
      });
      
  },
});

export const userTypeSlices = UserTypeSlice.actions;

export default UserTypeSlice.reducer;
