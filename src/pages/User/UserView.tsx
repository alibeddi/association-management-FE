import { Container } from '@mui/system';
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { getUser } from '../../redux/slices/users/actions';
import { dispatch, useSelector } from '../../redux/store';
import { PATH_DASHBOARD } from '../../routes/paths';
import UserForm from '../../sections/@dashboard/user/UserForm';

export default function UserView() {
  const { themeStretch } = useSettingsContext();
  const {id} = useParams()
  useEffect(()=>{
    if(id) dispatch(getUser({
      id
    }))
  },[dispatch,id])
  const {user} = useSelector(store=> store.users)
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
       <UserForm user={user} key={user._id} />
      </Container>
    </>
  );
}

