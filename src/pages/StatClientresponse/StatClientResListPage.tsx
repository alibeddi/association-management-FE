import { Button, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { MethodCode, ModelCode } from '../../@types/Permission';
import { useAuthContext } from '../../auth/useAuthContext';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Iconify from '../../components/iconify';
import { useLocales } from '../../locales';
import { PATH_DASHBOARD } from '../../routes/paths';
import { hasPermission } from '../../sections/@dashboard/Permissions/utils';
import { StatClientResponsesTables } from '../../sections/@dashboard/statClientResponse/list';

export default function ClientStatusListPage() {
  const { translate } = useLocales();
  const { user } = useAuthContext();
  const userPermissions = user?.permissionGroup[0].permissions;

  // replace the kpi with client status later
  const isAllowedToCreateClientStatus = hasPermission(
    userPermissions,
    ModelCode.KPI,
    MethodCode.CREATE
  );

  return (
    <>
      <Helmet>
        <title>{`${translate('client status')}`}</title>
      </Helmet>

      <Container maxWidth={false}>
        <CustomBreadcrumbs
          heading="client status"
          links={[{ name: 'client-status' }]}
        />
        <StatClientResponsesTables />
      </Container>
    </>
  );
}
