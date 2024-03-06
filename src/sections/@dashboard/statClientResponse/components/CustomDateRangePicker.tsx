import { Button } from '@mui/material';
import { IAsyncSelectFilter } from '../../../../@types/AsyncSelectFilter';
import DateRangePicker , {  useDateRangePicker } from '../../../../components/date-range-picker';
import { handleChangefilter } from '../../../../redux/slices/statClientResponse';
import { dispatch } from '../../../../redux/store';

const CustomDateRangePicker = ({name}:IAsyncSelectFilter) => {
  const {
    startDate,
    endDate,
    onChangeStartDate,
    onChangeEndDate,
    open: openPicker,
    onOpen: onOpenPicker,
    onClose: onClosePicker,
    onReset: onResetPicker,
    isSelected: isSelectedValuePicker,
    isError,
    shortLabel,
  } = useDateRangePicker(null, null);
  const handleChangeStartDate = (newValue: Date | null) =>{
    onChangeStartDate(newValue)
    if(!isError){
      dispatch(handleChangefilter({id:name,value:{startDate:newValue,endDate}}))

    }
    
  }
  const handleChangeCloseDate = (newValue : Date | null) => {
    onChangeEndDate(newValue);
    if(!isError){
      dispatch(handleChangefilter({id:name,value:{startDate,endDate:newValue}}))
    }
    
  }
  return (
<>
      <DateRangePicker  
      startDate={startDate}
                  endDate={endDate}
                  onChangeStartDate={handleChangeStartDate}
                  onChangeEndDate={handleChangeCloseDate}
                  open={openPicker}
                  onClose={onClosePicker}
                  isSelected={isSelectedValuePicker}
                  isError={isError}
                  variant="calendar"
                  />
                 <Button  onClick={onOpenPicker}>{isSelectedValuePicker ? shortLabel : 'Select Date'}</Button>
                 </>
  )
}

export default CustomDateRangePicker
