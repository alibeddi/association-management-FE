import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, CardActions, CardHeader, Container, Grid, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { PermissionGroup } from 'src/@types/PermissionGroup';
import { useAuthContext } from 'src/auth/useAuthContext';
import ConfirmDialog from 'src/components/confirm-dialog';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { useLocales } from 'src/locales';
import {
  createNewGroupPermission,
  getAllPermissionGroups,
  getPermissionGroup,
  updateGroupPermission,
} from 'src/redux/slices/groupPermissions';
import { getPermissions } from 'src/redux/slices/permissions';
import { RootState, dispatch, useSelector } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { extractEntitiesAndActions } from 'src/utils/extractEntitiesAndActions';
import { extractEntitiesAndActionsStrings } from 'src/utils/extractEntitiesAndActionsStrings';
import * as Yup from 'yup';
import GroupButton from './GroupButton';
import PermissionTable from './PermissionTable';
import { hasPermission } from './utils';

function Permissions() {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { permissionGroups, permissionGroup } = useSelector(
    (state: RootState) => state.permissions_groups
  );
  const { permissions } = useSelector((state: RootState) => state.permissions);
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [selectedPermissions, setSelectedPermissions] = useState(permissionGroup?.permissions);
  const [searchParams] = useSearchParams();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { user } = useAuthContext();
  const userPermissions = user?.permissionGroup[0].permissions;
  const createGroupPermission = hasPermission(userPermissions, 'PERMISSION_GROUP', 'DELETE');
  const editGroupPermission = hasPermission(userPermissions, 'PERMISSION_GROUP', 'EDIT');

  type FormValuesProps = {
    group: string;
  };
  const defaultValues: FormValuesProps = isEdit
    ? {
        group: permissionGroup?.name || '',
      }
    : {
        group: '',
      };

  const groupSchema = Yup.object().shape({
    group: Yup.string().required('Group is required'),
  });
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(groupSchema),
    defaultValues,
  });

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async ({ group }: { group: string }) => {
    if (isEdit) {
      dispatch(updateGroupPermission({ id: permissionGroup?._id, body: { name: group } })).then(
        (res: any) => {
          if (res?.meta?.requestStatus === 'fulfilled') {
            reset({ group: '' });
            setIsEdit(false);
            enqueueSnackbar(`${translate(res?.payload.message)}`);
          } else {
            enqueueSnackbar(`${translate(res?.error?.message)}`, { variant: 'error' });
          }
        }
      );
    } else {
      dispatch(createNewGroupPermission({ name: group })).then((res: any) => {
        if (res?.meta?.requestStatus === 'fulfilled') {
          enqueueSnackbar(`${translate(res?.payload.message)}`);
          reset();
        } else {
          enqueueSnackbar(`${translate(res?.error?.message)}`, { variant: 'error' });
        }
      });
    }
  };

  useEffect(() => {
    dispatch(getPermissions());
    dispatch(getAllPermissionGroups());
  }, []);

  const formattedPermissions = extractEntitiesAndActions(permissions.docs);
  const defaultPermissionsAsString = extractEntitiesAndActionsStrings(permissions.docs);

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
      setSelectedPermissions(permissionGroups.docs[0]?.permissions);
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
                      defaultValues={defaultValues}
                      key={group?._id}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      setSelectedPermissions={setSelectedPermissions}
                    />
                  ))}
                </Scrollbar>
              </Box>
              {((!isEdit && createGroupPermission) || (isEdit && editGroupPermission)) && (
                <RHFTextField name="group" label="Group" />
              )}
              {((!isEdit && createGroupPermission) || (isEdit && editGroupPermission)) && (
                <CardActions>
                  <Button disabled={!isDirty} type="submit" variant="outlined">
                    {`${translate(isEdit ? 'edit' : 'create')}`}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      reset({ group: '' });
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
            defaultPermissionsAsString={defaultPermissionsAsString}
            setSelectedPermissions={setSelectedPermissions}
            selectedPermissions={selectedPermissions}
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
                const updatedPermissions = selectedPermissions.map((permission) => permission._id);
                dispatch(
                  updateGroupPermission({
                    id: permissionGroup?._id,
                    body: { permissions: updatedPermissions },
                  })
                ).then((res: any) => {
                  if (res?.meta?.requestStatus === 'fulfilled') {
                    reset({ group: '' });
                    setIsEdit(false);
                    enqueueSnackbar(`${translate(res?.payload.message)}`);
                  } else {
                    enqueueSnackbar(`${translate(res?.error?.message)}`, { variant: 'error' });
                  }
                });
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
