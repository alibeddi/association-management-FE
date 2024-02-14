import { useState } from 'react';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Autocomplete, AutocompleteProps, TextField, Tooltip } from '@mui/material';
// translation
import { useLocales } from '../../locales';

// ----------------------------------------------------------------------

interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  label?: string;
  helperText?: React.ReactNode;
  codeInOrderOfName?: boolean;
  soloSelected?: boolean;
}

export default function RHFAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({
  name,
  label,
  helperText,
  options,
  soloSelected = false,
  ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {
  const { control } = useFormContext();
  const { translate } = useLocales();
  function isObjectEmpty(obj: any): boolean {
    if (typeof obj === 'object' && obj !== null) {
      return Object.keys(obj).length === 0;
    }

    return true;
  }
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field, fieldState: { error } }) => (
        <Tooltip title={`${translate(helperText)}` || `${translate(label)}`}>
          <Autocomplete
            {...field}
            onChange={(_, data) => {
              const myArray: any[] = data as any[];
              if (soloSelected && myArray && myArray?.length > 0) {
                console.log({ myArray });
                //
                field.onChange([myArray?.pop()]);
              } else {
                field.onChange(myArray);
              }
            }}
            options={options}
            value={isObjectEmpty(field.value) ? [] : field.value}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                label={`${translate(label)} `}
                name={name}
                error={!!error}
                value={field.value}
                inputRef={field.ref}
                helperText={error && `${translate(error?.message)} `}
                {...params}
              />
            )}
            {...other}
          />
        </Tooltip>
      )}
    />
  );
}

export function RHFAutocompleteOne<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({
  name,
  label,
  helperText,
  codeInOrderOfName,
  options,
  ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {
  const { control } = useFormContext();
  const [textFieldValue, setTextFieldValue] = useState('');
  const { translate } = useLocales();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field, fieldState: { error } }) => (
        <Tooltip title={`${translate(helperText)}` || `${translate(label)}`}>
          <Autocomplete
            {...field}
            onChange={(_, data) => {
              field.onChange((data as any)?.id);
            }}
            options={
              textFieldValue !== ''
                ? options.filter((value: any) =>
                    codeInOrderOfName
                      ? `${translate(value?.code)}`
                          ?.toLowerCase()
                          .includes(`${translate(textFieldValue)}`?.toLowerCase())
                      : `${translate(value?.name)}`
                          ?.toLowerCase()
                          .includes(`${translate(textFieldValue)}`?.toLowerCase())
                  )
                : options
            }
            filterOptions={(optionFiltered, state) => optionFiltered}
            value={field.value}
            renderInput={(params) => (
              <TextField
                label={`${translate(label)}`}
                name={name}
                error={!!error}
                value={textFieldValue}
                onChange={(e) => setTextFieldValue(e.target.value)}
                helperText={error ? `${translate(error?.message)}` : `${translate(helperText)}`}
                {...params}
              />
            )}
            {...other}
          />
        </Tooltip>
      )}
    />
  );
}
