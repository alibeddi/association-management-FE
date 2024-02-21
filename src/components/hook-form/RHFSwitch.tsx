// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  Switch,
  FormControlLabel,
  FormControlLabelProps,
  FormHelperText,
  Tooltip,
} from '@mui/material';
// translation
import { useLocales } from '../../locales';

// ----------------------------------------------------------------------

interface Props extends Omit<FormControlLabelProps, 'control'> {
  name: string;
  label: string;
  helperText?: React.ReactNode;
  disabled?: boolean;
}

export default function RHFSwitch({ name, label, helperText, disabled = false, ...other }: Props) {
  const { control } = useFormContext();
  const { translate } = useLocales();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue="false"
      render={({ field, fieldState: { error } }) => (
        <>
          <Tooltip title={`${translate(helperText)}` || `${translate(label)}`}>
            <FormControlLabel
              disabled={disabled}
              label={`${translate(label)} `}
              onBlur={field.onBlur}
              control={
                <Switch
                  {...field}
                  readOnly
                  checked={
                    field?.value === undefined ||
                    field?.value === '' ||
                    typeof JSON.parse(field.value) !== 'boolean'
                      ? false
                      : JSON.parse(field?.value)
                  }
                />
              }
              {...other}
            />
          </Tooltip>
          {!!error && (
            <FormHelperText error={!!error}>
              {error && `${translate(error?.message)}`}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
}
