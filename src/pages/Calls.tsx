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



// ----------------------------------------------------------------------

export default function Dashboard() {
  const dispatch = useDispatch()
  
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
  const handleCreateUpdate = async (newCall: ICall) => {
    if(!callSelected){
      await dispatch(createCallsToday(newCall)).unwrap().then(res=>{
        const {data} = res;
      }).catch(err=>console.error(err))
    }else{
      await dispatch(updateCall({newCall:callSelected})).unwrap().then(res=>console.log('updated : ',res)).catch(err=>console.error("error",err))
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
