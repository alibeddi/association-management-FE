import { EventInput } from '@fullcalendar/core';

// ----------------------------------------------------------------------

export type ICalendarViewValue = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';

export type ICalendarEvent = {
  _id?:string;
  startDate: Date | string | null;
  endDate: Date | string | null;
};

export type ICalendarState = {
  isLoading: boolean;
  error: Error | string | null;
  events: EventInput[];
};
