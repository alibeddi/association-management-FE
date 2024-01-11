import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextFieldProps, Tooltip, FormHelperText, Stack } from '@mui/material';
import { DesktopDateTimePicker, MobileDateTimePicker } from '@mui/x-date-pickers';
// redux

// translation
import { useLocales } from '../../locales';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  min?: number;
  isDisabled?: Boolean | any;
};

export default function RHFDesktopDateTimePicker({
  name,
  helperText,
  multiline,
  rows,
  type,
  inputRef,
  id,
  label,
  isDisabled,
  ...other
}: Props) {
  const { translate } = useLocales();
  const { control, setValue } = useFormContext();
  const [isOpened, setIsOpened] = useState(false);
 
  const handlePickerChange = (value: Date | null) => {
    setValue(name, value, { shouldValidate: true });
  };
  const currentDate = new Date();

  const getPickerValue = (value: Date) => {
    if (isOpened) {
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
      render={({ field: { value }, fieldState: { error } }) => {
        const pickerValue = getPickerValue(value);
        return (
          <Stack sx={{ display: 'flex', flexDirection: 'column', gap: 0.2 }}>
            <Tooltip title={`${translate(label)}`}>
              <DesktopDateTimePicker
                value={pickerValue}
                onChange={handlePickerChange}
                onOpen={() => setIsOpened(true)}
                sx={{
                  '& .MuiInputLabel-root': {
                    color: typeof error?.message === 'string' ? '#FF5630' : undefined,
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: typeof error?.message === 'string' ? '#FF5630' : undefined,
                    },
                    '&:hover fieldset': {
                      borderColor: typeof error?.message === 'string' ? '#FF5630' : undefined,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'black',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: 'black',
                    },
                  },
                }}
                format="dd/MM/yyyy HH:mm"
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
