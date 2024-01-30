import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';
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
        <Typography variant="h3" component="h1" paragraph>
          Kpis
        </Typography>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <KpiForm />
        </Container>
      </Container>
    </>
  );
}
