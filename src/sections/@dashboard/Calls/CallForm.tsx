import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Stack } from '@mui/system';
import { Grid } from '@mui/material';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import { ICall } from '../../../@types/Call';
import { RootState, useSelector } from '../../../redux/store';

export type IProp<ICall> = {
  handleCreateUpdate: (data: ICall) => void;
  callSelected: ICall | undefined;
};

const CallForm = ({ handleCreateUpdate, callSelected }: IProp<ICall>) => {
  const CallSchema = Yup.object({
    calls: Yup.object({
      maked: Yup.number().required().typeError('Made calls must be of type number'),
      received: Yup.number().required().typeError('Received calls must be of type number'),
    }),
  });
  const { call } = useSelector((state: RootState) => state.calls);
  const callReceived = call?.calls?.received || 0;
  const callMaked = call?.calls?.maked || 0;
  const numberCalls = callReceived + callMaked;
  const methods = useForm<ICall>({
    resolver: yupResolver(CallSchema),
  });
  const onSubmit = async (data: ICall) => {
    try {
      handleCreateUpdate(data);
    } catch (error) {
      console.error(error);
    }
  };
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <Box
            sx={{
              p: 1,
            }}
          >{`total calls today ${numberCalls}`}</Box>
          <Stack
            sx={{
              direction: 'row',
              gap: 2,
            }}
          >
            <Box
              rowGap={3}
              columnGap={4}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              {' '}
              <RHFTextField name="calls.maked" label={`${callMaked} calls emis `} />
              <RHFTextField name="calls.received" label={`${callReceived} calls  recieved `} />
            </Box>

            <Box
              sx={{
                width: 'initial',
              }}
            >
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {call ? 'edit' : 'create'}
              </LoadingButton>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default CallForm;
