import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, CardActions, CardHeader, Container, Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Permission } from 'src/@types/Permission';
import { PermissionGroup } from 'src/@types/PermissionGroup';
import { useAuthContext } from 'src/auth/useAuthContext';
import ConfirmDialog from 'src/components/confirm-dialog';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { useLocales } from 'src/locales';
import { getAllPermissionGroups, getPermissionGroup } from 'src/redux/slices/groupPermissions';
import { getPermissions } from 'src/redux/slices/permissions';
import { dispatch, RootState, useSelector } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { extractEntitiesAndActions } from 'src/utils/extractEntitiesAndActions';
import * as Yup from 'yup';
import GroupButton from './GroupButton';
import PermissionTable from './PermissionTable';

function Permissions() {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { user } = useAuthContext();
  const { permissionGroups, permissionGroup } = useSelector(
    (state: RootState) => state.permissions_groups
  );

  const { permissions } = useSelector((state: RootState) => state.permissions);

  const [selectedItem, setSelectedItem] = useState<string>('');
  const [searchParams] = useSearchParams();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  // TODO: isAuthorized function
  const createGroupPermission = true;
  const editGroupPermission = true;

  const groupSchema = Yup.object().shape({
    group: Yup.string().required('Group is required'),
  });
  const methods = useForm({
    resolver: yupResolver(groupSchema),
    defaultValues: permissionGroup?.permissions,
  });

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    if (isEdit) {
      console.log('edit group permission');
    } else {
      console.log('create group permission');
    }
  };
  useEffect(() => {
    dispatch(getPermissions());
    dispatch(getAllPermissionGroups());
  }, []);
  function extractEntitiesAndActionsStrings(data: Permission[]) {
    const resultStrings: string[] = [];

    data.forEach((item: Permission) => {
      if (item.model && item.method) {
        const entityActionString = `${item.model}_${item.method}`;
        if (!resultStrings.includes(entityActionString)) {
          resultStrings.push(entityActionString);
        }
      }
    });

    return resultStrings;
  }
  const formattedPermissions = extractEntitiesAndActions(permissions.docs);
  const permissionsAsString = extractEntitiesAndActionsStrings(permissions.docs);
  console.log({ permissionsAsString });

  useEffect(() => {
    if (!selectedItem && permissionGroups.docs[0]?._id) {
      navigate({
        pathname: PATH_DASHBOARD.groupPermissions,
        search: `?${createSearchParams({
          group: permissionGroups.docs[0]?._id,
        })}`,
      });
    }
    if (searchParams.get('group') === permissionGroups.docs[0]?._id) {
      dispatch(getPermissionGroup({ id: permissionGroups.docs[0]?._id }));
      setSelectedItem(permissionGroups.docs[0]?._id);
    }
  }, [permissionGroups, searchParams, navigate, selectedItem]);
  return (
    <Container maxWidth={false}>
      <CustomBreadcrumbs
        heading={`${'Permission Management'}`}
        links={[
          {
            name: `${'Permissions'}`,
          },
        ]}
      />
      <Card sx={{ border: '1.3px solid #e6e6e6' }}>
        <Grid
          sx={{
            display: 'flex',
          }}
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(2, 1fr)',
          }}
        >
          <Card sx={{ borderRadius: '0px !important ', height: '600px' }}>
            <CardHeader
              title={`${translate('Groups')}`}
              sx={{ backgroundColor: '#F5F6F8', height: '78.5px', minWidth: 270 }}
            />
            <FormProvider
              methods={methods}
              onSubmit={handleSubmit(onSubmit)}
              style={{ padding: '10px' }}
            >
              <Box
                sx={{
                  height:
                    (!isEdit && createGroupPermission) || (isEdit && editGroupPermission)
                      ? '400px'
                      : '500px',
                  minWidth: 150,
                }}
              >
                <Scrollbar>
                  {permissionGroups.docs.map((group: PermissionGroup) => (
                    <GroupButton
                      isEdit={isEdit}
                      setIsEdit={setIsEdit}
                      group={group}
                      defaultValues={group.permissions}
                      key={group?._id}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                    />
                  ))}
                </Scrollbar>
              </Box>
              {((!isEdit && createGroupPermission) || (isEdit && editGroupPermission)) && (
                <RHFTextField name="group" label="Group" />
              )}
              {((!isEdit && createGroupPermission) || (isEdit && editGroupPermission)) && (
                <CardActions>
                  <Button type="submit" variant="outlined">
                    {`${translate(isEdit ? 'edit' : 'create')}`}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      console.log('reset group name');
                      setIsEdit(false);
                    }}
                  >
                    {`${translate('Cancel')}`}
                  </Button>
                </CardActions>
              )}
            </FormProvider>
          </Card>
          <PermissionTable
            actions={formattedPermissions.actions}
            entities={formattedPermissions.entities}
            groupPermissions={permissionGroup}
            permissionsAsString={permissionsAsString}
          />
        </Grid>
      </Card>
      {editGroupPermission && (
        <Stack alignItems="end" sx={{ mt: 3 }}>
          <CardActions>
            <LoadingButton
              sx={{ py: 1.5 }}
              variant="contained"
              color="success"
              onClick={() => {
                console.log('first');
              }}
              loading={isSubmitting}
            >
              {`${translate('Confirm')}`}
            </LoadingButton>
          </CardActions>
        </Stack>
      )}
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={`${translate('Are you sure want to delete')}?`}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleCloseConfirm();
            }}
          >
            {`${translate('Delete')}`}
          </Button>
        }
      />
    </Container>
  );
}
export default Permissions;
