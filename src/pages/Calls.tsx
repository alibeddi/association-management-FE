import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
// components
import { useSettingsContext } from '../components/settings';

import { CallForm } from '../sections/@dashboard/Calls';
import { ICall } from '../@types/Call';
import { RootState, useDispatch,useSelector } from '../redux/store';
import { createCallsToday, getCallByDate, updateCall } from '../redux/slices/calls/actions';
import { CurrentDate} from '../utils';
import { useSnackbar } from '../components/snackbar';
import CustomBreadcrumbs from '../components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '../routes/paths';



// ----------------------------------------------------------------------

export default function Dashboard() {
  const dispatch = useDispatch()
  const {enqueueSnackbar} = useSnackbar()
  const { themeStretch } = useSettingsContext();
  const currentDate = CurrentDate();
  const [callDate,setCallDate] = useState<Date | string >(currentDate)
  useEffect(()=>{
    dispatch(getCallByDate({
      date:callDate
    }));
  },[dispatch,callDate])

  const {call} = useSelector((state:RootState)=>state.calls)
  const handleCreateUpdate = async (callData: ICall) => {
    if(!call){
      callData.date = callDate;
      await dispatch(createCallsToday(callData)).unwrap().then(res=>{
        enqueueSnackbar('created with success')
      }).catch(err=>{console.error(err);enqueueSnackbar(err.message,{variant:"error"})})
    }else{
      const {_id,date} = call;
      const newCall = {calls:callData.calls,_id,date}
      await dispatch(updateCall({newCall})).unwrap().then(res=> {
        const {data} = res;
        enqueueSnackbar('updated with success')
      }).catch(err=>{console.error(err);enqueueSnackbar(err.message,{variant:"error"})})
    }
  }
  return (
    <>
      <Helmet>
        <title> CAll</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>

        <CustomBreadcrumbs
       heading='Calls'
       links={[
        {
          name:'dashboard',
          href: PATH_DASHBOARD.root,
        },
        {
          name:'create call'
        }
       ]}
       />
        <CallForm handleCreateUpdate={handleCreateUpdate} callSelected={call}/>
      </Container>
    </>
  );
}
