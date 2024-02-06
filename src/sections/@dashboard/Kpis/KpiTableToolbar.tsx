// @mui
import { Stack, InputAdornment, TextField, Button } from '@mui/material';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

type Props = {
  placeholder: string;
  filterName?: string;
  isFiltered?: boolean;
  onResetFilter?: VoidFunction;
  onFilterName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function KpiTableToolbar({
  isFiltered,
  filterName,
  onFilterName,
  onResetFilter,
  placeholder,
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
        value={filterName}
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
    </Stack>
  );
}
