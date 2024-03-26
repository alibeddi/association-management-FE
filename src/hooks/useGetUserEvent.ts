import { EventInput } from '@fullcalendar/core';
import { id } from 'date-fns/locale';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserWorktime } from '../redux/slices/workTimes/actions';
import { RootState } from '../redux/store';

export const useGetUserEvent = ({ userId }: { userId: string }) => {
  const dispatch = useDispatch();
  const { workTimes } = useSelector((state: RootState) => state.workTimes);
  const { docs: data } = workTimes;
  const getAllEvents = useCallback(() => {
    dispatch(
      getUserWorktime({
        id: userId,
      })
    );
  }, [dispatch]);
  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);
  const events: EventInput[] = data.map((event) => ({
    id: event._id,
    start: event.startDate || new Date(),
    end: event.endDate || new Date(),
    textColor: '#378006',
    title: event.title || 'working hour',
  }));

  return events;
};
