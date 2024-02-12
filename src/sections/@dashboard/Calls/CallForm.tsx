import React from 'react'

import * as Yup from "yup"
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import { ICall } from '../../../@types/Call';
import { createCallsToday } from '../../../redux/slices/calls/actions';

export type IProp<ICall> = {
  handleCreateUpdate: (data:ICall) => void;
  callSelected: ICall | undefined;
}

const CallForm = ({handleCreateUpdate,callSelected}:IProp<ICall>) => {
  const dispath = useDispatch();
  const CallSchema = Yup.object({
    numberCalls: Yup.number().required()
  })
  console.log("test : ",{callSelected,num:callSelected?.numberCalls})
  const methods = useForm<ICall>({
    resolver: yupResolver(CallSchema)
  })
  const onSubmit= async (data:ICall) =>{
    try {
      console.log("handle submit : ",{data})
      handleCreateUpdate(data)
    } catch (error) {
      console.log(error)
    }
  }
  const {
    reset,
    control,
    handleSubmit,
    formState: {
      isSubmitting, errors
    }
  } = methods;
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField
        name='numberCalls'
        label='number of calls'
        type='number'
        min={0}
        helperText="number of calls today"
        />
     
      <LoadingButton type='submit' variant='contained' loading={isSubmitting}>
        submit
      </LoadingButton>
    </FormProvider>
  )
}

export default CallForm