import * as Yup from 'yup';
import merge from 'lodash/merge';
import { isBefore } from 'date-fns';
import { EventInput } from '@fullcalendar/core';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Stack, Button, Tooltip, TextField, IconButton, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
// @types
import { ICalendarEvent } from '../../../@types/calendar';
// components
import Iconify from '../../../components/iconify';
import { ColorSinglePicker } from '../../../components/color-utils';
import FormProvider, { RHFTextField, RHFSwitch } from '../../../components/hook-form';

// ----------------------------------------------------------------------

type FormValuesProps = ICalendarEvent;

type Props = {
  colorOptions: string[];
  event: EventInput | null | undefined;
  range: {
    start: Date;
    end: Date;
  } | null;
  onCancel: VoidFunction;
  onDeleteEvent: VoidFunction;
  onCreateUpdateEvent: (newEvent: ICalendarEvent) => void;
};

// ----------------------------------------------------------------------

const getInitialValues = (
  event: EventInput | null | undefined,
  range: { start: Date; end: Date } | null
) => {
  const initialEvent: FormValuesProps = {
    title: '',
    description: '',
    color: '#1890FF',
    allDay: false,
    startDate: range ? new Date(range.start).toISOString() : new Date().toISOString(),
    endDate: range ? new Date(range.end).toISOString() : new Date().toISOString(),
  };

  if (event || range) {
    return merge({}, initialEvent, event);
  }

  return initialEvent;
};

// ----------------------------------------------------------------------

export default function CalendarForm({
  event,
  range,
  colorOptions,
  onCreateUpdateEvent,
  onDeleteEvent,
  onCancel,
}: Props) {
  console.log({range});
  
  const hasEventData = !!event;

  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Title is required'),
    description: Yup.string().max(5000),
  });

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: getInitialValues(event, range),
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const newEvent = {
        title: data.title,
        description: data.description,
        color: data.color,
        allDay: data.allDay,
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

  const isDateError =
    !values.allDay && values.startDate && values.endDate
      ? isBefore(new Date(values.endDate), new Date(values.startDate))
      : false;
console.log({isDateError})
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ px: 3 }}>
        <RHFTextField name="title" label="Title" />

        <RHFTextField name="description" label="Description" multiline rows={3} />

        <RHFSwitch name="allDay" label="All day" />
        <Controller
        name="startDate"
        control={control}
        render={({ field }) => (
          <MobileDateTimePicker
            {...field}
            onChange={(newValue: Date | null) => field.onChange(newValue)}
            label="Start date"
            inputFormat="dd/MM/yyyy hh:mm a"
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        )}
        />
        {/* <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            // <MobileDateTimePicker
            //   {...field}
            //   onChange={(newValue: Date | null) => field.onChange(newValue)}
            //   label="Start date"
            //   format="dd/MM/yyyy hh:mm a"
            //   // renderInput={(params) => <TextField {...params} fullWidth />}
            // />
            <MobileDateTimePicker
              {...field}
              onChange={(newValue: Date | null) => field.onChange(newValue)}
              label="Start date"
              value={field.value ? new Date(field.value) : null}
              name="startDate"
              format="yyyy/MM/dd HH:mm"
            />
          )}
        /> */}

        {/* <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            // <MobileDateTimePicker
            //   {...field}
            //   onChange={(newValue: Date | null) => field.onChange(newValue)}
            //   label="End date"
            //   format="dd/MM/yyyy hh:mm a"
            //   // renderInput={(params) => (
            //   //   <TextField
            //   //     {...params}
            //   //     fullWidth
            //   //     error={!!isDateError}
            //   //     helperText={isDateError && 'End date must be later than start date'}
            //   //   />
            //   // )}
            // />
          //   <MobileDateTimePicker
          // {...field}
          // onChange={(newValue: Date | null) => field.onChange(newValue)}
          // label="Start date"
          // value={field.value ? new Date(field.value) : null}

          // format="yyyy/MM/dd HH:mm"
          // />
          <MobileDateTimePicker
          {...field}
          onChange={(newValue: Date | null) => field.onChange(newValue)}
          label="Start date"
          value={field.value ? new Date(field.value) : null}
          name="startDate"
          format="yyyy/MM/dd HH:mm"
        />
          )}
        /> */}

        {/* <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <ColorSinglePicker
              value={field.value}
              onChange={field.onChange}
              colors={colorOptions}
            />
          )}
        /> */}
      </Stack>
{/* 
      <DialogActions>
        {hasEventData && (
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
      </DialogActions> */}
    </FormProvider>
  );
}
