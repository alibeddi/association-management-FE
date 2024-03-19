import { Button, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { MethodCode, ModelCode } from '../../@types/Permission';
import { RoleCode } from '../../@types/User';
import { useAuthContext } from '../../auth/useAuthContext';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Iconify from '../../components/iconify';
import { useSettingsContext } from '../../components/settings';
import { PATH_DASHBOARD } from '../../routes/paths';
import { findPermission } from '../../sections/@dashboard/Permissions/utils';
import StatsClientList from '../../sections/@dashboard/statsClient/StatsClientList';

const StatsClient = () => {
  const { themeStretch } = useSettingsContext();
  const { user } = useAuthContext();
  const isSuperAdmin = user?.role === RoleCode.SUPER_ADMIN;

  const isAllowedToCreateStatsClient =
    isSuperAdmin ||
    findPermission(
      user?.permissionGroup,
      user?.extraPermissions,
      ModelCode.STAT_CLIENT,
      MethodCode.CREATE
    );

  return (
    <>
      <Helmet>
        <title> stats client</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="stats-client"
          links={[{ name: 'stats-client' }]}
          action={
            isAllowedToCreateStatsClient && (
              <Button
                component={RouterLink}
                to={PATH_DASHBOARD.statsClient.new}
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                create stats client
              </Button>
            )
          }
        />
        <StatsClientList />
      </Container>
    </>
  );
};

export default StatsClient;
