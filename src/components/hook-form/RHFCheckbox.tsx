import { useEffect, useState } from 'react';
// form
import { useFormContext, Controller, useForm } from 'react-hook-form';
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

// ----------------------------------------------------------------------

interface RHFMultiCheckboxProps extends Omit<FormControlLabelProps, 'control' | 'label'> {
  name: string;
  options: { label: string; value: any }[];
  row?: boolean;
  label?: string;
  spacing?: number;
  helperText?: React.ReactNode;
  values?: any;
}

export function RHFMultiCheckbox({
  row,
  name,
  label,
  options,
  spacing,
  helperText,
  values,
  ...other
}: RHFMultiCheckboxProps) {
  const { control } = useFormContext();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const { translate } = useLocales();

  const handleCheckboxChange = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((value) => value !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
   
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
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
                flexWrap: 'nowrap',
              }),
              '& .MuiFormControlLabel-root': {
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
            }}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    checked={selectedOptions && selectedOptions?.includes(option.value)}
                    onChange={() => handleCheckboxChange(option.value)}
                  />
                }
                label={`${translate(option.label)} `}
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
