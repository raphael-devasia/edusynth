import React, { useEffect, useState } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, IconButton
} from '@mui/material';
import { Add, Edit, Delete, Print, FileDownload } from '@mui/icons-material';
import apiService from '../../services/api';

const initialForm = {
  name: '',
  contact: '',
  date: '',
  description: '',
  call_duration: '',
  note: '',
  call_type: 'Incoming',
  follow_up_date: '',
};

const callTypes = ['Incoming', 'Outgoing'];

export default function PhoneCallLogPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [form, setForm] = useState(initialForm);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res: any = await apiService.get('/phonecalllogs');
      setLogs(Array.isArray(res.data) ? res.data : []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch logs');
    }
    setLoading(false);
  };

  useEffect(() => { fetchLogs(); }, []);

  const handleOpen = (log?: any) => {
    setError(null);
    if (log) {
      setEditId(log._id);
      setForm({
        ...log,
        date: log.date ? log.date.substr(0,10) : '',
        follow_up_date: log.follow_up_date ? log.follow_up_date.substr(0,10) : '',
      });
    } else {
      setEditId(null);
      setForm(initialForm);
    }
    setOpen(true);
  };
  const handleClose = () => { setOpen(false); setEditId(null); setForm(initialForm); setError(null); };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.contact || !form.date || !form.call_type) {
      setError('Contact, Date, and Call Type are required');
      return;
    }
    try {
      if (editId) {
        await apiService.put(`/phonecalllogs/${editId}`, form);
      } else {
        await apiService.post('/phonecalllogs', form);
      }
      fetchLogs();
      handleClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this log?')) return;
    try {
      await apiService.delete(`/phonecalllogs/${id}`);
      fetchLogs();
    } catch (err: any) {
      setError(err.message || 'Failed to delete');
    }
  };

  // CSV Export
  const handleExport = () => {
    const csv = [
      ['Name','Contact','Date','Description','Call Duration','Note','Call Type','Follow Up Date'],
      ...logs.map(l => [l.name,l.contact,l.date?.substr(0,10),l.description,l.call_duration,l.note,l.call_type,l.follow_up_date?.substr(0,10)]),
    ].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'phone_call_logs.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Print
  const handlePrint = () => {
    const printContent = document.getElementById('phone-call-log-table');
    if (!printContent) return;
    const win = window.open('', '', 'width=900,height=700');
    if (win) {
      win.document.write('<html><head><title>Print Phone Call Logs</title></head><body>');
      win.document.write(printContent.outerHTML);
      win.document.write('</body></html>');
      win.document.close();
      win.print();
    }
  };

  return (
    <Box p={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Phone Call Log</Typography>
        <Stack direction="row" spacing={1}>
          <Button startIcon={<FileDownload />} onClick={handleExport} variant="outlined">Export CSV</Button>
          <Button startIcon={<Print />} onClick={handlePrint} variant="outlined">Print</Button>
          <Button startIcon={<Add />} onClick={() => handleOpen()} variant="contained">Add</Button>
        </Stack>
      </Stack>
      {error && <Typography color="error">{error}</Typography>}
      <TableContainer id="phone-call-log-table" sx={{ bgcolor: 'background.paper' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Call Duration</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Call Type</TableCell>
              <TableCell>Follow Up Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(logs || []).map((log) => (
              <TableRow key={log._id}>
                <TableCell>{log.name}</TableCell>
                <TableCell>{log.contact}</TableCell>
                <TableCell>{log.date?.substr(0,10)}</TableCell>
                <TableCell>{log.description}</TableCell>
                <TableCell>{log.call_duration}</TableCell>
                <TableCell>{log.note}</TableCell>
                <TableCell>{log.call_type}</TableCell>
                <TableCell>{log.follow_up_date?.substr(0,10)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(log)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(log._id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editId ? 'Edit Phone Call Log' : 'Add Phone Call Log'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth />
            <TextField label="Contact" name="contact" value={form.contact} onChange={handleChange} fullWidth required />
            <TextField label="Date" name="date" type="date" value={form.date} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
            <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth multiline rows={2} />
            <TextField label="Call Duration" name="call_duration" value={form.call_duration} onChange={handleChange} fullWidth />
            <TextField label="Note" name="note" value={form.note} onChange={handleChange} fullWidth multiline rows={2} />
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography>Call Type:</Typography>
              {callTypes.map((type) => (
                <label key={type} style={{ marginRight: 10 }}>
                  <input type="radio" name="call_type" value={type} checked={form.call_type === type} onChange={handleChange} /> {type}
                </label>
              ))}
            </Stack>
            <TextField label="Follow Up Date" name="follow_up_date" type="date" value={form.follow_up_date} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
            {error && <Typography color="error">{error}</Typography>}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">{editId ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
