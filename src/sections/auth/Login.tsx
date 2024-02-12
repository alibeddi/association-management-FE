import { useState } from 'react';
// @mui
import { Dialog, DialogTitle, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// auth
// layouts
import LoginLayout from '../../layouts/login';
//
import AuthLoginForm from './AuthLoginForm';


// ----------------------------------------------------------------------

export default function Login() {
   const [openForm, setOpenForm] = useState(false);
   const handleOpenModal = () => {
    setOpenForm(true);
  };
  const handleCloseModal = () => {
    setOpenForm(false);
  };
  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Sign in to مقراتنا</Typography>
      </Stack>
       <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        onClick={()=>handleOpenModal()}
        sx={{
          bgcolor: 'text.primary',
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          },
          mt:4
        }}
      >
        Login with takiacademy
      </LoadingButton>
      <Dialog fullWidth maxWidth="xs" open={openForm} onClose={handleCloseModal}>
        <DialogTitle>Login</DialogTitle>
       
        <AuthLoginForm />
      </Dialog>
    </LoginLayout>
  );
}
