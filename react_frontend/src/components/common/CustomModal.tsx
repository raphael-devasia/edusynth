import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  showCloseButton?: boolean;
  actions?: React.ReactNode;
  disableBackdropClick?: boolean;
  disableEscapeKeyDown?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  title,
  children,
  maxWidth = 'md',
  fullWidth = true,
  showCloseButton = true,
  actions,
  disableBackdropClick = false,
  disableEscapeKeyDown = false,
}) => {
  const handleClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (disableBackdropClick && reason === 'backdropClick') {
      return;
    }
    if (disableEscapeKeyDown && reason === 'escapeKeyDown') {
      return;
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: '200px',
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          {showCloseButton && (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ py: 3 }}>
        {children}
      </DialogContent>
      {actions && (
        <>
          <Divider />
          <DialogActions sx={{ p: 2 }}>
            {actions}
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default CustomModal;
