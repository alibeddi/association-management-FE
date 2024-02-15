import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { IKpi } from '../../../../@types/Kpi';
import FormProvider, { RHFTextField } from '../../../../components/hook-form';
import { useLocales } from '../../../../locales';
import {
  createStatClientResponse,
  editStatClientResponse,
} from '../../../../redux/slices/statClientResponse/actions';
import { dispatch, RootState, useSelector } from '../../../../redux/store';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { formatFormValues } from './utils/formatFormValues';
import { generateFieldValidation } from './utils/generateFieldValidation';
import RenderField from './utils/renderFormField';

type Props = {
  isEdit?: boolean;
  statClientDetails?: boolean;
  currentStatClientResponse?: any | null;
};

export default function StatClientForm({
  isEdit = false,
  statClientDetails = false,
  currentStatClientResponse,
}: Props) {
  const { statsClient } = useSelector((state: RootState) => state.statsClient);

  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const navigate = useNavigate();
  const [kpis, setKpis] = useState<IKpi[]>([]);

  useEffect(() => {
    if ((isEdit || statClientDetails) && currentStatClientResponse) {
      const array = currentStatClientResponse.kpis?.map((item: { kpi: any }) => item.kpi);
      setKpis(array);
    } else {
      setKpis(statsClient.kpis);
    }
  }, [currentStatClientResponse, statsClient, isEdit, statClientDetails]);

  const defaultValues = useMemo(() => {
    if ((isEdit || statClientDetails) && currentStatClientResponse) {
      const transformedObject: { [key: string]: any } = {};
      const formValues = currentStatClientResponse?.kpis || [];
      formValues.forEach((item: { kpi: { name: any }; response: any }) => {
        const kpiName = item?.kpi?.name;
        const response = item?.response;
        transformedObject[kpiName] = response;
      });
      return {
        ...transformedObject,
        clientName: currentStatClientResponse.clientName,
        clientContact: '',
      };
    }

    return {};
  }, [isEdit, statClientDetails, currentStatClientResponse]);

  // form validation
  const validationsFields: { [key: string]: any } = {};
  if (kpis) {
    kpis.forEach((field) => {
      const schema = generateFieldValidation(field);
      validationsFields[field.name] = schema;
    });
  }

  const NewClientStatusSchema = Yup.object().shape({
    ...validationsFields,
    clientName: Yup.string().min(2).max(60).required(),
    clientContact: Yup.string().min(2).max(60).required(),
  });

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(NewClientStatusSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (data: any) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const body = {
        clientName: data.clientName,
        kpis: formatFormValues(data, statsClient.kpis),
      };
      if (!isEdit) {
        dispatch(createStatClientResponse({ statClientId: '', body })).then((res: any) => {
          if (res?.meta?.requestStatus === 'fulfilled') {
            enqueueSnackbar(`${translate(res?.payload.message)}`);
            reset();
            navigate(PATH_DASHBOARD.statClientResponse.root);
          } else {
            enqueueSnackbar(`${translate(res?.error?.message)}`, { variant: 'error' });
          }
        });
      } else {
        dispatch(
          editStatClientResponse({
            statClientResponseId: currentStatClientResponse?._id,
            body: data,
          })
        ).then((res: any) => {
          if (res?.meta?.requestStatus === 'fulfilled') {
            enqueueSnackbar(`${translate(res?.payload.message)}`);
            reset();
            navigate(PATH_DASHBOARD.statClientResponse.root);
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
              <RHFTextField
                inputProps={{ readOnly: statClientDetails }}
                name="clientName"
                label="Client Name"
                type="text"
              />
              <RHFTextField
                inputProps={{ readOnly: statClientDetails }}
                name="clientContact"
                label="Client Contact"
                type="text"
              />
              {kpis && kpis.map((kpi) => RenderField(kpi, statClientDetails))}
            </Box>
            {!statClientDetails && (
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {isEdit ? 'edit' : 'Save Changes'}
                </LoadingButton>
              </Stack>
            )}
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
