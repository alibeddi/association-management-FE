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

  const callSelected = useSelector((state:RootState)=>state.calls.call)
console.log(callDate);
  const handleCreateUpdate = async (call: ICall) => {
    if(!callSelected){
      call.date = callDate;
      await dispatch(createCallsToday(call)).unwrap().then(res=>{
        enqueueSnackbar('created with success')
      }).catch(err=>{console.error(err);enqueueSnackbar(err.message,{variant:"error"})})
    }else{
      const {_id,date} = callSelected;
      const newCall = {calls:call.calls,_id,date}
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
        <Typography variant="h3" component="h1" paragraph>
          Calls
        </Typography>
        <CallForm handleCreateUpdate={handleCreateUpdate} callSelected={callSelected}/>
      </Container>
    </>
  );
}
