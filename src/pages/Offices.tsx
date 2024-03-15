import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from '../components/custom-breadcrumbs';
import { useSettingsContext } from '../components/settings';
import { useLocales } from '../locales';
import { OfficesTable } from '../sections/@dashboard/Offices/List';

export default function Offices() {
  const { translate } = useLocales();
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>{`${translate('Offices')}`}</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs heading="Offices" links={[{ name: 'Offices' }]} />
        <OfficesTable />
      </Container>
    </>
  );
}
