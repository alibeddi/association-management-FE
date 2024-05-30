import * as Yup from 'yup';
import { useMemo, useCallback, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/format-number';

import { countries } from 'src/assets/data';

import Label from 'src/components/label';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';

import { IUserItem } from 'src/types/user';
import { Autocomplete, Chip, TextField } from '@mui/material';
import { _roleType, _userType } from 'src/_mock';
import {  dispatch, useSelector } from 'src/redux/store';
import {  createNewUser } from 'src/redux/slices/user/userThunks';
import { fetchUserType } from 'src/redux/slices/userType/userTypeThunks';

// ----------------------------------------------------------------------

type Props = {
  currentUser?: IUserItem;
  id?:string
};

export default function UserNewEditForm({ currentUser }: Props) {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    firstName: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    verified: Yup.boolean(),

    password: Yup.string().required('password is required'),
    userType: Yup.string().required('password is required'),

    role: Yup.string().required('Role is required'),
    profilePicUrl: Yup.mixed<any>().nullable().required('Avatar is required'),

  });

  const defaultValues = useMemo(
    () => ({
      firstName: currentUser?.firstName || '',
     email:currentUser?.email|| '',
     userType:currentUser?.userType|| '',
      role: currentUser?.role || '',
      password: currentUser?.password || '',
      verified: currentUser?.verified || false,

      profilePicUrl: currentUser?.profilePicUrl || null,
 
    }),
    [currentUser]
  );
  const { userType, next, count, previous } = useSelector((state: any) => state.userType);
console.log(userType);

  useEffect(() => {
    
      dispatch(fetchUserType());

  }, []);
  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: {dirtyFields, isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
     
      const updatedFields = Object.keys(dirtyFields);

      const updatedData = Object.fromEntries(
        Object.entries(data).filter(([key]) => updatedFields.includes(key))
      );
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      dispatch(createNewUser(updatedData)).then((res: any) => {});
      enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.user.list);
      console.info('DATA', data);
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
        setValue('profilePicUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
           
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="profilePicUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

          
           
            {currentUser && (
              <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                <Button variant="soft" color="error">
                  Delete User
                </Button>
              </Stack>
            )}
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="firstName" label="Full Name" />
              <RHFTextField name="email" label="Email Address" />
            

              <RHFTextField name="password" label="Password" />
            
              <Controller
  name="role"
  control={methods.control}
  render={({ field }) => (
    <Autocomplete
      fullWidth
      value={field.value || ''}

      options={_roleType}
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
          label="Role"
         
          
          
        />
      )}
    />
  )}

/>           
   <Controller
  name="userType"
  control={methods.control}
  render={({ field }) => (
    <Autocomplete
      fullWidth
      value={userType.find((option: { _id: string; }) => option._id === field.value) || null}
      options={userType.map((option: { _id: any; name: any }) => ({
        id: option._id,
        name: option.name
      }))}
      getOptionLabel={(option:any) => option?.name }
      onChange={(event, newValue:any) => field.onChange(newValue?.id)}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            key={index}
            label={option?.name}
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
          label="User Type"
        />
      )}
    />
  )}
/>
       </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentUser ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
