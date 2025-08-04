import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Button, Stack, TextField, MenuItem, CircularProgress, Alert } from '@mui/material';

const StudentMultiClassPage: React.FC = () => {
  // Mock student and classes for demo; in real app, get from props/context/router
  const [studentId, setStudentId] = useState('mockStudentId');
  const [classes, setClasses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [success, setSuccess] = useState<string|null>(null);

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await axios.post('/api/students/assign-multi-class', { studentId, classes });
      setSuccess('Classes assigned successfully.');
      setClasses([]);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Assignment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Assign Multiple Classes</Typography>
      <Paper elevation={2} sx={{ p: 3, maxWidth: 600 }}>
        <form onSubmit={handleAssign}>
          <Stack spacing={2}>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <TextField label="Student ID" name="student" value={studentId} onChange={e => setStudentId(e.target.value)} required fullWidth />
            <TextField label="Classes" name="classes" select value={classes} onChange={e => setClasses(typeof e.target.value === 'string' ? [e.target.value] : e.target.value as string[])} required fullWidth SelectProps={{ multiple: true }}>
              <MenuItem value="10">10</MenuItem>
              <MenuItem value="11">11</MenuItem>
              <MenuItem value="12">12</MenuItem>
            </TextField>
            <Button type="submit" variant="contained" color="primary" disabled={loading || !studentId || classes.length === 0}>
              {loading ? <CircularProgress size={24} /> : 'Assign Classes'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default StudentMultiClassPage;
