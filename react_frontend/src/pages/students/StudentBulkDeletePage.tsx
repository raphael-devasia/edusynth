import React from 'react';
import { Box, Typography, Paper, Button, Stack, Alert, CircularProgress } from '@mui/material';

const StudentBulkDeletePage: React.FC = () => {
  // For demo, mock selected IDs. In real app, pass via props/context/router or selection state.
  const [selectedIds, setSelectedIds] = React.useState<string[]>(['id1', 'id2']);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string|null>(null);
  const [success, setSuccess] = React.useState<string|null>(null);

  const handleBulkDelete = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await axios.post('/api/students/bulk-delete', { ids: selectedIds });
      setSuccess('Selected students deleted successfully.');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Bulk delete failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Bulk Delete Students</Typography>
      <Paper elevation={2} sx={{ p: 3, maxWidth: 600 }}>
        <Stack spacing={2}>
          <Alert severity="warning">This action will permanently delete selected students. This cannot be undone.</Alert>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <Button variant="contained" color="error" onClick={handleBulkDelete} disabled={loading || selectedIds.length === 0}>
            {loading ? <CircularProgress size={24} /> : 'Delete Selected Students'}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default StudentBulkDeletePage;
