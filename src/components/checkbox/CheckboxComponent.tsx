import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Checkbox, Skeleton } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Permission } from '../../@types/Permission';
import { RootState, useSelector } from '../../redux/store';

type CheckboxComponentProps = {
  checked: boolean;
  model: string | number;
  action: string | number;
  disabled?: boolean;

  setSelectedPermissions: Dispatch<SetStateAction<Permission[]>>;
  selectedPermissions: Permission[];
};

export default function CheckboxComponent({
  checked,
  model,
  action,
  setSelectedPermissions,
  selectedPermissions,
  disabled = false,
}: CheckboxComponentProps) {
  const [checking, setChecking] = useState(checked);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const { permissions } = useSelector((state: RootState) => state.permissions);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setChecking(checked);
  }, [checked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecking((value) => !value);
    const foundPermission = permissions.docs.find(
      (permission) => permission.model === model && permission.method === action
    );
    setChecking(!checking);
    if (foundPermission) {
      if (selectedPermissions.some((item) => item._id === foundPermission._id)) {
        const newPermissions = selectedPermissions.filter(
          (item) => item._id !== foundPermission._id
        );
        setSelectedPermissions(newPermissions);
      } else {
        setSelectedPermissions((prev: Permission[]) => [...prev, foundPermission]);
      }
    }
  };

  return (
    <>
      {showSkeleton ? (
        <Skeleton animation="wave" variant="text" />
      ) : (
        <Checkbox
          disabled={disabled}
          checked={checking}
          onChange={handleChange}
          icon={<LockIcon />}
          checkedIcon={<LockOpenIcon />}
        />
      )}
    </>
  );
}
