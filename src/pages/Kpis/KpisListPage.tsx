import { Button, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { MethodCode, ModelCode } from '../../@types/Permission';
import { useAuthContext } from '../../auth/useAuthContext';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Iconify from '../../components/iconify';
import { useLocales } from '../../locales';
import { PATH_DASHBOARD } from '../../routes/paths';
import { KpisTable } from '../../sections/@dashboard/Kpis/list';
import { hasPermission } from '../../sections/@dashboard/Permissions/utils';

export default function KpiListPage() {
  const { translate } = useLocales();
  const { user } = useAuthContext();
  const userPermissions = user?.permissionGroup[0].permissions;

  // check current user permissions
  const isAllowedToCreateKpi = hasPermission(userPermissions, ModelCode.KPI, MethodCode.CREATE);

  return (
    <>
      <Helmet>
        <title>{`${translate('Kpis')}`}</title>
      </Helmet>
      <Container maxWidth={false}>
        <CustomBreadcrumbs
          heading="kpis"
          links={[{ name: 'kpis' }]}
          action={
            isAllowedToCreateKpi && (
              <Button
                component={RouterLink}
                to={PATH_DASHBOARD.kpis.new}
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                New Kpi
              </Button>
            )
          }
        />
        <KpisTable />
      </Container>
    </>
  );
}
