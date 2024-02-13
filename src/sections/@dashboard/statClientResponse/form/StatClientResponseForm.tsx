import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import FormProvider, { RHFTextField } from '../../../../components/hook-form';
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
    formState: { isSubmitting },
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
      <Grid container>
        <Grid style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }} md={6} xs={6}>
          <RHFTextField name={'clientName'} label={'Client Name'} type="text" />
          <RHFTextField name={'clientContact'} label={'Client Contact'} type="text" />
          {kpis.docs.map((kpi) => RenderField(kpi))}
        </Grid>
      </Grid>
      <LoadingButton
        sx={{ marginTop: '1rem' }}
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Save Changes
      </LoadingButton>
    </FormProvider>
  );
}
