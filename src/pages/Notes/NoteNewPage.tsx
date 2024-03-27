import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { PATH_DASHBOARD } from '../../routes/paths';
import { NoteForm } from '../../sections/@dashboard/Notes/form';

// ----------------------------------------------------------------------

export default function NoteNewPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Note: Create a new Note </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new Note"
          links={[
            {
              name: 'Notes',
              href: PATH_DASHBOARD.notes.root,
            },
            { name: 'create' },
          ]}
        />
        <NoteForm />
      </Container>
    </>
  );
}
