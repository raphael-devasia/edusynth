import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Button, Stack, TextField, CircularProgress, Alert } from '@mui/material';

const StudentBulkMailPage: React.FC = () => {
  // Mock selected IDs for demo; in real app, pass via props/context/router or selection state
  const [selectedIds] = useState<string[]>(['id1', 'id2']);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [success, setSuccess] = useState<string|null>(null);

  const handleSendMail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await axios.post('/api/students/bulk-mail', { ids: selectedIds, subject, message });
      setSuccess('Mail sent successfully.');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to send mail');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Bulk Mail Students</Typography>
      <Paper elevation={2} sx={{ p: 3, maxWidth: 600 }}>
        <form onSubmit={handleSendMail}>
          <Stack spacing={2}>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <TextField label="Subject" name="subject" value={subject} onChange={e => setSubject(e.target.value)} required fullWidth />
            <TextField label="Message" name="message" value={message} onChange={e => setMessage(e.target.value)} required fullWidth multiline rows={4} />
            <Button type="submit" variant="contained" color="primary" disabled={loading || selectedIds.length === 0}>
              {loading ? <CircularProgress size={24} /> : 'Send Mail'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default StudentBulkMailPage;
