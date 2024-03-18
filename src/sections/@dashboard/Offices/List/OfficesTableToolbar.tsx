// @mui
import { Stack, InputAdornment, TextField, Button, MenuItem } from '@mui/material';
// components
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

type Props = {
  placeholder: string;
  search?: string;
  isFiltered?: boolean;
  onResetFilter?: VoidFunction;
  onSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function OfficesTableToolbar({
  isFiltered,
  search,
  onSearch,
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
        value={search}
        onChange={onSearch}
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
