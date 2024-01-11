// form
import { useFormContext, Controller } from 'react-hook-form';
import { Tooltip, TextFieldProps } from '@mui/material';
import MuiPhoneNumber from 'material-ui-phone-number';
import { useLocales } from '../../locales';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
};

export default function RHFPhoneNumber({ name, helperText, label }: Props) {
  const { translate } = useLocales();
  const { control } = useFormContext();
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Tooltip title={`${translate(helperText)}` || `${translate(label)}`}>
          <div>
            <MuiPhoneNumber
              sx={{ '& svg': { height: '1em' } }}
              variant="outlined"
              name={name}
              label={`${translate(label)} `}
              onBlur={field.onBlur}
              InputProps={{
                onWheel: handleWheel,
              }}
              fullWidth
              onWheel={handleWheel}
              value={field.value}
              inputProps={{
                ref: field.ref,
              }}
              countryCodeEditable
              onChange={field.onChange}
              error={!!error}
              helperText={error && `${translate(error?.message)}`}
              defaultCountry="tn"
            />
          </div>
        </Tooltip>
      )}
    />
  );
}
