import { Helmet } from 'react-helmet-async';
// @mui
import { Card, Container, Typography } from '@mui/material';
// components
import { useSettingsContext } from '../components/settings';
import CustomBreadcrumbs from '../components/custom-breadcrumbs';
import { CallForm } from '../sections/@dashboard/Calls';

const Calls = () => {
  const { themeStretch } = useSettingsContext();
  return (
    <>
    <Helmet>
        <title> CAll</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
        heading={`${'calls'}`}
        links={[
          {
            name: `${'calls'}`,
          },
        ]}
      />
      <Card>
        <CallForm/>
      </Card>
      </Container>
    </>

  )
}

export default Calls