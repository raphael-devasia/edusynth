import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const PayrollPage: React.FC = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Payroll Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage staff salaries, payroll, and financial records
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} size="large">
          Generate Payroll
        </Button>
      </Box>
      <Typography>Payroll management interface will be implemented here</Typography>
    </Box>
  );
};

export default PayrollPage;
