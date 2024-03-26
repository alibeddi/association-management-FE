import React, { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Container } from '@mui/system';
import { Dialog, DialogTitle } from '@mui/material';
import { useSelector } from 'react-redux';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';

import usePermission from '../../../../hooks/usePermission';
import { ICalendarEvent, ICalendarViewValue } from '../../../../@types/calendar';
import useResponsive from '../../../../hooks/useResponsive';
import { useGetUserEvent } from '../../../../hooks/useGetUserEvent';
import { CalendarForm, CalendarToolbar, StyledCalendar } from '../../calendar';

type IProps = {
  isEdit: boolean;
  isDelete: boolean;
  isCreate: boolean;
  userId: string;
};

const Calendar = ({ isDelete, isEdit, userId, isCreate }: IProps) => {
  const calendarRef = useRef<FullCalendar>(null);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<ICalendarViewValue>('timeGridWeek');
  const [openFilter, setOpenFilter] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] = useState<{
    startDate: Date;
    endDate: Date;
  } | null>(null);
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
    console.log('select range');
  };

  const handleSelectEvent = (arg: EventClickArg) => {
    console.log('select event');
  };

  const handleResizeEvent = async ({ event }: EventResizeDoneArg) => {
    console.log('resize');
  };

  const handleDropEvent = async (eventDropInfo: EventDropArg) => {
    console.log('drop');
  };

  const handleCreateUpdateEvent = async (newEvent: ICalendarEvent) => {
    console.log(newEvent);
  };

  const handleDeleteEvent = () => {
    try {
      console.log('delete');
    } catch (error) {
      console.error(error);
    }
  };
  const isDesktop = useResponsive('up', 'sm');
  const events = useGetUserEvent({ userId });
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
