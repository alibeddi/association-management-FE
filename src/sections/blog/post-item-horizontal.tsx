import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { fDate } from 'src/utils/format-time';

import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { useBoolean } from 'src/hooks/use-boolean';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { Button } from '@mui/material';
import { useCallback, useState } from 'react';
import { dispatch } from 'src/redux/store';
import { deletePost } from 'src/redux/slices/posts/projectThunks';

export const HOST_API = import.meta.env.VITE_HOST_API;
// ----------------------------------------------------------------------

type Props = {
  post: any;
};

export default function PostItemHorizontal({ post }: Props) {
  const popover = usePopover();
  const confirm = useBoolean();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const smUp = useResponsive('up', 'sm');

  const handleDeleteRow = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
      dispatch(deletePost(id)).then((res: any) => {
        confirm.onFalse();
        // Dispatch fetchPosts after successful deletion
      });

    
    },
    [confirm]
  );
  
  const {
    title,
    postPicUrl,
    postType,
    coverUrl,
    createdAt,
    totalViews,
    totalShares,
    totalComments,
    _id,
    content,
  } = post;
  const quickEdit = useBoolean();

  return (
    <>
      <Stack component={Card} direction="row">
        <Stack
          sx={{
            p: (theme) => theme.spacing(3, 3, 2, 3),
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Label variant="soft" color={(postType === 'published' && 'info') || 'default'}>
              {postType}
            </Label>

            <Box component="span" sx={{ typography: 'caption', color: 'text.disabled' }}>
              {fDate(createdAt)}
            </Box>
          </Stack>

          <Stack spacing={1} flexGrow={1}>
            <Link
              color="inherit"
              component={RouterLink}
              href={paths.dashboard.group.postdetails(_id)}
            >
              <TextMaxLine variant="subtitle2" line={2}>
                {title}
              </TextMaxLine>
            </Link>

            <TextMaxLine variant="body2" sx={{ color: 'text.secondary' }}>
            {content.slice(4)}            </TextMaxLine>
          </Stack>

          <Stack direction="row" alignItems="center">
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-horizontal-fill" />
            </IconButton>
          </Stack>
        </Stack>

        {smUp && (
          <Box
            sx={{
              width: 180,
              height: 240,
              position: 'relative',
              flexShrink: 0,
              p: 1,
            }}
          >
            <Avatar
              alt='authortitle'
              src={`${HOST_API}/${postPicUrl}`}
              sx={{ position: 'absolute', top: 16, right: 16, zIndex: 9 }}
            />
            <Image
              alt={title}
              src={
                postPicUrl
                  ? 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_2.jpg'
                  : `${HOST_API}/${postPicUrl}`
              }
              sx={{ height: 1, borderRadius: 1.5 }}
            />
          </Box>
        )}
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
            router.push(paths.dashboard.group.postdetails(_id));
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();

            router.push(paths.dashboard.group.postedit(_id));
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={(event) => handleDeleteRow(event, _id)}>
          Delete
        </Button>
        
        }
      />
    </>
  );
}
