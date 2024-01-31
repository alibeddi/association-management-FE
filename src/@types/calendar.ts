import { EventInput } from '@fullcalendar/core';

// ----------------------------------------------------------------------

export type ICalendarViewValue = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';

export type ICalendarEvent = {
  _id?:string;
  title: string;
  description: string;
  color: string;
  allDay: boolean;
  startDate: Date | string | null;
  endDate: Date | string | null;
  backgroundColor?: string;
};

export type ICalendarState = {
  isLoading: boolean;
  error: Error | string | null;
  events: EventInput[];
};
