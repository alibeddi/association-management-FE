import { Container } from '@mui/system';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { getSingleStatsClient } from '../../redux/slices/statsClient/action';
import { useDispatch, useSelector } from '../../redux/store';
import { PATH_DASHBOARD } from '../../routes/paths';
import StatsClientForm from '../../sections/@dashboard/statsClient/statsClientForm';

const StatsClientEdit = () => {
  const { themeStretch } = useSettingsContext();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) dispatch(getSingleStatsClient({ id }));
  }, [dispatch, id]);
  const { statsClient } = useSelector((state) => state.statsClient);
  return (
    <>
      <Helmet>
        <title> Kpi: Create a new Kpi </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Edit a stats client"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'stats client',
              href: PATH_DASHBOARD.statsClient.root,
            },
            { name: 'New stats client' },
          ]}
        />
        <StatsClientForm
          key={`${statsClient._id}${new Date().toDateString()}`}
          statsClientProp={statsClient}
        />
      </Container>
    </>
  );
};

export default StatsClientEdit;
