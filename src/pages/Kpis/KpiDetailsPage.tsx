import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../routes/paths';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { getOnekpi } from '../../redux/slices/kpis/actions';
import { dispatch, RootState, useSelector } from '../../redux/store';
import { UserForm } from '../../sections/@dashboard/Kpis/form';

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
          heading="View a Kpi Details"
          links={[
            {
              name: 'Kpi',
              href: PATH_DASHBOARD.kpis.root,
            },
            { name: 'View Kpi' },
          ]}
        />
        <UserForm kpiDetails currentKpi={kpi} />
      </Container>
    </>
  );
}
