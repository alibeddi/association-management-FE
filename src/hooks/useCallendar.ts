import FullCalendar from '@fullcalendar/react';
import { useRef, useState } from 'react';

export const useCalendar = () =>{
  const calendarRef = useRef<FullCalendar>(null);
  const [date, setDate] = useState(new Date());
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

  return {
    FullCalendar,
    calendarRef,

    // date
    date, 
    setDate,

    // event calendar
    handleClickToday,
    handleClickDatePrev,
    handleClickDateNext
  }
}