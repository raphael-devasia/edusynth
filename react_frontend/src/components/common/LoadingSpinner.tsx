import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Backdrop,
} from '@mui/material';

interface LoadingSpinnerProps {
  loading: boolean;
  message?: string;
  size?: number;
  overlay?: boolean;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  loading,
  message = 'Loading...',
  size = 40,
  overlay = false,
  fullScreen = false,
}) => {
  if (!loading) return null;

  const content = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      sx={{
        ...(overlay && !fullScreen && {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 1000,
        }),
        ...((!overlay && !fullScreen) && {
          py: 4,
        }),
      }}
    >
      <CircularProgress size={size} />
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );

  if (fullScreen) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        {content}
      </Backdrop>
    );
  }

  return content;
};

export default LoadingSpinner;
