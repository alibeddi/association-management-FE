import { useState } from 'react';
// @mui
import {
  Button,
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
import ConfirmDialog from '../../../../components/confirm-dialog';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import { updateTodo } from '../../../../redux/slices/todos/actions';
import { dispatch } from '../../../../redux/store';
import { convertToHtml } from '../utils/convertToHtml';

// ----------------------------------------------------------------------

interface TaskItemProps extends CheckboxProps {
  task: Todo;
  onDeleteTodo: (id: string) => void;
  onEditTodo: (task: Todo) => void;
  canDelete: boolean;
}

export function TaskItem({ task, onDeleteTodo, canDelete, onEditTodo }: TaskItemProps) {
  const { _id, status, description } = task;

  const htmlString = `<p>${convertToHtml(description)}</p>`;

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
    dispatch(updateTodo({ todoId: _id, body: { status: TodoStatus.COMPLETED } }));
  };

  const handleEdit = () => {
    handleClosePopover();
    onEditTodo(task);
  };

  const handleDelete = () => {
    handleClosePopover();
    handleOpenConfirm();
  };

  const onChange = () => {
    dispatch(
      updateTodo({
        todoId: _id,
        body: {
          status: status === TodoStatus.COMPLETED ? TodoStatus.TODO : TodoStatus.COMPLETED,
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
          ...(status === TodoStatus.COMPLETED && {
            color: 'text.disabled',
            textDecoration: 'line-through',
          }),
        }}
      >
        <FormControlLabel
          control={<Checkbox checked={status === TodoStatus.COMPLETED} onChange={onChange} />}
          label={<span dangerouslySetInnerHTML={{ __html: htmlString }} />}
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

        {canDelete && (
          <>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
              <Iconify icon="eva:trash-2-outline" />
              Delete
            </MenuItem>
          </>
        )}
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
              onDeleteTodo(_id);
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
