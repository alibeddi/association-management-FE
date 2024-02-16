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
import {
  createStatClientResponse,
  editStatClientResponse,
} from '../../../../redux/slices/statClientResponse/actions';
import { dispatch, RootState, useSelector } from '../../../../redux/store';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { formatFormValues } from './utils/formatFormValues';
import { generateFieldValidation } from './utils/generateFieldValidation';
import RenderField from './utils/renderFormField';
import { transformStatClientResponse } from './utils/transformStatClientResponse';

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

  const defaultValues = useMemo(
    () => transformStatClientResponse(currentStatClientResponse, isEdit, statClientDetails),
    [isEdit, statClientDetails, currentStatClientResponse]
  );

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
        clientContact: data.clientContact,
        kpis: formatFormValues(data, kpis),
      };

      if (!isEdit) {
        dispatch(
          createStatClientResponse({
            statClientId: '',
            body: { ...body, statClient: statsClient._id },
          })
        )
          .unwrap()
          .then((res) => {
            enqueueSnackbar(res.message);
            navigate(PATH_DASHBOARD.statClientResponse.root);
          })
          .catch((err) => enqueueSnackbar(err.message, { variant: 'error' }));
      } else {
        dispatch(
          editStatClientResponse({
            statClientResponseId: currentStatClientResponse?._id,
            body,
          })
        )
          .unwrap()
          .then((res) => {
            enqueueSnackbar(res.message);
            navigate(PATH_DASHBOARD.statClientResponse.root);
          })
          .catch((err) => enqueueSnackbar(err.message, { variant: 'error' }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isEdit && currentStatClientResponse) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentStatClientResponse, defaultValues, reset]);

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
                InputLabelProps={{ shrink: true }}
                name="clientName"
                label="Client Name"
                type="text"
              />
              <RHFTextField
                inputProps={{ readOnly: statClientDetails }}
                InputLabelProps={{ shrink: true }}
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
