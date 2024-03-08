import { Card, Container, Divider, Tab, Tabs } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from '../components/custom-breadcrumbs';
import Label from '../components/label';
import { useLocales } from '../locales';

// const TABS = [
//   { value: 'all', label: 'All', color: 'info', count: tableData.length },
//   { value: 'paid', label: 'Paid', color: 'success', count: getLengthByStatus('paid') },
//   { value: 'unpaid', label: 'Unpaid', color: 'warning', count: getLengthByStatus('unpaid') },
//   { value: 'overdue', label: 'Overdue', color: 'error', count: getLengthByStatus('overdue') },
//   { value: 'draft', label: 'Draft', color: 'default', count: getLengthByStatus('draft') },
// ] as const;

export default function Notifications() {
  const { translate } = useLocales();

  return (
    <>
      <Helmet>
        <title>{`${translate('Notifications')}`}</title>
      </Helmet>

      <Container maxWidth={false}>
        <CustomBreadcrumbs heading="Notifications" links={[{ name: 'My Notifications' }]} />
        <Card>
          {/* <Tabs
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
          </Tabs> */}

          <Divider />
        </Card>
      </Container>
    </>
  );
}
