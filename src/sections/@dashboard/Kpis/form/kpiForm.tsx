import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FrontType, IKpi } from '../../../../@types/Kpi';
import { frontendTypes } from '../../../../assets/data';
import FormProvider, { RHFSelect, RHFSwitch, RHFTextField } from '../../../../components/hook-form';
import RHFAutocomplete from '../../../../components/hook-form/RHFAutocomplete';
import { useSnackbar } from '../../../../components/snackbar';
import { useLocales } from '../../../../locales';
import { createkpi, updatekpi } from '../../../../redux/slices/kpis/actions';
import { dispatch } from '../../../../redux/store';
import { PATH_DASHBOARD } from '../../../../routes/paths';

// ----------------------------------------------------------------------
interface FormValuesProps {
  name: string;
  label: string;
  frontType: FrontType;
  isRequired: boolean;
  options: (string | number)[];
}
type Props = {
  isEdit?: boolean;
  kpiDetails?: boolean;
  currentKpi?: IKpi | null;
};

export default function UserNewEditDeatilsForm({
  isEdit = false,
  kpiDetails = false,
  currentKpi,
}: Props) {
  const navigate = useNavigate();
  const { translate } = useLocales();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    label: Yup.string().required('Label is required'),
    frontType: Yup.string()
      .required('Front type is required')
      .oneOf(Object.values(FrontType), 'Invalid front type value'),
    isRequired: Yup.boolean().required('isRequired is required'),
    options: Yup.array().of(Yup.mixed()),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentKpi?.name || '',
      label: currentKpi?.label || '',
      frontType: currentKpi?.frontType || FrontType.NONE,
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
    formState: { isSubmitting, isDirty },
    watch,
  } = methods;
  const values = watch();
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
      if (isEdit && currentKpi) {
        dispatch(updatekpi({ kpiId: currentKpi?._id, body: data }))
          .unwrap()
          .then((res) => {
            enqueueSnackbar(`${translate(res.message)}`);
            reset();
            navigate(PATH_DASHBOARD.kpis.root);
          })
          .catch((err) => enqueueSnackbar(`${translate(err.message)}`, { variant: 'error' }));
      } else {
        dispatch(createkpi({ kpi: data }))
          .unwrap()
          .then((res) => {
            enqueueSnackbar(`${translate(res.message)}`);
            reset();
            navigate(PATH_DASHBOARD.kpis.root);
          })
          .catch((err) => enqueueSnackbar(`${translate(err.message)}`, { variant: 'error' }));
      }
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
              <RHFTextField inputProps={{ readOnly: kpiDetails }} name="name" label="Name *" />
              <RHFTextField inputProps={{ readOnly: kpiDetails }} name="label" label="Label Name" />
              <RHFSelect
                disabled={kpiDetails}
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
              {[FrontType.CHECKBOX, FrontType.RADIO, FrontType.SELECT].includes(
                values.frontType
              ) && (
                <RHFAutocomplete
                  readOnly={kpiDetails}
                  name="options"
                  label="options"
                  multiple
                  freeSolo
                  options={[]}
                  ChipProps={{ size: 'small' }}
                />
              )}
              <RHFSwitch disabled={kpiDetails} name="isRequired" label="Is this kpi required" />
            </Box>

            {!kpiDetails && (
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  disabled={isEdit && !isDirty}
                  loading={isSubmitting}
                >
                  {!isEdit ? 'Create Kpi' : 'Save Changes'}
                </LoadingButton>
              </Stack>
            )}
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
