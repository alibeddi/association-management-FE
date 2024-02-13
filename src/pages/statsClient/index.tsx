import { Button, Container,Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs'
import { PATH_DASHBOARD } from '../../routes/paths';
import Iconify from '../../components/iconify';

const StatsClient = () => {
  console.log('test')
  const { themeStretch } = useSettingsContext()
  const isAllowedToCreateKpi = true;
  return (
    <>
      <Helmet>
        <title> stats client</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
          heading="stats-client"
          links={[{ name: 'stats-client' }]}
          action={
            isAllowedToCreateKpi && (
              <Button
                component={RouterLink}
                to={PATH_DASHBOARD.statsClient.new}
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                create stats client
              </Button>
            )
          }
        />
      </Container>
    </>
  );
};

export default StatsClient;
