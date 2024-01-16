import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Checkbox, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { dispatch } from '../../redux/store';

type CheckboxComponentProps = {
  checked: boolean | null;
  model: string | number;
  action: string | number;
  disabled: boolean;
  groupPermissions?: any;
};

export default function CheckboxComponent({
  checked,
  model,
  action,
  groupPermissions,
  disabled,
}: CheckboxComponentProps) {
  const [checking, setChecking] = useState(checked);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setChecking(checked);
  }, [checked]);

  const handleCheckRole = (checkingState: boolean) => {
    setChecking((value) => !value);

    dispatch(
      getAssignPermission({
        id: model.toString()?.concat('_').concat(action.toString()),
        checkingState,
        permissions: groupPermissions?.permissions?.map((el: { name: string }) => ({
          id: el?.name,
          checkingState: true,
        })),
      })
    );
  };
  return (
    <>
      {showSkeleton ? (
        <Skeleton animation="wave" variant="text" />
      ) : (
        <Checkbox
          disabled={disabled}
          checked={checking === null || checking === undefined ? false : checking}
          onChange={(e) => {
            handleCheckRole(e.target.checked);
          }}
          icon={<LockIcon />}
          checkedIcon={<LockOpenIcon />}
        />
      )}
    </>
  );
}
function getAssignPermission(arg0: { id: string; checkingState: boolean; permissions: any }): any {
  throw new Error('Function not implemented.');
}
