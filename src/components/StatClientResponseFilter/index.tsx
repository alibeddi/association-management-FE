import { Dialog, DialogTitle } from '@mui/material'
import { Dispatch, SetStateAction } from 'react';
import { IFilterStatClientResponse } from '../../@types/FilterStatClientResponse';
import { StatClientResponseFormFilter } from '../../sections/@dashboard/statClientResponse/form';



type IProps = {
  open: boolean,
  onClose: () => void,
  filters:  IFilterStatClientResponse[];
  setFilters: Dispatch<SetStateAction<[] | IFilterStatClientResponse[]>>;
}

const StatClientResponseFilter = ({
  open,
  onClose,
  filters,
  setFilters
}:IProps) => 
   (
    <Dialog open={open} onClose={onClose}>
    <StatClientResponseFormFilter filters={filters} setFilters={setFilters} onClose={onClose}/>
  </Dialog>
  )


export default StatClientResponseFilter
