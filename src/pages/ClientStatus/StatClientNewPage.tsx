import { Container } from '@mui/material';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { getKpis } from '../../redux/slices/kpis/actions';
import { dispatch } from '../../redux/store';
import { StatClientForm } from '../../sections/@dashboard/statClient/form';

export default function ClientStatusListPage() {
  useEffect(() => {
    dispatch(getKpis({ page: 0, limit: 100 }));
  }, []);

  return (
    <>
      <Helmet>
        <title> client status </title>
      </Helmet>
      <Container maxWidth={false}>
        <StatClientForm />
      </Container>
    </>
  );
}
