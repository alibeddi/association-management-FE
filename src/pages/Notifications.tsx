import { Button, Card, Container, Divider, Grid, Stack, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Notification } from '../@types/Notification';
import CustomBreadcrumbs from '../components/custom-breadcrumbs';
import EmptyContent from '../components/empty-content';
import Iconify from '../components/iconify';
import Label from '../components/label';
import { TablePaginationCustom, useTable } from '../components/table';
import {
  NotificationItem,
  NotificationRow,
} from '../layouts/dashboard/header/NotificationsPopover';
import { useLocales } from '../locales';
import {
  getAllNotifications,
  marlAllNotificationsAsRead,
} from '../redux/slices/notifications/actions';
import { dispatch, RootState, useSelector } from '../redux/store';

export default function Notifications() {
  const {
    dense,
    page,
    rowsPerPage,
    setPage,
    //
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const { translate } = useLocales();
  const { notificationCounts, notifications: fetchedNotifcations } = useSelector(
    (state: RootState) => state.notifications
  );

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');

  const isNotFound = !notifications.length;

  useEffect(() => {
    dispatch(getAllNotifications({ page, limit: rowsPerPage, filterStatus }));
  }, [page, rowsPerPage, filterStatus, notificationCounts]);

  useEffect(() => {
    setNotifications(fetchedNotifcations.docs);
  }, [fetchedNotifcations]);
  const handleFilterStatus = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setPage(0);
    setFilterStatus('all');
    setFilterStatus(newValue);
  };

  const handleMarkAllAsRead = () => {
    dispatch(marlAllNotificationsAsRead());
  };

  const { total, read, unread } = notificationCounts;
  const TABS = [
    { value: 'all', label: 'All', color: 'default', count: total },
    { value: 'unread', label: 'Unread', color: 'info', count: unread },
    { value: 'read', label: 'Read', color: 'success', count: read },
  ] as const;

  return (
    <>
      <Helmet>
        <title>{`${translate('Notifications')}`}</title>
      </Helmet>

      <Container maxWidth={false}>
        <CustomBreadcrumbs heading="Notifications" links={[{ name: 'My Notifications' }]} />
        <Card>
          <Tabs
            value={filterStatus}
            onChange={handleFilterStatus}
            sx={{
              px: 2,
              bgcolor: 'background.neutral',
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                icon={
                  <Label color={tab.color} sx={{ mr: 1 }}>
                    {tab.count}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <Divider />
          {filterStatus === 'unread' && notifications.length > 0 && (
            <Stack alignItems="flex-end" sx={{ mx: '5px' }}>
              <Button onClick={handleMarkAllAsRead} sx={{ gap: 1 }}>
                Mark all as read <Iconify icon="mdi:tick-all" />
              </Button>
            </Stack>
          )}
          <Grid sx={{ my: 2 }} item xs={12} md={6} lg={8}>
            {notifications.map((notification) => (
              <NotificationRow notification={notification} />
            ))}
            {isNotFound && (
              <EmptyContent
                title="No Data"
                sx={{
                  '& span.MuiBox-root': { height: 160 },
                }}
              />
            )}
            <TablePaginationCustom
              count={fetchedNotifcations.meta.totalDocs || 0}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
              dense={dense}
              onChangeDense={onChangeDense}
            />
          </Grid>
        </Card>
      </Container>
    </>
  );
}
