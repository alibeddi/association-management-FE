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
import UserNewEditForm from '../../sections/@dashboard/Kpis/KpiNewEditForm';
import { RootState, dispatch, useSelector } from '../../redux/store';
import { getOnekpi } from '../../redux/slices/kpis';
// sections

// ----------------------------------------------------------------------

export default function KpiEditPage() {
  const { themeStretch } = useSettingsContext();
  const { id } = useParams();
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    id && dispatch(getOnekpi({ kpiId: id }));
  }, [id]);
  const { kpi } = useSelector((state: RootState) => state.kpis);
  return (
    <>
      <Helmet>
        <title> Kpi: Deatils </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
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
        <UserNewEditForm kpiDetails currentKpi={kpi} />
      </Container>
    </>
  );
}
