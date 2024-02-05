import FullCalendar from '@fullcalendar/react'; // => request placed at the top
import {
  DateSelectArg,
  EventClickArg,
  EventDropArg,
  EventInput,
  formatDate,
} from '@fullcalendar/core';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
//
import { useState, useRef, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, Button, Container, DialogTitle, Dialog } from '@mui/material';
// actions
import {
  getMyCalendarWorkTime,
  updateCalendarWorkTime,
  createCalendarWorkTime,
  deleteCalendarWorkTime,
} from '../redux/slices/workTimes/actions';
// @mui

// redux
import { useDispatch, useSelector } from '../redux/store';

// utils
import { fTimestamp } from '../utils/formatTime';
// hooks
import useResponsive from '../hooks/useResponsive';
// @types
import { ICalendarEvent, ICalendarViewValue } from '../@types/calendar';

import { useSnackbar } from '../components/snackbar';
import { useSettingsContext } from '../components/settings';
import { useDateRangePicker } from '../components/date-range-picker';
// sections
import {
  CalendarForm,
  StyledCalendar,
  CalendarToolbar,
  CalendarFilterDrawer,
} from '../sections/@dashboard/calendar';
import {applyFilter} from '../utils';
import { useGetEvents } from '../hooks/useGetEvents';





export default function CalendarPage() {
  const { enqueueSnackbar } = useSnackbar();

  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();

  const isDesktop = useResponsive('up', 'sm');

  const calendarRef = useRef<FullCalendar>(null);

  const events = useGetEvents();

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
  const picker = useDateRangePicker(null, null);

  const [date, setDate] = useState(new Date());

  const [openFilter, setOpenFilter] = useState(false);

  const [filterEventColor, setFilterEventColor] = useState<string[]>([]);

  const [view, setView] = useState<ICalendarViewValue>('timeGridWeek');

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      const newView = 'timeGridWeek';
      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [isDesktop]);

  const handleOpenModal = () => {
    setOpenForm(true);
  };

  const handleCloseModal = () => {
    setOpenForm(false);
    setSelectedRange(null);
    setSelectedEventId(null);
  };

  const handleClickToday = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };
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

  const handleResizeEvent = ({ event }: EventResizeDoneArg) => {
    try {
      dispatch(
        updateCalendarWorkTime({
          id: event.id,
          body: {
            startDate: event.start,
            endDate: event.end,
          },
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDropEvent = async (eventDropInfo:EventDropArg) => {

      await dispatch(
        updateCalendarWorkTime({
          id: eventDropInfo.event.id,
          body: {
            startDate: eventDropInfo.event.start,
            endDate: eventDropInfo.event.end,
          },
        })
      ).unwrap()
        .then((res) => enqueueSnackbar('updated with success'))
        .catch((err) => {
          enqueueSnackbar(err.message,{
            variant: "error"
          })
          eventDropInfo.revert()
        });
  };

  const handleCreateUpdateEvent = async (newEvent: ICalendarEvent) => {
    if (selectedEventId) {
      await dispatch(updateCalendarWorkTime({ id: selectedEventId, body: newEvent })).unwrap().then(()=>enqueueSnackbar('Update success!')).catch(err=>enqueueSnackbar(err.message,{variant:"error"}));   
    } else {
        await dispatch(createCalendarWorkTime(newEvent)).unwrap().then(res=>enqueueSnackbar('Create success!')).catch(err=>{
          enqueueSnackbar(err.message,{variant:"error"})
        })
    }
  };

  const handleDeleteEvent = () => {
    try {
      if (selectedEventId) {
        handleCloseModal();
        dispatch(deleteCalendarWorkTime({ id: selectedEventId }));
        enqueueSnackbar('Delete success!');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleResetFilter = () => {
    const { setStartDate, setEndDate } = picker;

    if (setStartDate && setEndDate) {
      setStartDate(null);
      setEndDate(null);
    }

    setFilterEventColor([]);
  };

  const dataFiltered = applyFilter({
    inputData: events,
    filterEventColor,
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
              onOpenFilter={() => setOpenFilter(true)}
              addEvent={handleOpenModal}
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
              initialView='timeGridWeek'
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
            />
          </StyledCalendar>
        </Card>
      </Container>

      <Dialog fullWidth maxWidth="xs" open={openForm} onClose={handleCloseModal}>
        <DialogTitle>{selectedEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>
        <CalendarForm
          event={selectedEvent}
          range={selectedRange}
          onCancel={handleCloseModal}
          onCreateUpdateEvent={handleCreateUpdateEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      </Dialog>
    </>
  );
}

// ----------------------------------------------------------------------




// ----------------------------------------------------------------------

