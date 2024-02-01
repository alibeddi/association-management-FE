import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useSettingsContext } from '../../components/settings';
import KpiForm from '../../sections/@dashboard/settings/Kpis';

export default function Branches() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Kpis</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <KpiForm />
      </Container>
    </>
  );
}
