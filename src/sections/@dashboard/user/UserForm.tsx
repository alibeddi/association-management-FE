import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab';
import { Card, Grid, Tab } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { IPropsEditUser } from '../../../@types/editUser';
import { Office } from '../../../@types/offices';
import { Permission } from '../../../@types/Permission';
import { PermissionGroup } from '../../../@types/PermissionGroup';
import { User, RoleCode } from '../../../@types/User';
import FormProvider, {
  RHFAsyncSelect,
  RHFSelect,
  RHFTextField,
} from '../../../components/hook-form';
import { getAllPermissionGroups } from '../../../redux/slices/groupPermissions/actions';
import { getPermissions } from '../../../redux/slices/permissions/actions';
import { editUser } from '../../../redux/slices/users/actions';
import { dispatch, RootState, useSelector } from '../../../redux/store';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { isObjectEmpty } from '../../../utils';
import axios from '../../../utils/axios';
import { extractEntitiesAndActions } from '../../../utils/extractEntitiesAndActions';
import { extractEntitiesAndActionsStrings } from '../../../utils/extractEntitiesAndActionsStrings';
import { setQuery } from '../../../utils/setParams';
import PermissionTable from '../Permissions/PermissionTable';

type IProps = {
  user: User;
  isEdit?: boolean;
};
const USER_FILTER = ['user details', 'extra permission'];
const UserForm = ({ user, isEdit = false }: IProps) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [filterTab, setFilterTab] = useState('user details');
  const { permissions } = useSelector((state: RootState) => state.permissions);
  const defaultValues = useMemo(
    () => ({
      name: user?.name || 'no name',
      email: user?.email || '',
      office: user?.office || ({} as Office),
      role: user?.role || '',
      permissionGroup: user?.permissionGroup || [],
      extraPermission: user?.extraPermissions || [],
    }),
    [user]
  );

  const newUser = Yup.object().shape({
    name: Yup.string().min(2).required('name is required'),
    email: Yup.string().email().required('email is required'),
    role: Yup.string(),
  });

  const methods = useForm({
    resolver: yupResolver(newUser),
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  let combinedPermissions: Permission[] = [];
  const [selectedPermissions, setSelectedPermissions] = useState(combinedPermissions);

  const formattedPermissions =
    !isObjectEmpty(user) && user?.permissionGroup && user?.permissionGroup[0]
      ? extractEntitiesAndActions([...permissions.docs])
      : { entities: [], actions: [] };

  const defaultPermissionsAsString = extractEntitiesAndActionsStrings(permissions.docs);

  useEffect(() => {
    dispatch(getPermissions());
    dispatch(getAllPermissionGroups());
  }, []);

  useEffect(() => {
    combinedPermissions = [];
    const extraPermission = user?.extraPermissions || [];
    const groupPermission = user?.permissionGroup ? user?.permissionGroup[0].permissions : [];
    if (!!user && user.permissionGroup && user?.extraPermissions)
      combinedPermissions = [...groupPermission, ...extraPermission];
    if (user && user?.permissionGroup && user?.permissionGroup.length > 0)
      setSelectedPermissions(combinedPermissions);
  }, [user]);

  const onCancel = () => navigate(PATH_DASHBOARD.operators.root);
  const onSubmit = (data: IPropsEditUser) => {
    data.userId = user?._id;
    data.extraPermissions = selectedPermissions;

    dispatch(editUser(data))
      .unwrap()
      .then((res) => {
        enqueueSnackbar('User updated successfully');
        onCancel();
      })
      .catch((err) =>
        enqueueSnackbar(err.message, {
          variant: 'error',
        })
      );
  };

  const handleChangeTabs = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setFilterTab(newValue);
  };
  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
      style={{
        overflow: 'initial',
      }}
    >
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
        <Stack
          alignItems="flex-end"
          sx={{
            mt: 3,
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            justifyContent: 'flex-end',
          }}
        >
          {isEdit && (
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
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
                  <RHFTextField name="name" label="name" disabled />
                  <RHFTextField name="email" label="email" disabled />
                  <RHFSelect value={values.role} disabled={!isEdit} native name="role" label="role">
                    <option key={RoleCode.ADMIN} value={RoleCode.ADMIN}>
                      {RoleCode.ADMIN}
                    </option>
                    <option key={RoleCode.SUPER_ADMIN} value={RoleCode.SUPER_ADMIN}>
                      {RoleCode.SUPER_ADMIN}
                    </option>
                  </RHFSelect>

                  <RHFAsyncSelect
                    name="office"
                    label="office"
                    placeholder="select office"
                    value={values.office}
                    isSearchable
                    getOptionLabel={(option: Office) =>
                      'name' in option ? option?.name : 'no office'
                    }
                    getOptionValue={(option) => (typeof option === 'string' ? option : option._id)}
                    fetchData={async (params) => {
                      const response = await axios.get(`/offices${setQuery(params)}`);
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
                    value={values.permissionGroup}
                    getOptionLabel={(option: PermissionGroup) => option.name}
                    getOptionValue={(option) => option._id}
                    fetchData={async (params) => {
                      const response = await axios.get(`/permission-groups${setQuery(params)}`);
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
          <Card sx={{ p: 3 }}>
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
  );
};

export default UserForm;
