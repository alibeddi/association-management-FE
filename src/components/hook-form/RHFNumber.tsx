import React,{ ChangeEvent }  from 'react'
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import { useFormContext, Controller } from 'react-hook-form';
import { Box, TextField, TextFieldProps, Tooltip } from '@mui/material';
import { CustomNumberInput } from '../custom-input';


type Props = TextFieldProps & {
  name: string;
  label: string;
  min?:number;
  max?:number;
};
const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const value = event.target.value;

};
const RHFNumber = ({name,label,min,max}:Props) => {
const {control} = useFormContext()


  return (

        <Controller 
    name={name}
    control={control}
    render={({field})=> (
      <Tooltip title={label}>
          <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
          <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
      </Tooltip>
    )}
    />
  )
}

export default RHFNumber