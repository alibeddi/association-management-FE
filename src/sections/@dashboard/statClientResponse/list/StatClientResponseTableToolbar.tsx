// @mui
import { Stack, InputAdornment, TextField, Button } from '@mui/material';
import { useState, Dispatch, SetStateAction } from 'react';

import { useDispatch } from 'react-redux';
import { IFilterStatClientResponse } from '../../../../@types/FilterStatClientResponse';
// components
import Iconify from '../../../../components/iconify';
import StatClientResponseFilter from "../../../../components/StatClientResponseFilter";
import { setFilters } from '../../../../redux/slices/statClientResponse';
import { getAllStatClientResponses } from '../../../../redux/slices/statClientResponse/actions';
import { useSelector } from '../../../../redux/store';

// ----------------------------------------------------------------------

type Props = {
  placeholder: string;
  filterClientName?: string;
  isFiltered?: boolean;
  onResetFilter?: VoidFunction;
  onFilterName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function StatClientResponseTableToolbar({
  isFiltered,
  filterClientName,
  onFilterName,
  onResetFilter,
  placeholder
}: Props) {
  const [openFilter,setOpenFilter] = useState(false)
  const dispatch = useDispatch()
  const handleClostFilter = () => setOpenFilter(false)
  const {filters} = useSelector(store=>store.statClientResponses)
  console.log({filters})
  const resetFilterStatClientResponse = async () => {
    dispatch(setFilters())
    await dispatch(getAllStatClientResponses({
      page:0,
      limit:5
    }))
  }
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent='flex-end'
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      sx={{ px: 2.5, py: 3 }}
    >

      {filters.length > 0 && (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={resetFilterStatClientResponse}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Clear Filter
        </Button>
      )}
      {filters.length === 0 &&  <Button startIcon={<Iconify icon="mdi:filter" />} onClick={()=>setOpenFilter(!openFilter)}>Filter</Button>}
      <StatClientResponseFilter open={openFilter} onClose={handleClostFilter}    />
    </Stack>
  );
}
