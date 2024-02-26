import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Mention, MentionsInput } from 'react-mentions';
import * as Yup from 'yup';
import FormProvider from '../../../../components/hook-form';

type FormValues = {
  todo: string;
};

export default function AddNewTodo() {
  const NewTodoSchema = Yup.object().shape({
    todo: Yup.string().required('task description is required'),
  });
  const [mentions, setMentions] = useState([]);
  const defaultValues = useMemo(
    () => ({
      todo: '',
    }),
    []
  );
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(NewTodoSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
    control,
  } = methods;

  const onSubmit = async (data: FormValues) => {
    console.log(data);
  };
  const [value, setValue] = useState('');

  const users = [
    {
      id: 'isaac',
      display: 'Isaac Newton',
    },
    {
      id: 'sam',
      display: 'Sam Victor',
    },
    {
      id: 'emma',
      display: 'emmanuel@nobody.com',
    },
  ];

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="todo"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <MentionsInput value={value} onChange={onChange}>
            <Mention data={users} trigger="@" />
          </MentionsInput>
        )}
      />
    </FormProvider>
  );
}
