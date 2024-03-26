import React, { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Dialog, DialogTitle } from '@mui/material';

import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import { useSnackbar } from 'notistack';

import { ICalendarEvent, ICalendarViewValue } from '../../../../@types/calendar';
import useResponsive from '../../../../hooks/useResponsive';
import { useGetUserEvent } from '../../../../hooks/useGetUserEvent';
import { CalendarForm, CalendarToolbar, StyledCalendar } from '../../calendar';
import {
  createUserWortime,
  deleteUserWorktime,
  updateUserWorktime,
} from '../../../../redux/slices/workTimes/actions';
import { useDispatch, useSelector } from '../../../../redux/store';

type IProps = {
  isEdit: boolean;
  isDelete: boolean;
  isCreate: boolean;
  userId: string;
};

const Calendar = ({ isDelete, isEdit, userId, isCreate }: IProps) => {
  const dispatch = useDispatch();
  const calendarRef = useRef<FullCalendar>(null);
  const [date, setDate] = useState(new Date());
  const { enqueueSnackbar } = useSnackbar();
  const [view, setView] = useState<ICalendarViewValue>('timeGridWeek');
  const [openFilter, setOpenFilter] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] = useState<{
    startDate: Date;
    endDate: Date;
  } | null>(null);
  const events = useGetUserEvent({ userId });
  const selectedEvent = useSelector(() => {
    if (selectedEventId) {
      return events.find((event) => event.id === selectedEventId);
    }
    return null;
  });
  const handleOpenModal = () => {
    setOpenForm(true);
  };
  const handleCloseModal = () => {
    setOpenForm(false);
    setSelectedRange(null);
    setSelectedEventId(null);
  };
  const handleSelectRange = (arg: DateSelectArg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.unselect();
    }
    handleOpenModal();
    setSelectedRange({
      startDate: arg.start,
      endDate: arg.end,
    });
  };

  const handleSelectEvent = (arg: EventClickArg) => {
    handleOpenModal();
    setSelectedEventId(arg.event.id);
    if (arg?.event?.start && arg?.event?.end) {
      setSelectedRange({
        startDate: arg.event.start,
        endDate: arg.event.end,
      });
    }
  };

  const handleResizeEvent = async ({ event }: EventResizeDoneArg) => {
    if (!isEdit) return;
    await dispatch(
      updateUserWorktime({
        id: event.id,
        userId,
        body: {
          startDate: event.start,
          endDate: event.end,
        },
      })
    )
      .unwrap()
      .then((res) => enqueueSnackbar(res.message))
      .catch((err) =>
        enqueueSnackbar(err.message, {
          variant: 'error',
        })
      );
  };

  const handleDropEvent = async (eventDropInfo: EventDropArg) => {
    if (!isEdit) {
      eventDropInfo.revert();
      return;
    }
    await dispatch(
      updateUserWorktime({
        id: eventDropInfo.event.id,
        userId,
        body: {
          startDate: eventDropInfo.event.start,
          endDate: eventDropInfo.event.end,
        },
      })
    )
      .unwrap()
      .then((res) => enqueueSnackbar('updated with success'))
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: 'error',
        });
        eventDropInfo.revert();
      });
  };

  const handleCreateUpdateEvent = async (newEvent: ICalendarEvent) => {
    if (selectedEventId && isEdit) {
      await dispatch(updateUserWorktime({ id: selectedEventId, userId, body: newEvent }))
        .unwrap()
        .then(() => enqueueSnackbar('updated with success'))
        .catch((err) => enqueueSnackbar(err.message, { variant: 'error' }));
    } else if (isCreate) {
      await dispatch(createUserWortime({ userId, body: newEvent }))
        .unwrap()
        .then((res) => enqueueSnackbar('Create with success!'))
        .catch((err) => {
          enqueueSnackbar(err.message, { variant: 'error' });
        });
    }
  };

  const handleDeleteEvent = () => {
    try {
      if (isDelete) {
        handleCloseModal();
        if (selectedEventId) dispatch(deleteUserWorktime({ id: selectedEventId, userId }));
        enqueueSnackbar('Delete with success!');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const isDesktop = useResponsive('up', 'sm');

  const handleClickDatePrev = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleClickDateNext = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };
  const handleClickToday = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };
  return (
    <>
      <StyledCalendar>
        <CalendarToolbar
          date={date}
          onNextDate={handleClickDateNext}
          onPrevDate={handleClickDatePrev}
          onToday={handleClickToday}
          onOpenFilter={() => setOpenFilter(!openFilter)}
          addEvent={handleOpenModal}
          hasPermissionCreate={isCreate}
        />
        <FullCalendar
          weekends
          editable
          droppable
          selectable
          rerenderDelay={10}
          allDayMaintainDuration
          eventResizableFromStart
          ref={calendarRef}
          initialDate={date}
          initialView={view}
          dayMaxEventRows={3}
          eventDisplay="block"
          events={events}
          headerToolbar={false}
          initialEvents={[]}
          select={handleSelectRange}
          eventDrop={handleDropEvent}
          eventClick={handleSelectEvent}
          eventResize={handleResizeEvent}
          height={isDesktop ? 720 : 'auto'}
          eventColor="#1890FF"
          eventBackgroundColor="#1890FF"
          plugins={[timeGridPlugin, interactionPlugin]}
          slotMinTime="07:00:00"
          slotMaxTime="22:00:00"
          locale={frLocale}
        />
      </StyledCalendar>
      <Dialog fullWidth maxWidth="xs" open={openForm} onClose={handleCloseModal}>
        <DialogTitle>{selectedEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>
        <CalendarForm
          event={selectedEvent}
          range={selectedRange}
          onCancel={handleCloseModal}
          onCreateUpdateEvent={handleCreateUpdateEvent}
          onDeleteEvent={handleDeleteEvent}
          hasPermissionDelete={isDelete}
        />
      </Dialog>
    </>
  );
};

export default Calendar;
