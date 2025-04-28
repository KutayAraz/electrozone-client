import { useCallback, useState } from "react";

interface UseConfirmationDialogProps {
  onConfirm: () => void | Promise<void>;
  confirmationTitle?: string;
  confirmationMessage?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

interface UseConfirmationDialogResult {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleConfirm: () => void | Promise<void>;
  isProcessing: boolean;
  dialogProps: {
    open: boolean;
    onClose: () => void;
    title: string;
    message: string;
    confirmButtonText: string;
    cancelButtonText: string;
    isProcessing: boolean;
  };
}

export const useConfirmationDialog = ({
  onConfirm,
  confirmationTitle = "Confirm Action",
  confirmationMessage = "Are you sure you want to proceed? This action cannot be undone.",
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
}: UseConfirmationDialogProps): UseConfirmationDialogResult => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    if (!isProcessing) {
      setIsOpen(false);
    }
  }, [isProcessing]);

  const handleConfirm = useCallback(async () => {
    try {
      setIsProcessing(true);
      await onConfirm();
    } finally {
      setIsProcessing(false);
      setIsOpen(false);
    }
  }, [onConfirm]);

  return {
    isOpen,
    handleOpen,
    handleClose,
    handleConfirm,
    isProcessing,
    dialogProps: {
      open: isOpen,
      onClose: handleClose,
      title: confirmationTitle,
      message: confirmationMessage,
      confirmButtonText,
      cancelButtonText,
      isProcessing,
    },
  };
};
