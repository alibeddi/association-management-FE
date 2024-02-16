import { Tooltip } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import { Controller, useFormContext } from 'react-hook-form';
import { useLocales } from '../../locales';

type Props = {
  helperText?: string;
  label?: string;
  name: string;
  options: { [key: string]: boolean };
};
const RHFCheckboxGroup = ({ options, name, label, helperText }: Props) => {
  console.log(options);
  const { control } = useFormContext();
  const { translate } = useLocales();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref, ...field }, fieldState: { error } }) => {
        return (
          <Tooltip title={`${translate(helperText)}` || `${translate(label)}`}>
            <FormControl required component="fieldset" variant="standard">
              <FormLabel component="legend"> {`${translate(label)}`}</FormLabel>
              <FormGroup>
                {Object.keys(options).map((key) => {
                  return (
                    <FormControlLabel
                      label={key}
                      key={key}
                      control={
                        <Checkbox
                          {...field}
                          name={key}
                          // checked={value.some((option: string) => option === key)}
                          onChange={(event, checked) => {
                            if (checked) {
                              onChange([...value, event.target.name]);
                            } else {
                              onChange(
                                value.filter((value: string) => value !== event.target.name)
                              );
                            }
                          }}
                          inputRef={ref}
                        />
                      }
                    />
                  );
                })}
              </FormGroup>
              {(!!error || helperText) && (
                <FormHelperText error={!!error}>
                  {error ? `${translate(error?.message)}` : `${translate(helperText)}`}
                </FormHelperText>
              )}
            </FormControl>
          </Tooltip>
        );
      }}
    />
  );
};

export default RHFCheckboxGroup;
