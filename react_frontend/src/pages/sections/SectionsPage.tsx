import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const SectionsPage: React.FC = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Sections Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage class sections and student groupings
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} size="large">
          Add Section
        </Button>
      </Box>
      <Typography>Sections management interface will be implemented here</Typography>
    </Box>
  );
};

export default SectionsPage;
