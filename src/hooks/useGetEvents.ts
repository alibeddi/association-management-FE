import { EventInput } from "@fullcalendar/core";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMyCalendarWorkTime } from "../redux/slices/workTimes/actions";
import { RootState } from "../redux/store";


export const useGetEvents = () => {
  const dispatch = useDispatch();

  const  {workTimes} = useSelector((state:RootState) => state.workTimes);

  const { docs: data } = workTimes;

  const getAllEvents = useCallback(() => {
    dispatch(getMyCalendarWorkTime());
  }, [dispatch]);

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);
  const events: EventInput[] = data.map((event) => ({
    id: event._id,
    start: event.startDate || new Date(),
    end: event.endDate || new Date(),
    textColor: '#378006',
    title: 'working hour',
  }));

  return events;
};