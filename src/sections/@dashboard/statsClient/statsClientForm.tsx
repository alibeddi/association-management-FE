import * as Yup from 'yup'
import { Button, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';
import  { useEffect } from 'react';
import {  useFieldArray,  useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


import {  BackType, FrontType, IKpi } from '../../../@types/Kpi';
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
import { IStatsClient, IStatsClientFormProps } from '../../../@types/statsClient';
import { setDefaultValuesStatsClient } from '../../../utils/setDefaultValuesStatsClient';




type IProps = {
  statsClientProp?: IStatsClient | null;
};

const StatsClientForm = ({ statsClientProp = null }: IProps) => {
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
  const newKpisSchema = Yup.object().shape({
    name: Yup.string().required(),
    kpis: Yup.array().of(
      Yup.object().shape({
        _id :Yup.string()
      })
    )
  })
  const defaultValues = setDefaultValuesStatsClient(statsClientProp);
  const methods = useForm<{name:string;kpis:IKpi[] | [];}>({
    resolver: yupResolver(newKpisSchema),
    defaultValues
  });
  const { 
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting, errors }, } = methods;
    const { fields, append, remove } = useFieldArray({
      control,
      name: 'kpis'
    });

    const handleAdd = () => append({  _id: '',
      name: '',
      label: '',
      frontType:FrontType.TEXTAREA, backType: BackType.STRING, isRequired:true
    })
    const handleRemove = (index:number) => remove(index)
    const values = watch() 
  const { kpis } = useSelector((state: RootState) => state.kpis);
  const submit  = async (data:IStatsClientFormProps) => {
    const kpisArray: string[] = getFromKpis(data.kpis);
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

              <RHFTextField
                label="name of forum"
                name="name"
                defaultValue={statsClient?.name ? statsClient.name:  ''}
                required
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
              {fields?.length > 0 ? (
                fields?.map((s, index) => (
                    <Stack
                      key={index}
                      sx={{
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        width: '100%',
                      }}
                    >
                         <RHFAutocomplete
                            freeSolo
                            label={`Question n°: ${index}`}
                            name={`kpis[${index}]`}
                            defaultValue={s || ''}
                            getOptionLabel={(option) => typeof option !== 'string' ? option.label :  option}
                            options={kpis.docs}
                            required
                            sx={{ flexBasis: '80%' }}
                          />


                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          handleRemove(index);
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
                    No Question selected
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
                {values.kpis?.length > 0 ? (
                  values.kpis?.map((value, index) => 
                   (
                      <Box key={index}>
                        <Typography>
                          {value.label && value.label !== '' && `${value.label} :`}
                        </Typography>
                        <Box>
                          <RenderField {...value} />
                        </Box>
                      </Box>
                    )
                  )
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
          <LoadingButton variant="contained" type="submit" loading={isSubmitting} >
            submit
          </LoadingButton>
          <LoadingButton variant="outlined" onClick={() => handleAdd()} >
            add another question
          </LoadingButton>
        </Box>
      </FormProvider>
    )
  );
};

export default StatsClientForm;
