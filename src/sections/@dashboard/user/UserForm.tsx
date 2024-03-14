import * as Yup from "yup"
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab'
import { Button, Card, Grid, Tab, Tabs } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { useEffect, useMemo, useState } from 'react'
import { useSnackbar } from 'notistack';
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from 'react-hook-form'
import {  useNavigate } from 'react-router'
import { Office } from '../../../@types/offices'
import { User } from '../../../@types/User'
import FormProvider, { RHFAsyncSelect, RHFAutocomplete, RHFTextField } from "../../../components/hook-form"
import { dispatch, RootState, useSelector } from '../../../redux/store'
import { PATH_DASHBOARD } from '../../../routes/paths'
import { PermissionGroup } from "../../../@types/PermissionGroup"
import axios from "../../../utils/axios"
import { setQuery } from "../../../utils/setParams"
import { editUser } from "../../../redux/slices/users/actions"
import PermissionTable from "../Permissions/PermissionTable"
import { extractEntitiesAndActions } from "../../../utils/extractEntitiesAndActions"
import { getPermissions } from "../../../redux/slices/permissions/actions"
import { getAllPermissionGroups } from "../../../redux/slices/groupPermissions/actions"
import { extractEntitiesAndActionsStrings } from "../../../utils/extractEntitiesAndActionsStrings"
import { isObjectEmpty } from "../../../utils"
import { IPropsEditUser } from "../../../@types/editUser"

type IProps = {
  user: User;
  isEdit?: boolean;
}
const USER_FILTER = ['user details','extra permission'];
const UserForm = ({user,isEdit=false}:IProps) => {
  useEffect(() => {
    dispatch(getPermissions());
    dispatch(getAllPermissionGroups());
  }, []);
  const [filterTab,setFilterTab] = useState('user details')
  const { permissionGroups, permissionGroup } = useSelector(
    (state: RootState) => state.permissions_groups
  );
  const { permissions } = useSelector((state: RootState) => state.permissions);

  const defaultValues = useMemo(()=>({
    name:user?.name || "no name",
    email:user?.email || "",
    office:user?.office || {} as Office,
    role:user?.role || "",
    permissionGroup: user?.permissionGroup || [{} as PermissionGroup],
    extraPermission: user?.extraPermissions || []
  }),[user])
  const newUser = Yup.object().shape({
    name: Yup.string().min(2).required('name is required'),
    email: Yup.string().email().required("email is required"),
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
  const onSubmit = (data:IPropsEditUser) => {
    data.userId = user?._id;
    data.extraPermissions = selectedPermissions;

    dispatch(editUser(data)).unwrap().then(res=>{
      enqueueSnackbar("User updated successfully");
      onCancel()
    }).catch(err=>enqueueSnackbar(err.message,{
      variant:"error"
    }))
  }
  const handleChangeTabs = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setFilterTab(newValue);
  };
  const values = watch()
  const allPermission = user.permissionGroup;
  let combinedPermissions:any[] = [];
  const [selectedPermissions, setSelectedPermissions] = useState(combinedPermissions);
  const formattedPermissions = !isObjectEmpty(user) && user?.permissionGroup && user?.permissionGroup[0] ? extractEntitiesAndActions([...permissions.docs]) : {entities:[],actions:[]};
  const defaultPermissionsAsString = extractEntitiesAndActionsStrings(permissions.docs);  
  useEffect(()=>{
    combinedPermissions =[]
    const extraPermission = user?.extraPermissions || [];
    const groupPermission = user?.permissionGroup ? user?.permissionGroup[0].permissions : [];
    if(!!user && user.permissionGroup && user?.extraPermissions) combinedPermissions = [...groupPermission, ...extraPermission];
    if(user && user?.permissionGroup &&  user?.permissionGroup.length > 0) setSelectedPermissions(combinedPermissions)
  },[user])
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} style={
      {
        overflow:"initial"
      }
    }>
      <TabContext value={filterTab}>
      <TabList
          onChange={handleChangeTabs}
          sx={{
            px: 2,
            bgcolor: 'background.neutral',
          }}
        >
          {USER_FILTER.map((tab) => (
            <Tab key={tab} label={tab} value={tab} />
          ))}
        </TabList>
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
    
            </Stack>
        <TabPanel value={USER_FILTER[0]}>
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
               value={values.office}
              isSearchable
               getOptionLabel={(option:Office) => "name" in option ?  option?.name :'no office'}
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
            </Box>
            
          </Card>
        </Grid>
        
      </Grid> 
        </TabPanel>
    
      <TabPanel value={USER_FILTER[1]}>
      <Card sx={{p:3}}>
          <PermissionTable 
           actions={formattedPermissions.actions}
           entities={formattedPermissions.entities}
           defaultPermissionsAsString={defaultPermissionsAsString}
           setSelectedPermissions={setSelectedPermissions}
           selectedPermissions={selectedPermissions}
           viewMode={!isEdit}
          />
          </Card>
      </TabPanel>   
      </TabContext>

         

    </FormProvider>
  )
}

export default UserForm