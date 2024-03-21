import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { PATH_DASHBOARD } from '../../routes/paths';
import { NoteForm } from '../../sections/@dashboard/Notes';

// ----------------------------------------------------------------------

export default function NoteNewPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Note: Create a new Note </title>
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
        <NoteForm />
      </Container>
    </>
  );
}
