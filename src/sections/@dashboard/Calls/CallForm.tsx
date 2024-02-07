import React from 'react'
import * as Yup from "yup"
import {  Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Stack } from '@mui/system'

import  FormProvider, { RHFNumber, RHFPhoneNumber }  from '../../../components/hook-form'




const CallForm = () =>{
  const CallSchema = Yup.object({
    numberCalls: Yup.number().required(),
  })
  const methods = useForm({
    resolver: yupResolver(CallSchema),
    defaultValues: {
      numberCalls: 0
    }
  })
  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;
  const onSubmit = () => console.log('hey')
  return <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods} >
    <Stack spacing={3} sx={{ px: 3 }}>
      {/* }
      /> */}
    <RHFNumber name='numberCalls' label="number of call today:"/>
    </Stack>
  </FormProvider>
}


export default CallForm;