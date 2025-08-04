import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const ReportsPage: React.FC = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Reports & Analytics
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Generate comprehensive reports and analytics
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} size="large">
          Generate Report
        </Button>
      </Box>
      <Typography>Reports and analytics interface will be implemented here</Typography>
    </Box>
  );
};

export default ReportsPage;
