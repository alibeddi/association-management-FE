import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { useSnackbar } from 'notistack';
import { Note } from '../../../../@types/Note';
import CustomPopover, { usePopover } from '../../../../components/custom-popover';
import Iconify from '../../../../components/iconify';
import TextMaxLine from '../../../../components/text-max-line';
import { useLocales } from '../../../../locales';
import { deleteOneNote } from '../../../../redux/slices/notes/actions';
import { dispatch } from '../../../../redux/store';
import RouterLink from '../../../../routes/components/router-link';
import { useRouter } from '../../../../routes/hooks/use-router';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { fDate } from '../../../../utils';

// ----------------------------------------------------------------------

type Props = {
  note: Note;
};

function NoteItemHorizontal({ note }: Props) {
  const popover = usePopover();

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();

  const { _id, title, author, createdAt, content } = note;

  const handleDeleteNote = (id: string) => {
    dispatch(deleteOneNote({ noteId: id }))
      .unwrap()
      .then((res) => {
        enqueueSnackbar(`${translate(res.message)}`);
      })
      .catch((err) => enqueueSnackbar(`${translate(err.message)}`, { variant: 'error' }));
  };

  return (
    <>
      <Stack component={Card} direction="row">
        <Stack
          sx={{
            p: (theme) => theme.spacing(3, 3, 2, 3),
            flexGrow: 1,
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="justify-end">
              <Box component="span" sx={{ typography: 'caption', color: 'text.disabled' }}>
                {fDate(createdAt)}
              </Box>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Box component="span" sx={{ typography: 'caption', color: 'text.disabled' }}>
                Created by {author?.username || 'Anonymous Admin'}
              </Box>
            </Stack>
          </Stack>

          <Stack spacing={1} flexGrow={1}>
            <Link color="inherit" component={RouterLink} href={PATH_DASHBOARD.notes.view(_id)}>
              <TextMaxLine variant="subtitle2" line={2}>
                {title}
              </TextMaxLine>
            </Link>
            <TextMaxLine variant="body2" sx={{ color: 'text.secondary' }}>
              <span dangerouslySetInnerHTML={{ __html: content }} />
            </TextMaxLine>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="end">
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-horizontal-fill" />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="bottom-center"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            router.push(PATH_DASHBOARD.notes.view(_id));
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            router.push(PATH_DASHBOARD.notes.edit(_id));
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            handleDeleteNote(_id);
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}
export default NoteItemHorizontal;
