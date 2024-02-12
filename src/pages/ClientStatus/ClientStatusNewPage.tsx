import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { ClientStatusForm } from '../../sections/@dashboard/clientStatus/form';

export default function ClientStatusListPage() {
  return (
    <>
      <Helmet>
        <title> client status </title>
      </Helmet>
      <Container maxWidth={false}>
        <ClientStatusForm />
      </Container>
    </>
  );
}
