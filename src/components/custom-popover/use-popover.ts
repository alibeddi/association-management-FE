import { useState, useCallback } from 'react';

// ----------------------------------------------------------------------

type ReturnType = {
  value: boolean;
  onTrue: () => void;
  onClose: VoidFunction;
  open: HTMLElement | null;
  onOpen: (event: React.MouseEvent<HTMLElement>) => void;
  setOpen: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;

};

export default function usePopover(defaultValue?: boolean): ReturnType {
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const [value, setValue] = useState(!!defaultValue);

  const onOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  }, []);
  const onTrue = useCallback(() => {
    setValue(true);
  }, []);
  const onFalse = useCallback(() => {
    setValue(false);
  }, []);
  const onClose = useCallback(() => {
    setOpen(null);
  }, []);

  return {
    value,
    onTrue,
    open,
    onOpen,
    onClose,
    setOpen,
    setValue,

  };
}
