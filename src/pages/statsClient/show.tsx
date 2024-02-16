import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Button, Container } from '@mui/material';


// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { getOnekpi } from '../../redux/slices/kpis/actions';
import {  RootState, useDispatch, useSelector } from '../../redux/store';
import { getSingleStatsClient } from '../../redux/slices/statsClient/action';
import StatsClientView from '../../sections/@dashboard/statsClient/StatsClient.show';

const StatsClientShow = () => {
  const { themeStretch } = useSettingsContext();
  const { id } = useParams();
  const dispatch = useDispatch()
  useEffect(()=>{
    if(id) dispatch(getSingleStatsClient({id}))
  },[dispatch,id])
  const {statsClient} = useSelector((state)=> state.statsClient)
  return (
    <>
    <Helmet>
      <title> Stats Client: Deatils </title>
    </Helmet>

    <Container maxWidth={themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="View Stats Client"
        links={[
          {
            name: 'Dashboard',
            href: PATH_DASHBOARD.root,
          },
          {
            name: 'Stats Clients',
            href: PATH_DASHBOARD.statsClient.root,
          },
          { name: 'View Stats Client' },
        ]}
      />
      <StatsClientView statsClient={statsClient} />
      <Button
       component={RouterLink}
       to={`${PATH_DASHBOARD.statsClient.edit}/${statsClient?._id}`}
       variant="contained"
      >
        Edit 
      </Button>
    </Container>
  </>
  )
}

export default StatsClientShow