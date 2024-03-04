import { Container } from '@mui/system';
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { useDispatch } from '../../redux/store';
import { PATH_DASHBOARD } from '../../routes/paths';
import UserListPage from '../../sections/@dashboard/user';

export default function UserView() {
  const { themeStretch } = useSettingsContext();
  const {id} = useParams()
  const dispatch = useDispatch();
  // useEffect(()=>{
  //   dispatch()
  // },[dispatch,id])
  return (
    <>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'xl'}>
       <CustomBreadcrumbs
       heading='View a user details'
       links={[
        {
          name:'user',
          href: PATH_DASHBOARD.operators.root
        },
        {
          name:'view user'
        }
       ]}
       />
      </Container>
    </>
  );
}

