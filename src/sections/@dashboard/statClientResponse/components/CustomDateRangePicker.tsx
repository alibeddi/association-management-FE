import { Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { IAsyncSelectFilter } from '../../../../@types/AsyncSelectFilter';
import DateRangePicker , {  useDateRangePicker } from '../../../../components/date-range-picker';

const CustomDateRangePicker = ({name,handleChange}:IAsyncSelectFilter) => {
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
      handleChange(name,{startDate:newValue,endDate})

    }
    
  }
  const handleChangeCloseDate = (newValue : Date | null) => {
    onChangeEndDate(newValue);
    if(!isError){
      handleChange(name,{startDate,endDate:newValue})
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
