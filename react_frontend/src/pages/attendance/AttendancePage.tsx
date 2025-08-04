import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const AttendancePage: React.FC = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Attendance Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track student and staff attendance records
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} size="large">
          Mark Attendance
        </Button>
      </Box>
      <Typography>Attendance management interface will be implemented here</Typography>
    </Box>
  );
};

export default AttendancePage;
