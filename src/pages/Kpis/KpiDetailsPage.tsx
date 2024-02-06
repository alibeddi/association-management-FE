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
import { getOnekpi } from '../../redux/slices/kpis/actions';
import { dispatch, RootState, useSelector } from '../../redux/store';
import UserNewEditDeatilsForm from '../../sections/@dashboard/Kpis/UserNewEditDeatilsForm';
// sections

// ----------------------------------------------------------------------

export default function KpiDetailsPage() {
  const { themeStretch } = useSettingsContext();
  const { id } = useParams();
  
  useEffect(() => {
    if (id) {
      dispatch(getOnekpi({ kpiId: id }));
    }
  }, [id]);

  const { kpi } = useSelector((state: RootState) => state.kpis);
  return (
    <>
      <Helmet>
        <title> Kpi: Deatils </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="view a Kpi Details"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Kpi',
              href: PATH_DASHBOARD.kpis.root,
            },
            { name: 'View Kpi' },
          ]}
        />
        <UserNewEditDeatilsForm kpiDetails currentKpi={kpi} />
      </Container>
    </>
  );
}
