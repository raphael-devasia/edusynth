import React, { useEffect, useState } from 'react';
import {
  Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Paper, Snackbar, Stack, TextField, Typography, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import apiService from '../../services/api';

interface Visitor {
  _id?: string;
  staff_id?: string;
  student_session_id?: string;
  source?: string;
  purpose: string;
  name: string;
  email?: string;
  contact: string;
  id_proof?: string;
  no_of_people: number;
  date: string;
  in_time: string;
  out_time?: string;
  note?: string;
  image?: string;
  meeting_with?: string;
}

const initialForm: Visitor = {
  purpose: '',
  name: '',
  contact: '',
  no_of_people: 1,
  date: '',
  in_time: '',
};

const VisitorBookPage: React.FC = () => {
  const [purposes, setPurposes] = useState<{ _id: string; name: string }[]>([]);
  const [staffList, setStaffList] = useState<{ _id: string; name: string }[]>([]);
  const [studentList, setStudentList] = useState<{ _id: string; name: string }[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<Visitor>(initialForm);
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Visitor | null>(null);
  const [search, setSearch] = useState('');

  // Fetch visitors
  const fetchVisitors = async () => {
    setLoading(true);
    setError(null);
    try {
      const res: any = await apiService.getVisitors();
      if (res && Array.isArray(res.data)) setVisitors(res.data);
      else if (Array.isArray(res)) setVisitors(res);
      else setVisitors([]);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch visitors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
    // Fetch dropdown data
    apiService.getVisitorPurposes().then((res: any) => {
      if (res && Array.isArray(res.data)) setPurposes(res.data);
      else if (Array.isArray(res)) setPurposes(res);
      else setPurposes([]);
    });
    apiService.getStaffDropdown().then((res: any) => {
      if (res && Array.isArray(res.data)) setStaffList(res.data);
      else if (Array.isArray(res)) setStaffList(res);
      else setStaffList([]);
    });
    apiService.getStudentDropdown().then((res: any) => {
      if (res && Array.isArray(res.data)) setStudentList(res.data);
      else if (Array.isArray(res)) setStudentList(res);
      else setStudentList([]);
    });
  }, []);

  // Form handlers
  const handleOpenDialog = (visitor?: Visitor) => {
    setEditMode(!!visitor);
    setForm(visitor ? { ...visitor, date: visitor.date ? visitor.date.slice(0, 10) : '' } : initialForm);
    setPreviewImage(visitor && visitor.image ? visitor.image : null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setForm(initialForm);
    setPreviewImage(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear staff/student when meeting_with changes
    if (name === 'meeting_with') {
      setForm((prev) => ({ ...prev, staff_id: '', student_session_id: '' }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      if (editMode && form._id) {
        await apiService.updateVisitor(form._id, form);
        setSnackbar({ open: true, message: 'Visitor updated successfully', severity: 'success' });
      } else {
        await apiService.createVisitor(form);
        setSnackbar({ open: true, message: 'Visitor added successfully', severity: 'success' });
      }
      setDialogOpen(false);
      fetchVisitors();
    } catch (e: any) {
      setSnackbar({ open: true, message: e.message || 'Failed to save visitor', severity: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?._id) return;
    try {
      await apiService.deleteVisitor(deleteTarget._id);
      setSnackbar({ open: true, message: 'Visitor deleted', severity: 'success' });
      setDeleteDialogOpen(false);
      fetchVisitors();
    } catch (e: any) {
      setSnackbar({ open: true, message: e.message || 'Failed to delete visitor', severity: 'error' });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredVisitors = visitors.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.purpose.toLowerCase().includes(search.toLowerCase()) ||
    (v.contact && v.contact.includes(search))
  );

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" fontWeight="bold">Visitor Book</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>Add Visitor</Button>
      </Stack>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" spacing={2} mb={2}>
          <TextField
            size="small"
            label="Search Visitor"
            value={search}
            onChange={handleSearchChange}
            sx={{ minWidth: 220 }}
          />
        </Stack>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Box>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Purpose</th>
<th>Image</th>
                  <th>Contact</th>
                  <th>Date</th>
                  <th>In Time</th>
                  <th>Out Time</th>
                  <th>No. of People</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVisitors.map(v => (
                  <tr key={v._id}>
                    <td>{v.name}</td>
                    <td>{purposes.find(p => p._id === v.purpose)?.name || v.purpose}</td>
<td>{v.image ? <img src={v.image} alt="Visitor" style={{ maxHeight: 40, maxWidth: 60 }} /> : '-'}</td>
                    <td>{v.contact}</td>
                    <td>{v.date ? v.date.slice(0, 10) : ''}</td>
                    <td>{v.in_time}</td>
                    <td>{v.out_time || '-'}</td>
                    <td>{v.no_of_people}</td>
                    <td>
                      <IconButton size="small" color="primary" onClick={() => handleOpenDialog(v)}><EditIcon /></IconButton>
                      <IconButton size="small" color="error" onClick={() => { setDeleteTarget(v); setDeleteDialogOpen(true); }}><DeleteIcon /></IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredVisitors.length === 0 && (
              <Typography align="center" color="text.secondary" mt={2}>No visitors found.</Typography>
            )}
          </Box>
        )}
      </Paper>
      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? 'Edit Visitor' : 'Add Visitor'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Name" name="name" value={form.name} onChange={handleFormChange} required fullWidth />
            <TextField
  select
  label="Purpose"
  name="purpose"
  value={form.purpose}
  onChange={handleFormChange}
  required
  fullWidth
>
  {purposes.map((p) => (
    <MenuItem key={p._id} value={p._id}>{p.name}</MenuItem>
  ))}
</TextField>
            <TextField label="Contact" name="contact" value={form.contact} onChange={handleFormChange} required fullWidth />
            <TextField label="Date" name="date" type="date" value={form.date} onChange={handleFormChange} required fullWidth InputLabelProps={{ shrink: true }} />
            <TextField label="In Time" name="in_time" type="time" value={form.in_time} onChange={handleFormChange} required fullWidth InputLabelProps={{ shrink: true }} />
            <TextField label="Out Time" name="out_time" type="time" value={form.out_time || ''} onChange={handleFormChange} fullWidth InputLabelProps={{ shrink: true }} />
            <TextField label="No. of People" name="no_of_people" type="number" value={form.no_of_people} onChange={handleFormChange} required fullWidth />
            <TextField label="Email" name="email" value={form.email || ''} onChange={handleFormChange} fullWidth />
            <TextField label="ID Proof" name="id_proof" value={form.id_proof || ''} onChange={handleFormChange} fullWidth />
            <TextField label="Note" name="note" value={form.note || ''} onChange={handleFormChange} fullWidth multiline minRows={2} />
            <TextField
  select
  label="Meeting With"
  name="meeting_with"
  value={form.meeting_with || ''}
  onChange={handleFormChange}
  fullWidth
>
  <MenuItem value="">Select</MenuItem>
  <MenuItem value="staff">Staff</MenuItem>
  <MenuItem value="student">Student</MenuItem>
  <MenuItem value="other">Other</MenuItem>
</TextField>
{form.meeting_with === 'staff' && (
  <TextField
    select
    label="Staff"
    name="staff_id"
    value={form.staff_id || ''}
    onChange={handleFormChange}
    fullWidth
  >
    {staffList.map((s) => (
      <MenuItem key={s._id} value={s._id}>{s.name}</MenuItem>
    ))}
  </TextField>
)}
{form.meeting_with === 'student' && (
  <TextField
    select
    label="Student"
    name="student_session_id"
    value={form.student_session_id || ''}
    onChange={handleFormChange}
    fullWidth
  >
    {studentList.map((s) => (
      <MenuItem key={s._id} value={s._id}>{s.name}</MenuItem>
    ))}
  </TextField>
)}
<Box>
  <Button variant="outlined" component="label">
    Upload Image
    <input type="file" hidden accept="image/*" onChange={handleImageChange} />
  </Button>
  {form.image && typeof form.image === 'string' && (
    <Box mt={1}><img src={form.image} alt="Visitor" style={{ maxHeight: 80 }} /></Box>
  )}
  {previewImage && (
    <Box mt={1}><img src={previewImage} alt="Preview" style={{ maxHeight: 80 }} /></Box>
  )}
</Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>{editMode ? 'Save Changes' : 'Add Visitor'}</Button>
        </DialogActions>
      </Dialog>
      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Visitor</DialogTitle>
        <DialogContent>Are you sure you want to delete this visitor?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar(s => ({ ...s, open: false }))} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default VisitorBookPage;
