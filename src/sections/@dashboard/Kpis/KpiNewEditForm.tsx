import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
// utils
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { BackType, FrontType, IKpi } from '../../../@types/Kpi';
// assets
import { countries } from '../../../assets/data';
// components
import FormProvider, { RHFSelect, RHFTextField } from '../../../components/hook-form';
import { useSnackbar } from '../../../components/snackbar';

// ----------------------------------------------------------------------
interface FormValuesProps {
  name: string;
  label: string;
  frontType: string;
  backType: string;
  isRequired: boolean;
  options: (string | number)[];
}
type Props = {
  isEdit?: boolean;
  currentKpi?: IKpi;
};

export default function KpiNewEditForm({ isEdit = false, currentKpi }: Props) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    label: Yup.string().required('Label is required'),
    frontType: Yup.string()
      .required('Front type is required')
      .oneOf(Object.values(FrontType), 'Invalid front type value'),
    backType: Yup.string()
      .required('Back type is required')
      .oneOf(Object.values(BackType), 'Invalid back type value'),
    isRequired: Yup.boolean().required('isRequired is required'),
    options: Yup.array().of(Yup.mixed()),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentKpi?.name || '',
      label: currentKpi?.label || '',
      frontType: currentKpi?.frontType || '',
      backType: currentKpi?.backType || '',
      isRequired: currentKpi?.isRequired || false,
      options: Array.isArray(currentKpi?.options) ? currentKpi?.options : [],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentKpi]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentKpi) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentKpi]);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.kpis.root);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="name" label="Full Name" />
              <RHFTextField name="label" label="label backType" />
              <RHFTextField name="frontType" label="Phone Number" />

              <RHFSelect native name="isRequired" label="isRequired" placeholder="isRequired">
                <option value="" />
                {countries.map((isRequired) => (
                  <option key={isRequired.code} value={isRequired.label}>
                    {isRequired.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="options" label="options/Region" />
              <RHFTextField name="city" label="City" />
              <RHFTextField name="backType" label="backType" />
              <RHFTextField name="zipCode" label="Zip/Code" />
              <RHFTextField name="company" label="Company" />
              <RHFTextField name="role" label="Role" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
