// @mui
import { Button, Stack } from '@mui/material';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
// components
import Iconify from '../../../../components/iconify';
import StatClientResponseFilter from '../../../../components/StatClientResponseFilter';
import { resetFilters } from '../../../../redux/slices/statClientResponse';
import { getAllStatClientResponses } from '../../../../redux/slices/statClientResponse/actions';
import { useSelector } from '../../../../redux/store';

// ----------------------------------------------------------------------

export default function StatClientResponseTableToolbar() {
  const [openFilter, setOpenFilter] = useState(false);
  const dispatch = useDispatch();
  const handleClostFilter = () => setOpenFilter(false);
  const { filters } = useSelector((store) => store.statClientResponses);
  const resetFilterStatClientResponse = async () => {
    dispatch(resetFilters());
    await dispatch(
      getAllStatClientResponses({
        page: 0,
        limit: 5,
      })
    );
  };
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="flex-end"
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
      {filters.length === 0 && (
        <Button
          startIcon={<Iconify icon="mdi:filter" />}
          onClick={() => setOpenFilter(!openFilter)}
        >
          Filter
        </Button>
      )}
      <StatClientResponseFilter open={openFilter} onClose={handleClostFilter} />
    </Stack>
  );
}
