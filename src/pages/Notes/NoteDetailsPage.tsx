import { Container } from '@mui/material';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { getOneNote } from '../../redux/slices/notes/actions';
import { dispatch, RootState, useSelector } from '../../redux/store';
import { PATH_DASHBOARD } from '../../routes/paths';
import { NoteDetailsView } from '../../sections/@dashboard/Notes/view';

// ----------------------------------------------------------------------

export default function NoteDetailsPage() {
  const { themeStretch } = useSettingsContext();
  const { id: noteId } = useParams();
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    noteId && dispatch(getOneNote({ noteId }));
  }, [noteId]);
  const { note, status } = useSelector((state: RootState) => state.notes);
  return (
    <>
      <Helmet>
        <title> Note: Edit </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit a Note"
          links={[
            {
              name: 'Notes',
              href: PATH_DASHBOARD.notes.root,
            },
            { name: 'Edit Note' },
          ]}
        />
        <NoteDetailsView note={note} status={status} />
      </Container>
    </>
  );
}
