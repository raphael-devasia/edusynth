import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Button, Stack, CircularProgress, Alert } from '@mui/material';

const StudentImportPage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [success, setSuccess] = useState<string|null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setLoading(true);
    setError(null);
    setSuccess(null);
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post('/api/students/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Import successful.');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Import failed');
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Import Students</Typography>
      <Paper elevation={2} sx={{ p: 3, maxWidth: 600 }}>
        <Stack spacing={2}>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <Button variant="contained" color="primary" onClick={() => fileInputRef.current?.click()} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Upload CSV/Excel File'}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default StudentImportPage;
