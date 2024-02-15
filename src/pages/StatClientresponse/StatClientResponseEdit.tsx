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
import { getOneStatClient } from '../../redux/slices/statsClient/action';
import { dispatch, RootState, useSelector } from '../../redux/store';
import { StatClientResponseForm } from '../../sections/@dashboard/statClientResponse/form';

// ----------------------------------------------------------------------

export default function StatClientResponseEditPage() {
  const { statClientResponse } = useSelector((state: RootState) => state.statClientResponses);
  const { themeStretch } = useSettingsContext();
  const { statClientId, statClienRestId } = useParams();

  useEffect(() => {
    dispatch(getOneStatClient({ statClientId: '65ccbb05e6e7cb86be1a218e' }));
  }, [statClientId]);

  return (
    <>
      <Helmet>
        <title> Stat-client Response: Edit </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Edit a stat-client response"
          links={[
            {
              name: 'stat-client response',
              href: PATH_DASHBOARD.statClientResponse.root,
            },
            { name: 'Edit stat-client response' },
          ]}
        />
        <StatClientResponseForm isEdit currentStatClientResponse={statClientResponse} />
      </Container>
    </>
  );
}
