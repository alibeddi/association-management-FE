import { Container } from '@mui/material';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { getOneNote } from '../../redux/slices/notes/actions';
import { dispatch, RootState, useSelector } from '../../redux/store';
import { PATH_DASHBOARD } from '../../routes/paths';
import { NoteForm } from '../../sections/@dashboard/Notes/form';

// ----------------------------------------------------------------------

export default function NoteEditPage() {
  const { themeStretch } = useSettingsContext();
  const { id: noteId } = useParams();
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    noteId && dispatch(getOneNote({ noteId }));
  }, [noteId]);
  const { note } = useSelector((state: RootState) => state.notes);
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
              name: 'Note',
              href: PATH_DASHBOARD.notes.root,
            },
            { name: 'Edit Note' },
          ]}
        />
        <NoteForm isEdit currentNote={note} />
      </Container>
    </>
  );
}
