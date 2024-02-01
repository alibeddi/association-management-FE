import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextFieldProps, Tooltip, FormHelperText, Stack, TextField } from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';

// translation
import { useLocales } from '../../locales';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  min?: number;
  isEditReservation?: Boolean;
  isDisabled?: Boolean | any;
};

export default function RHFDateTimePicker({
  name,
  helperText,
  multiline,
  rows,
  type,
  inputRef,
  id,
  label,
  isEditReservation,
  isDisabled,
  ...other
}: Props) {
  const { translate } = useLocales();
  const { control, setValue } = useFormContext();
  const [isOpened, setIsOpened] = useState(false);

  const handlePickerChange = (value: unknown) => {
    setValue(name, value, { shouldValidate: true });
  };
  const currentDate = new Date();
  const roundedMinutes = Math.ceil(currentDate.getMinutes() / 15) * 15;
  const getPickerValue = (value: Date) => {
    if (isOpened) {
      if (['endDate', 'startDate'].includes(name)) {
        currentDate.setMinutes(roundedMinutes);
      } else {
        currentDate.setMinutes(currentDate.getMinutes());
      }
      if (value !== null && value !== undefined) {
        return new Date(value);
      }
      setValue(name, new Date(currentDate), { shouldValidate: true });
      return new Date(currentDate);
    }

    return value ? new Date(value) : null;
  };

  return (
    <Controller
      name={name}
      defaultValue={null}
      control={control}
      render={({ field: { value }, fieldState: { error } }:any) => {
        const pickerValue = getPickerValue(value);
        return (
          <Stack sx={{ display: 'flex', flexDirection: 'column', gap: 0.2 }}>
            <Tooltip title={`${translate(label)}`}>
              <MobileDateTimePicker
                label={`${translate(label)}`}
                value={pickerValue}
                onChange={handlePickerChange}
                minutesStep={['endDate', 'startDate'].includes(name) ? 15 : 5}
                onOpen={() => setIsOpened(true)}
                renderInput={(props) => <TextField {...props} />}
                // slotProps={{
                //   textField: {
                //     error: false,
                //   },
                // }}
                // sx={{
                //   '& .MuiInputLabel-root': {
                //     color: error && typeof error?.message === 'string' ? '#FF5630' : undefined,
                //   },
                //   '& .MuiOutlinedInput-root': {
                //     '& fieldset': {
                //       borderColor:
                //         error && typeof error?.message === 'string' ? '#FF5630' : undefined,
                //     },
                //     '&:hover fieldset': {
                //       borderColor:
                //         error && typeof error?.message === 'string' ? '#FF5630' : undefined,
                //     },
                //     '&.Mui-focused fieldset': {
                //       borderColor: 'black',
                //     },
                //     '& .MuiInputLabel-root.Mui-focused': {
                //       color: 'black',
                //     },
                //   },
                // }}
                // format="dd/MM/yyyy HH:mm"
              />
            </Tooltip>

            {(!!error || helperText) && (
              <FormHelperText error={!!error}>
                {error ? `${translate(error?.message)}` : `${translate(helperText)}`}
              </FormHelperText>
            )}
          </Stack>
        );
      }}
    />
  );
}
