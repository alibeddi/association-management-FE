import {  useState } from 'react';
import {  EventDropArg } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Dialog, DialogTitle } from '@mui/material';

import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import { useSnackbar } from 'notistack';

import { ICalendarEvent } from '../../../../@types/calendar';
import { useGetUserEvent } from '../../../../hooks/useGetUserEvent';
import { CalendarForm, CalendarToolbar, StyledCalendar } from '../../calendar';
import {
  createUserWortime,
  deleteUserWorktime,
  updateUserWorktime,
} from '../../../../redux/slices/workTimes/actions';
import { useDispatch, useSelector } from '../../../../redux/store';
import { useCalendar } from '../../../../hooks/useCallendar';
import { applyFilter } from '../../../../utils';

type IProps = {
  isEdit: boolean;
  isDelete: boolean;
  isCreate: boolean;
  userId: string;
};

const Calendar = ({ isDelete, isEdit, userId, isCreate }: IProps) => {
  const dispatch = useDispatch();
  const {
    FullCalendar,
    calendarRef,
    handleClickToday,
    handleClickDatePrev,
    handleClickDateNext,
    date,
    openForm,
    selectedEventId,
    selectedRange,
    handleOpenModal,
    handleCloseModal,
    isDesktop,
    view,
    picker,
    handleSelectRange,
    handleSelectEvent,
  } = useCalendar();

  const { enqueueSnackbar } = useSnackbar();
  const [openFilter, setOpenFilter] = useState(false);
  const events = useGetUserEvent({ userId });
  const selectedEvent = useSelector(() => {
    if (selectedEventId) {
      return events.find((event) => event.id === selectedEventId);
    }
    return null;
  });

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

  const dataFiltered = applyFilter({
    inputData: events,
    filterStartDate: picker.startDate,
    filterEndDate: picker.endDate,
    isError: !!picker.isError,
  });
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
          events={dataFiltered}
          headerToolbar={false}
          initialEvents={events}
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
