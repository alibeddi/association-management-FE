import React, { Dispatch, SetStateAction } from 'react';
import { TextField, MenuItem } from '@mui/material';
import { IFilterStatClientResponse } from '../../../../@types/FilterStatClientResponse';
import AsyncSelectKpis from '../../../../components/AsyncSelectKpis';

type IProp = {
  filter: IFilterStatClientResponse;
  setFilters: Dispatch<SetStateAction<[] | IFilterStatClientResponse[]>>;
}

const RenderSelectFilter = ({ filter, setFilters }: IProp) => {
  const handleChange = (id: string, value: string) => setFilters(prev => prev.map(ele => ele.id !== id ? ele : { ...ele, value }));

  switch (filter.type) {
    case 'adminName':
      return (
        <TextField
          name={filter.id}
          placeholder={filter.value}
          label="admin  "
          value={filter.value}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
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
