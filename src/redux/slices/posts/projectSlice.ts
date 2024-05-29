import { createSlice } from '@reduxjs/toolkit';
import { IProjectTypes } from './projectTypes';
import { createNewPost } from './projectThunks';

interface UserType {
  project: IProjectTypes;
  projects: IProjectTypes[];
  loading: boolean;
  isFetchStudentsLoading: 'idle' | 'loading' | 'success' | 'failed';
  error: string;
  count: number | null;
  next: object | null;
  previous: object | null;
}

const initialState: UserType = {
  project: {
    name: '',
    domain: '',
  },
  projects: [],
  loading: false,
  isFetchStudentsLoading: 'idle',
  error: '',
  count: null,
  next: null,
  previous: null,
};

export const ProjectListSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    // Define reducers if needed
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(createNewPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewPost.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.count = Number(state.count) + 1;
        state.projects = [payload, ...state.projects];
      })
      .addCase(createNewPost.rejected, (state, action) => {
        state.loading = false;
        //   state.error = error;
      })
      
    // Add other cases for other async thunks...
  },
});

export const ProjectListSlices = ProjectListSlice.actions;

export default ProjectListSlice.reducer;
