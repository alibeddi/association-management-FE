import { Button, IconButton, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import {  Controller, useFieldArray, useForm } from 'react-hook-form';
import { IKpi } from '../../../@types/Kpi';
import FormProvider, { RHFAutocomplete, RHFSelect, RHFTextField } from '../../../components/hook-form'
import RenderField from '../../../components/RenderField';
import { getKpis } from '../../../redux/slices/kpis/actions';
import { createStatsClient, getAllStatsClient } from '../../../redux/slices/statsClient/action';
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { getFromKpis } from '../../../utils';


const StatsClientForm = () => {
  const {enqueueSnackbar} = useSnackbar()
  const [select,setSelect] = useState<{num:number,value:IKpi}[] | []>([]);
  const [numSelect,setNumSelect] = useState(0)
   const methods = useForm();
   const KpiSchema = {};
  const {control,handleSubmit,unregister,register} = methods
  
  const dispatch = useDispatch()
  
  const addSelect = () => {
    setNumSelect(pre => pre +  1);
    setSelect(pre=> [...pre,{value:{} as IKpi,num:numSelect}])
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
const styleFlexColumn = {
  display:'flex',
  gap:'1rem',
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

<Stack sx={styleFlexColumn} >
{
  select.length >   0 ? select.map((s,index)=>(   <>            
    <Stack
    key={s.num}
    sx={{
      flexDirection:'row',
      display:'flex',
      alignItems: 'center',
      gap:'1rem',
      width:"100%"
    }}
      >
           <Controller
            name={`stats-client-${s.num}`}
            control={methods.control}
            defaultValue=""
            render={({ field }) => (
              <RHFAutocomplete
                {...field}
                freeSolo
                label={`Question n°: ${index}`}
                getOptionLabel={(option) => (typeof option === 'string' ? option : option.name || '')}
                options={kpis.docs}
                required
                onChange={(_, value) => {
                  setSelect(prev => {
                    const updatedSelect = [...prev];
                    updatedSelect[index] = { num: s.num, value: value || "" };
                    return updatedSelect;
                  });
                  field.onChange(value); // This line is to update react-hook-form's internal state
                }}
                sx={{ flexBasis: '80%' }}
              />
            )}
          />
          <Button
      variant='contained'
      color="error"
      onClick={ ()=> {removeSelect(index);unregister(`stats-client-${s.num}`)}}
      size='large'
      >
        <DeleteIcon  />
      </Button>
      </Stack>
    </>)) : <Box>
      <Typography sx={
        {
          padding:'1rem',
          color:'#888080'
        }
      }> No Question selected </Typography>
    </Box>
 }
</Stack>


 <Stack sx={{
    display:'flex',
    gap:'1rem',
    padding:'1rem'
 }}>
  <Typography>Overview</Typography>
  <Stack sx={styleFlexColumn}>
  {
  select.length > 0 ? select.map((s, index) => {
    const { num, value } = s;
    return <Box>
       <RenderField key={index} {...value} />
    </Box>
  }) : <Typography color='#888080'>No Content </Typography>
 }
  </Stack>
 </Stack>
 
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
            add another question
          </Button>
     </Box>
    </FormProvider>
  )
}

export default StatsClientForm