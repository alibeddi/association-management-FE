export default {};
// import { Button, IconButton, MenuItem, Stack } from '@mui/material';
// import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
// import { useFormContext } from 'react-hook-form';
// import { createSearchParams, useNavigate } from 'react-router-dom';
// import { IPermissionItem } from '../../@types/permissions';
// import useLocales from '../../locales/useLocales';
// import { deleteGroups, getGroupsById } from '../../redux/slices/permissions';
// import { dispatch, useSelector } from '../../redux/store';
// import { PATH_DASHBOARD } from '../../routes/paths';
// import IsAuthorized from '../../utils/isAuthorized';
// import { PERMISSIONS } from '../../utils/permissions';
// import ConfirmDialog from '../confirm-dialog/ConfirmDialog';
// import Iconify from '../iconify/Iconify';
// import MenuPopover from '../menu-popover';

// type Props = {
//   el: IPermissionItem;
//   defaultValues: { group: string };
//   isEdit: Boolean;
//   setIsEdit: Dispatch<SetStateAction<boolean>>;
//   selectedItem?: number;
//   setSelectedItem: Dispatch<SetStateAction<number>>;
// };

// const GroupButton = ({
//   el,
//   defaultValues,
//   isEdit,
//   setIsEdit,
//   selectedItem,
//   setSelectedItem,
// }: Props) => {
//   const { translate } = useLocales();
//   const navigate = useNavigate();
//   const { reset } = useFormContext();
//   const [openConfirm, setOpenConfirm] = useState(false);
//   const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
//   const { groupPermissions } = useSelector((state) => state.permissions);
//   const deleteGroupPermission = IsAuthorized(PERMISSIONS.group.deletePermission);
//   const editGroupPermission = IsAuthorized(PERMISSIONS.group.editPermission);
//   const isRowMenu = deleteGroupPermission || editGroupPermission;

//   const handleOpenConfirm = () => {
//     setOpenConfirm(true);
//   };

//   const handleCloseConfirm = () => {
//     setOpenConfirm(false);
//   };

//   const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
//     setOpenPopover(event.currentTarget);
//   };

//   const handleClosePopover = () => {
//     setOpenPopover(null);
//   };

//   useEffect(() => {
//     if (isEdit && groupPermissions) {
//       reset(defaultValues);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isEdit, groupPermissions]);
//   return (
//     <>
//       <Stack
//         sx={{
//           display: 'flex',
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           p: 1,
//         }}
//       >
//         <Button
//           sx={{
//             px: 1,
//             height: 48,
//             width: '100%',
//             textTransform: 'capitalize',
//           }}
//           variant={selectedItem === el?.id ? 'contained' : undefined}
//           color={selectedItem === el?.id ? 'success' : undefined}
//           onClick={() => {
//             dispatch(getGroupsById(el?.id));
//             setSelectedItem(el?.id);
//             navigate({
//               pathname: PATH_DASHBOARD.permissionGroups.root,
//               search: `?${createSearchParams({
//                 group: el?.id.toString(),
//               })}`,
//             });
//           }}
//         >
//           <> {el.name}</>
//         </Button>
//         {isRowMenu && (
//           <IconButton
//             sx={{ '&:hover': { backgroundColor: 'transparent' } }}
//             color={openPopover ? 'inherit' : 'default'}
//             onClick={handleOpenPopover}
//           >
//             <Iconify icon="eva:more-vertical-fill" />
//           </IconButton>
//         )}
//       </Stack>
//       <MenuPopover
//         open={openPopover}
//         onClose={handleClosePopover}
//         arrow="right-top"
//         sx={{ width: 140 }}
//       >
//         {editGroupPermission && (
//           <MenuItem
//             onClick={() => {
//               setIsEdit(true);
//               dispatch(getGroupsById(el?.id));
//               setSelectedItem(el?.id);
//               navigate({
//                 pathname: PATH_DASHBOARD.permissionGroups.root,
//                 search: `?${createSearchParams({
//                   group: el?.id.toString(),
//                 })}`,
//               });
//               handleClosePopover();
//             }}
//           >
//             <Iconify icon="eva:edit-fill" />
//             {`${translate('Edit')}`}
//           </MenuItem>
//         )}
//         {deleteGroupPermission && (
//           <MenuItem
//             onClick={() => {
//               handleOpenConfirm();
//               handleClosePopover();
//             }}
//             sx={{ color: 'error.main' }}
//           >
//             <Iconify icon="eva:trash-2-outline" />
//             {`${translate('Delete')}`}
//           </MenuItem>
//         )}
//       </MenuPopover>
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
//               dispatch(deleteGroups(el.id));
//             }}
//           >
//             {`${translate('Delete')}`}
//           </Button>
//         }
//       />
//     </>
//   );
// };

// export default GroupButton;
