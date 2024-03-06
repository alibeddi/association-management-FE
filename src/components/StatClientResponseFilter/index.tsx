import { Dialog, DialogTitle } from '@mui/material'
import { Dispatch, SetStateAction } from 'react';
import { IFilterStatClientResponse } from '../../@types/FilterStatClientResponse';
import { StatClientResponseFormFilter } from '../../sections/@dashboard/statClientResponse/form';



type IProps = {
  open: boolean,
  onClose: () => void
}

const StatClientResponseFilter = ({
  open,
  onClose,
}:IProps) => 
   (
    <Dialog open={open} onClose={onClose}>
    <StatClientResponseFormFilter   onClose={onClose}/>
  </Dialog>
  )


export default StatClientResponseFilter
