import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import FormProvider from '../../../../components/hook-form';
import { RootState, useSelector } from '../../../../redux/store';
import { generateFieldValidation } from './utils/generateFieldValidation';
import RenderField from './utils/renderFormField';

type Props = {
  isEdit?: boolean;
  kpiDetails?: boolean;
  // TODO: add the type
  currentStatClient?: any | null;
};

export default function StatClientForm() {
  const { kpis } = useSelector((state: RootState) => state.kpis);
  // yup validation
  const validationsFields: { [key: string]: any } = {};
  const NewClientStatusSchema = Yup.object().shape({ name: Yup.number() });
  kpis.docs.forEach((field) => {
    const schema = generateFieldValidation(field);
    validationsFields[field.name] = schema;
  });
  const methods = useForm({
    resolver: yupResolver(Yup.object({ ...validationsFields })),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = methods;
  const onSubmit = async (data: any) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log({ data });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1rem' }}
      >
        {kpis.docs.map((kpi) => (
          <Grid item md={6} xs={6}>
            {RenderField(kpi)}
          </Grid>
        ))}
      </Grid>
      <LoadingButton sx={{}} type="submit" variant="contained" loading={isSubmitting}>
        Save Changes
      </LoadingButton>
    </FormProvider>
  );
}
