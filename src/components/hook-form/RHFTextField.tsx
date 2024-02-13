// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps, Tooltip } from '@mui/material';
// translation
import { useLocales } from '../../locales';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  min?: number;
};

export default function RHFTextField({
  name,
  helperText,
  multiline,
  rows,
  type,
  inputRef,
  id,
  label,
  ...other
}: Props) {
  const { translate } = useLocales();
  const { control } = useFormContext();
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <Tooltip title={`${translate(helperText)}` || `${translate(label)}`}>
          <TextField
            {...field}
            name={name}
            label={`${translate(label)} `}
            onBlur={field.onBlur}
            InputProps={{
              onWheel: handleWheel,
            }}
            fullWidth
            onWheel={handleWheel}
            value={field.value === null ? '' : field.value}
            inputRef={field.ref}
            multiline={multiline !== undefined && true}
            rows={rows}
            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
              field.onChange(e);
            }}
            error={!!error}
            helperText={error && `${translate(error?.message)}`}
            {...other}
            type={type}
          />
        </Tooltip>
      )}
    />
  );
}
