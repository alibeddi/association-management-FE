import { useState } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Checkbox,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
import FormProvider from '../../components/hook-form/FormProvider';
import RHFTextField from '../../components/hook-form/RHFTextField';
import Iconify from '../../components/iconify';
import { PATH_AUTH } from '../../routes/paths';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  password: string;
  afterSubmit?: string;
};

export default function AuthLoginForm() {
  const { login } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    const fakeEmail = 'fake@example.com';
    const fakePassword = 'password123';

    try {
      if (data.email === fakeEmail && data.password === fakePassword) {
        // Simulate login success
        console.log('Logged in with fake credentials');
      } else {
        // Use the actual login method if credentials do not match the fake ones
        await login(data.email, data.password);
      }
    } catch (error) {
      setError('afterSubmit', {
        ...error,
        message: error?.message || 'Invalid credentials',
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={0} sx={{ p: 1 }}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="email" label="Email address" sx={{ my: 2 }} />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Stack
          direction="row"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          spacing={0}
        >
          <Stack
            direction="row"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            spacing={0}
          >
            <Checkbox />
            <Typography variant="body2">Remember me?</Typography>
          </Stack>
          <Typography variant="body2" style={{ color: '#3A57E8' }}>
            Forget password
          </Typography>
        </Stack>
        <Link component={RouterLink} to={PATH_AUTH.register} variant="subtitle2">
          Create an account
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        color="inherit"
        type="submit"
        variant="contained"
        loading={isSubmitSuccessful || isSubmitting}
        sx={{
          bgcolor: '#3A57E8',
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          },
          m: '1rem 2.5rem',
          width: '50%',
        }}
      >
        Login
      </LoadingButton>
    </FormProvider>
  );
}
