import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import {
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  CheckCircle as SuccessIcon,
} from '@mui/icons-material';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: 'warning' | 'error' | 'info' | 'success';
  confirmText?: string;
  cancelText?: string;
  confirmColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  isLoading?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  type = 'warning',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmColor = 'primary',
  isLoading = false,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return <ErrorIcon color="error" sx={{ fontSize: 48 }} />;
      case 'warning':
        return <WarningIcon color="warning" sx={{ fontSize: 48 }} />;
      case 'info':
        return <InfoIcon color="info" sx={{ fontSize: 48 }} />;
      case 'success':
        return <SuccessIcon color="success" sx={{ fontSize: 48 }} />;
      default:
        return <WarningIcon color="warning" sx={{ fontSize: 48 }} />;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      case 'success':
        return 'success';
      default:
        return confirmColor;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={2}>
          {getIcon()}
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          disabled={isLoading}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color={getColor() as any}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
