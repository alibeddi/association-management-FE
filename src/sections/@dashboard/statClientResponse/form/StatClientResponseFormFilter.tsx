import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import { Stack } from '@mui/system';
import { nanoid } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import  { useState } from 'react'
import { IFilterStatClientResponse } from '../../../../@types/FilterStatClientResponse';
import EmptyContent from '../../../../components/empty-content';
import Iconify from '../../../../components/iconify';
import { statsClientResponseFilter } from '../../../../redux/slices/statClientResponse/actions';
import { dispatch } from '../../../../redux/store';
import { validNotEmptyFilters } from '../../../../utils';
import StatResponseFilterSelect from './StatResponseFilterSelect';

type IProps = {
  onClose : () => void;
}

const StatClientResponseFormFilter = ({
  onClose
}:IProps) =>  {
  const {enqueueSnackbar} = useSnackbar()
  const [filters,setFilters] = useState<IFilterStatClientResponse[] | []>([]);
  const [isSubmitting,setIsSubmitting] = useState<boolean>(false)
  const handleSubmit = async () => {
    setIsSubmitting(true)
    const isValid = validNotEmptyFilters(filters);
    if(!isValid){ setIsSubmitting(false)
      enqueueSnackbar("Please ensure all fields are filled in.",{
        variant:"error"
      })
      return;
    }
    await dispatch(statsClientResponseFilter({
      page:1,
      limit:10,
      filterValue:filters
    })).unwrap().then(res=>{enqueueSnackbar("success");onClose();}).catch(err=>enqueueSnackbar(err.messsage))
    
    setIsSubmitting(false)
  }
  const handleAdd = () => setFilters([...filters, { id:nanoid() , type: '', value: '' }]);
  const handleRemove = (id: string) => setFilters(filters.filter((elt) => elt.id !== id));
  return (
    <Stack>


      <Button onClick={()=>handleAdd()} startIcon={<Iconify icon='icons8:plus' />}> Add new Filter</Button>

   
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
