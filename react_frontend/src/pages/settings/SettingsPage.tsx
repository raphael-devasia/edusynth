import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const SettingsPage: React.FC = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            System Settings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Configure system preferences and application settings
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} size="large">
          Add Setting
        </Button>
      </Box>
      <Typography>System settings interface will be implemented here</Typography>
    </Box>
  );
};

export default SettingsPage;
