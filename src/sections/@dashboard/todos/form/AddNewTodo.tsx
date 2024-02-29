import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Avatar, Box, ListItemAvatar, ListItemText, MenuItem, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DisplayTransformFunc, Mention, MentionsInput } from 'react-mentions';
import * as Yup from 'yup';
import { Todo } from '../../../../@types/Todo';
import { User } from '../../../../@types/User';
import FormProvider from '../../../../components/hook-form';
import Iconify from '../../../../components/iconify';
import { useLocales } from '../../../../locales';
import { createNewTodo, updateTodo } from '../../../../redux/slices/todos/actions';
import { getUsers } from '../../../../redux/slices/users/actions';
import { dispatch } from '../../../../redux/store';
import './mentions.css';

type FormValues = {
  todo: string;
};
type Props = {
  isEdit?: boolean;
  currentTodo?: Todo | null;
};
export default function AddNewTodo({ isEdit = false, currentTodo }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();

  const NewTodoSchema = Yup.object().shape({
    todo: Yup.string().min(2).max(255).required('task description is required'),
  });
  const defaultValues = useMemo(
    () => ({
      todo: currentTodo?.description || '',
    }),
    [currentTodo]
  );
  const methods = useForm<FormValues>({
    resolver: yupResolver(NewTodoSchema),
    defaultValues,
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

  useEffect(() => {
    if (isEdit && currentTodo) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [isEdit, currentTodo]);
  const onSubmit = async (data: FormValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (isEdit && currentTodo) {
        dispatch(updateTodo({ todoId: currentTodo?._id, body: data }))
          .unwrap()
          .then((res) => {
            enqueueSnackbar(`${translate(res.message)}`);
            reset();
          })
          .catch((err) => enqueueSnackbar(`${translate(err.message)}`, { variant: 'error' }));
      } else {
        dispatch(createNewTodo({ body: data }))
          .unwrap()
          .then((res) => {
            enqueueSnackbar(`${translate(res.message)}`);
            reset();
          })
          .catch((err) => enqueueSnackbar(`${translate(err.message)}`, { variant: 'error' }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = (search: string, callback: any) => {
    dispatch(getUsers({ page: 0, limit: 100, search }))
      .unwrap()
      .then((data) => {
        callback(
          data.docs.map((user: User) => ({
            id: user._id,
            display: user.username,
            profilePicture: user?.avatar,
          }))
        );
      })
      .catch(() => callback([]));
  };

  const mentionDisplayTransform: DisplayTransformFunc = (id: string, display: string) =>
    `@${display}`;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '0.75rem',
          alignItems: 'center',
          maxWidth: '800px',
          margin: '15px',
        }}
      >
        <Stack className="mention-input" sx={{ flexGrow: 1 }}>
          <Controller
            control={control}
            name="todo"
            render={({ field: { onChange, value } }) => (
              <MentionsInput
                singleLine
                placeholder="Add your new todo..."
                value={value}
                onChange={onChange}
                allowSuggestionsAboveCursor // To enable keyboard navigation for selecting tagged users
              >
                <Mention
                  displayTransform={mentionDisplayTransform}
                  data={fetchUsers}
                  trigger="@"
                  markup="@[__display__](__id__)" // To highlight tagged users
                  renderSuggestion={(suggestion, search, highlightedDisplay) => (
                    <MenuItem>
                      <ListItemAvatar>
                        <Avatar src={suggestion.display} alt={suggestion.display} />
                      </ListItemAvatar>
                      <ListItemText primary={highlightedDisplay} />
                    </MenuItem>
                  )}
                />
              </MentionsInput>
            )}
          />
        </Stack>
        <Stack alignItems="flex-end" sx={{ marginTop: 2 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            <Iconify icon={isEdit ? 'ic:baseline-edit' : 'ic:sharp-add'} />
            {isEdit ? 'save' : 'add'}
          </LoadingButton>
        </Stack>
      </Box>
    </FormProvider>
  );
}
