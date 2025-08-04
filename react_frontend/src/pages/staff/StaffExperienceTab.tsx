import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, Alert, Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { apiService } from '../../services/api';

interface StaffExperience {
  _id?: string;
  staff_id: string;
  organization: string;
  designation: string;
  from_date: string;
  to_date: string;
  total_experience: string;
  remark?: string;
}

interface StaffExperienceTabProps {
  staffId: string;
}

const StaffExperienceTab: React.FC<StaffExperienceTabProps> = ({ staffId }) => {
  const [experiences, setExperiences] = useState<StaffExperience[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<StaffExperience | null>(null);
  const [form, setForm] = useState<Omit<StaffExperience, '_id' | 'staff_id'>>({
    organization: '',
    designation: '',
    from_date: '',
    to_date: '',
    total_experience: '',
    remark: '',
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchExperiences = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getStaffExperiences({ staff_id: staffId });
      setExperiences(data as StaffExperience[]);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch experiences');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
    // eslint-disable-next-line
  }, [staffId]);

  const handleOpen = () => {
    setEditing(null);
    setForm({ organization: '', designation: '', from_date: '', to_date: '', total_experience: '', remark: '' });
    setFormError(null);
    setDialogOpen(true);
  };
  const handleEdit = (exp: StaffExperience) => {
    setEditing(exp);
    setForm({
      organization: exp.organization,
      designation: exp.designation,
      from_date: exp.from_date?.substring(0, 10) || '',
      to_date: exp.to_date?.substring(0, 10) || '',
      total_experience: exp.total_experience,
      remark: exp.remark || '',
    });
    setFormError(null);
    setDialogOpen(true);
  };
  const handleClose = () => {
    setDialogOpen(false);
    setEditing(null);
    setFormError(null);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };
  const handleSave = async () => {
    if (!form.organization || !form.designation || !form.from_date || !form.to_date || !form.total_experience) {
      setFormError('All fields except remark are required');
      return;
    }
    setFormLoading(true);
    try {
      if (editing && editing._id) {
        await apiService.updateStaffExperience(editing._id, { ...form, staff_id: staffId });
      } else {
        await apiService.createStaffExperience({ ...form, staff_id: staffId });
      }
      fetchExperiences();
      handleClose();
    } catch (e: any) {
      setFormError(e.message || 'Failed to save');
    } finally {
      setFormLoading(false);
    }
  };
  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!window.confirm('Delete this experience?')) return;
    try {
      await apiService.deleteStaffExperience(id);
      fetchExperiences();
    } catch (e: any) {
      setError(e.message || 'Delete failed');
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Experience</Typography>
        <Button variant="contained" onClick={handleOpen}>Add Experience</Button>
      </Box>
      {loading ? <CircularProgress size={24} /> : error ? <Alert severity="error">{error}</Alert> : (
        <Stack spacing={2}>
          {experiences.length === 0 ? <Typography color="text.secondary">No experience records found.</Typography> :
            experiences.map(exp => (
              <Box key={exp._id} display="flex" alignItems="center" gap={2}>
                <Typography sx={{ minWidth: 180 }}>{exp.organization}</Typography>
                <Typography sx={{ minWidth: 160 }}>{exp.designation}</Typography>
                <Typography sx={{ minWidth: 120 }}>{exp.from_date ? new Date(exp.from_date).toLocaleDateString() : ''} - {exp.to_date ? new Date(exp.to_date).toLocaleDateString() : ''}</Typography>
                <Typography sx={{ minWidth: 120 }}>{exp.total_experience}</Typography>
                <Typography sx={{ flex: 1 }}>{exp.remark}</Typography>
                <IconButton color="primary" onClick={() => handleEdit(exp)}><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => handleDelete(exp._id)}><DeleteIcon /></IconButton>
              </Box>
            ))
          }
        </Stack>
      )}
      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? 'Edit Experience' : 'Add Experience'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            {formError && <Alert severity="error">{formError}</Alert>}
            <TextField label="Organization" name="organization" value={form.organization} onChange={handleChange} fullWidth required />
            <TextField label="Designation" name="designation" value={form.designation} onChange={handleChange} fullWidth required />
            <TextField label="From Date" name="from_date" type="date" value={form.from_date} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
            <TextField label="To Date" name="to_date" type="date" value={form.to_date} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
            <TextField label="Total Experience" name="total_experience" value={form.total_experience} onChange={handleChange} fullWidth required />
            <TextField label="Remark" name="remark" value={form.remark} onChange={handleChange} fullWidth multiline minRows={2} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={formLoading}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={formLoading || !form.organization || !form.designation || !form.from_date || !form.to_date || !form.total_experience}>
            {formLoading ? 'Saving...' : (editing ? 'Update' : 'Add')}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default StaffExperienceTab;
