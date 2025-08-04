import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Stack, Alert
} from '@mui/material';
import { StaffLeave } from '../../types';

export interface StaffLeaveDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (leave: Omit<StaffLeave, '_id'|'created_at'|'updated_at'|'status'>) => Promise<void>;
  loading?: boolean;
  error?: string | null;
  editingLeave?: StaffLeave | null;
  staffId: string;
}

const leaveTypes = [
  'Casual', 'Sick', 'Earned', 'Maternity', 'Paternity', 'Other'
];

export const StaffLeaveDialog: React.FC<StaffLeaveDialogProps> = ({ open, onClose, onSubmit, loading, error, editingLeave, staffId }) => {
  const [form, setForm] = useState({
    leave_type: '',
    from_date: '',
    to_date: '',
    reason: '',
    remark: ''
  });

  const [touched, setTouched] = useState<{[k: string]: boolean}>({});

  // Prefill form when editingLeave changes
  React.useEffect(() => {
    if (editingLeave) {
      setForm({
        leave_type: editingLeave.leave_type || '',
        from_date: editingLeave.from_date || '',
        to_date: editingLeave.to_date || '',
        reason: editingLeave.reason || '',
        remark: editingLeave.remark || ''
      });
      setTouched({});
    } else {
      setForm({ leave_type: '', from_date: '', to_date: '', reason: '', remark: '' });
      setTouched({});
    }
  }, [editingLeave, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setTouched(t => ({ ...t, [e.target.name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.leave_type || !form.from_date || !form.to_date || !form.reason) return;
    await onSubmit({ ...form, staff_id: staffId });
  };

  const hasError = (field: string) => touched[field] && !form[field as keyof typeof form];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>New Leave</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              select
              label="Leave Type"
              name="leave_type"
              value={form.leave_type}
              onChange={handleChange}
              required
              error={hasError('leave_type')}
              helperText={hasError('leave_type') ? 'Leave type is required' : ''}
            >
              {leaveTypes.map(type => (
                <MenuItem value={type} key={type}>{type}</MenuItem>
              ))}
            </TextField>
            <TextField
              type="date"
              label="From Date"
              name="from_date"
              value={form.from_date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
              error={hasError('from_date')}
              helperText={hasError('from_date') ? 'From date is required' : ''}
            />
            <TextField
              type="date"
              label="To Date"
              name="to_date"
              value={form.to_date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
              error={hasError('to_date')}
              helperText={hasError('to_date') ? 'To date is required' : ''}
            />
            <TextField
              label="Reason"
              name="reason"
              value={form.reason}
              onChange={handleChange}
              required
              error={hasError('reason')}
              helperText={hasError('reason') ? 'Reason is required' : ''}
            />
            <TextField
              label="Remark"
              name="remark"
              value={form.remark}
              onChange={handleChange}
              multiline
              minRows={2}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={loading || !form.leave_type || !form.from_date || !form.to_date || !form.reason}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
