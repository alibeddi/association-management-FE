import { Button } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import {  useFieldArray, useForm } from 'react-hook-form';
import FormProvider, { RHFAutocomplete, RHFSelect } from '../../../components/hook-form'
import { getKpis } from '../../../redux/slices/kpis/actions';
import { getAllStatsClient } from '../../../redux/slices/statsClient/action';
import { RootState, useDispatch, useSelector } from '../../../redux/store';


const StatsClientForm = () => {
  const [select,setSelect] = useState<{num:number,value:string}[] | []>([]);
  const dispatch = useDispatch()
  const [numSelect,setNumSelect] = useState(0)
  const addSelect = () => {
    setNumSelect(pre => pre +  1);
    console.log({numSelect})
    setSelect(pre=> [...pre,{value:"",num:numSelect}])
  };
  const removeSelect = (index:number) => setSelect((prevState) => {
    console.log("index ", index)
    const newArray = [...prevState];
    newArray.splice(index,  1);
    return newArray;
  });

  // TODO: make scroll to get 10 other
  useEffect(()=>{
     dispatch(getKpis({
      page:0,limit:10
     }))
  },[dispatch])
  const methods = useForm();

  const {kpis} = useSelector((state:RootState)=>state.kpis)
  const {control,handleSubmit,unregister} = methods
  const submit = (data:any) => console.log({data})

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(submit)} style={
      {
        display:'flex',
        flexDirection:'column',
        gap:'1rem'
      }
    }>


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
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.name || '')}
            options={kpis.docs}
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