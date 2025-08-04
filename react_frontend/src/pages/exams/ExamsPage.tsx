import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const ExamsPage: React.FC = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Examinations
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage exams, schedules, results, and online assessments
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} size="large">
          Create Exam
        </Button>
      </Box>
      <Typography>Examinations management interface will be implemented here</Typography>
    </Box>
  );
};

export default ExamsPage;
