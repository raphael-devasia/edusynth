import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const IncomePage: React.FC = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Income Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track and manage school income and revenue streams
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} size="large">
          Add Income
        </Button>
      </Box>
      <Typography>Income management interface will be implemented here</Typography>
    </Box>
  );
};

export default IncomePage;
