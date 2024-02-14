import { Container } from '@mui/material';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { getOneStatClient } from '../../redux/slices/statsClient/action';
import { dispatch } from '../../redux/store';
import { PATH_DASHBOARD } from '../../routes/paths';
import { StatClientResponseForm } from '../../sections/@dashboard/statClientResponse/form';

export default function ClientStatusListPage() {
  const { themeStretch } = useSettingsContext();
  const { statClientId, statClienRestId } = useParams();

  useEffect(() => {
    dispatch(getOneStatClient({ statClientId: '65ccbb05e6e7cb86be1a218e' }));
  }, []);

  return (
    <>
      <Helmet>
        <title> stat-client : Create a new answer </title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Create a new stat-client answer"
          links={[
            {
              name: 'stat-client answers',
              href: PATH_DASHBOARD.clientStatusResponse.root,
            },
            { name: 'New stat-client answers' },
          ]}
        />
        <StatClientResponseForm />
      </Container>
    </>
  );
}
