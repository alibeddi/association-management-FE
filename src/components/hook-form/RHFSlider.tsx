// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Slider, SliderProps, FormHelperText, Tooltip } from '@mui/material';
// translation
import { useLocales } from '../../locales';

// ----------------------------------------------------------------------

type Props = SliderProps & {
  name: string;
  label: string;
  helperText?: React.ReactNode;
};

export default function RHFSlider({ name, label, helperText, ...other }: Props) {
  const { control } = useFormContext();
  const { translate } = useLocales();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Tooltip title={`${translate(label)}`}>
            <Slider {...field} valueLabelDisplay="auto" {...other} />
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
