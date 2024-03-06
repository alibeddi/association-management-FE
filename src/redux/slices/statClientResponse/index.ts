import { createSlice, nanoid } from '@reduxjs/toolkit';
import { IFilterStatClientResponse } from '../../../@types/FilterStatClientResponse';
import { Meta, PaginationModel } from '../../../@types/Pagination';
import { StatClientResponse } from '../../../@types/StatClientResponse';
import { IStatus } from '../../../@types/status';
import {
  createStatClientResponse,
  deleteManyStatClientResponse,
  deleteStatClientResponse,
  editStatClientResponse,
  getAllStatClientResponses,
  getOneStatClientResponse,
  statsClientResponseFilter,
} from './actions';

type StatClientResState = {
  statClientResponses: PaginationModel<StatClientResponse>;
  statClientResponse: StatClientResponse;
  status: IStatus;
  filters: IFilterStatClientResponse[] | []
};

const initialState: StatClientResState = {
  statClientResponses: { docs: [], meta: {} as Meta },
  statClientResponse: {} as StatClientResponse,
  status: IStatus.IDLE,
  filters: [],
};

const slice = createSlice({
  name: 'statClientResponses',
  initialState,
  reducers: {
    addFilter: (state) => {
      state.filters = [...state.filters,{ id:nanoid() , type: '', value: '' }]
    },
    removeFilter: (state,{payload}) => {
      state.filters = state.filters.filter(filter=> filter.id !== payload.id)
    },
    handleChangeOptionfilter:(state,{payload})=>{
      const {name,value} = payload;
      state.filters = state.filters.map(elt=> elt.id === name ? {...elt,type:value} : elt )
    } ,
    handleChangefilter : (state,{payload}) => {
      const {id,value} = payload;
      state.filters = state.filters.map(elt => elt.id !== id ? elt: {...elt,value})
    },
    setFilters: (state) => {
      state.filters = []
    }
  },
  extraReducers: (builder) => {
    // create
    builder
      .addCase(createStatClientResponse.pending, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(createStatClientResponse.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.statClientResponse = action.payload.data;
      })
      .addCase(createStatClientResponse.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
    // get all
    builder
      .addCase(getAllStatClientResponses.pending, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(getAllStatClientResponses.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.statClientResponses = action.payload.data;
      })
      .addCase(getAllStatClientResponses.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
    // get one
    builder
      .addCase(getOneStatClientResponse.pending, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(getOneStatClientResponse.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.statClientResponse = action.payload.data;
      })
      .addCase(getOneStatClientResponse.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
    // edit
    builder
      .addCase(editStatClientResponse.pending, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(editStatClientResponse.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.statClientResponse = action.payload.data;
      })
      .addCase(editStatClientResponse.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
    // delete one
    builder
      .addCase(deleteStatClientResponse.pending, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(deleteStatClientResponse.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.statClientResponses.docs = state.statClientResponses.docs.filter(
          (statClientResponse) => statClientResponse._id !== action.meta.arg.statClientResponseId
        );
      })
      .addCase(deleteStatClientResponse.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
    // delete many
    builder
      .addCase(deleteManyStatClientResponse.pending, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(deleteManyStatClientResponse.fulfilled, (state) => {
        state.status = IStatus.SUCCEEDED;
      })
      .addCase(deleteManyStatClientResponse.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
    builder
    .addCase(statsClientResponseFilter.pending,(state)=>{
      state.status = IStatus.LOADING;
    })
    .addCase(statsClientResponseFilter.fulfilled, (state, {payload}) => {
      state.status = IStatus.SUCCEEDED;
      state.statClientResponses = payload;
    })
    .addCase(statsClientResponseFilter.rejected, (state) => {
      state.status = IStatus.FAILED;
    });
  },
});

export const {addFilter , removeFilter,handleChangeOptionfilter,handleChangefilter,setFilters} = slice.actions;
export default slice.reducer;
