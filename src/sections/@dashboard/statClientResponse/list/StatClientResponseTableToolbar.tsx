// @mui
import { Stack, InputAdornment, TextField, Button } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
// components
import Iconify from '../../../../components/iconify';

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
  setOpenFilter
}: Props) {
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
      <div onClick={() => setOpenFilter(true)}>tesqsdfqsdft</div>
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
    </Stack>
  );
}
