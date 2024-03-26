import FullCalendar from '@fullcalendar/react';
import { useRef, useState } from 'react';
import { ICalendarViewValue } from '../@types/calendar';
import { useDateRangePicker } from '../components/date-range-picker';
import useResponsive from './useResponsive';

export const useCalendar = () =>{
  const calendarRef = useRef<FullCalendar>(null);
  const [date, setDate] = useState(new Date());
  const [openForm, setOpenForm] = useState(false);
  const isDesktop = useResponsive('up', 'sm');
  const [view, setView] = useState<ICalendarViewValue>('timeGridWeek');

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] = useState<{
    startDate: Date;
    endDate: Date;
  } | null>(null);
  const [openFilter, setOpenFilter] = useState(false);
  const picker = useDateRangePicker(null, null);
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
  const handleOpenModal = () => {
    setOpenForm(true);
  };

  const handleCloseModal = () => {
    setOpenForm(false);
    setSelectedRange(null);
    setSelectedEventId(null);
  };
  return {
    FullCalendar,
    calendarRef,

    // date
    date, 
    setDate,

    // event calendar
    handleClickToday,
    handleClickDatePrev,
    handleClickDateNext,
    // MODAL
    openForm, 
    setOpenForm,
    handleOpenModal,
    handleCloseModal,
    // SELECTED EVENT ID
    selectedEventId, 
    setSelectedEventId,
    //  SELECT RANGE
    selectedRange, 
    setSelectedRange,
    // Responsive
    isDesktop,
    view,
    setView,
    // FILTER
    openFilter, 
    setOpenFilter,
    // PICKER
    picker
  }
}