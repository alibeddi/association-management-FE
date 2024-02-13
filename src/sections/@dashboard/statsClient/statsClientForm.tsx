import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import {  useFieldArray, useForm } from 'react-hook-form';
import FormProvider, { RHFAutocomplete, RHFSelect } from '../../../components/hook-form'
import { getKpis } from '../../../redux/slices/kpis/actions';
import { getAllStatsClient } from '../../../redux/slices/statsClient/action';
import { RootState, useDispatch, useSelector } from '../../../redux/store';


const StatsClientForm = () => {
  const [select,setSelect] = useState();
  const dispatch = useDispatch()
  const [numSelect,setNumSelect] = useState(0)
  const addSelect = () => {
    setNumSelect(pre => pre +  1);
  };
  const removeSelect = (index:number) => {
      console.log(index)
  }

  // TODO: make scroll to get 10 other
  useEffect(()=>{
     dispatch(getKpis({
      page:0,limit:10
     }))
  },[dispatch])
  const methods = useForm({
    resolver: {
      test
    }
  });
  const { fields, append } = useFieldArray({
    control,
    name: 'selects',
  });
  const {kpis} = useSelector((state:RootState)=>state.kpis)
  const {control,handleSubmit} = methods
  const onSubmit = async (data) => {
    // Send the selected values to the backend
    try {
      await postSelectedValuesToBackend(data.selects);
      console.log('Selected values sent to backend successfully!');
    } catch (error) {
      console.error('Error sending selected values to backend:', error);
    }
  };

  return (
    <FormProvider methods={methods} 
  
        {/* {numSelect && [...Array(numSelect)].map((_, index) => (
          <>            
          <Box
            >
                <RHFAutocomplete
                  key={index}
                  name={`stats-client-${index}`}
                  freeSolo
                  getOptionLabel={(option) => (typeof option === 'string' ? option : option.name || '')}
                  options={kpis.docs}
                />
            </Box>
            <Button
            variant='contained'
            onClick={()=>removeSelect(index)}
            >
              Remove item
            </Button>
          </>

            
        ))} */}
 {/* {fields.map((field, index) => (
        <RHFAutocomplete
          key={field.id} // Ensure each component has a unique key
          name={`selects[${index}].value`} // Set the field name dynamically
          defaultValue={''} // Set default value if needed
          freeSolo
          getOptionLabel={(option) => (typeof option === 'string' ? option :  '')}
          options={kpis}
        />
      ))} */}

     <Box>
      <Button
      variant='contained'
        type='submit'
      >
submit
      </Button>
     <Button
          variant="contained"
          onClick={()=> addSelect()}
          >
            add another task
          </Button>
     </Box>
    </FormProvider>
  )
}

export default StatsClientForm