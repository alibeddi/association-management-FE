import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { Note } from '../../../@types/Note';
// components
import FormProvider, { RHFEditor, RHFTextField } from '../../../components/hook-form';
import { useSnackbar } from '../../../components/snackbar';
import { dispatch } from '../../../redux/store';
import { createNote } from '../../../redux/slices/notes/actions';
import { useLocales } from '../../../locales';

// ----------------------------------------------------------------------

export type FormValuesProps = Note;

export default function BlogNewPostForm() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
  });

  const defaultValues = {
    title: '',
    content: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const pattern = /data-id="([^"]*)"/g;
      const mentions = Array.from(data.content.matchAll(pattern), (m) => m[1]);
      console.log(mentions);
      dispatch(createNote({ ...data, mentions }))
        .unwrap()
        .then((res) => {
          enqueueSnackbar(`${translate(res.message)}`);
          reset();
          navigate(PATH_DASHBOARD.notes.root);
        })
        .catch((err) => enqueueSnackbar(`${translate(err.message)}`, { variant: 'error' }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="title" label="Post Title" />
              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Content
                </Typography>
                <RHFEditor simple name="content" />
              </Stack>
            </Stack>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Create Note
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
