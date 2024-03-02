// @mui
import { Stack, InputAdornment, TextField, Button } from '@mui/material';
import { useState, Dispatch, SetStateAction } from 'react';

// components
import Iconify from '../../../../components/iconify';
import StatClientResponseFilter from '../../../../components/StatClientResponseFilter';

// ----------------------------------------------------------------------

type Props = {
  placeholder: string;
  filterClientName?: string;
  isFiltered?: boolean;
  onResetFilter?: VoidFunction;
  onFilterName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setOpenFilter: Dispatch<SetStateAction<boolean>>;
};

export default function StatClientResponseTableToolbar({
  isFiltered,
  filterClientName,
  onFilterName,
  onResetFilter,
  placeholder,
}: Props) {
  const [openFilter, setOpenFilter] = useState(false);
  const handleClostFilter = () => setOpenFilter(false);
  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      sx={{ px: 2.5, py: 3 }}
    >
      <TextField
        fullWidth
        value={filterClientName}
        onChange={onFilterName}
        placeholder={placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />

      {isFiltered && (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={onResetFilter}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Clear
        </Button>
      )}
      <Button onClick={() => setOpenFilter(!openFilter)}>Filter</Button>
      <StatClientResponseFilter open={openFilter} onClose={handleClostFilter} />
    </Stack>
  );
}
