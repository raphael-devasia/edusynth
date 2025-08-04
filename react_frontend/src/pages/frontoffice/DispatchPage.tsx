import React, { useEffect, useState } from 'react';
import {
  Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Snackbar, Stack, TextField, Typography, Alert, Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import apiService from '../../services/api';
import { Dispatch } from '../../types';

const initialForm: Dispatch = {
  reference_no: '',
  to_title: '',
  address: '',
  note: '',
  from_title: '',
  date: '',
  type: 'dispatch',
  image: undefined,
};

const DispatchPage: React.FC = () => {
  const [dispatches, setDispatches] = useState<Dispatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<Dispatch>(initialForm);
  const [selectedDispatch, setSelectedDispatch] = useState<Dispatch | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Dispatch | null>(null);
  const [search, setSearch] = useState('');
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  // Fetch dispatches
  const fetchDispatches = async () => {
    setLoading(true);
    setError(null);
    try {
      const res: any = await apiService.getDispatches({ type: 'dispatch' });
      if (res && Array.isArray(res.data)) setDispatches(res.data);
      else if (Array.isArray(res)) setDispatches(res);
      else setDispatches([]);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch dispatches');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDispatches();
  }, []);

  // Form handlers
  const handleOpenDialog = (dispatchItem?: Dispatch) => {
    setEditMode(!!dispatchItem);
    setForm(dispatchItem ? { ...dispatchItem, date: dispatchItem.date ? dispatchItem.date.slice(0, 10) : '' } : initialForm);
    setFilePreview(
      dispatchItem && dispatchItem.image
        ? typeof dispatchItem.image === 'string'
          ? `/uploads/dispatch_receive/${dispatchItem.image}`
          : null
        : null
    );
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setForm(initialForm);
    setFilePreview(null);
  };
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      setFilePreview(URL.createObjectURL(file));
    }
  };
  const handleSave = async () => {
    try {
      setLoading(true);
      if (editMode && form._id) {
        await apiService.updateDispatch(form._id, form);
        setSnackbar({ open: true, message: 'Dispatch updated successfully', severity: 'success' });
      } else {
        await apiService.createDispatch(form);
        setSnackbar({ open: true, message: 'Dispatch created successfully', severity: 'success' });
      }
      handleCloseDialog();
      fetchDispatches();
    } catch (e: any) {
      setSnackbar({ open: true, message: e.message || 'Failed to save', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    if (!deleteTarget || !deleteTarget._id) return;
    try {
      setLoading(true);
      await apiService.deleteDispatch(deleteTarget._id);
      setSnackbar({ open: true, message: 'Dispatch deleted', severity: 'success' });
      setDeleteDialogOpen(false);
      fetchDispatches();
    } catch (e: any) {
      setSnackbar({ open: true, message: e.message || 'Failed to delete', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };
  const handleDownload = async (dispatchItem: Dispatch) => {
    if (!dispatchItem._id) return;
    try {
      const res = await apiService.downloadDispatchFile(dispatchItem._id);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', typeof dispatchItem.image === 'string' ? dispatchItem.image : 'file');
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (e: any) {
      setSnackbar({ open: true, message: e.message || 'Download failed', severity: 'error' });
    }
  };
  const handleOpenDetails = (dispatchItem: Dispatch) => {
    setSelectedDispatch(dispatchItem);
    setDetailsDialogOpen(true);
  };
  const handleCloseDetails = () => {
    setSelectedDispatch(null);
    setDetailsDialogOpen(false);
  };
  const filteredDispatches = dispatches.filter((d) =>
    d.reference_no.toLowerCase().includes(search.toLowerCase()) ||
    d.to_title.toLowerCase().includes(search.toLowerCase()) ||
    d.from_title.toLowerCase().includes(search.toLowerCase()) ||
    d.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Postal Dispatch</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>Add Dispatch</Button>
      </Stack>
      <TextField
        label="Search"
        value={search}
        onChange={e => setSearch(e.target.value)}
        variant="outlined"
        size="small"
        sx={{ mb: 2, width: 300 }}
      />
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Paper sx={{ width: '100%', overflowX: 'auto' }}>
          <Box component="table" width="100%" sx={{ borderCollapse: 'collapse' }}>
            <Box component="thead" sx={{ background: '#f5f5f5' }}>
              <Box component="tr">
                <Box component="th" sx={{ p: 1, border: '1px solid #eee' }}>Ref No</Box>
                <Box component="th" sx={{ p: 1, border: '1px solid #eee' }}>To</Box>
                <Box component="th" sx={{ p: 1, border: '1px solid #eee' }}>From</Box>
                <Box component="th" sx={{ p: 1, border: '1px solid #eee' }}>Address</Box>
                <Box component="th" sx={{ p: 1, border: '1px solid #eee' }}>Date</Box>
                <Box component="th" sx={{ p: 1, border: '1px solid #eee' }}>Image</Box>
                <Box component="th" sx={{ p: 1, border: '1px solid #eee' }}>Actions</Box>
              </Box>
            </Box>
            <Box component="tbody">
              {filteredDispatches.map((d) => (
                <Box component="tr" key={d._id}>
                  <Box component="td" sx={{ p: 1, border: '1px solid #eee' }}>{d.reference_no}</Box>
                  <Box component="td" sx={{ p: 1, border: '1px solid #eee' }}>{d.to_title}</Box>
                  <Box component="td" sx={{ p: 1, border: '1px solid #eee' }}>{d.from_title}</Box>
                  <Box component="td" sx={{ p: 1, border: '1px solid #eee' }}>{d.address}</Box>
                  <Box component="td" sx={{ p: 1, border: '1px solid #eee' }}>{d.date ? d.date.slice(0, 10) : ''}</Box>
                  <Box component="td" sx={{ p: 1, border: '1px solid #eee' }}>
                    {d.image ? (
                      <Tooltip title="Download/View">
                        <IconButton onClick={() => handleDownload(d)} size="small">
                          <DownloadIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Typography variant="body2" color="text.secondary">No File</Typography>
                    )}
                  </Box>
                  <Box component="td" sx={{ p: 1, border: '1px solid #eee' }}>
                    <Tooltip title="View Details"><IconButton onClick={() => handleOpenDetails(d)}><VisibilityIcon /></IconButton></Tooltip>
                    <Tooltip title="Edit"><IconButton onClick={() => handleOpenDialog(d)}><EditIcon /></IconButton></Tooltip>
                    <Tooltip title="Delete"><IconButton color="error" onClick={() => { setDeleteTarget(d); setDeleteDialogOpen(true); }}><DeleteIcon /></IconButton></Tooltip>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>
      )}
      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? 'Edit Dispatch' : 'Add Dispatch'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Reference No" name="reference_no" value={form.reference_no} onChange={handleFormChange} required fullWidth />
            <TextField label="To Title" name="to_title" value={form.to_title} onChange={handleFormChange} required fullWidth />
            <TextField label="From Title" name="from_title" value={form.from_title} onChange={handleFormChange} required fullWidth />
            <TextField label="Address" name="address" value={form.address} onChange={handleFormChange} required fullWidth />
            <TextField label="Date" name="date" type="date" value={form.date} onChange={handleFormChange} required fullWidth InputLabelProps={{ shrink: true }} />
            <TextField label="Note" name="note" value={form.note || ''} onChange={handleFormChange} fullWidth multiline minRows={2} />
            <Box>
              <Button variant="outlined" component="label">
                Upload File
                <input type="file" hidden accept="image/*,application/pdf" onChange={handleImageChange} />
              </Button>
              {filePreview && (
                <Box mt={1}><img src={filePreview} alt="Preview" style={{ maxHeight: 80 }} /></Box>
              )}
              {form.image && form.image instanceof File && (
                <Box mt={1}><img src={URL.createObjectURL(form.image)} alt="Preview" style={{ maxHeight: 80 }} /></Box>
              )}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>{editMode ? 'Save Changes' : 'Add Dispatch'}</Button>
        </DialogActions>
      </Dialog>
      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Dispatch</DialogTitle>
        <DialogContent>Are you sure you want to delete this dispatch?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
      {/* Details Dialog */}
      <Dialog open={detailsDialogOpen} onClose={handleCloseDetails} maxWidth="sm" fullWidth>
        <DialogTitle>Dispatch Details</DialogTitle>
        <DialogContent>
          {selectedDispatch && (
            <Stack spacing={2} mt={1}>
              <Typography><b>Reference No:</b> {selectedDispatch.reference_no}</Typography>
              <Typography><b>To Title:</b> {selectedDispatch.to_title}</Typography>
              <Typography><b>From Title:</b> {selectedDispatch.from_title}</Typography>
              <Typography><b>Address:</b> {selectedDispatch.address}</Typography>
              <Typography><b>Date:</b> {selectedDispatch.date ? selectedDispatch.date.slice(0, 10) : ''}</Typography>
              <Typography><b>Note:</b> {selectedDispatch.note}</Typography>
              {selectedDispatch.image && typeof selectedDispatch.image === 'string' && (
                <Box>
                  <Typography><b>File:</b></Typography>
                  <img src={`/uploads/dispatch_receive/${selectedDispatch.image}`} alt="Dispatch File" style={{ maxHeight: 120 }} />
                  <Button startIcon={<DownloadIcon />} onClick={() => handleDownload(selectedDispatch)} sx={{ mt: 1 }}>Download</Button>
                </Box>
              )}
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>Close</Button>
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

export default DispatchPage;
