import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, Alert, Stack, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { apiService } from '../../services/api';
import { LeaveType, StaffLeaveAllotment } from '../../types/staffLeave';

interface Props {
  staffId: string;
}

const StaffLeaveAllotmentTab: React.FC<Props> = ({ staffId }) => {
  const [allotments, setAllotments] = useState<StaffLeaveAllotment[]>([]);
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<StaffLeaveAllotment|null>(null);
  const [form, setForm] = useState({ leaveType: '', allotted: '', notes: '' });
  const [formError, setFormError] = useState<string|null>(null);
  const [saving, setSaving] = useState(false);

  const fetchAllotments = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getStaffLeaveAllotments({ staff: staffId });
      setAllotments(data as StaffLeaveAllotment[]);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch leave entitlements');
    } finally {
      setLoading(false);
    }
  };
  const fetchLeaveTypes = async () => {
    try {
      const types = await apiService.getLeaveTypes({ is_active: true });
      setLeaveTypes(types as LeaveType[]);
    } catch {}
  };

  useEffect(() => {
    fetchAllotments();
    fetchLeaveTypes();
    // eslint-disable-next-line
  }, [staffId]);

  const handleOpen = (item?: StaffLeaveAllotment) => {
    setEditing(item || null);
    setForm(item ? {
      leaveType: typeof item.leaveType === 'string' ? item.leaveType : item.leaveType._id,
      allotted: item.allotted.toString(),
      notes: item.notes || ''
    } : { leaveType: '', allotted: '', notes: '' });
    setFormError(null);
    setDialogOpen(true);
  };
  const handleClose = () => {
    setDialogOpen(false);
    setEditing(null);
    setForm({ leaveType: '', allotted: '', notes: '' });
    setFormError(null);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };
  const handleSave = async () => {
    if (!form.leaveType || !form.allotted) {
      setFormError('Leave type and allotted days are required');
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await apiService.updateStaffLeaveAllotment(editing._id, {
          staff: staffId,
          leaveType: form.leaveType,
          allotted: Number(form.allotted),
          notes: form.notes
        });
      } else {
        await apiService.createStaffLeaveAllotment({
          staff: staffId,
          leaveType: form.leaveType,
          allotted: Number(form.allotted),
          notes: form.notes
        });
      }
      fetchAllotments();
      handleClose();
    } catch (e: any) {
      setFormError(e.message || 'Failed to save entitlement');
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this leave entitlement?')) return;
    try {
      await apiService.deleteStaffLeaveAllotment(id);
      fetchAllotments();
    } catch (e: any) {
      setError(e.message || 'Delete failed');
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Leave Entitlements</Typography>
        <Button variant="contained" onClick={() => handleOpen()}>Add Entitlement</Button>
      </Box>
      {loading ? <CircularProgress size={24} /> : error ? <Alert severity="error">{error}</Alert> : (
        <Stack spacing={1}>
          {allotments.length === 0 ? <Typography color="text.secondary">No entitlements found.</Typography> :
            allotments.map(a => (
              <Box key={a._id} display="flex" alignItems="center" gap={2}>
                <Typography sx={{ minWidth: 180 }}>{typeof a.leaveType === 'string' ? a.leaveType : a.leaveType.name}</Typography>
                <Typography sx={{ minWidth: 100 }}>{a.allotted} days</Typography>
                <Typography sx={{ flex: 1 }}>{a.notes}</Typography>
                <IconButton onClick={() => handleOpen(a)}><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => handleDelete(a._id)}><DeleteIcon /></IconButton>
              </Box>
            ))
          }
        </Stack>
      )}
      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>{editing ? 'Edit' : 'Add'} Leave Entitlement</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            {formError && <Alert severity="error">{formError}</Alert>}
            <TextField
              select
              label="Leave Type"
              name="leaveType"
              value={form.leaveType}
              onChange={handleChange}
              required
              fullWidth
            >
              {leaveTypes.map(t => (
                <MenuItem value={t._id} key={t._id}>{t.name}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="Allotted Days"
              name="allotted"
              type="number"
              value={form.allotted}
              onChange={handleChange}
              required
              fullWidth
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={2}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={saving}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={saving || !form.leaveType || !form.allotted}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default StaffLeaveAllotmentTab;
