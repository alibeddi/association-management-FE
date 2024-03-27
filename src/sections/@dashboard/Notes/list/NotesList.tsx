import { Box, Grid, Pagination, paginationClasses, Stack } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { Note } from '../../../../@types/Note';
import { IStatus } from '../../../../@types/status';
import EmptyContent from '../../../../components/empty-content';
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
  const [page, setPage] = useState(1);
  // limit of items per page
  const limit = 8;

  const { notes: paginatedNotes, status } = useSelector((state: RootState) => state.notes);

  useEffect(() => {
    dispatch(
      getAllNotes({
        page,
        limit,
        order: sortBy === 'latest' ? 'desc' : 'asc',
        orderBy: 'createdAt',
      })
    );
  }, [sortBy, page]);

  useEffect(() => {
    setNotes(paginatedNotes.docs);
  }, [paginatedNotes]);

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeSortBy = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(event.target.value);
  };

  return (
    <>
      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <NotesSearch />
        <NotesSort sortBy={sortBy} sortOptions={SORT_OPTIONS} onSort={handleChangeSortBy} />
      </Stack>

      {status === IStatus.SUCCEEDED && notes.length > 0 ? (
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          {notes.map((note, index) => (
            <Grid key={note._id} item xs={12} sm={6} md={(index === 0 && 6) || 3}>
              <NoteItemHorizontal note={note} />
            </Grid>
          ))}
        </Box>
      ) : (
        <EmptyContent
          title="No Notes Yet..."
          sx={{
            '& span.MuiBox-root': { height: 160 },
          }}
        />
      )}

      <Grid container spacing={3}>
        {status === IStatus.LOADING &&
          [...Array(12)].map((_, index) => <SkeletonPostItem key={index} />)}
      </Grid>
      {paginatedNotes.meta?.totalDocs > limit && (
        <Pagination
          page={page}
          count={paginatedNotes.meta?.totalPages}
          onChange={handleChangePage}
          sx={{
            mt: 8,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
        />
      )}
    </>
  );
}
