import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const LibraryPage: React.FC = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Library Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage books, issues, returns, and library operations
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} size="large">
          Add Book
        </Button>
      </Box>
      <Typography>Library management interface will be implemented here</Typography>
    </Box>
  );
};

export default LibraryPage;
