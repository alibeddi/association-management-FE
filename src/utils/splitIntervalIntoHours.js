import * as dayjs from "dayjs";

export const splitIntervalIntoHours = ({startDate, endDate}) =>{
  const start = dayjs(startDate)
  const end = dayjs(endDate)
  const differenceHour = end.diff(start,"hour")
  const interval = [{
    startDate,
    endDate: dayjs(startDate).add(1,'hour').toDate()
  }];
  for(let i = 1; i < differenceHour; i +=1){
    interval.push({
      startDate: start.add(i,'hour').toDate(),
      endDate: start.add(i+1,'hour').toDate()
    })
  }
  return interval;
}