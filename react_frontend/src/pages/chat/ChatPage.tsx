import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const ChatPage: React.FC = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Chat & Messaging
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Communication platform for students, teachers, and staff
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} size="large">
          New Chat
        </Button>
      </Box>
      <Typography>Chat and messaging interface will be implemented here</Typography>
    </Box>
  );
};

export default ChatPage;
