import { Helmet } from 'react-helmet-async';
// @mui
import { Container,Button } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';

import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import StatsClientForm from '../../sections/@dashboard/statsClient/statsClientForm';

// sections

// ----------------------------------------------------------------------

export default function KpiNewPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Kpi: Create a new Kpi </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Create a new stats client"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'stats client',
              href: PATH_DASHBOARD.statsClient.root,
            },
            { name: 'New stats client' },
          ]}
          
        />
        <StatsClientForm/>
      </Container>
    </>
  );
}
