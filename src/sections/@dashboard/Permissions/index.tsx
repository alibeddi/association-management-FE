// export default {};
// import { yupResolver } from '@hookform/resolvers/yup';
// import { LoadingButton } from '@mui/lab';
// import { Box, Button, Card, CardActions, CardHeader, Container, Grid, Stack } from '@mui/material';
// import { useSnackbar } from 'notistack';
// import { useEffect, useMemo, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
// import * as Yup from 'yup';
// import { useAuthContext } from '../../auth/useAuthContext';
// import ConfirmDialog from '../../components/confirm-dialog/ConfirmDialog';
// import CustomBreadcrumbs from '../../components/custom-breadcrumbs/CustomBreadcrumbs';
// import GroupButton from '../../components/groups-buttons/Group-button';
// import FormProvider, { RHFTextField } from '../../components/hook-form';
// import PermissionTable from '../../components/permission-table/index';
// import Scrollbar from '../../components/scrollbar/Scrollbar';
// import { useLocales } from '../../locales';
// import {
//   assignPermissionToGroups,
//   createGroups,
//   editGroups,
//   emptyAssignPermission,
//   getGroups,
//   getGroupsById,
//   getPermissions
// } from '../../redux/slices/permissions';
// import { dispatch, useSelector } from '../../redux/store';
// import { PATH_DASHBOARD } from '../../routes/paths';
// import IsAuthorized from '../../utils/isAuthorized';
// import { PERMISSIONS } from '../../utils/permissions';
// import { removeDuplicates } from '../../utils/removeDuplicatesFromArrayOfString';
// import { setPermissionsAsStringArray } from '../../utils/setPermissionsAsStringArray';

// function Permissions() {
//   const navigate = useNavigate();
//   const { enqueueSnackbar } = useSnackbar();
//   const { translate } = useLocales();
//   const { user } = useAuthContext();
//   const { groups, assignPermission, groupPermissions, superAdminPermissions } = useSelector(
//     (state) => state.permissions
//   );
//   const [selectedItem, setSelectedItem] = useState<number>(0);
//   const [searchParams] = useSearchParams();
//   const [openConfirm, setOpenConfirm] = useState(false);
//   const [isEdit, setIsEdit] = useState(false);
//   const createGroupPermission = IsAuthorized(PERMISSIONS.group.createPermission);
//   const editGroupPermission = IsAuthorized(PERMISSIONS.group.editPermission);

//   const defaultValues = useMemo(
//     () =>
//       isEdit
//         ? {
//             group: groupPermissions?.name || '',
//           }
//         : {
//             group: '',
//           },
//     [isEdit, groupPermissions]
//   );

//   const groupSchema = Yup.object().shape({
//     group: Yup.string().required('Group is required'),
//   });
//   const methods = useForm({
//     resolver: yupResolver(groupSchema),
//     defaultValues,
//   });

//   const handleCloseConfirm = () => {
//     setOpenConfirm(false);
//   };
//   const {
//     reset,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const onSubmit = async ({ group }: { group: string }) => {
//     if (isEdit) {
//       dispatch(editGroups({ name: group, id: Number(groupPermissions?.id) })).then((res: any) => {
//         if (res?.meta?.requestStatus === 'fulfilled') {
//           reset({ group: '' });
//           setIsEdit(false);
//           enqueueSnackbar(`${translate(res?.payload.message)}`);
//         } else {
//           enqueueSnackbar(`${translate(res?.error?.message)}`, { variant: 'error' });
//         }
//       });
//     } else {
//       dispatch(createGroups({ name: group })).then((res: any) => {
//         if (res?.meta?.requestStatus === 'fulfilled') {
//           enqueueSnackbar(`${translate(res?.payload.message)}`);
//           reset();
//         } else {
//           enqueueSnackbar(`${translate(res?.error?.message)}`, { variant: 'error' });
//         }
//       });
//     }
//   };
//   useEffect(() => {
//     dispatch(getGroups());
//     if (user?.role?.code?.toUpperCase() === 'SUPERADMIN') dispatch(getPermissions());
//   }, [user?.role?.code]);

//   const permissionsAsString = setPermissionsAsStringArray(
//     groupPermissions?.permissions.map((el) => {
//       const chr = el.name;
//       return chr;
//     })
//   );

//   const userActions = removeDuplicates(
//     (user?.role?.code?.toUpperCase() === 'SUPERADMIN'
//       ? superAdminPermissions
//       : user?.permissions
//     )?.map((el: string) => {
//       const str = el.split('_').pop();
//       return str;
//     })
//   );

//   const userEntities = removeDuplicates(
//     (user?.role?.code?.toUpperCase() === 'SUPERADMIN'
//       ? superAdminPermissions
//       : user?.permissions
//     )?.map((el: string) => {
//       const str = el.split('_')[0];
//       return str;
//     })
//   );

//   useEffect(() => {
//     if (selectedItem === 0 && groups[0]?.id !== undefined)
//       navigate({
//         pathname: PATH_DASHBOARD.permissionGroups.root,
//         search: `?${createSearchParams({
//           group: groups[0]?.id.toString(),
//         })}`,
//       });
//     if (Number(searchParams.get('group')) === groups[0]?.id) {
//       dispatch(getGroupsById(groups[0]?.id));
//       setSelectedItem(groups[0]?.id);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [groups, searchParams, navigate]);
//   return (
//     <Container maxWidth={false}>
//       <CustomBreadcrumbs
//         heading={`${'Permission Management'}`}
//         links={[
//           {
//             name: `${'Permissions'}`,
//           },
//         ]}
//       />
//       <Card sx={{ border: '1.3px solid #e6e6e6' }}>
//         <Grid
//           sx={{
//             display: 'flex',
//           }}
//           gridTemplateColumns={{
//             xs: 'repeat(1, 1fr)',
//             sm: 'repeat(1, 1fr)',
//             md: 'repeat(2, 1fr)',
//             lg: 'repeat(2, 1fr)',
//           }}
//         >
//           <Card sx={{ borderRadius: '0px !important ', height: '600px' }}>
//             <CardHeader
//               title={`${translate('Groups')}`}
//               sx={{ backgroundColor: '#F5F6F8', height: '78.5px', minWidth: 270 }}
//             />
//             <FormProvider
//               methods={methods}
//               onSubmit={handleSubmit(onSubmit)}
//               style={{ padding: '10px' }}
//             >
//               <Box
//                 sx={{
//                   height:
//                     (!isEdit && createGroupPermission) || (isEdit && editGroupPermission)
//                       ? '400px'
//                       : '500px',
//                   minWidth: 150,
//                 }}
//               >
//                 <Scrollbar>
//                   {groups.map((el) => (
//                     <GroupButton
//                       isEdit={isEdit}
//                       setIsEdit={setIsEdit}
//                       el={el}
//                       defaultValues={defaultValues}
//                       key={el.id}
//                       selectedItem={selectedItem}
//                       setSelectedItem={setSelectedItem}
//                     />
//                   ))}
//                 </Scrollbar>
//               </Box>
//               {((!isEdit && createGroupPermission) || (isEdit && editGroupPermission)) && (
//                 <RHFTextField name="group" label="Group" />
//               )}
//               {((!isEdit && createGroupPermission) || (isEdit && editGroupPermission)) && (
//                 <CardActions>
//                   <Button type="submit" variant="outlined">
//                     {`${translate(isEdit ? 'edit' : 'create')}`}
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="error"
//                     onClick={() => {
//                       reset({ group: '' });
//                       setIsEdit(false);
//                     }}
//                   >
//                     {`${translate('Cancel')}`}
//                   </Button>
//                 </CardActions>
//               )}
//             </FormProvider>
//           </Card>
//           <PermissionTable
//             isGroupPermissions
//             actions={userActions}
//             entities={userEntities}
//             permissionsAsString={permissionsAsString}
//             groupPermissions={groupPermissions}
//             superAdminPermissions={superAdminPermissions}
//           />
//         </Grid>
//       </Card>
//       {editGroupPermission && (
//         <Stack alignItems="end" sx={{ mt: 3 }}>
//           <CardActions>
//             <LoadingButton
//               variant="contained"
//               color="success"
//               onClick={() => {
//                 const permissions = assignPermission
//                   .filter((item) => item.checkingState === true)
//                   .map((item) => (item as { id: string })?.id);
//                 if (permissions.length > 0) {
//                   dispatch(
//                     assignPermissionToGroups({
//                       id: Number(groupPermissions?.id),
//                       assignPermission: permissions,
//                     })
//                   ).then((res: any) => {
//                     if (res?.meta?.requestStatus === 'fulfilled') {
//                       enqueueSnackbar(`${translate(res?.payload.message)}`);
//                       dispatch(emptyAssignPermission({}));
//                     } else {
//                       enqueueSnackbar(`${translate(res?.error?.message)}`, { variant: 'error' });
//                     }
//                   });
//                 } else {
//                   enqueueSnackbar(
//                     `${translate('Before confirming, make sure to update or add permissions.')}`,
//                     { variant: 'error' }
//                   );
//                 }
//               }}
//               loading={isSubmitting}
//             >
//               {`${translate('Confirm')}`}
//             </LoadingButton>
//           </CardActions>
//         </Stack>
//       )}
//       <ConfirmDialog
//         open={openConfirm}
//         onClose={handleCloseConfirm}
//         title="Delete"
//         content={`${translate('Are you sure want to delete')}?`}
//         action={
//           <Button
//             variant="contained"
//             color="error"
//             onClick={() => {
//               handleCloseConfirm();
//             }}
//           >
//             {`${translate('Delete')}`}
//           </Button>
//         }
//       />
//     </Container>
//   );
// }
export default {};
