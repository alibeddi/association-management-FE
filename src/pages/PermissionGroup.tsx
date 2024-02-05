import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useSettingsContext } from '../components/settings';
import Permissions from '../sections/@dashboard/Permissions';

export default function PermissionGroup() {
  const { themeStretch } = useSettingsContext();
  return (
    <>
      <Helmet>
        <title>Group Permissions</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Permissions />
      </Container>
    </>
  );
}
