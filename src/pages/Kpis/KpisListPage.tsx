import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useSettingsContext } from '../../components/settings';
import KpisList from '../../sections/@dashboard/Kpis';

export default function KpiListPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Kpis</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <KpisList />
      </Container>
    </>
  );
}
