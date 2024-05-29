import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useEffect, useCallback } from 'react';

import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { _postType } from 'src/_mock';

import { CustomFile } from 'src/components/upload';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFEditor,
  RHFUpload,
  RHFTextField,
} from 'src/components/hook-form'

import { IPostItem } from 'src/types/blog';

import PostDetailsPreview from './post-details-preview';
import { dispatch } from 'src/redux/store';
import { createNewPost, updatePost } from 'src/redux/slices/posts/projectThunks';
import { Autocomplete, TextField } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  currentPost?: IPostItem;
  isEdit?:any
  id?:string
};

export default function PostNewEditForm({ currentPost,isEdit,id }: Props) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const preview = useBoolean();

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
    postPicUrl: Yup.mixed<any>().nullable().required('postPicUrl is required'),
    postType: Yup.string().required('postType is required'),

  });
console.log(currentPost);

  const defaultValues = useMemo(
    () => ({
      title: currentPost?.title || '',
     
      content: currentPost?.content || '',
      postPicUrl: currentPost?.postPicUrl || null,
      postType: currentPost?.postType || ''
      
    }),
    [currentPost]
  );

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { dirtyFields,isSubmitting, isValid },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentPost) {
      reset(defaultValues);
    }
  }, [currentPost, defaultValues, reset]);
  const onSubmit = handleSubmit(async (data) => {
    try {
      const updatedFields = Object.keys(dirtyFields);

      const updatedDatas = Object.fromEntries(
        Object.entries(data).filter(([key]) => updatedFields.includes(key))
      );
      const updatedData = {
        ...data,
        postPicUrl: data.postPicUrl && typeof data.postPicUrl === 'object' ? data.postPicUrl.path : data.postPicUrl
      };
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      preview.onFalse();
      
  
        if (!isEdit) {
          dispatch(createNewPost(updatedData)).then((res: any) => {});
          router.push(paths.dashboard.group.root);
          enqueueSnackbar('post created successfully!');


        } else {
      dispatch(updatePost({ id, data: updatedDatas })).then((res: string) => {
        router.push(paths.dashboard.group.root);
        enqueueSnackbar('post updated successfully!');

      });         
        }
      console.info('DATA', updatedData);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('postPicUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(() => {
    setValue('postPicUrl', null);
  }, [setValue]);

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Title, short description, image...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="title" label="Post Title" />


            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Content</Typography>
              <RHFEditor simple name="content" />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Cover</Typography>
              <RHFUpload
                name="postPicUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                onDelete={handleRemoveFile}
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderProperties = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Properties
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Additional functions and attributes...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Properties" />}

          <Stack spacing={3} sx={{ p: 3 }}>
        
       <Controller
  name="postType"
  control={methods.control}
  render={({ field }) => (
    <Autocomplete
      fullWidth
      value={field.value || ''}

      options={_postType}
      freeSolo
      onChange={(event, newValue) => field.onChange(newValue)}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            key={index}
            label={option}
            size="small"
            color="info"
            variant="soft"
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          {...field}
          label="postType"
         
          
          
        />
      )}
    />
  )}
/>

           


          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
   



        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2 }}
        >
          {!currentPost ? 'Create Post' : 'Save Changes'}
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}

        {renderProperties}

        {renderActions}
      </Grid>

      <PostDetailsPreview
        title={values.title}
        content={values.content}
        postPicUrl={
          typeof values.postPicUrl === 'string'
            ? values.postPicUrl
            : `${(values.postPicUrl as CustomFile)?.preview}`
        }
        //
        open={preview.value}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={preview.onFalse}
        onSubmit={onSubmit}
      />
    </FormProvider>
  );
}
