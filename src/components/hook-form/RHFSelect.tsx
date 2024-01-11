import { useState } from 'react';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  Box,
  Chip,
  Select,
  Checkbox,
  MenuItem,
  TextField,
  InputLabel,
  SelectProps,
  FormControl,
  OutlinedInput,
  TextFieldProps,
  FormHelperText,
  Tooltip,
} from '@mui/material';
// translation
import { useLocales } from '../../locales';

// ----------------------------------------------------------------------

type RHFSelectProps = TextFieldProps & {
  name: string;
  native?: boolean;
  multiple?: boolean;
  maxHeight?: boolean | number;
  children: React.ReactNode;
};

export function RHFSelect({
  name,
  label,
  native,
  maxHeight = 220,
  helperText,
  children,
  multiple,
  ...other
}: RHFSelectProps) {
  const { control, register } = useFormContext();
  const { translate } = useLocales();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Tooltip title={`${translate(helperText)}` || `${translate(label)}`}>
          <TextField
            {...field}
            select
            fullWidth
            label={`${translate(label)}`}
            inputRef={field.ref}
            {...register(name)}
            SelectProps={{
              native,
              MenuProps: {
                PaperProps: {
                  sx: {
                    ...(!native && {
                      px: 1,
                      maxHeight: typeof maxHeight === 'number' ? maxHeight : 'unset',
                      '& .MuiMenuItem-root': {
                        px: 1,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                      },
                    }),
                  },
                },
              },
              sx: { textTransform: 'capitalize' },
            }}
            error={!!error}
            helperText={error ? `${translate(error?.message)}` : `${translate(helperText)}`}
            {...other}
          >
            {children}
          </TextField>
        </Tooltip>
      )}
    />
  );
}

// ----------------------------------------------------------------------

type RHFMultiSelectProps = SelectProps & {
  name: string;
  label?: string;
  chip?: boolean;
  checkbox?: boolean;
  editSelected?: string[];
  placeholder?: string;
  helperText?: React.ReactNode;
  options: {
    label: string;
    id: string;
  }[];
};

export function RHFMultiSelect({
  name,
  chip,
  label,
  options,
  checkbox,
  editSelected,
  placeholder,
  helperText,
  sx,
  ...other
}: RHFMultiSelectProps) {
  const { control, watch } = useFormContext();

  const [allselectedItems, setSelectedItems] = useState<string[]>(editSelected || []);
  const { translate } = useLocales();

  const renderValues = (value: unknown): React.ReactNode => {
    const selectedIds = value as string[];
    const selectedItems = options?.filter((item) => selectedIds.includes(item.id));

    if (!selectedItems.length && placeholder) {
      return (
        <Box component="em" sx={{ color: 'text.disabled' }}>
          {`${translate(placeholder)}`}
        </Box>
      );
    }

    if (chip) {
      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selectedItems.map((item) => (
            <Chip key={item.id} size="small" label={`${translate(item.label)} `} />
          ))}
        </Box>
      );
    }

    return selectedItems.map((item) => item.label).join(', ');
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl sx={sx}>
          {label && <InputLabel id={name}>{`${translate(label)}`}</InputLabel>}

          <Select
            {...field}
            multiple
            displayEmpty={!!placeholder}
            labelId={name}
            input={<OutlinedInput fullWidth label={`${translate(label)} `} error={!!error} />}
            renderValue={renderValues}
            native={false}
            MenuProps={{
              PaperProps: {
                sx: { px: 1, maxHeight: 280 },
              },
            }}
            value={allselectedItems}
            {...other}
          >
            {placeholder && (
              <MenuItem
                disabled
                value=""
                sx={{
                  py: 1,
                  px: 2,
                  borderRadius: 0.75,
                  typography: 'body2',
                }}
              >
                <em>{`${translate(placeholder)}`}</em>
              </MenuItem>
            )}

            {options.map((option) => {
              const selected = allselectedItems?.includes(option?.id);

              return (
                <MenuItem
                  key={option?.id}
                  value={option?.id}
                  sx={{
                    py: 1,
                    px: 2,
                    borderRadius: 0.75,
                    typography: 'body2',
                    ...(selected && {
                      fontWeight: 'fontWeightMedium',
                    }),
                    ...(checkbox && {
                      p: 0.25,
                    }),
                  }}
                  onClick={() =>
                    setSelectedItems((prev) =>
                      prev.includes(option?.id)
                        ? prev.filter((el) => el !== option?.id)
                        : [...prev, option.id]
                    )
                  }
                >
                  {checkbox && <Checkbox disableRipple size="small" checked={selected} />}

                  {option.label}
                </MenuItem>
              );
            })}
          </Select>

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>
              {error ? `${translate(error?.message)}` : `${translate(helperText)}`}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
