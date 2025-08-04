import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, Alert, Stack, Rating, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { apiService } from '../../services/api';
import { StaffFeedback, StaffFeedbackInput } from '../../types/staffFeedback';

interface Props {
  staffId: string;
  currentUserId: string;
}

const StaffFeedbackTab: React.FC<Props> = ({ staffId, currentUserId }) => {
  const [feedback, setFeedback] = useState<StaffFeedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<StaffFeedbackInput>({ staff: staffId, reviewer: currentUserId, rating: 0, comment: '' });
  const [formError, setFormError] = useState<string|null>(null);
  const [saving, setSaving] = useState(false);

  const fetchFeedback = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getStaffFeedback({ staff: staffId });
      setFeedback(data as StaffFeedback[]);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch feedback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
    // eslint-disable-next-line
  }, [staffId]);

  const handleOpen = () => {
    setForm({ staff: staffId, reviewer: currentUserId, rating: 0, comment: '' });
    setFormError(null);
    setDialogOpen(true);
  };
  const handleClose = () => {
    setDialogOpen(false);
    setForm({ staff: staffId, reviewer: currentUserId, rating: 0, comment: '' });
    setFormError(null);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };
  const handleRatingChange = (_: any, value: number|null) => {
    setForm(f => ({ ...f, rating: value || 0 }));
  };
  const handleSave = async () => {
    if (!form.rating) {
      setFormError('Rating is required');
      return;
    }
    setSaving(true);
    try {
      await apiService.createStaffFeedback(form);
      fetchFeedback();
      handleClose();
    } catch (e: any) {
      setFormError(e.message || 'Failed to submit feedback');
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this feedback?')) return;
    try {
      await apiService.deleteStaffFeedback(id);
      fetchFeedback();
    } catch (e: any) {
      setError(e.message || 'Delete failed');
    }
  };

  const avgRating = feedback.length ? (feedback.reduce((sum, f) => sum + (f.rating || 0), 0) / feedback.length).toFixed(2) : null;

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Staff Feedback & Ratings</Typography>
        <Button variant="contained" onClick={handleOpen}>Add Feedback</Button>
      </Box>
      {avgRating && (
        <Box mb={2}>
          <Typography variant="subtitle2">Average Rating</Typography>
          <Rating value={Number(avgRating)} precision={0.1} readOnly />
          <Typography variant="body2">{avgRating} ({feedback.length} ratings)</Typography>
        </Box>
      )}
      {loading ? <CircularProgress size={24} /> : error ? <Alert severity="error">{error}</Alert> : (
        <Stack spacing={2}>
          {feedback.length === 0 ? <Typography color="text.secondary">No feedback found.</Typography> :
            feedback.map(f => (
              <Box key={f._id} display="flex" alignItems="center" gap={2}>
                <Rating value={f.rating} readOnly size="small" />
                <Typography sx={{ minWidth: 120 }}>{typeof f.reviewer === 'object' ? f.reviewer.name : ''}</Typography>
                <Typography sx={{ flex: 1 }}>{f.comment}</Typography>
                <Typography sx={{ minWidth: 120, color: 'text.secondary' }}>{f.created_at ? new Date(f.created_at).toLocaleDateString() : ''}</Typography>
                {f.reviewer && typeof f.reviewer === 'object' && f.reviewer._id === currentUserId && (
                  <IconButton color="error" onClick={() => handleDelete(f._id!)}><DeleteIcon /></IconButton>
                )}
              </Box>
            ))
          }
        </Stack>
      )}
      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Add Feedback</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            {formError && <Alert severity="error">{formError}</Alert>}
            <Rating
              value={form.rating}
              onChange={handleRatingChange}
              size="large"
              precision={1}
              max={5}
            />
            <TextField
              label="Comment"
              name="comment"
              value={form.comment}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={2}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={saving}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={saving || !form.rating}>
            {saving ? 'Saving...' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default StaffFeedbackTab;
