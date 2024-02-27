import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Mention, MentionsInput, DisplayTransformFunc } from 'react-mentions';
import * as Yup from 'yup';
import { User } from '../../../../@types/User';
import FormProvider from '../../../../components/hook-form';
import { getUsers } from '../../../../redux/slices/users/actions';
import { dispatch, RootState, useSelector } from '../../../../redux/store';

type FormValues = {
  todo: string;
};
type MentionData = {
  id: string;
  display: string;
};

export default function AddNewTodo() {
  const { users } = useSelector((state: RootState) => state.users);
  const [mentions, setMentions] = useState<{ id: string; display: string }[]>([]);

  useEffect(() => {
    const filtereddata = users.docs.map((user) => ({ id: user._id, display: user.username }));
    setMentions(filtereddata);
  }, [users]);

  const NewTodoSchema = Yup.object().shape({
    todo: Yup.string().required('task description is required'),
  });
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
    watch,
  } = methods;
  const values = watch();
  console.log({ values });
  const onSubmit = async (data: FormValues) => {
    console.log(data);
  };
  const data = [
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
  const fetchUsers = (search: any, callback: any) => {
    if (!search) return;
    console.log(search);
    dispatch(getUsers({ page: 0, limit: 100 }))
      .unwrap()
      .then((data) => {
        callback(data.docs.map((user: User) => ({ id: user._id, display: user.username })));
      })
      .catch(() => callback([]));
  };

  const mentionDisplayTransform: DisplayTransformFunc = (id: string, display: string) => {
    return `@${display}`;
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="todo"
        render={({ field: { onChange, value } }) => (
          <MentionsInput placeholder="type your new task..." value={value} onChange={onChange}>
            <Mention displayTransform={mentionDisplayTransform} data={fetchUsers} trigger="@" />
          </MentionsInput>
        )}
      />
    </FormProvider>
  );
}
