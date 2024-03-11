import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useSettingsContext } from '../../components/settings';
import UserListPage from '../../sections/@dashboard/user';

 export default function UserList() {
  const { themeStretch } = useSettingsContext();
  return (
    <>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <UserListPage />
      </Container>
    </>
  );
}
