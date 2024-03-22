import dayjs from 'dayjs';

type Props = {startDate: Date | string | null ,endDate:  Date | string | null ,title:string | undefined }

export const splitIntervalIntoHours = ({startDate, endDate,title}:Props) =>{

  if(!startDate || !endDate) return undefined;
  const start = dayjs(new Date(startDate))
  const end = dayjs(new Date(endDate)) 
  const differenceHour = end.diff(start,"hour")

  let  interval =[];
  if(differenceHour!==0){
     interval = [{
      title,
      startDate,
      endDate: dayjs(startDate).add(1,'hour').toDate()
    }];
    for(let i = 1; i < differenceHour; i +=1){
      interval.push({
        title,
        startDate: start.add(i,'hour').toDate(),
        endDate: start.add(i+1,'hour').toDate()
      })
    }
    const isSameEnding = dayjs(interval[interval.length-1].endDate).isSame(end);
    if(!isSameEnding){
      const lastEndDateInterval = interval[interval.length-1].endDate;
      interval.push({
        title,
        startDate: lastEndDateInterval,
        endDate: end.toDate()
      })
    }
  }else{
    interval.push({
        title,
        startDate,
        endDate
    })
  }
 
  return interval;
}
