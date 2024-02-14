import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import FormProvider, { RHFAutocomplete, RHFSelect } from '../../../components/hook-form';
import { getKpis } from '../../../redux/slices/kpis/actions';
import { getAllStatsClient } from '../../../redux/slices/statsClient/action';
import { RootState, useDispatch, useSelector } from '../../../redux/store';

const StatsClientForm = () => {
  const methods = useForm();
  const { control, handleSubmit, setValue, register } = methods;
  const dispatch = useDispatch();
  const [numSelect, setNumSelect] = useState<number>(0);
  const [select, setSelect] = useState<number[] | []>([]);
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'test', // unique name for your Field Array
  });
  const addSelect = () => {
    setNumSelect((prevNum) => prevNum + 1);
  };

  const removeSelect = (index: number) => {
    setValue(`stats-client-${index}`, '');
    setNumSelect((prevNum) => prevNum - 1);
  };

  // TODO: make scroll to get 10 other
  useEffect(() => {
    dispatch(
      getKpis({
        page: 0,
        limit: 10,
      })
    );
  }, [dispatch]);

  const { kpis } = useSelector((state: RootState) => state.kpis);

  const submit = (data: any) => console.log({ data });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(submit)}>
      {/* {select.length > 0 && select.map((_, index) => (
          <>            
          <Box
          key={index}
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
            color="error"
            onClick={()=>removeSelect(index)}
            >
              Remove item
            </Button>
          </>

            
        ))} */}
      {/* {numSelect ? [...Array(numSelect)].map((_, index) => (
          <>            
          <Box
          key={index}
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
            color="error"
            onClick={()=>removeSelect(index)}
            >
              Remove item
            </Button>
          </>

            
        )) : <div>nothing</div>} */}
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
      {fields.map((field, index) => (
        <>
          <Box key={index}>
            <RHFAutocomplete
              key={index}
              freeSolo
              // value={field.value}
              {...register(`test.${index}.value`)}
              getOptionLabel={(option) => (typeof option === 'string' ? option : option.name || '')}
              options={kpis.docs}
            />
          </Box>
          <Button variant="contained" color="error" onClick={() => removeSelect(index)}>
            Remove item
          </Button>
        </>
      ))}
      <Box>
        <Button variant="contained" type="submit">
          submit
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            append({
              test: '',
            })
          }
        >
          add another task
        </Button>
      </Box>
    </FormProvider>
  );
};

export default StatsClientForm;
