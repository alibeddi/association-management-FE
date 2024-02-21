import { Dialog } from '@mui/material';
import React from 'react'
import {StatClientResponseFilterForm} from '../../sections/@dashboard/statClientResponse/form';
import ConfirmDialog from '../confirm-dialog';
import { ConfirmDialogProps } from '../confirm-dialog/types'

const FilterModal = ({
  open,
  onClose,
}:{open:boolean,onClose:()=>void}) => 
 (
  <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
   <StatClientResponseFilterForm/>
</Dialog>
  )


export default FilterModal