import { createSlice } from '@reduxjs/toolkit';
import { Note } from '../../../@types/Note';
import { Meta, PaginationModel } from '../../../@types/Pagination';
import { IStatus } from '../../../@types/status';
import { createNote, deleteOneNote, editNote, getAllNotes, getOneNote } from './actions';

type InitialState = {
  notes: PaginationModel<Note>;
  note: Note | null;
  status: IStatus;
};

const initialState: InitialState = {
  notes: { docs: [], meta: {} as Meta },
  note: null,
  status: IStatus.IDLE,
};

const slice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // POST
    builder
      .addCase(createNote.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.note = action.payload.data;
      })
      .addCase(createNote.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
    // Edit
    builder
      .addCase(editNote.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(editNote.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.note = action.payload.data;
      })
      .addCase(editNote.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
    // GET ONE
    builder
      .addCase(getOneNote.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(getOneNote.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.note = action.payload.data;
      })
      .addCase(getOneNote.rejected, (state) => {
        state.status = IStatus.FAILED;
      });

    // GET ALL
    builder
      .addCase(getAllNotes.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(getAllNotes.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.notes = action.payload;
      })
      .addCase(getAllNotes.rejected, (state) => {
        state.status = IStatus.FAILED;
      });

    // DELETE ONE
    builder
      .addCase(deleteOneNote.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(deleteOneNote.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.notes.docs = state.notes.docs.filter((note) => note._id !== action.meta.arg.noteId);
      })
      .addCase(deleteOneNote.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
  },
});

export default slice.reducer;
