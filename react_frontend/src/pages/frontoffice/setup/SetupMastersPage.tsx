import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Snackbar, Switch, FormControlLabel } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { Purpose, ComplaintType, Source, Reference } from '../../../types/setupMasters';
import apiService from '../../../services/api';

// --- Generic CRUD Tab Component ---
type MasterTabProps<T> = {
  label: string;
  endpoint: string;
  fields: { name: keyof T; label: string; type?: string; required?: boolean; render?: (row: T) => React.ReactNode }[];
  initialForm: T;
  extraForm?: React.ReactNode;
  switchField?: keyof T; // for boolean toggle (e.g. is_active)
};

function MasterTab<T extends { _id?: string }>({ label, endpoint, fields, initialForm, extraForm, switchField }: MasterTabProps<T>) {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<T>(initialForm);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchRows = async () => {
    setLoading(true);
    try {
      const res: any = await apiService.get(endpoint);
      setRows(Array.isArray(res.data) ? res.data : []);
    } catch (err: any) {
      setSnackbar({ open: true, message: err.message || `Failed to fetch ${label}`, severity: 'error' });
    }
    setLoading(false);
  };

  useEffect(() => { fetchRows(); }, []);

  const handleOpen = (row?: T) => {
    setEditId(row?._id || null);
    setForm(row ? { ...row } : initialForm);
    setOpen(true);
  };
  const handleClose = () => { setOpen(false); setForm(initialForm); setEditId(null); };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value } as T);
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await apiService.put(`${endpoint.replace(/\/$/, '')}/${editId}`, form);
        setSnackbar({ open: true, message: 'Updated successfully', severity: 'success' });
      } else {
        await apiService.post(endpoint, form);
        setSnackbar({ open: true, message: 'Added successfully', severity: 'success' });
      }
      fetchRows();
      handleClose();
    } catch (err: any) {
      setSnackbar({ open: true, message: err.message || 'Save failed', severity: 'error' });
    }
  };
  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this record?')) return;
    try {
      await apiService.delete(`${endpoint.replace(/\/$/, '')}/${id}`);
      setSnackbar({ open: true, message: 'Deleted successfully', severity: 'success' });
      fetchRows();
    } catch (err: any) {
      setSnackbar({ open: true, message: err.message || 'Delete failed', severity: 'error' });
    }
  };
  return (
    <Box mt={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h3>{label}</h3>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>Add</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {fields.map(f => <TableCell key={String(f.name)}>{f.label}</TableCell>)}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rows || []).map((row) => (
              <TableRow key={row._id}>
                {fields.map(f => <TableCell key={String(f.name)}>{f.render ? f.render(row) : (row[f.name] as any)}</TableCell>)}
                <TableCell>
                  <IconButton onClick={() => handleOpen(row)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(row._id!)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editId ? `Edit ${label}` : `Add ${label}`}</DialogTitle>
        <DialogContent>
          {fields.map(f => (
            <TextField
              key={String(f.name)}
              margin="dense"
              label={f.label}
              name={String(f.name)}
              value={form[f.name] ?? ''}
              onChange={handleChange}
              fullWidth
              required={!!f.required}
              type={f.type || 'text'}
            />
          ))}
          {switchField && (
            <FormControlLabel
              control={<Switch checked={Boolean(form[switchField])} onChange={e => setForm({ ...form, [switchField]: e.target.checked } as T)} />}
              label="Active"
            />
          )}
          {extraForm}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">{editId ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} message={snackbar.message} />
    </Box>
  );
}

const tabList = [
  {
    label: 'Purpose',
    component: <MasterTab<Purpose>
      label="Purpose"
      endpoint="/visitorspurpose"
      initialForm={{ visitors_purpose: '', description: '' }}
      fields={[
        { name: 'visitors_purpose', label: 'Purpose', required: true },
        { name: 'description', label: 'Description' },
      ]}
    />
  },
  {
    label: 'Complaint Type',
    component: <MasterTab<ComplaintType>
      label="Complaint Type"
      endpoint="/complainttype"
      initialForm={{ name: '', description: '' }}
      fields={[
        { name: 'name', label: 'Type', required: true },
        { name: 'description', label: 'Description' },
      ]}
    />
  },
  {
    label: 'Source',
    component: <MasterTab<Source>
      label="Source"
      endpoint="/source"
      initialForm={{ source: '', description: '' }}
      fields={[
        { name: 'source', label: 'Source', required: true },
        { name: 'description', label: 'Description', required: true },
      ]}
    />
  },
  {
    label: 'Reference',
    component: <MasterTab<Reference>
      label="Reference"
      endpoint="/reference"
      initialForm={{ name: '', description: '', is_active: true }}
      fields={[
        { name: 'name', label: 'Reference', required: true },
        { name: 'description', label: 'Description' },
      ]}
      switchField="is_active"
    />
  },
];

const SetupMastersPage: React.FC = () => {
  const [tab, setTab] = useState(0);
  return (
    <Paper sx={{ p: 2 }}>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" scrollButtons="auto">
        {tabList.map((t, i) => <Tab key={t.label} label={t.label} />)}
      </Tabs>
      <Box mt={2}>{tabList[tab].component}</Box>
    </Paper>
  );
};

export default SetupMastersPage;
