import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { IKpi } from '../../../../@types/Kpi';
import FormProvider, { RHFTextField } from '../../../../components/hook-form';
import { useLocales } from '../../../../locales';
import { createStatClientResponse } from '../../../../redux/slices/statClientResponse/actions';
import { dispatch, RootState, useSelector } from '../../../../redux/store';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { generateFieldValidation } from './utils/generateFieldValidation';
import RenderField from './utils/renderFormField';

type Props = {
  isEdit?: boolean;
  kpiDetails?: boolean;
  // TODO: add the type
  currentStatClientResponse?: any | null;
};

export default function StatClientForm({
  isEdit = false,
  kpiDetails = false,
  currentStatClientResponse,
}: Props) {
  const { kpis } = useSelector((state: RootState) => state.kpis);
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const navigate = useNavigate();

  // form validation
  const validationsFields: { [key: string]: any } = {};
  kpis.docs.forEach((field) => {
    const schema = generateFieldValidation(field);
    validationsFields[field.name] = schema;
  });
  const NewClientStatusSchema = Yup.object().shape({
    ...validationsFields,
    clientName: Yup.string().min(2).max(60),
    clientContact: Yup.string().min(2).max(60),
  });

  const methods = useForm({
    resolver: yupResolver(NewClientStatusSchema),
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: any) => {
    try {
      console.log(data.componentName);
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (!isEdit) {
        const formattedData = (values: any, kpis: IKpi[]) => {
          let array = [];
          const formFields = Object.keys(values);
          for (const field of formFields) {
            const foundKpi = kpis.find((kpi) => kpi.name === field);
            if (foundKpi && values[field]) {
              array.push({ kpi: foundKpi._id, response: [values[field]] });
            }
          }
          return array;
        };
        const body = {
          clientName: data['clientName'],
          kpis: formattedData(data, kpis.docs),
        };
        dispatch(createStatClientResponse({ statClientId: '', body })).then((res: any) => {
          if (res?.meta?.requestStatus === 'fulfilled') {
            enqueueSnackbar(`${translate(res?.payload.message)}`);
            reset();
            navigate(PATH_DASHBOARD.clientStatusResponse.root);
          } else {
            enqueueSnackbar(`${translate(res?.error?.message)}`, { variant: 'error' });
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={4}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name={'clientName'} label={'Client Name'} type="text" />
              <RHFTextField name={'clientContact'} label={'Client Contact'} type="text" />
              {kpis.docs.map((kpi) => RenderField(kpi))}
            </Box>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
