import FullCalendar from '@fullcalendar/react'; // => request placed at the top
import { DateSelectArg, EventClickArg, EventDropArg, EventInput,formatDate } from '@fullcalendar/core';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid'
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
    startDate: Date ;
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
    handleOpenModal();
    setSelectedRange({
      startDate: arg.start,
      endDate: arg.end,
    });
  };

  const handleSelectEvent = (arg: EventClickArg) => {
    handleOpenModal();
    setSelectedEventId(arg.event.id);
    if(arg?.event?.start && arg?.event?.end){
      setSelectedRange({
        startDate:arg.event.start ,
        endDate:arg.event.end
      })
    }
   
  };

  const handleResizeEvent = ({ event }: EventResizeDoneArg) => {
    try {
     
      dispatch(
        updateCalendarWorkTime({
        id:event.id,
        body:{
          startDate: event.start ,
          endDate: event.end
        }
        })
      );
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleDropEvent =  async ({ event }: EventDropArg) => {
    try {
      dispatch(updateCalendarWorkTime({
        id:event.id,
        body:{
          startDate: event.start ,
          endDate: event.end ,
        }
     }))
     .then(() => {
        console.log('218');
     })
     .catch(err => {
        enqueueSnackbar(err?.message || "something went wrong");
        console.log("error : 123 ",err);
        console.error(err);
     });
    } catch (error) {
      enqueueSnackbar(error?.message || "something went wrong");
      console.log("error : 123 ",error)
      console.error(error);
      throw new Error(error)
    }
    dispatch(getMyCalendarWorkTime())
  };

  const handleCreateUpdateEvent = (newEvent: ICalendarEvent) => {
    if (selectedEventId) {
      dispatch(updateCalendarWorkTime({id:selectedEventId, body:newEvent}));
      enqueueSnackbar('Update success!');
    } else {
      dispatch(createCalendarWorkTime(newEvent));
      enqueueSnackbar('Create success!');
    }
    dispatch(getMyCalendarWorkTime())
  };

  const handleDeleteEvent = () => {
    try {
      if (selectedEventId) {
        handleCloseModal();
        dispatch(deleteCalendarWorkTime({id:selectedEventId}));
        dispatch(getMyCalendarWorkTime())
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
              // view={view}
              onNextDate={handleClickDateNext}
              onPrevDate={handleClickDatePrev}
              onToday={handleClickToday}
              // onChangeView={handleChangeView}
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
              initialView={'timeGridWeek'}
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
              eventBackgroundColor='#1890FF'
              plugins={[
                timeGridPlugin,
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
            /> 
      </Dialog> 
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
    textColor: "#378006",
    title: "working hour"
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
