import FullCalendar from '@fullcalendar/react'; // => request placed at the top
import { DateSelectArg, EventClickArg, EventDropArg, EventInput,formatDate } from '@fullcalendar/core';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
//
import { useState, useRef, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
// actions
import { getMyCalendarWorkTime,updateCalendarWorkTime,createCalendarWorkTime,deleteCalendarWorkTime } from 'src/redux/slices/workTimes/actions';
// @mui
import { Card, Button, Container, DialogTitle, Dialog } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../redux/store';

// import { getEvents, createEvent, updateCalendarWorkTime, deleteEvent } from '../redux/slices/calendar';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// utils
import { fTimestamp } from '../utils/formatTime';
// hooks
import useResponsive from '../hooks/useResponsive';
// @types
import { ICalendarEvent, ICalendarViewValue } from '../@types/calendar';
// components
import Iconify from '../components/iconify';
import { useSnackbar } from '../components/snackbar';
import CustomBreadcrumbs from '../components/custom-breadcrumbs';
import { useSettingsContext } from '../components/settings';
import { useDateRangePicker } from '../components/date-range-picker';
// sections
import {
  CalendarForm,
  StyledCalendar,
  CalendarToolbar,
  CalendarFilterDrawer,
} from '../sections/@dashboard/calendar';


// ----------------------------------------------------------------------

const COLOR_OPTIONS = [
  '#00AB55', // theme.palette.primary.main,
  '#1890FF', // theme.palette.info.main,
  '#54D62C', // theme.palette.success.main,
  '#FFC107', // theme.palette.warning.main,
  '#FF4842', // theme.palette.error.main
  '#04297A', // theme.palette.info.darker
  '#7A0C2E', // theme.palette.error.darker
];

// ----------------------------------------------------------------------

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
    start: Date ;
    end: Date;
  } | null>({
    start: new Date(),
    end: new Date()
  });

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

  const [view, setView] = useState<ICalendarViewValue>(isDesktop ? 'dayGridMonth' : 'listWeek');

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      const newView = isDesktop ? 'dayGridMonth' : 'listWeek';
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

  const handleChangeView = (newView: ICalendarViewValue) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.changeView(newView);
      setView(newView);
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
    console.log({arg});
    
    handleOpenModal();
    setSelectedRange({
      start: arg.start || new Date().toISOString(),
      end: arg.end || new Date().toISOString(),
    });
  };

  const handleSelectEvent = (arg: EventClickArg) => {
    handleOpenModal();
    setSelectedEventId(arg.event.id);
  };

  const handleResizeEvent = ({ event }: EventResizeDoneArg) => {
    try {

      dispatch(
        updateCalendarWorkTime({
        id:event.id,
        body:{
          allDay: event.allDay,
          startDate: event.start ,
          endDate: event.end
        }
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDropEvent = ({ event }: EventDropArg) => {
    try {
      dispatch(
        updateCalendarWorkTime({
          id:event.id,
          body:{
            allDay: event.allDay,
            startDate: event.start ,
            endDate: event.end ,
          }
          })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateUpdateEvent = (newEvent: ICalendarEvent) => {
    console.log("you're here you try to create event!")
    if (selectedEventId) {
      dispatch(updateCalendarWorkTime({id:selectedEventId, body:newEvent}));
      enqueueSnackbar('Update success!');
    } else {
      dispatch(createCalendarWorkTime(newEvent));
      enqueueSnackbar('Create success!');
    }
  };

  const handleDeleteEvent = () => {
    try {
      if (selectedEventId) {
        handleCloseModal();
        dispatch(deleteCalendarWorkTime({id:selectedEventId}));
        enqueueSnackbar('Delete success!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterEventColor = (eventColor: string) => {
    const checked = filterEventColor.includes(eventColor)
      ? filterEventColor.filter((value) => value !== eventColor)
      : [...filterEventColor, eventColor];

    setFilterEventColor(checked);
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
        <title> Calendar | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Calendar"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Calendar',
            },
          ]}
          moreLink={['https://fullcalendar.io/docs/react']}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleOpenModal}
            >
              New Event
            </Button>
          }
        />

        <Card>
          <StyledCalendar>
            <CalendarToolbar
              date={date}
              view={view}
              onNextDate={handleClickDateNext}
              onPrevDate={handleClickDatePrev}
              onToday={handleClickToday}
              onChangeView={handleChangeView}
              onOpenFilter={() => setOpenFilter(true)}
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
              eventColor='#1890FF'
              plugins={[
                listPlugin,
                dayGridPlugin,
                timelinePlugin,
                timeGridPlugin,
                interactionPlugin,
              ]}
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
              colorOptions={COLOR_OPTIONS}
            /> 
      </Dialog> 

      <CalendarFilterDrawer
        events={events}
        picker={picker}
        openFilter={openFilter}
        colorOptions={COLOR_OPTIONS}
        onResetFilter={handleResetFilter}
        filterEventColor={filterEventColor}
        onCloseFilter={() => setOpenFilter(false)}
        onFilterEventColor={handleFilterEventColor}
        onSelectEvent={(eventId) => {
          if (eventId) {
            handleOpenModal();
            setSelectedEventId(eventId);
          }
        }}
      />
    </>
  );
}

// ----------------------------------------------------------------------

const useGetEvents = () => {
  const dispatch = useDispatch();

  const workTimes = useSelector((state) => state.workTimes.workTimes);

  
  const {docs:data} = workTimes;
  
  const getAllEvents = useCallback(() => {
    dispatch(getMyCalendarWorkTime());
  }, [dispatch]);

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);
  const events:EventInput[] = data.map((event) => ({
    id:event._id,
    start:event.startDate || new Date(),
    end: event.endDate || new Date(),
    backgroundColor: event?.backgroundColor || '#00AB55',
  }));

return events;
};

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  filterEventColor,
  filterStartDate,
  filterEndDate,
  isError,
}: {
  inputData: EventInput[];
  filterEventColor: string[];
  filterStartDate: Date | null;
  filterEndDate: Date | null;
  isError: boolean;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterEventColor.length) {
    inputData = inputData.filter((event: EventInput) =>
      filterEventColor.includes(event.color as string)
    );
  }

  if (filterStartDate && filterEndDate && !isError) {
    inputData = inputData.filter(
      (event: EventInput) =>
        fTimestamp(event.start as Date) >= fTimestamp(filterStartDate) &&
        fTimestamp(event.end as Date) <= fTimestamp(filterEndDate)
    );
  }
  return inputData;
}
