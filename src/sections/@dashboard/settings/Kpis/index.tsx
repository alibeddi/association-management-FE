import { Container } from '@mui/material';
import React from 'react';
import KpiListPage from './KpisTable';

export default function KpiForm() {
  return (
    <Container maxWidth={false}>
      <KpiListPage />
    </Container>
  );
}
