import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import { Stack } from '@mui/system';
import { nanoid } from '@reduxjs/toolkit';
import  { useState } from 'react'
import { IFilterStatClientResponse } from '../../../../@types/FilterStatClientResponse';
import EmptyContent from '../../../../components/empty-content';
import StatResponseFilterSelect from './StatResponseFilterSelect';

type IProps = {
  onClose : () => void;
}

const StatClientResponseFormFilter = ({
  onClose
}:IProps) =>  {
  const [filters,setFilters] = useState<IFilterStatClientResponse[] | []>([]);
  const [isSubmitting,setIsSubmitting] = useState<boolean>(false)
  const handleSubmit = () => console.log(filters)
  const handleAdd = () => setFilters([...filters, { id:nanoid() , type: '', value: '' }]);
  const handleRemove = (id: string) => setFilters(filters.filter((ele) => ele.id !== id));
  return (
    <Stack>


      <Button onClick={()=>handleAdd()} > Add new Filter</Button>

   
    <Stack  style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      minHeight: '35rem',
      minWidth:"35rem",
      justifyContent: 'space-between',
      padding:"1rem",
      flex:1
    }}>
      {
        filters?.length > 0 ? <StatResponseFilterSelect filters={filters} setFilters={setFilters} onDelete={handleRemove}/>: <EmptyContent title="no filter"/>
      }

      <Stack sx={{
        display:"flex",
        flexDirection:"row",
        "& *": {
          flexBasis: "100%"
        },
        gap:'1rem'

      }}>
      <LoadingButton variant="contained" type="submit" loading={isSubmitting} onClick={()=>handleSubmit()}>
          submit
        </LoadingButton>
        <LoadingButton onClick={()=>onClose()} variant="outlined" loading={isSubmitting}>
          cancel
        </LoadingButton>
      </Stack>
    </Stack>
    </Stack>

  )

}
export default StatClientResponseFormFilter
