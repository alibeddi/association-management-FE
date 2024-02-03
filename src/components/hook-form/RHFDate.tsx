// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText, Stack, TextField, TextFieldProps, Tooltip } from '@mui/material';
import { DatePicker,CalendarPickerView } from '@mui/x-date-pickers';
// translation
import { useLocales } from '../../locales';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  min?: number;
  inputFormat?: string;
  isDisabled?: boolean;
  views?: CalendarPickerView[] | undefined;
  format:string;
};

export default function RHFDate({
  name,
  inputFormat,
  helperText,
  multiline,
  rows,
  type,
  inputRef,
  id,
  label,
  isDisabled,
  views,

  ...other
}: Props) {
  const { control, setValue } = useFormContext();
  const { translate } = useLocales();
  const today = new Date();
  today.setHours(0, 0, 0);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack sx={{ display: 'flex', flexDirection: 'column' }}>
          <Tooltip title={`${translate(helperText)}` || `${translate(label)}`}>
            <DatePicker
              views={views}
              label={`${translate(label)} `}
              disabled={isDisabled}
              value={field.value ? new Date(field?.value) : null}
              onOpen={() => {
                setValue(name, field.value ? new Date(field?.value) : new Date(today));
              }}
              renderInput={(props)=> <TextField {...props} />}
              onChange={(newValue: Date | null) => {
                field.onChange(newValue);
              }}
            />
          </Tooltip>

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>
              {error ? `${translate(error?.message)}` : `${translate(helperText)}`}
            </FormHelperText>
          )}
        </Stack>
      )}
    />
  );
}
