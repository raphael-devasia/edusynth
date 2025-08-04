import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, TextField, Button, CircularProgress, Alert } from '@mui/material';

const initialState = {
  firstname: '',
  lastname: '',
  mobileno: '',
  email: '',
  dob: '',
  gender: '',
  reference_no: '',
};

const OnlineAdmissionFormPage: React.FC = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await axios.post('/api/online-admission/submit', form);
      setSuccess(true);
      setForm(initialState);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>Online Admission Form</Typography>
      <Paper sx={{ p: 2, maxWidth: 500 }}>
        <form onSubmit={handleSubmit}>
          <TextField label="First Name" name="firstname" value={form.firstname} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Last Name" name="lastname" value={form.lastname} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Mobile" name="mobileno" value={form.mobileno} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Date of Birth" name="dob" value={form.dob} onChange={handleChange} fullWidth margin="normal" type="date" InputLabelProps={{ shrink: true }} required />
          <TextField label="Gender" name="gender" value={form.gender} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Reference No" name="reference_no" value={form.reference_no} onChange={handleChange} fullWidth margin="normal" required />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
              {loading ? <CircularProgress size={24} /> : 'Submit Application'}
            </Button>
          </Box>
          {success && <Alert severity="success" sx={{ mt: 2 }}>Application submitted successfully!</Alert>}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </form>
      </Paper>
    </Box>
  );
};

export default OnlineAdmissionFormPage;
