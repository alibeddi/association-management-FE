import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import { Stack } from '@mui/system';
import { useSnackbar } from 'notistack';
import  { useState } from 'react'
import EmptyContent from '../../../../components/empty-content';
import Iconify from '../../../../components/iconify';
import { useTable } from '../../../../components/table';
import { addFilter } from '../../../../redux/slices/statClientResponse';
import { statsClientResponseFilter } from '../../../../redux/slices/statClientResponse/actions';
import { dispatch, useSelector } from '../../../../redux/store';
import { validNotEmptyFilters } from '../../../../utils';
import StatResponseFilterSelect from './StatResponseFilterSelect';

type IProps = {
  onClose : () => void;
}
const StatClientResponseFormFilter = ({
  onClose
}:IProps) =>  {
  const {page,rowsPerPage} = useTable({defaultOrderBy: 'createdAt', defaultOrder: 'desc'})
  const {enqueueSnackbar} = useSnackbar()
  const [isSubmitting,setIsSubmitting] = useState<boolean>(false)
  const {filters} = useSelector(store=>store.statClientResponses)
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
      page: page+1,
      limit:rowsPerPage,
      filterValue:filters
    })).unwrap().then(res=>{enqueueSnackbar("success");onClose();}).catch(err=>enqueueSnackbar(err.message,{
      variant:"error"
    }))
    setIsSubmitting(false)
  }

  
  return (
    <Stack>

 <Button onClick={()=>dispatch(addFilter())} startIcon={<Iconify icon='icons8:plus' />}> Add new Filter</Button>

   
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
        filters?.length > 0 ? <StatResponseFilterSelect filters={filters}  /> : <EmptyContent title="no filter"/>
      }

      <Stack sx={{
        display:"flex",
        flexDirection:"row",
        "& *": {
          flexBasis: "100%",
          
        },
        
        gap:'1rem',

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
