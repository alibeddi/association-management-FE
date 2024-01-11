import { useCallback } from 'react';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText, Typography, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
// components
import { UploadAvatar, Upload, UploadBox, UploadProps } from '../upload';
// translation
import { useLocales } from '../../locales';
import { fData } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

interface Props extends Omit<UploadProps, 'file'> {
  name: string;
  label: string;
  multiple?: boolean;
}

// ----------------------------------------------------------------------

export function RHFUploadAvatar({ name, helperText, ...other }: Props) {
  const { translate } = useLocales();
  const { control, setValue } = useFormContext();

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue(name, newFile, { shouldValidate: true });
      }
    },
    [setValue, name]
  );
  const handleRemoveFile = () => {
    setValue(name, '', { shouldValidate: true });
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <UploadAvatar
            ModelImage="Logo *"
            accept={{
              'image/*': [],
            }}
            error={!!error}
            file={field.value}
            onDrop={handleDrop}
            onDelete={handleRemoveFile}
            helperText={
              <Typography
                variant="caption"
                sx={{
                  mt: 2,
                  mx: 'auto',
                  display: 'block',
                  textAlign: 'center',
                  color: 'text.secondary',
                }}
              >
                {`${translate('Allowed *.jpeg, *.jpg, *.png, *.gif')}`}

                <br />
                {`${translate(`max size of`)}`}
                {fData(3145728)}

                {field.value && (
                  <IconButton onClick={handleRemoveFile} color="error" aria-label="delete">
                    <CancelIcon color="error" />
                  </IconButton>
                )}
              </Typography>
            }
            {...other}
          />
          {!!error && (
            <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
              {`${translate(error?.message)}`}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
}

// ----------------------------------------------------------------------

export function RHFUploadBox({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <UploadBox files={field.value} error={!!error} {...other} />
      )}
    />
  );
}

// ----------------------------------------------------------------------

export function RHFUpload({ name, multiple, helperText, files, label, ...other }: Props) {
  const { control, setValue } = useFormContext();
  const { translate } = useLocales();
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      if (file) {
        setValue(name, newFile, { shouldValidate: true });
      }
    },
    [setValue, name]
  );
  const handleRemoveFile = () => {
    setValue(name, '', { shouldValidate: true });
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) =>
        multiple ? (
          <Upload
            multiple
            accept={{ 'image/*': [] }}
            files={field.value}
            onDrop={handleDrop}
            onDelete={handleRemoveFile}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <FormHelperText error={!!error} sx={{ px: 2 }}>
                  {error ? `${translate(error?.message)}` : `${translate(helperText)}`}
                </FormHelperText>
              )
            }
            {...other}
          />
        ) : (
          <Upload
            accept={{ 'image/*': [] }}
            thumbnail={field.value}
            file={field.value}
            error={!!error}
            onDrop={handleDrop}
            onDelete={handleRemoveFile}
            helperText={
              (!!error || helperText) && (
                <FormHelperText error={!!error} sx={{ px: 2 }}>
                  {error ? `${translate(error?.message)}` : `${translate(helperText)}`}
                </FormHelperText>
              )
            }
            {...other}
          />
        )
      }
    />
  );
}
