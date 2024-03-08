import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
// @mui
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// components
import { Notification } from '../../../@types/Notification';
import { IconButtonAnimate } from '../../../components/animate';
import Iconify from '../../../components/iconify';
import MenuPopover from '../../../components/menu-popover';
import Scrollbar from '../../../components/scrollbar';
import {
  getAllNotifications,
  getNotificationsCounts,
  marlAllNotificationsAsRead,
} from '../../../redux/slices/notifications/actions';
import { dispatch, RootState, useSelector } from '../../../redux/store';
import { PATH_DASHBOARD } from '../../../routes/paths';

// ---------------------------------------------------------------------

export default function NotificationsPopover() {
  const navigate = useNavigate();

  const { notifications: fetchedNotification, notificationCounts } = useSelector(
    (state: RootState) => state.notifications
  );
  const { unread } = notificationCounts;

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    dispatch(getAllNotifications({ page: 0, limit: 10 }));
    dispatch(getNotificationsCounts());
  }, []);

  useEffect(() => {
    setNotifications(fetchedNotification.docs);
  }, [fetchedNotification]);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleMarkAllAsRead = () => {
    dispatch(marlAllNotificationsAsRead());
  };

  return (
    <>
      <IconButtonAnimate
        color={openPopover ? 'primary' : 'default'}
        onClick={handleOpenPopover}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={unread} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 360, p: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {unread} unread messages
            </Typography>
          </Box>

          {unread > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {notifications.slice(0, 2).map((notification) => (
              <NotificationItem key={notification._id} notification={notification} />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Before that
              </ListSubheader>
            }
          >
            {notifications.slice(2, 5).map((notification) => (
              <NotificationItem key={notification._id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button
            onClick={() => {
              handleClosePopover();
              navigate(PATH_DASHBOARD.Notifications);
            }}
            fullWidth
            disableRipple
          >
            View All
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

export function NotificationItem({ notification }: { notification: Notification }) {
  const { from, message, seen, seenAt, doc, docModel, createdAt } = notification;

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{from?.avatar}</Avatar>
      </ListItemAvatar>

      <ListItemText
        disableTypography
        primary={message}
        secondary={
          <Stack direction="row" sx={{ mt: 0.5, typography: 'caption', color: 'text.disabled' }}>
            <Iconify icon="eva:clock-fill" width={16} sx={{ mr: 0.5 }} />
            <Typography variant="caption">{fToNow(createdAt)}</Typography>
          </Stack>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

export function NotificationRow({ notification }: { notification: Notification }) {
  const { from, message, seen, seenAt, doc, docModel, createdAt } = notification;
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <ListItem
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          flexGrow: 1,
        }}
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: 'background.neutral' }}>{from?.avatar}</Avatar>
        </ListItemAvatar>

        <ListItemText
          disableTypography
          primary={message}
          secondary={
            <Stack direction="row" sx={{ mt: 0.5, typography: 'caption', color: 'text.disabled' }}>
              <Iconify icon="eva:clock-fill" width={16} sx={{ mr: 0.5 }} />
              <Typography variant="caption">{fToNow(createdAt)}</Typography>
            </Stack>
          }
        />

        <IconButton
          size="large"
          color={openPopover ? 'inherit' : 'default'}
          onClick={handleOpenPopover}
        >
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Stack>

      <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="right-top">
        {!seen && (
          <MenuItem onClick={() => {}}>
            <Iconify icon="eva:checkmark-circle-2-fill" />
            Mark As Read
          </MenuItem>
        )}
        <MenuItem onClick={() => {}}>
          <Iconify icon="carbon:view-filled" />
          More Details
        </MenuItem>
      </MenuPopover>
    </ListItem>
  );
}
