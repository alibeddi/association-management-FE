// @mui
import { Button, Stack } from '@mui/material';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
// components
import Iconify from '../../../../components/iconify';
import StatClientResponseFilter from '../../../../components/StatClientResponseFilter';
import { resetFilters, setIsFiltered } from '../../../../redux/slices/statClientResponse';
import { useSelector } from '../../../../redux/store';

// ----------------------------------------------------------------------
type IProps = {
  handleResetFilter: VoidFunction;
};
export default function StatClientResponseTableToolbar({ handleResetFilter }: IProps) {
  const [openFilter, setOpenFilter] = useState(false);
  const dispatch = useDispatch();
  const handleClostFilter = () => setOpenFilter(false);
  const { isFiltered } = useSelector((store) => store.statClientResponses);
  const resetFilterStatClientResponse = async () => {
    dispatch(resetFilters());
    dispatch(setIsFiltered(false));
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
      {isFiltered ? (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={resetFilterStatClientResponse}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Clear Filter
        </Button>
      ) : (
        <Button
          startIcon={<Iconify icon="mdi:filter" />}
          onClick={() => {
            setOpenFilter(!openFilter);
            handleResetFilter();
          }}
        >
          Filter
        </Button>
      )}

      <StatClientResponseFilter open={openFilter} onClose={handleClostFilter} />
    </Stack>
  );
}
