// @mui
import { Stack, Typography } from '@mui/material';
// auth
// layouts
import LoginLayout from '../../layouts/login';
//
import AuthLoginForm from './AuthLoginForm';
import AuthWithSocial from './AuthWithSocial';

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Sign in to مقراتنا</Typography>
      </Stack>
      <AuthLoginForm />
    </LoginLayout>
  );
}
