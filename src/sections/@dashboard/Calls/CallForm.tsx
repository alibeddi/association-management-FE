import React, { useEffect, useState } from 'react';

import * as Yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { Box, Stack } from '@mui/system';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import { ICall } from '../../../@types/Call';
import { createCallsToday, getCallByDate, getCallById } from '../../../redux/slices/calls/actions';
import { RootState, useSelector } from '../../../redux/store';

export type IProp<ICall> = {
  handleCreateUpdate: (data: ICall) => void;
  callSelected: ICall | undefined;
};

const CallForm = ({ handleCreateUpdate, callSelected }: IProp<ICall>) => {
  const CallSchema = Yup.object({
    numberCalls: Yup.number().required().typeError('calls is must be of type number'),
  });
  const {call} = useSelector((state: RootState) => state.calls);
  const numberCalls = call?.numberCalls || 0;
  const methods = useForm<ICall>({
    resolver: yupResolver(CallSchema),
  });
  const onSubmit = async (data: ICall) => {
    try {
      handleCreateUpdate(data);
    } catch (error) {
      console.error(error);
    }
  };
  const {
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = methods;
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{
        p:1
      }}>{`number of calls today ${numberCalls}`}</Box>
      <Stack
        sx={{
          direction: 'row',
          gap: 2,
        }}
      >
        <RHFTextField
          name="numberCalls"
          label="calls emis"
          placeholder={`number of calls today ${numberCalls}`}
        />
        <Box
          sx={{
            width: 'initial',
          }}
        >
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {call ? "edit" : "create"}
          </LoadingButton>
        </Box>
      </Stack>
    </FormProvider>
  );
};

export default CallForm;
