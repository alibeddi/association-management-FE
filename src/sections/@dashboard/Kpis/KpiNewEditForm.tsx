import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Box,
  Card,
  Checkbox,
  Chip,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
// utils
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { BackType, FrontType, IKpi } from '../../../@types/Kpi';
// assets
import { backendTypes, frontendTypes } from '../../../assets/data';
// components
import FormProvider, { RHFSelect, RHFTextField } from '../../../components/hook-form';
import { useSnackbar } from '../../../components/snackbar';
import Label from '../../../components/label/Label';

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
    control,
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
              <RHFTextField name="name" label="Name" />
              <RHFTextField name="label" label="Label Name" />

              <RHFSelect
                native
                name="frontType"
                label="Frontend Type"
                placeholder="select your frontend type"
              >
                <option value="" />
                {frontendTypes.map((frontType) => (
                  <option key={frontType.code} value={frontType.label}>
                    {frontType.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect
                native
                name="backtype"
                label="Backend Type"
                placeholder="select your backend type"
              >
                <option value="" />
                {backendTypes.map((backType) => (
                  <option key={backType.code} value={backType.label}>
                    {backType.label}
                  </option>
                ))}
              </RHFSelect>
              {/* <RHFTextField name="options" label="create your kpi options..." /> */}
              <Controller
                control={control}
                name="options"
                rules={{
                  required: 'Veuillez choisir une réponse',
                }}
                render={({ field: { onChange } }) => (
                  <Autocomplete
                    // defaultValue={useCasesData?.tags ? JSON.parse(useCasesData?.tags) : []}
                    multiple
                    id="tags-filled"
                    options={[]}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    onChange={(event, values) => {
                      onChange(values);
                    }}
                    renderInput={(params) => <TextField {...params} label="add your option" />}
                  />
                )}
              />
              <FormControlLabel
                control={<Checkbox name="gilad" />}
                label={<span style={{ fontSize: '1.25rem' }}>Is this Kpi required ?</span>}
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Kpi' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
