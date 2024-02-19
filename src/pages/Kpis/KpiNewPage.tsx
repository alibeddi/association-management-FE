import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../routes/paths';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { UserForm } from '../../sections/@dashboard/Kpis/form';

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
          heading="Create a new Kpi"
          links={[
            {
              name: 'Kpi',
              href: PATH_DASHBOARD.kpis.root,
            },
            { name: 'New Kpi' },
          ]}
        />
        <UserForm />
      </Container>
    </>
  );
}
