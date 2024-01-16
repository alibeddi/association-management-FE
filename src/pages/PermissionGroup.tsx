import { Container, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useSettingsContext } from 'src/components/settings';
import PermissionTable from 'src/sections/@dashboard/Permissions/PermissionTable';

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
        <PermissionTable
          actions={['edit', 'delete', 'create']}
          entities={['user', 'permission']}
          permissionsAsString={undefined}
          groupPermissions={{
            name: 'jsf',
            permissions: [
              { model: 'user', method: 'edit' },
              { model: 'user', method: 'delete' },
              { model: 'user', method: 'create' },
              { model: 'permission', method: 'edit' },
              { model: 'permission', method: 'delete' },
              { model: 'permission', method: 'create' },
            ],
          }}
        />
      </Container>
    </>
  );
}
