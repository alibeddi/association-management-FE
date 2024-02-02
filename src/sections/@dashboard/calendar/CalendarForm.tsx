import * as Yup from 'yup';
import * as dayjs from "dayjs";
import merge from 'lodash/merge';

import { EventInput } from '@fullcalendar/core';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Stack, Button, Tooltip, TextField, IconButton, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// time
import { addOneHour } from 'src/utils';
import {  isBefore } from 'date-fns';
// @types
import { ICalendarEvent } from '../../../@types/calendar';
// components
import Iconify from '../../../components/iconify';
import { ColorSinglePicker } from '../../../components/color-utils';
import FormProvider, { RHFTextField, RHFSwitch } from '../../../components/hook-form';



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
    endDate: range  ? new Date(range.endDate) : addOneHour(currentTime),
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
  onCreateUpdateEvent,
  onDeleteEvent,
  onCancel,
}: Props) {
  const hasEventData = !!event;
  const EventSchema = Yup.object().shape({
    startDate: Yup.date().required(),
    endDate: Yup.date().required(),
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
      console.log("data => : ",{data})
      const newEvent = {
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
     values.startDate && values.endDate
      ? isBefore(new Date(values.endDate), new Date(values.startDate))
      : false;
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
       <Stack spacing={3} sx={{ px: 3 }}> 

       
         <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <MobileDateTimePicker
              {...field}
              onChange={(newValue: unknown) => field.onChange(newValue)}
              label="Start date"
              value={field.value ? new Date(field.value) : null}
              renderInput={(params)=> <TextField {...params} />}
            />)}
      
        /> 
           <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <MobileDateTimePicker
              {...field}
              onChange={(newValue: unknown) => field.onChange(newValue)}
              label="end date"
              value={field.value ? (new Date(field.value)): null}
              renderInput={(params)=> <TextField {...params} />}
            />)}
      
        /> 
        
      </Stack> 
      </LocalizationProvider>
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
      </DialogActions>
    </FormProvider>
  );
}
