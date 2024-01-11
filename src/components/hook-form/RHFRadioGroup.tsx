// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  Radio,
  FormLabel,
  RadioGroup,
  FormControl,
  FormHelperText,
  RadioGroupProps,
  FormControlLabel,
  Tooltip,
} from '@mui/material';
// translation
import { useLocales } from '../../locales';

// ----------------------------------------------------------------------

type Props = RadioGroupProps & {
  name: string;
  options: { label: string; value: any }[];
  label?: string;
  spacing?: number;
  helperText?: React.ReactNode;
};

export default function RHFRadioGroup({
  row,
  name,
  label,
  options,
  spacing,
  helperText,

  ...other
}: Props) {
  const { control } = useFormContext();
  const labelledby = label ? `${name}-${label}` : '';
  const { translate } = useLocales();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Tooltip title={`${translate(helperText)}` || `${translate(label)}`}>
          <FormControl component="fieldset">
            {label && (
              <FormLabel component="legend" id={labelledby} sx={{ typography: 'body2' }}>
                {`${translate(label)}`}
              </FormLabel>
            )}
            <RadioGroup
              {...field}
              aria-labelledby={labelledby}
              row={row}
              value={field.value !== undefined && !Number.isNaN(field.value) && field.value}
              onBlur={field.onBlur}
              {...other}
            >
              {options.map((option) => (
                <FormControlLabel
                  key={
                    option.value !== undefined &&
                    !Number.isNaN(option.value) &&
                    option.value.toString()
                  }
                  value={
                    option.value !== undefined &&
                    !Number.isNaN(option.value) &&
                    option.value.toString()
                  }
                  control={<Radio />}
                  label={`${translate(option.label)}`}
                  sx={{
                    '&:not(:last-of-type)': {
                      mb: spacing || 0,
                    },
                    ...(row && {
                      mr: 0,
                      '&:not(:last-of-type)': {
                        mr: spacing || 2,
                      },
                    }),
                  }}
                />
              ))}
            </RadioGroup>

            {(!!error || helperText) && (
              <FormHelperText error={!!error}>
                {error ? `${translate(error?.message)}` : `${translate(helperText)}`}
              </FormHelperText>
            )}
          </FormControl>
        </Tooltip>
      )}
    />
  );
}
