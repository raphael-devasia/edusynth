import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const HostelPage: React.FC = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Hostel Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage hostel rooms, students, and accommodation services
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} size="large">
          Add Room
        </Button>
      </Box>
      <Typography>Hostel management interface will be implemented here</Typography>
    </Box>
  );
};

export default HostelPage;
