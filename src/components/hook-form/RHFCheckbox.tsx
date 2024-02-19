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
