import { Button, TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import {  Controller, useFieldArray, useForm } from 'react-hook-form';
import FormProvider, { RHFAutocomplete, RHFSelect, RHFTextField } from '../../../components/hook-form'
import { getKpis } from '../../../redux/slices/kpis/actions';
import { createStatsClient, getAllStatsClient } from '../../../redux/slices/statsClient/action';
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { getFromKpis } from '../../../utils';


const StatsClientForm = () => {
  const {enqueueSnackbar} = useSnackbar()
  const [select,setSelect] = useState<{num:number,value:string}[] | []>([]);
  const [numSelect,setNumSelect] = useState(0)
   const methods = useForm();
   const KpiSchema = {};
  const {control,handleSubmit,unregister,register} = methods
  
  const dispatch = useDispatch()
  
  const addSelect = () => {
    setNumSelect(pre => pre +  1);
    setSelect(pre=> [...pre,{value:"",num:numSelect}])
  };
  const removeSelect = (index:number) => setSelect((prevState) => {
    const newArray = [...prevState];
    newArray.splice(index,  1);
    return newArray;
  });


  // TODO: make scroll to get 10 other
  useEffect(()=>{
     dispatch(getKpis({
      page:0,limit:200
     }))
  },[dispatch])
 
  const {kpis} = useSelector((state:RootState)=>state.kpis)
  
  // 
  const submit = async (data:any) => {

    const kpisArray:any =  getFromKpis(data,select);
    await dispatch(createStatsClient({
      name : data.name,
      kpis:kpisArray
    })).unwrap().then(res=>enqueueSnackbar(res.message)).catch(error=>enqueueSnackbar(error.message,{variant:'error'}))
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(submit)} style={
      {
        display:'flex',
        flexDirection:'column',
        gap:'1rem'
      }
    }>
      <RHFTextField
      name="name"
      label="name of forum"
      required
      />

 {
  select.length >   0 && select.map((s,index)=>(   <>            
    <Stack
    key={s.num}
    sx={{
      flexDirection:'row',
      display:'flex',
      gap:'1rem',
      width:"100%"
    }}
      >
          <RHFAutocomplete
            name={`stats-client-${s.num}`}
            freeSolo
            label={`question n°: ${index}`}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.name || '')}
            options={kpis.docs}
            required
            sx={{
              flexBasis:'80%'
            }}
          />
          <Button
      variant='contained'
      color="error"
      onClick={ ()=> {removeSelect(index);unregister(`stats-client-${s.num}`)}}
      >
        Remove item
      </Button>
      </Stack>
      
    </>)) 
 }
     <Box
     sx={{
      display:'flex',
      gap:'1rem'
     }}
     >
      <Button
      variant='contained'
        type='submit'
      >
submit
      </Button>
     <Button
          variant="outlined"
          onClick={()=> addSelect()}
          >
            add another task
          </Button>
     </Box>
    </FormProvider>
  )
}

export default StatsClientForm