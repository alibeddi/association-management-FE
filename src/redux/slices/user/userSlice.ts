import { createSlice } from '@reduxjs/toolkit';
import { fetchUserById, fetchUsers } from './userThunks';
import { IUserTypes } from './userTypes';

interface UserType {
  user: IUserTypes;
  users: IUserTypes[];
  loading: boolean;
  error: string;
}

const initialState: UserType = {
  user: {
    email: '',
    organization: '',
    username: '',
  },
  users: [],
  loading: false,
  error: '',
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Define reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;

      })
      .addCase(fetchUserById.fulfilled, (state, { payload }) => {

 
        
        state.loading = false;
        state.user = payload.docs;

      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        //   state.error = error;
      })
       .addCase(fetchUsers.pending, (state) => {
        state.loading = true;

      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {

 
        
        state.loading = false;
        state.users =  payload.docs;

      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        //   state.error = error;
      });
      
  },
});

export const userSlices = UserSlice.actions;

export default UserSlice.reducer;
