import React from 'react'
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, TextFieldProps, Tooltip } from '@mui/material';
import { CustomNumberInput } from '../custom-input';

type Props = TextFieldProps & {
  name: string;
  label: string;
};

const RHFNumber = ({name,label}:Props) => {
const {control} = useFormContext()
  return (

        <Controller 
    name={name}
    control={control}
    render={({field})=> (
      <Tooltip title={label}>
        <CustomNumberInput aria-label="Demo number input" placeholder="Type a number…" />

      </Tooltip>
    )}
    />


  )
}

export default RHFNumber