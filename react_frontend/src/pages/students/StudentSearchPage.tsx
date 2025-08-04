import React from 'react';
import { Box, Typography, Paper, TextField, Button, Stack } from '@mui/material';

const StudentSearchPage: React.FC = () => {
  // Placeholder handlers
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add search logic
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Search Students</Typography>
      <Paper elevation={2} sx={{ p: 3, maxWidth: 600 }}>
        <form onSubmit={handleSearch}>
          <Stack spacing={2}>
            <TextField label="Name" name="name" fullWidth />
            <TextField label="Email" name="email" fullWidth />
            <TextField label="Class" name="class" fullWidth />
            <Button type="submit" variant="contained" color="primary">Search</Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default StudentSearchPage;
