import { useState } from 'react';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  Checkbox,
  FormLabel,
  FormGroup,
  FormControl,
  FormHelperText,
  FormControlLabel,
  FormControlLabelProps,
  Tooltip,
  formControlLabelClasses,
} from '@mui/material';

// translation
import { useLocales } from '../../locales';

// ----------------------------------------------------------------------

interface RHFCheckboxProps extends Omit<FormControlLabelProps, 'control'> {
  name: string;
  helperText?: React.ReactNode;
}

export function RHFCheckbox({ name, helperText, label, ...other }: RHFCheckboxProps) {
  const { control } = useFormContext();
  const { translate } = useLocales();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Tooltip title={`${translate(helperText)}` || `${translate(name)}`}>
            <FormControlLabel
              label={`${translate(label)}`}
              control={<Checkbox {...field} checked={field.value} />}
              {...other}
            />
          </Tooltip>
          {(!!error || helperText) && (
            <FormHelperText error={!!error}>
              {error ? `${translate(error?.message)}` : `${translate(helperText)}`}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
}

// ----------------------------------------------------------------------

interface RHFMultiCheckboxProps extends Omit<FormControlLabelProps, 'control' | 'label'> {
  name: string;
  options: { label: string; value: any }[];
  row?: boolean;
  label?: string;
  spacing?: number;
  helperText?: React.ReactNode;
}

export function RHFMultiCheckbox({
  row,
  name,
  label,
  options,
  spacing,
  helperText,
  sx,
  ...other
}: RHFMultiCheckboxProps) {
  const { control } = useFormContext();
  const getSelected = (selectedItems: string[], item: string) =>
    selectedItems?.includes(item)
      ? selectedItems.filter((value) => value !== item)
      : [...selectedItems, item];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset">
          {label && (
            <FormLabel component="legend" sx={{ typography: 'body2' }}>
              {label}
            </FormLabel>
          )}

          <FormGroup
            sx={{
              ...(row && {
                flexDirection: 'row',
              }),
              [`& .${formControlLabelClasses.root}`]: {
                '&:not(:last-of-type)': {
                  mb: spacing || 0,
                },
                ...(row && {
                  mr: 0,
                  '&:not(:last-of-type)': {
                    mr: spacing || 2,
                  },
                }),
              },
              ...sx,
            }}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    checked={field?.value?.includes(option.value)}
                    onChange={() => field.onChange(getSelected(field.value || [], option.value))}
                  />
                }
                label={option.label}
                {...other}
              />
            ))}
          </FormGroup>

          {(!!error || helperText) && (
            <FormHelperText error={!!error} sx={{ mx: 0 }}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
