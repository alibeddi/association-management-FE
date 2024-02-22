import React, { Dispatch, SetStateAction } from 'react';
import { TextField, MenuItem } from '@mui/material';
import { IFilterStatClientResponse } from '../../../../@types/FilterStatClientResponse';
import AsyncSelectKpis from '../../../../components/AsyncSelect/AsyncSelectKpis';
import { AdminAsyncSelect } from '../../../../components/AsyncSelect';

type IProp = {
  filter: IFilterStatClientResponse;
  setFilters: Dispatch<SetStateAction<[] | IFilterStatClientResponse[]>>;
}

const RenderSelectFilter = ({ filter, setFilters }: IProp) => {
  const handleChange = (id: string, value: string) => setFilters(prev => prev.map(ele => ele.id !== id ? ele : { ...ele, value }));

  switch (filter.type) {
    case 'adminName':
      return (
        <AdminAsyncSelect
        name={filter.id} 
        handleChange={handleChange}
        />
      );
    case 'kpis':
      return <AsyncSelectKpis name={filter.id}  handleChange={handleChange}/>;
    default:
      return (
        <TextField disabled value="">
          <MenuItem value="" disabled>Select a type</MenuItem>
        </TextField>
      );
  }
}

export default RenderSelectFilter;
