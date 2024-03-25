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

export default function UserEdit() {
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
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{
        ".css-2s58ym-MuiPaper-root-MuiCard-root":{
          overflow:"initial"
        },
        ".css-137yw8i":{
          overflow:"initial"
        },
      }}>
       <CustomBreadcrumbs
       heading='Edit a user details'
       links={[
        {
          name:'user',
          href: PATH_DASHBOARD.operators.root
        },
        {
          name:'edit user'
        }
       ]}
       />
       <UserForm user={user} isEdit key={`${user._id}${new Date().toISOString()}`}  />
      </Container>
    </>
  );
}
