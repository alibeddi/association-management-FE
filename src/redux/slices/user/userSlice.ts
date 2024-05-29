import { createSlice } from '@reduxjs/toolkit';
import { fetchMe } from './userThunks';
import { IUserTypes } from './userTypes';

interface UserType {
  me: IUserTypes;
  users: IUserTypes[];
  loading: boolean;
  error: string;
}

const initialState: UserType = {
  me: {
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
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;

      })
      .addCase(fetchMe.fulfilled, (state, { payload }) => {

 
        
        state.loading = false;
        state.me = payload;

      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.loading = false;
        //   state.error = error;
      });
  },
});

export const userSlices = UserSlice.actions;

export default UserSlice.reducer;
