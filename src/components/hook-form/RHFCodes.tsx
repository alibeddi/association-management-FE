import { useRef } from 'react';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Stack, TextField, TextFieldProps, Tooltip } from '@mui/material';
// hooks
import useEventListener from '../../hooks/useEventListener';
// translation
import { useLocales } from '../../locales';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  keyName: string;
  inputs: string[];
  codeLength?: number;
};

export default function RHFCodes({ keyName = '', inputs = [], codeLength = 8, ...other }: Props) {
  const codesRef = useRef<HTMLDivElement>(null);
  const { translate } = useLocales();

  const { control, setValue } = useFormContext();

  const handlePaste = (event: any) => {
    let data = event.clipboardData.getData('text');

    data = data.split('');

    inputs.map((input, index) => setValue(input, data[index]));

    event.preventDefault();
  };

  const handleChangeWithNextField = (
    event: React.ChangeEvent<HTMLInputElement>,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    const { maxLength, value, name } = event.target;

    const fieldIndex = name.replace(keyName, '');

    const fieldIntIndex = Number(fieldIndex);

    const nextfield: HTMLElement | null = document.querySelector(
      `input[name=${keyName}${fieldIntIndex + 1}]`
    );

    if (value.length > maxLength) {
      event.target.value = value[0];
    }

    if (value.length >= maxLength && fieldIntIndex < codeLength && nextfield !== null) {
      (nextfield as HTMLElement).focus();
    }

    handleChange(event);
  };

  useEventListener('paste', handlePaste, codesRef);

  return (
    <Stack direction="row" spacing={2} justifyContent="center" ref={codesRef}>
      {inputs.map((name, index) => (
        <Controller
          key={name}
          name={`${keyName}${index + 1}`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Tooltip title={`${translate(name)}`}>
              <TextField
                {...field}
                error={!!error}
                autoFocus={index === 0}
                placeholder="-"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleChangeWithNextField(event, field.onChange);
                }}
                onFocus={(event) => event.currentTarget.select()}
                InputProps={{
                  sx: {
                    width: { xs: 36, sm: 56 },
                    height: { xs: 36, sm: 56 },
                    '& input': { p: 0, textAlign: 'center' },
                  },
                }}
                inputProps={{
                  maxLength: 1,
                  type: 'string',
                }}
                {...other}
              />
            </Tooltip>
          )}
        />
      ))}
    </Stack>
  );
}
