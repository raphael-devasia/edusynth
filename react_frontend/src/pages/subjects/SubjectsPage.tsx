import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Paper, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, Snackbar, IconButton, MenuItem, Toolbar, Tooltip, Checkbox, FormControlLabel } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Download as DownloadIcon, FilterList as FilterListIcon, Close as CloseIcon, Person as PersonIcon } from '@mui/icons-material';
import { DataGrid, GridColDef, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';

// columns moved inside SubjectsPage for access to handlers


const SubjectsPage: React.FC = () => {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<any|null>(null);
  // Add subject form fields
  const [form, setForm] = useState({ code: '', name: '', description: '', teachers: [] as string[] });
  const [editForm, setEditForm] = useState({ code: '', name: '', description: '', teachers: [] as string[] });
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string|null>(null);
  const [search, setSearch] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [snackbar, setSnackbar] = useState<{open: boolean, message: string, severity: 'success'|'error'}>({open: false, message: '', severity: 'success'});
  const [filterTeachers, setFilterTeachers] = useState<string>('');
  const [showOnlyWithTeachers, setShowOnlyWithTeachers] = useState(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  // Mock teacher list
  const teachers = [
    { id: 't1', name: 'Alice Smith' },
    { id: 't2', name: 'Bob Johnson' },
    { id: 't3', name: 'Carol Williams' },
    { id: 't4', name: 'David Brown' },
  ];

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/subjects');
      setSubjects(res.data as any[]);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch subjects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleEdit = (subject: any) => {
    setSelectedSubject(subject);
    setEditForm({ code: subject.code, name: subject.name, description: subject.description, teachers: subject.teachers || [] });
    setEditOpen(true);
    setActionError(null);
  };

  const handleDelete = (subject: any) => {
    setSelectedSubject(subject);
    setDeleteOpen(true);
    setActionError(null);
  };

  // Filtering helper
  function getFilteredSubjects(): any[] {
    return subjects.filter((s: any) => {
      const matchesSearch =
        !search ||
        s.code?.toLowerCase().includes(search.toLowerCase()) ||
        s.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.description?.toLowerCase().includes(search.toLowerCase());
      const matchesTeacher =
        !filterTeachers || (Array.isArray(s.teachers) && s.teachers.includes(filterTeachers));
      const matchesWithTeachers = !showOnlyWithTeachers || (Array.isArray(s.teachers) && s.teachers.length > 0);
      return matchesSearch && matchesTeacher && matchesWithTeachers;
    });
  }

  // columns defined inside component for handler access
  const columns: GridColDef[] = [
    { field: 'code', headerName: 'Code', width: 120 },
    { field: 'name', headerName: 'Name', width: 220 },
    { field: 'description', headerName: 'Description', width: 200 },
    {
      field: 'teachers',
      headerName: 'Teachers',
      width: 200,
      renderCell: (params) => (
        <Box>
          {params.value && params.value.length > 0
            ? params.value.map((tid: string) => {
                const t = teachers.find(tt => tt.id === tid);
                return t ? (
                  <Tooltip title={t.name} key={tid}><PersonIcon sx={{ fontSize: 18, mr: 0.5 }}/></Tooltip>
                ) : null;
              })
            : <Typography variant="caption" color="text.secondary">None</Typography>}
        </Box>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box>
          <Button size="small" onClick={() => handleEdit(params.row)} sx={{ mr: 1 }} variant="outlined">Edit</Button>
          <Button size="small" onClick={() => handleDelete(params.row)} color="error" variant="outlined">Delete</Button>
        </Box>
      )
    }
  ];

  return (
    <Box>
      <Toolbar sx={{ pl: 0, pr: 0, mb: 2 }}>
        <TextField size="small" variant="outlined" placeholder="Search subjects..." value={search} onChange={e => setSearch(e.target.value)} sx={{ mr: 2, minWidth: 220 }} />
        <TextField select size="small" label="Filter by Teacher" value={filterTeachers} onChange={e => setFilterTeachers(e.target.value)} sx={{ mr: 2, minWidth: 180 }}>
          <MenuItem value="">All</MenuItem>
          {teachers.map(t => <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>)}
        </TextField>
        <FormControlLabel control={<Checkbox checked={showOnlyWithTeachers} onChange={e => setShowOnlyWithTeachers(e.target.checked)} />} label="Only with teachers" sx={{ mr: 2 }} />
        <Tooltip title="Export CSV"><span><IconButton color="primary" onClick={() => {
          const filtered = getFilteredSubjects();
          const csv = [
            ['Code', 'Name', 'Description', 'Teachers'],
            ...filtered.map(s => [s.code, s.name, s.description, (s.teachers||[]).map((tid:string) => (teachers.find(t=>t.id===tid)?.name)).join('; ')])
          ].map(row => row.map(v => `"${(v||'').toString().replace(/"/g,'""')}"`).join(',')).join('\n');
          const blob = new Blob([csv], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'subjects.csv';
          a.click();
          setSnackbar({open:true,message:'Exported to CSV',severity:'success'});
        }}><DownloadIcon /></IconButton></span></Tooltip>
        <Tooltip title="Bulk Delete"><span><IconButton color="error" disabled={selectedRows.length===0} onClick={async()=>{
          setActionLoading(true);
          try {
            for(const id of selectedRows) await axios.delete(`/api/subjects/${id}`);
            await fetchSubjects();
            setSelectedRows([]);
            setSnackbar({open:true,message:'Deleted selected subjects',severity:'success'});
          } catch(e:any) {
            setSnackbar({open:true,message:e.message||'Bulk delete failed',severity:'error'});
          } finally { setActionLoading(false); }
        }}><DeleteIcon /></IconButton></span></Tooltip>
      </Toolbar>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Subjects Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage academic subjects and curriculum structure
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} size="large" onClick={() => setOpen(true)}>
          Add Subject
        </Button>
      </Box>
      <Paper sx={{ p: 2 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={300}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <DataGrid
            rows={getFilteredSubjects().map((s, idx) => ({ id: s._id || idx, ...s }))}
            columns={columns}
            autoHeight
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[10, 20, 50]}
            disableRowSelectionOnClick
            checkboxSelection
            onRowSelectionModelChange={ids => setSelectedRows(ids as string[])}
          />
        )}
      </Paper>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Subject</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Code" name="code" value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} fullWidth required />
            <TextField label="Name" name="name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} fullWidth required />
            <TextField label="Description" name="description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} fullWidth multiline rows={2} />
            <TextField select label="Assign Teachers" name="teachers" value={form.teachers} onChange={e => setForm(f => ({ ...f, teachers: Array.isArray(e.target.value) ? e.target.value : [e.target.value] }))} fullWidth SelectProps={{ multiple: true }}>
              {teachers.map(t => <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>)}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={async () => {
            if (!form.code.trim() || !form.name.trim()) return;
            setLoading(true);
            setError(null);
            try {
              await axios.post('/api/subjects', form);
              // Refresh subjects
              const res = await axios.get('/api/subjects');
              setSubjects(res.data as any[]);
              setOpen(false);
              setForm({ code: '', name: '', description: '', teachers: [] });
            } catch (err: any) {
              setError(err.response?.data?.message || err.message || 'Failed to add subject');
            } finally {
              setLoading(false);
            }
          }} disabled={loading || !form.code.trim() || !form.name.trim()}>
            {loading ? <CircularProgress size={20} /> : 'Add'}
          </Button>
        </DialogActions>
        {error && <Box mt={2}><Alert severity="error">{error}</Alert></Box>}
      </Dialog>

      {/* Edit Subject Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Subject</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Code" name="code" value={editForm.code} onChange={e => setEditForm(f => ({ ...f, code: e.target.value }))} fullWidth required />
            <TextField label="Name" name="name" value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} fullWidth required />
            <TextField label="Description" name="description" value={editForm.description} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))} fullWidth multiline rows={2} />
            <TextField select label="Assign Teachers" name="teachers" value={editForm.teachers} onChange={e => setEditForm(f => ({ ...f, teachers: Array.isArray(e.target.value) ? e.target.value : [e.target.value] }))} fullWidth SelectProps={{ multiple: true }}>
              {teachers.map(t => <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>)}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={async () => {
            if (!selectedSubject) return;
            setActionLoading(true);
            setActionError(null);
            try {
              await axios.put(`/api/subjects/${selectedSubject._id}`, editForm);
              await fetchSubjects();
              setEditOpen(false);
            } catch (err: any) {
              setActionError(err.response?.data?.message || err.message || 'Failed to update subject');
            } finally {
              setActionLoading(false);
            }
          }} disabled={actionLoading || !editForm.code.trim() || !editForm.name.trim()}>
            {actionLoading ? <CircularProgress size={20} /> : 'Save'}
          </Button>
        </DialogActions>
        {actionError && <Box mt={2}><Alert severity="error">{actionError}</Alert></Box>}
      </Dialog>

      {/* Delete Subject Dialog */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Delete Subject</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete subject <b>{selectedSubject?.name}</b>?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={async () => {
            if (!selectedSubject) return;
            setActionLoading(true);
            setActionError(null);
            try {
              await axios.delete(`/api/subjects/${selectedSubject._id}`);
              await fetchSubjects();
              setDeleteOpen(false);
            } catch (err: any) {
              setActionError(err.response?.data?.message || err.message || 'Failed to delete subject');
            } finally {
              setActionLoading(false);
            }
          }} disabled={actionLoading}>
            {actionLoading ? <CircularProgress size={20} /> : 'Delete'}
          </Button>
        </DialogActions>
        {actionError && <Box mt={2}><Alert severity="error">{actionError}</Alert></Box>}
      </Dialog>
    </Box>
  );
};

export default SubjectsPage;
