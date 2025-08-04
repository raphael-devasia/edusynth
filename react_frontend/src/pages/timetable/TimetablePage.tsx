import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const TimetablePage: React.FC = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Timetable Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create and manage class schedules and timetables
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} size="large">
          Create Timetable
        </Button>
      </Box>
      <Typography>Timetable management interface will be implemented here</Typography>
    </Box>
  );
};

export default TimetablePage;
