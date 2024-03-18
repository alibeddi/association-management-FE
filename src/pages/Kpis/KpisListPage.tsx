import { Button, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { MethodCode, ModelCode } from '../../@types/Permission';
import { useAuthContext } from '../../auth/useAuthContext';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Iconify from '../../components/iconify';
import { useSettingsContext } from '../../components/settings';
import { useLocales } from '../../locales';
import { PATH_DASHBOARD } from '../../routes/paths';
import { KpisTable } from '../../sections/@dashboard/Kpis/list';
import { findPermission } from '../../sections/@dashboard/Permissions/utils';

export default function KpiListPage() {
  const { translate } = useLocales();
  const { themeStretch } = useSettingsContext();
  const { user } = useAuthContext();

  // check current user permissions
  const isAllowedToCreateKpi = findPermission(
    user?.permissionGroup,
    user?.extraPermissions,
    ModelCode.KPI,
    MethodCode.CREATE
  );

  return (
    <>
      <Helmet>
        <title>{`${translate('KPIS')}`}</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="KPIS"
          links={[{ name: 'KPIS' }]}
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
