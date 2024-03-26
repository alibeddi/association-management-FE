import { Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { Note } from '../../../../@types/Note';
import { IStatus } from '../../../../@types/status';
import { SkeletonPostItem } from '../../../../components/skeleton';
import { getAllNotes } from '../../../../redux/slices/notes/actions';
import { dispatch, RootState, useSelector } from '../../../../redux/store';
import NoteItemHorizontal from './NoteItem';
import NotesSearch from './NotesSearch';
import NotesSort from './NotesSort';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function NotesListPage() {
  const [notes, setNotes] = useState<Note[]>([]);

  const [sortBy, setSortBy] = useState('latest');

  const { notes: paginatedNotes, status } = useSelector((state: RootState) => state.notes);

  useEffect(() => {
    dispatch(
      getAllNotes({
        page: 1,
        limit: 10,
        order: sortBy === 'latest' ? 'desc' : 'asc',
        orderBy: 'createdAt',
      })
    );
  }, [sortBy]);

  useEffect(() => {
    setNotes(paginatedNotes.docs);
  }, [paginatedNotes]);

  const handleChangeSortBy = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(event.target.value);
  };

  return (
    <>
      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <NotesSearch />
        <NotesSort sortBy={sortBy} sortOptions={SORT_OPTIONS} onSort={handleChangeSortBy} />
      </Stack>

      <Grid container spacing={3}>
        {status === IStatus.LOADING &&
          [...Array(12)].map((_, index) => <SkeletonPostItem key={index} />)}
        {status === IStatus.SUCCEEDED && notes.length > 0 ? (
          notes.map((note, index) => (
            <Grid key={note._id} item xs={12} sm={6} md={(index === 0 && 6) || 3}>
              <NoteItemHorizontal note={note} />
            </Grid>
          ))
        ) : (
          <>not found</>
        )}
      </Grid>
    </>
  );
}
