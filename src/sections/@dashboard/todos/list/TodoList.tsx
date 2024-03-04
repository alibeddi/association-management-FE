import { useState } from 'react';
// @mui
import {
  Button,
  CardHeader,
  Checkbox,
  CheckboxProps,
  Divider,
  FormControlLabel,
  IconButton,
  MenuItem,
  Stack,
} from '@mui/material';
// components
import { Todo, TodoStatus } from '../../../../@types/Todo';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import { deleteOneTodo, updateTodo } from '../../../../redux/slices/todos/actions';
import { dispatch } from '../../../../redux/store';
import ConfirmDialog from '../../../../components/confirm-dialog';

// ----------------------------------------------------------------------

interface Props {
  title?: string;
  subheader?: string;
  list: Todo[];
}

export default function TodoList({ title, subheader, list }: Props) {
  return (
    <>
      <CardHeader title={title} subheader={subheader} />

      {list.map((task) => (
        <TaskItem key={task._id} task={task} onDeleteRow={() => {}} />
      ))}
    </>
  );
}

// ----------------------------------------------------------------------

interface TaskItemProps extends CheckboxProps {
  task: Todo;
  onDeleteRow: VoidFunction;
}

export function TaskItem({ task, onDeleteRow }: TaskItemProps) {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleMarkComplete = () => {
    handleClosePopover();
    dispatch(updateTodo({ todoId: task._id, body: { status: TodoStatus.COMPLETED } }));
  };

  const handleEdit = () => {
    handleClosePopover();
    console.log('EDIT', task._id);
  };

  const handleDelete = () => {
    handleClosePopover();
    dispatch(deleteOneTodo({ todoId: task._id }));
  };

  const onChange = () => {
    dispatch(
      updateTodo({
        todoId: task._id,
        body: {
          status: task.status === TodoStatus.COMPLETED ? TodoStatus.TODO : TodoStatus.COMPLETED,
        },
      })
    );
  };

  return (
    <>
      <Stack
        direction="row"
        sx={{
          px: 2,
          py: 0.75,
          ...(task.status === TodoStatus.COMPLETED && {
            color: 'text.disabled',
            textDecoration: 'line-through',
          }),
        }}
      >
        <FormControlLabel
          control={<Checkbox checked={task.status === TodoStatus.COMPLETED} onChange={onChange} />}
          label={task.description}
          sx={{ flexGrow: 1, m: 0 }}
        />

        <IconButton
          size="large"
          color={openPopover ? 'inherit' : 'default'}
          onClick={handleOpenPopover}
        >
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Stack>

      <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="right-top">
        <MenuItem onClick={handleMarkComplete}>
          <Iconify icon="eva:checkmark-circle-2-fill" />
          Mark Complete
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteRow();
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}
