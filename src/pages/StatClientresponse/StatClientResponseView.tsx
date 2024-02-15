import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { getOneStatClientResponse } from '../../redux/slices/statClientResponse/actions';
import { dispatch, RootState, useSelector } from '../../redux/store';
import { StatClientResponseForm } from '../../sections/@dashboard/statClientResponse/form';

// ----------------------------------------------------------------------

export default function StatClientResponseViewPage() {
  const { statClientResponse } = useSelector((state: RootState) => state.statClientResponses);
  const { themeStretch } = useSettingsContext();
  const { statClientRestId = '65ccdbc6b8cc1a7bc86a71a8' } = useParams();

  useEffect(() => {
    if (statClientRestId) {
      dispatch(getOneStatClientResponse({ statClientResponseId: statClientRestId }));
    }
  }, [statClientRestId]);

  return (
    <>
      <Helmet>
        <title> Stat-client Response: View </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="View a stat-client response"
          links={[
            {
              name: 'stat-client response',
              href: PATH_DASHBOARD.statClientResponse.root,
            },
            { name: 'View stat-client response' },
          ]}
        />
        <StatClientResponseForm statClientDetails currentStatClientResponse={statClientResponse} />
      </Container>
    </>
  );
}
