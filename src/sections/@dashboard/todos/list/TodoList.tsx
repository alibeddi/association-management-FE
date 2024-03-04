import { useState } from 'react';
// @mui
import {
  Card,
  Stack,
  Divider,
  Checkbox,
  MenuItem,
  CardProps,
  CardHeader,
  IconButton,
  CheckboxProps,
  FormControlLabel,
} from '@mui/material';
// components
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import { Todo, TodoStatus } from '../../../../@types/Todo';
import { dispatch } from '../../../../redux/store';
import { deleteOneTodo, updateTodo } from '../../../../redux/slices/todos/actions';

// ----------------------------------------------------------------------

type ItemProps = {
  id: string;
  label: string;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  list: Todo[];
}

export default function TodoList({ title, subheader, list, ...other }: Props) {
  const handleClickComplete = (task: Todo) => {
    // const tasksCompleted = selected.includes(taskId)
    //   ? selected.filter((value) => value !== taskId)
    //   : [...selected, taskId];
    dispatch(
      updateTodo({
        todoId: task._id,
        body: {
          status: task.status === TodoStatus.COMPLETED ? TodoStatus.TODO : TodoStatus.COMPLETED,
        },
      })
    );
    // setSelected(tasksCompleted);
  };

  return (
    <>
      <CardHeader title={title} subheader={subheader} />

      {list.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          checked={task.status === TodoStatus.COMPLETED}
          onChange={() => handleClickComplete(task)}
        />
      ))}
    </>
  );
}

// ----------------------------------------------------------------------

interface TaskItemProps extends CheckboxProps {
  task: Todo;
}

function TaskItem({ task, checked, onChange }: TaskItemProps) {
  
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
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

  return (
    <>
      <Stack
        direction="row"
        sx={{
          px: 2,
          py: 0.75,
          ...(checked && {
            color: 'text.disabled',
            textDecoration: 'line-through',
          }),
        }}
      >
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={onChange} />}
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
    </>
  );
}
