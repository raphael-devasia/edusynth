import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const HomeworkPage: React.FC = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Homework Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Assign and track homework assignments for students
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} size="large">
          Assign Homework
        </Button>
      </Box>
      <Typography>Homework management interface will be implemented here</Typography>
    </Box>
  );
};

export default HomeworkPage;
