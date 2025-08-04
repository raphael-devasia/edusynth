import React, { useState, useEffect } from 'react';
import {
  Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle,
  IconButton, Paper, Snackbar, Stack, TextField, Typography, Alert, MenuItem, Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import { Complaint, ComplaintType } from '../../types/setupMasters';
import apiService from '../../services/api';

const initialForm: Complaint = {
  complain_type_id: '',
  complain_by: '',
  phone: '',
  date: '',
  description: '',
  action_taken: '',
  assigned: '',
  note: '',
  image: '',
  document: '',
};

const ComplainPage: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [complaintTypes, setComplaintTypes] = useState<ComplaintType[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Complaint>(initialForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [details, setDetails] = useState<Complaint | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [fileInputs, setFileInputs] = useState<{ image?: File; document?: File }>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => { fetchComplaints(); fetchComplaintTypes(); }, []);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const res = await apiService.get<Complaint[]>('/complaint');
      setComplaints(res);
    } catch (err: any) {
      setSnackbar({ open: true, message: err.message || 'Failed to fetch complaints', severity: 'error' });
    }
    setLoading(false);
  };
  const fetchComplaintTypes = async () => {
    try {
      const res = await apiService.get<ComplaintType[]>('/complainttype');
      setComplaintTypes(res);
    } catch {}
  };

  const handleOpen = (row?: Complaint) => {
    setEditId(row?._id || null);
    setForm(row ? { ...row } : initialForm);
    setFileInputs({});
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setForm(initialForm);
    setEditId(null);
    setFileInputs({});
  };
  const handleDetails = (row: Complaint) => {
    setDetails(row);
    setDetailsOpen(true);
  };
  const handleDetailsClose = () => {
    setDetailsOpen(false);
    setDetails(null);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFileInputs({ ...fileInputs, [name]: files[0] });
    }
  };
  const validate = () => {
    if (!form.complain_type_id || !form.complain_by || !form.date) return false;
    return true;
  };
  const handleSubmit = async () => {
    if (!validate()) {
      setSnackbar({ open: true, message: 'Please fill all required fields', severity: 'error' });
      return;
    }
    setLoading(true);
    try {
      const data = { ...form };
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value as string);
      });
      if (fileInputs.image) formData.append('image', fileInputs.image);
      if (fileInputs.document) formData.append('document', fileInputs.document);
      if (editId) {
        await apiService.put(`/complaint/${editId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        setSnackbar({ open: true, message: 'Complaint updated', severity: 'success' });
      } else {
        await apiService.post('/complaint', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        setSnackbar({ open: true, message: 'Complaint added', severity: 'success' });
      }
      fetchComplaints();
      handleClose();
    } catch (err: any) {
      setSnackbar({ open: true, message: err.message || 'Error saving complaint', severity: 'error' });
    }
    setLoading(false);
  };
  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await apiService.delete(`/complaint/${id}`);
      setSnackbar({ open: true, message: 'Complaint deleted', severity: 'success' });
      fetchComplaints();
    } catch (err: any) {
      setSnackbar({ open: true, message: err.message || 'Delete failed', severity: 'error' });
    }
    setLoading(false);
    setDeleteId(null);
  };
  const handleDownload = async (fileUrl?: string) => {
    if (!fileUrl) return;
    window.open(fileUrl, '_blank');
  };

  return (
    <Box p={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Complaints</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>Add Complaint</Button>
      </Stack>
      {loading ? <CircularProgress /> : (
        <Paper>
          <Box p={2}>
            <table width="100%" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>By</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Document</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map(row => (
                  <tr key={row._id}>
                    <td>{complaintTypes.find(t => t._id === row.complain_type_id)?.name || ''}</td>
                    <td>{row.complain_by}</td>
                    <td>{row.date ? new Date(row.date).toLocaleDateString() : ''}</td>
                    <td>{row.description}</td>
                    <td>{row.image && <IconButton onClick={() => handleDownload(row.image)}><DownloadIcon /></IconButton>}</td>
                    <td>{row.document && <IconButton onClick={() => handleDownload(row.document)}><DownloadIcon /></IconButton>}</td>
                    <td>
                      <Tooltip title="View Details"><IconButton onClick={() => handleDetails(row)}><VisibilityIcon /></IconButton></Tooltip>
                      <Tooltip title="Edit"><IconButton onClick={() => handleOpen(row)}><EditIcon /></IconButton></Tooltip>
                      <Tooltip title="Delete"><IconButton color="error" onClick={() => setDeleteId(row._id!)}><DeleteIcon /></IconButton></Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Paper>
      )}
      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editId ? 'Edit Complaint' : 'Add Complaint'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField select label="Complaint Type" name="complain_type_id" value={form.complain_type_id} onChange={handleChange} required>
              {complaintTypes.map(type => <MenuItem key={type._id} value={type._id}>{type.name}</MenuItem>)}
            </TextField>
            <TextField label="Complain By" name="complain_by" value={form.complain_by} onChange={handleChange} required />
            <TextField label="Phone" name="phone" value={form.phone || ''} onChange={handleChange} />
            <TextField label="Date" name="date" type="date" value={form.date} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
            <TextField label="Description" name="description" value={form.description || ''} onChange={handleChange} multiline minRows={2} />
            <TextField label="Action Taken" name="action_taken" value={form.action_taken || ''} onChange={handleChange} />
            <TextField label="Assigned" name="assigned" value={form.assigned || ''} onChange={handleChange} />
            <TextField label="Note" name="note" value={form.note || ''} onChange={handleChange} />
            <Button variant="outlined" component="label">Upload Image<input type="file" name="image" hidden onChange={handleFileChange} accept="image/*" /></Button>
            <Button variant="outlined" component="label">Upload Document<input type="file" name="document" hidden onChange={handleFileChange} accept="application/pdf,.doc,.docx,.jpg,.png" /></Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">{editId ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
      {/* Details Modal */}
      <Dialog open={detailsOpen} onClose={handleDetailsClose} maxWidth="sm" fullWidth>
        <DialogTitle>Complaint Details</DialogTitle>
        <DialogContent>
          {details && (
            <Stack spacing={1} mt={1}>
              <Typography><b>Type:</b> {complaintTypes.find(t => t._id === details.complain_type_id)?.name || ''}</Typography>
              <Typography><b>By:</b> {details.complain_by}</Typography>
              <Typography><b>Date:</b> {details.date ? new Date(details.date).toLocaleDateString() : ''}</Typography>
              <Typography><b>Description:</b> {details.description}</Typography>
              <Typography><b>Action Taken:</b> {details.action_taken}</Typography>
              <Typography><b>Assigned:</b> {details.assigned}</Typography>
              <Typography><b>Note:</b> {details.note}</Typography>
              <Typography><b>Phone:</b> {details.phone}</Typography>
              <Typography><b>Image:</b> {details.image && <IconButton onClick={() => handleDownload(details.image)}><DownloadIcon /></IconButton>}</Typography>
              <Typography><b>Document:</b> {details.document && <IconButton onClick={() => handleDownload(details.document)}><DownloadIcon /></IconButton>}</Typography>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailsClose}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* Delete Dialog */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Delete Complaint?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button onClick={() => deleteId && handleDelete(deleteId)} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ComplainPage;
