import React, { useState, useEffect } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Snackbar, CircularProgress
} from '@mui/material';
import { Add, Edit, Delete, Print, FileDownload, Visibility } from '@mui/icons-material';
import apiService from '../../services/api';

const initialForm = {
  reference_no: '',
  from_title: '',
  to_title: '',
  address: '',
  note: '',
  date: '',
  image: undefined as File | undefined,
};

export default function PostalReceivePage() {
  const [receives, setReceives] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(initialForm);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [details, setDetails] = useState<any | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const fetchReceives = async () => {
    setLoading(true);
    try {
      const res: any = await apiService.get('/dispatch?type=receive');
      setReceives(Array.isArray(res.data) ? res.data : []);
    } catch (err: any) {
      setSnackbar({ open: true, message: err.message || 'Failed to fetch records', severity: 'error' });
    }
    setLoading(false);
  };

  useEffect(() => { fetchReceives(); }, []);

  const handleOpen = (row?: any) => {
    setEditId(row?._id || null);
    setForm(row ? { ...row, image: undefined } : initialForm);
    setOpen(true);
  };
  const handleClose = () => { setOpen(false); setForm(initialForm); setEditId(null); };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files) {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (v) data.append(k, v as any);
    });
    try {
      if (editId) {
        await apiService.put(`/dispatch/${editId}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
        setSnackbar({ open: true, message: 'Updated successfully', severity: 'success' });
      } else {
        await apiService.post('/dispatch', data, { headers: { 'Content-Type': 'multipart/form-data' } });
        setSnackbar({ open: true, message: 'Added successfully', severity: 'success' });
      }
      fetchReceives();
      handleClose();
    } catch (err: any) {
      setSnackbar({ open: true, message: err.message || 'Save failed', severity: 'error' });
    }
  };
  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this record?')) return;
    try {
      await apiService.delete(`/dispatch/${id}`);
      setSnackbar({ open: true, message: 'Deleted successfully', severity: 'success' });
      fetchReceives();
    } catch (err: any) {
      setSnackbar({ open: true, message: err.message || 'Delete failed', severity: 'error' });
    }
  };
  const handleDownload = async (id: string) => {
    window.open(`/api/dispatch/download/${id}`, '_blank');
  };
  const handleDetails = (row: any) => {
    setDetails(row);
    setDetailsOpen(true);
  };
  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h2>Postal Receive</h2>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>Add</Button>
      </Box>
      {loading ? <CircularProgress /> : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ref No</TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Note</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>File</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(receives || []).map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.reference_no}</TableCell>
                  <TableCell>{row.from_title}</TableCell>
                  <TableCell>{row.to_title}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.note}</TableCell>
                  <TableCell>{row.date ? new Date(row.date).toLocaleDateString() : ''}</TableCell>
                  <TableCell>
                    {row.image && <IconButton onClick={() => handleDownload(row._id)}><FileDownload /></IconButton>}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDetails(row)}><Visibility /></IconButton>
                    <IconButton onClick={() => handleOpen(row)}><Edit /></IconButton>
                    <IconButton onClick={() => handleDelete(row._id)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editId ? 'Edit Postal Receive' : 'Add Postal Receive'}</DialogTitle>
        <DialogContent>
          <TextField margin="dense" label="Reference No" name="reference_no" value={form.reference_no} onChange={handleChange} fullWidth required />
          <TextField margin="dense" label="From" name="from_title" value={form.from_title} onChange={handleChange} fullWidth required />
          <TextField margin="dense" label="To" name="to_title" value={form.to_title} onChange={handleChange} fullWidth required />
          <TextField margin="dense" label="Address" name="address" value={form.address} onChange={handleChange} fullWidth required />
          <TextField margin="dense" label="Note" name="note" value={form.note} onChange={handleChange} fullWidth />
          <TextField margin="dense" label="Date" name="date" type="date" value={form.date} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
          <input type="file" name="image" accept="*" onChange={handleChange} style={{ marginTop: 16 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">{editId ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Postal Receive Details</DialogTitle>
        <DialogContent>
          {details && (
            <Box>
              <div><b>Reference No:</b> {details.reference_no}</div>
              <div><b>From:</b> {details.from_title}</div>
              <div><b>To:</b> {details.to_title}</div>
              <div><b>Address:</b> {details.address}</div>
              <div><b>Note:</b> {details.note}</div>
              <div><b>Date:</b> {details.date ? new Date(details.date).toLocaleDateString() : ''}</div>
              <div><b>File:</b> {details.image && <IconButton onClick={() => handleDownload(details._id)}><FileDownload /></IconButton>}</div>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} message={snackbar.message} />
    </Box>
  );
}
