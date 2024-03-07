import { LoadingButton } from '@mui/lab'
import { Button, Card, Grid } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import {  useNavigate } from 'react-router'
import { Office } from '../../../@types/offices'
import { User } from '../../../@types/User'
import FormProvider, { RHFAutocomplete, RHFTextField } from "../../../components/hook-form"
import { getAllPermissionGroups } from '../../../redux/slices/groupPermissions/actions'
import { dispatch, useSelector } from '../../../redux/store'
import { PATH_DASHBOARD } from '../../../routes/paths'


type IProps = {
  user?: User;
  isEdit?: boolean;
}

const UserForm = ({user,isEdit=false}:IProps) => {
  useEffect(()=>{
      dispatch(getAllPermissionGroups())
  },[dispatch])
  const {permissionGroups} = useSelector(store=>store.permissions_groups)
  const defaultValues = useMemo(()=>({
    name:user?.name || "",
    email:user?.email || "",
    office:user?.office || {} as Office,
    role:user?.role || "",
    permissionGroup: user?.permissionGroup || [],
    extraPermission: user?.extraPermission || []
  }),[user])
  const methods = useForm({defaultValues})
  const navigate = useNavigate()
  const onCancel = () => navigate(PATH_DASHBOARD.operators.root)
  const {handleSubmit,watch,formState:{isSubmitting,isDirty}} = methods
  const onSubmit = () => {}
  const values = watch()

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
              value={defaultValues?.name}
              disabled
              />
              <RHFTextField
              name='email'
              label="email"
              value={defaultValues?.email}
              disabled
              />
               <RHFTextField
              name='role'
              label="role"
              value={defaultValues?.role}
              disabled={!isEdit}
              />
              <RHFAutocomplete
              name="office"
              value={defaultValues?.office}
              label="office"
              getOptionLabel={(option)=>option && typeof option !== 'string' ? option?.name : option}
              options={[]}
              disabled={!isEdit}
              />
               <RHFAutocomplete
              name="permissionGroup"
              value={defaultValues?.permissionGroup}
              label="permissionGroup"
              
              multiple
              freeSolo
              getOptionLabel={(option)=>option && typeof option !== 'string' ? option?.name : option}
              options={permissionGroups.docs}
              disabled={!isEdit}
              />
              <RHFAutocomplete
              name="extraPermission"
              value={defaultValues?.extraPermission}
              label="extraPermission"
              multiple
              freeSolo
              getOptionLabel={(option)=> option && typeof option !== 'string' ? `${option?.model} ${option.method} `: option}
              options={[]}
              disabled={!isEdit}
              />
            </Box>
            <Stack alignItems="flex-end" sx={{ mt: 3,display:"flex",flexDirection:"row",gap:"1rem",justifyContent:"flex-end" }}>
            {isEdit && (
              
                <LoadingButton
                  type="submit"
                  variant="contained"
                  disabled={isEdit && !isDirty}
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
