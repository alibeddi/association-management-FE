import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useLocales } from '../../locales';
import { StatClientResponsesTables } from '../../sections/@dashboard/statClientResponse/list';

export default function ClientStatusListPage() {
  const { translate } = useLocales();

  return (
    <>
      <Helmet>
        <title>{`${translate('stat-client answers')}`}</title>
      </Helmet>

      <Container maxWidth={false}>
        <CustomBreadcrumbs
          heading="stat-client answers"
          links={[{ name: 'stat-client answers' }]}
        />
        <StatClientResponsesTables />
      </Container>
    </>
  );
}
