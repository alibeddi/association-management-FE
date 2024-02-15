import { Button, IconButton, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Controller,  useForm } from 'react-hook-form';
import { IKpi } from '../../../@types/Kpi';
import FormProvider, {
  RHFAutocomplete,
  RHFTextField,
} from '../../../components/hook-form';
import RenderField from '../../../components/RenderField';
import { getKpis } from '../../../redux/slices/kpis/actions';
import {
  createStatsClient,
  updateStatsClient,
} from '../../../redux/slices/statsClient/action';
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { getFromKpis } from '../../../utils';
import { IStatsClient } from '../../../@types/statsClient';
import { generateSelectKpis } from '../../../utils/generateSelectKpis';

type IProps = {
  statsClientProp?: IStatsClient | null;
};

const StatsClientForm = ({ statsClientProp = null }: IProps) => {
  const statsClientId = statsClientProp?._id;
  const dispatch = useDispatch();
  const statsClient = statsClientProp;
  // TODO: make scroll to get 10 other
  useEffect(() => {
    dispatch(
      getKpis({
        page: 0,
        limit: 200,
      })
    );
  }, [dispatch]);
  const { enqueueSnackbar } = useSnackbar();
  const [select, setSelect] = useState<{ num: number; value: IKpi }[] | []>(() => {
    if (statsClientProp && statsClientProp.kpis) {
      return generateSelectKpis(statsClientProp.kpis);
    }
    return [];
  });
  const [numSelect, setNumSelect] = useState(select?.length || 0);
  const methods = useForm();
  const { handleSubmit, unregister } = methods;
  const addSelect = () => {
    setNumSelect((pre) => pre + 1);
    setSelect((pre) => [...pre, { value: {} as IKpi, num: numSelect }]);
  };
  const removeSelect = (index: number) =>
    setSelect((pre) => {
      const newArray = [...pre];
      newArray.splice(index, 1);
      return newArray;
    });
  const { kpis } = useSelector((state: RootState) => state.kpis);
  const submit = async (data: any) => {
   
    const kpisArray: string[] = getFromKpis(data, select);
    if(statsClient){
        await dispatch(updateStatsClient({
          id:statsClient._id,
          body:{
            name:data.name,
            kpis:kpisArray
          }
        })).unwrap().then((res) => enqueueSnackbar(res.message))
        .catch((error) => enqueueSnackbar(error.message, { variant: 'error' }));
    }else{
      await dispatch(
        createStatsClient({
          name: data.name,
          kpis: kpisArray,
        })
      )
        .unwrap()
        .then((res) => enqueueSnackbar(res.message))
        .catch((error) => enqueueSnackbar(error.message, { variant: 'error' }));
    }
  };
  const styleFlexColumn = {
    display: 'flex',
    gap: '1rem',
  };
  return (
    (
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(submit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          minHeight: '30rem',
          justifyContent: 'space-between',
        }}
      >
        <Stack>
          <Controller
            name="name"
            control={methods.control}
            defaultValue={statsClient?.name || ''}
            render={({ field }) => (
              <RHFTextField
                {...field}
                label="name of forum"
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                required
              />
            )}
          />
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexBasis: '100%',
            }}
          >
            <Stack sx={{ ...styleFlexColumn, flexBasis: '50%', padding: '1rem' }}>
              <Typography>Question</Typography>
              {select.length > 0 ? (
                select.map((s, index) => (

                    <Stack
                      key={s.num}
                      sx={{
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        width: '100%',
                      }}
                    >
                      <Controller
                        name={`stats-client-${s.num}`}
                        control={methods.control}
                        defaultValue={s.value || ''}
                        render={({ field }) => (
                          <RHFAutocomplete
                            {...field}
                            freeSolo
                            label={`Question n°: ${index}`}
                            getOptionLabel={(option) =>
                              typeof option === 'string' ? option : option.name || ''
                            }
                            options={kpis.docs}
                            required
                            onChange={(_, value) => {
                              setSelect((prev) => {
                                const updatedSelect = [...prev];
                                updatedSelect[index] = { num: s.num, value: value || '' };
                                return updatedSelect;
                              });
                              field.onChange(value); // This line is to update react-hook-form's internal state
                            }}
                            sx={{ flexBasis: '80%' }}
                          />
                        )}
                      />
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          removeSelect(index);
                          unregister(`stats-client-${s.num}`);
                        }}
                        size="large"
                      >
                        <DeleteIcon />
                      </Button>
                    </Stack>
             
                ))
              ) : (
                <Box>
                  <Typography
                    sx={{
                      padding: '1rem',
                      color: '#888080',
                    }}
                  >
                    {' '}
                    No Question selected{' '}
                  </Typography>
                </Box>
              )}
            </Stack>

            <Stack
              sx={{
                display: 'flex',
                gap: '1rem',
                padding: '1rem',
                flexBasis: '50%',
              }}
            >
              <Typography>Overview</Typography>
              <Stack sx={styleFlexColumn}>
                {select.length > 0 ? (
                  select.map((s, index) => {
                    const { num, value } = s;
                    return (
                      <Box key={index}>
                        <Typography>
                          {value.label && value.label !== '' && `${value.label} :`}
                        </Typography>
                        <Box>
                          <RenderField {...value} />
                        </Box>
                      </Box>
                    );
                  })
                ) : (
                  <Typography color="#888080">No Content </Typography>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
          }}
        >
          <Button variant="contained" type="submit">
            submit
          </Button>
          <Button variant="outlined" onClick={() => addSelect()}>
            add another question
          </Button>
        </Box>
      </FormProvider>
    )
  );
};

export default StatsClientForm;
