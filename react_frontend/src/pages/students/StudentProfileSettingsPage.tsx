import React from 'react';
import { Box, Typography, Paper, Button, Stack, TextField, MenuItem } from '@mui/material';

const StudentProfileSettingsPage: React.FC = () => {
  // Placeholder handler
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement save profile settings logic
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Student Profile Settings</Typography>
      <Paper elevation={2} sx={{ p: 3, maxWidth: 600 }}>
        <form onSubmit={handleSave}>
          <Stack spacing={2}>
            <TextField label="Preferred Language" name="language" select fullWidth>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="hi">Hindi</MenuItem>
              <MenuItem value="es">Spanish</MenuItem>
            </TextField>
            <TextField label="Preferred Currency" name="currency" select fullWidth>
              <MenuItem value="INR">INR</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
            </TextField>
            <Button type="submit" variant="contained" color="primary">Save Settings</Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default StudentProfileSettingsPage;
