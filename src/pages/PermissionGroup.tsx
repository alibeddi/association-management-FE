import { Container, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useSettingsContext } from 'src/components/settings';
import Permissions from 'src/sections/@dashboard/Permissions';

export default function PermissionGroup() {
  const { themeStretch } = useSettingsContext();
  return (
    <>
      <Helmet>
        <title>Group Permissions</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Dashboard
        </Typography>
        <Permissions />
      </Container>
    </>
  );
}
