import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const SessionsPage: React.FC = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Academic Sessions
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage academic years and session periods
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} size="large">
          Add Session
        </Button>
      </Box>
      <Typography>Academic sessions management interface will be implemented here</Typography>
    </Box>
  );
};

export default SessionsPage;
