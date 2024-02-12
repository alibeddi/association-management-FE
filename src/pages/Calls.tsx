import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
// components
import { useSettingsContext } from '../components/settings';

import { CallForm } from '../sections/@dashboard/Calls';
import { ICall } from '../@types/Call';
import { RootState, useDispatch,useSelector } from '../redux/store';
import { createCallsToday, getCallByDate, getMyCalls, updateCall } from '../redux/slices/calls/actions';
import { CurrentDate, fDate, fDateTime } from '../utils';
import { useSnackbar } from '../components/snackbar';



// ----------------------------------------------------------------------

export default function Dashboard() {
  const dispatch = useDispatch()
  const {enqueueSnackbar} = useSnackbar()
  const { themeStretch } = useSettingsContext();
  const {calls} = useSelector((state:RootState)=>state.calls)
  const currentDate = CurrentDate().toISOString();
  const [callDate,setCallDate] = useState<Date | string >(currentDate)
  useEffect(()=>{
    dispatch(getCallByDate({
      date:callDate
    }));
  },[dispatch,callDate])
  const callSelected = useSelector((state:RootState)=>state.calls.call)

  const handleCreateUpdate = async (call: ICall) => {
    if(!callSelected){
      await dispatch(createCallsToday(call)).unwrap().then(res=>{
        const {data} = res;
        enqueueSnackbar('created with success',{
          variant: "success"
        })
      }).catch(err=>{console.error(err);enqueueSnackbar(err.message,{variant:"error"})})
    }else{
      const {_id,date} = callSelected;
      const newCall = {calls:call.calls,_id,date}
      await dispatch(updateCall({newCall})).unwrap().then(res=> {
        const {data} = res;
        setCallDate(data.date);
        enqueueSnackbar('updated with success',{
          variant: "success"
        })
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
