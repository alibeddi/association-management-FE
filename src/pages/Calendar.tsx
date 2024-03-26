import {  EventDropArg } from '@fullcalendar/core';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';

import { Helmet } from 'react-helmet-async';
import { Card, Container, DialogTitle, Dialog } from '@mui/material';
// actions
import {
  updateCalendarWorkTime,
  createCalendarWorkTime,
  deleteCalendarWorkTime,
} from '../redux/slices/workTimes/actions';

// redux
import { useDispatch, useSelector } from '../redux/store';

// @types
import { ICalendarEvent } from '../@types/calendar';

import { useSnackbar } from '../components/snackbar';
import { useSettingsContext } from '../components/settings';
// sections
import { CalendarForm, StyledCalendar, CalendarToolbar } from '../sections/@dashboard/calendar';
import { applyFilter } from '../utils';
import { useGetEvents } from '../hooks/useGetEvents';
import usePermission from '../hooks/usePermission';
import { useCalendar } from '../hooks/useCallendar';

export default function CalendarPage() {
  const { enqueueSnackbar } = useSnackbar();
  const { isSuperAdmin, hasPCreateCalendar, hasPEditUserCalendar, hasPDeleteUserCalendar } =
    usePermission();
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
    openFilter,
    setOpenFilter,
    picker,
    handleSelectRange,
    handleSelectEvent,
  } = useCalendar();
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();
  const events = useGetEvents();
  const selectedEvent = useSelector(() => {
    if (selectedEventId) {
      return events.find((event) => event.id === selectedEventId);
    }
    return null;
  });

  const handleResizeEvent = async ({ event }: EventResizeDoneArg) => {
    if (!hasPEditUserCalendar) return;
    await dispatch(
      updateCalendarWorkTime({
        id: event.id,
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
    if (!hasPEditUserCalendar) {
      eventDropInfo.revert();
      return;
    }
    await dispatch(
      updateCalendarWorkTime({
        id: eventDropInfo.event.id,
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
    if (selectedEventId && hasPEditUserCalendar) {
      await dispatch(updateCalendarWorkTime({ id: selectedEventId, body: newEvent }))
        .unwrap()
        .then(() => enqueueSnackbar('Update success!'))
        .catch((err) => enqueueSnackbar(err.message, { variant: 'error' }));
    } else if (isSuperAdmin || hasPCreateCalendar) {
      await dispatch(createCalendarWorkTime(newEvent))
        .unwrap()
        .then((res) => enqueueSnackbar('Create success!'))
        .catch((err) => {
          enqueueSnackbar(err.message, { variant: 'error' });
        });
    }
  };

  const handleDeleteEvent = () => {
    try {
      if ((selectedEventId && hasPDeleteUserCalendar) || isSuperAdmin) {
        handleCloseModal();
        if (selectedEventId) dispatch(deleteCalendarWorkTime({ id: selectedEventId }));
        enqueueSnackbar('Delete success!');
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
      <Helmet>
        <title> Calendar | Branch Office</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card>
          <StyledCalendar>
            <CalendarToolbar
              date={date}
              onNextDate={handleClickDateNext}
              onPrevDate={handleClickDatePrev}
              onToday={handleClickToday}
              onOpenFilter={() => setOpenFilter(!openFilter)}
              addEvent={handleOpenModal}
              hasPermissionCreate={isSuperAdmin || hasPCreateCalendar}
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
        </Card>
      </Container>

      {(isSuperAdmin || hasPCreateCalendar || hasPDeleteUserCalendar || hasPEditUserCalendar) && (
        <Dialog fullWidth maxWidth="xs" open={openForm} onClose={handleCloseModal}>
          <DialogTitle>{selectedEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>
          <CalendarForm
            event={selectedEvent}
            range={selectedRange}
            onCancel={handleCloseModal}
            onCreateUpdateEvent={handleCreateUpdateEvent}
            onDeleteEvent={handleDeleteEvent}
            hasPermissionDelete={isSuperAdmin || hasPDeleteUserCalendar}
          />
        </Dialog>
      )}
    </>
  );
}
