import * as Yup from 'yup';
import merge from 'lodash/merge';

import { EventInput } from '@fullcalendar/core';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Stack, Button, Tooltip, IconButton, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// time
import { addOneHour } from '../../../utils';

// @types
import { ICalendarEvent } from '../../../@types/calendar';
// components
import Iconify from '../../../components/iconify';
import FormProvider, { RHFDateTimePicker, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

type FormValuesProps = ICalendarEvent;

type Props = {
  event: EventInput | null | undefined;
  range: {
    startDate: Date;
    endDate: Date;
  } | null;
  onCancel: VoidFunction;
  onDeleteEvent: VoidFunction;
  hasPermissionDelete: Boolean;
  onCreateUpdateEvent: (newEvent: ICalendarEvent) => void;
};

// ----------------------------------------------------------------------

const getInitialValues = (
  event: EventInput | null | undefined,
  range: { startDate: Date; endDate: Date } | null
) => {
  const currentTime = new Date();
  const initialEvent: FormValuesProps = {
    startDate: range ? new Date(range.startDate) : currentTime,
    endDate: range ? new Date(range.endDate) : addOneHour(currentTime),
  };

  if (event || range) {
    return merge({}, initialEvent, event);
  }

  return initialEvent;
};

// ----------------------------------------------------------------------

///
export default function CalendarForm({
  event,
  range,
  onCreateUpdateEvent,
  onDeleteEvent,
  onCancel,
  hasPermissionDelete,
}: Props) {
  const hasEventData = !!event;
  const EventSchema = Yup.object().shape({
    title: Yup.string().optional(),
    startDate: Yup.date().required(),
    endDate: Yup.date()
      .required()
      .when('startDate', (startDate, schema) => startDate && schema.min(startDate)),
  });

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: getInitialValues(event, range),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const newEvent = {
        title: data.title,
        startDate: data.startDate,
        endDate: data.endDate,
      };

      onCreateUpdateEvent(newEvent);
      onCancel();
      reset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3} sx={{ px: 3 }}>
          <RHFTextField name='title'  label="title" />
          <RHFDateTimePicker name="startDate" label="start date" />

          <RHFDateTimePicker name="endDate" label="end date" />
        </Stack>
      </LocalizationProvider>
      <DialogActions>
        {hasEventData && hasPermissionDelete && (
          <Tooltip title="Delete Event">
            <IconButton onClick={onDeleteEvent}>
              <Iconify icon="eva:trash-2-outline" />
            </IconButton>
          </Tooltip>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="inherit" onClick={onCancel}>
          Cancel
        </Button>

        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {hasEventData ? 'Update' : 'Add'}
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
