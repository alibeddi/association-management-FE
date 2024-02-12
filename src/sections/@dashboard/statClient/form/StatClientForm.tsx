import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import FormProvider from '../../../../components/hook-form';
import { RootState, useSelector } from '../../../../redux/store';

type Props = {
  isEdit?: boolean;
  kpiDetails?: boolean;
  // TODO: add the type
  currentStatClient?: any | null;
};

export default function StatClientForm() {
  const { kpis } = useSelector((state: RootState) => state.kpis);
  // const NewUserSchema = Yup.object().shape(() => {
  //   return {};
  // });
  // yup validation
  const NewClientStatusSchema = Yup.object().shape({ name: Yup.number() });

  const methods = useForm({
    resolver: yupResolver(NewClientStatusSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
    watch,
  } = methods;
  const formValues = watch();

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
      dfsgvdfg
    </FormProvider>
  );
}
