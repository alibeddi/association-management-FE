import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  FormHelperText,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Stack,
} from '@mui/material';
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
import { extractMentions } from '../utils/extractMentions';
import './mentions.css';

type FormValues = {
  todo: string;
};
type Props = {
  isEdit?: boolean;
  currentTodo?: Todo | null;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
};
export default function AddNewTodo({
  isEdit = false,
  currentTodo,
  setIsEdit,
  setCurrentTodo,
}: Props) {
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
  } = methods;

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
      const body = extractMentions(data.todo);

      if (isEdit && currentTodo) {
        dispatch(updateTodo({ todoId: currentTodo?._id, body }))
          .unwrap()
          .then((res) => {
            enqueueSnackbar(`${translate(res.message)}`);
            setIsEdit(false);
            setCurrentTodo(null);
            reset();
          })
          .catch((err) => enqueueSnackbar(`${translate(err.message)}`, { variant: 'error' }));
      } else {
        dispatch(createNewTodo({ body }))
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
            display: user.username || user.email,
          }))
        );
      })
      .catch(() => callback([]));
  };

  const mentionDisplayTransform: DisplayTransformFunc = (id: string, display: string) =>
    `${display}`;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '0.75rem',
          maxWidth: '800px',
          margin: '15px',
        }}
      >
        <Stack className="mention-input" sx={{ flexGrow: 1 }}>
          <Controller
            control={control}
            name="todo"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Stack sx={{ border: '1px solid #e3e5e7', padding: '8px', borderRadius: '4px' }}>
                  <MentionsInput
                    placeholder="Add your new todo..."
                    value={value}
                    onChange={onChange}
                    style={{ height: '70px' }}
                  >
                    <Mention
                      displayTransform={mentionDisplayTransform}
                      data={fetchUsers}
                      trigger="@"
                      style={{
                        backgroundColor: '#CEE4E5',
                        paddingBottom: '3px',
                        zIndex: 2,
                      }}
                      markup="@[__display__](__id__)" // To highlight tagged users
                      renderSuggestion={(suggestion, search, highlightedDisplay) => (
                        <MenuItem sx={{ zIndex: 99999 }}>
                          <ListItemAvatar>
                            <Avatar src={suggestion.display} alt={suggestion.display} />
                          </ListItemAvatar>
                          <ListItemText primary={highlightedDisplay} />
                        </MenuItem>
                      )}
                    />
                  </MentionsInput>
                </Stack>
                {error && <FormHelperText error>{error.message}</FormHelperText>}
              </>
            )}
          />
        </Stack>
        <Stack alignItems="flex-end" sx={{ marginTop: '5px' }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            <Iconify icon={isEdit ? 'ic:baseline-edit' : 'ic:sharp-add'} />
            {isEdit ? 'save' : 'add'}
          </LoadingButton>
        </Stack>
      </Box>
    </FormProvider>
  );
}
