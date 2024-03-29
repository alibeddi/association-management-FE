import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { Note } from '../../../../@types/Note';
import { IStatus } from '../../../../@types/status';
import EmptyContent from '../../../../components/empty-content';
import Markdown from '../../../../components/markdown';
import { NoteDetailsSkeleton } from './NoteDetailsSkeleton';

// ----------------------------------------------------------------------

type Props = {
  note: Note | null;
  status: IStatus;
};

export default function NoteDetailsView({ note, status }: Props) {
  const renderSkeleton = <NoteDetailsSkeleton />;

  const renderError = (
    <EmptyContent
      title="Note Not Found"
      sx={{
        py: 20,
      }}
    />
  );

  const renderPost = note && (
    <>
      <Stack
        sx={{
          maxWidth: 720,
          mx: 'auto',
          mt: { xs: 5, md: 10 },
        }}
      >
        <Typography sx={{ textTransform: 'capitalize' }} variant="h4">
          {note?.title}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Markdown children={note?.content} />
      </Stack>
    </>
  );

  return (
    <Container maxWidth={false}>
      {status === IStatus.LOADING && renderSkeleton}
      {status === IStatus.SUCCEEDED ? renderPost : renderError}
    </Container>
  );
}
