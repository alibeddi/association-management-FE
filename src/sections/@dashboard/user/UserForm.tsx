import * as Yup from "yup"
import { LoadingButton } from '@mui/lab'
import { Button, Card, Grid } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { useEffect, useMemo } from 'react'
import { useSnackbar } from 'notistack';
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from 'react-hook-form'
import {  useNavigate } from 'react-router'
import { Office } from '../../../@types/offices'
import { User } from '../../../@types/User'
import FormProvider, { RHFAsyncSelect, RHFAutocomplete, RHFTextField } from "../../../components/hook-form"
import { dispatch, useSelector } from '../../../redux/store'
import { PATH_DASHBOARD } from '../../../routes/paths'
import { PermissionGroup } from "../../../@types/PermissionGroup"
import axios from "../../../utils/axios"
import { setQuery } from "../../../utils/setParams"
import { editUser, IPropsEditUser } from "../../../redux/slices/users/actions"



type IProps = {
  user?: User;
  isEdit?: boolean;
}

const UserForm = ({user,isEdit=false}:IProps) => {

  const defaultValues = useMemo(()=>({
    name:user?.name || "no name",
    email:user?.email || "",
    office:user?.office || [],
    role:user?.role || "",
    permissionGroup: user?.permissionGroup || [],
    extraPermission: user?.extraPermission || []
  }),[user])
  const newUser = Yup.object().shape({
    name: Yup.string().min(2).required('name is required'),
    email: Yup.string().email().required("email is required"),
    extraPermission: Yup.array().of(Yup.object().shape({
      _id: Yup.string()
    })),
    role: Yup.string()
  })
  const methods = useForm({
    resolver:yupResolver(newUser),
    defaultValues
  })
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()
  const onCancel = () => navigate(PATH_DASHBOARD.operators.root)
  const {handleSubmit,watch,formState:{isSubmitting,isDirty,errors}} = methods
  const onSubmit = (data:{
    email:string;
    name:string;
    userId?:string;
    role:string;
    
  }) => {
    data.userId = user?._id;
    dispatch(editUser(data)).unwrap().then(res=>{
      enqueueSnackbar("User updated successfully");
      onCancel()
    }).catch(err=>enqueueSnackbar(err.message,{
      variant:"error"
    }))
  }
  const values = watch()
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} style={
      {
        overflow:"initial"
      }
    }>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
          <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
               
              <RHFTextField
              name="name"
              label="name"
     
              disabled
              />
              <RHFTextField
              name='email'
              label="email"

              disabled
              />
               <RHFTextField
              name='role'
              label="role"

              disabled
              />
              <RHFAsyncSelect
               name="office"
               label="office"
               placeholder="select office"
               // @ts-ignore
               value={values.office}
              isSearchable
               getOptionLabel={(option:Office) => option.name}
               getOptionValue={(option)=> typeof option ==="string" ? option :  option._id}
               fetchData={async (params) => {
                const response = await axios.get(`/offices${setQuery(params)}`)
                const data = await response.data;
                return data;
              }}
               disable={!isEdit}
              />
              <RHFAsyncSelect
               name="permissionGroup"
               label="permissionGroup"
               placeholder="select permission group"
               isMulti
               // @ts-ignore
               value={values.permissionGroup}
               getOptionLabel={(option:PermissionGroup) =>  option.name}
               getOptionValue={(option)=>option._id}
               fetchData={async (params) => {
                const response = await axios.get(`/permission-groups${setQuery(params)}`)
                const data = await response.data;
                return data;
              }}
               disable={!isEdit}
              />
              {/* .css-1nmdiq5-menu */}
            <RHFAutocomplete
              name="extraPermission"
              label="extraPermission"
              multiple
              value={defaultValues.extraPermission}
              getOptionLabel={(option)=> typeof option === "string" ? option :  option._id }
              options={[]}
              disabled={!isEdit}
              />
             
            </Box>
            <Stack alignItems="flex-end" sx={{ mt: 3,display:"flex",flexDirection:"row",gap:"1rem",justifyContent:"flex-end" }}>
            {isEdit && (
              
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Save Changes
                </LoadingButton>
              
            )}
            <Button
            variant="outlined"
            onClick={()=>onCancel()} 
            >
              Cancel
            </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  )
}

export default UserForm
