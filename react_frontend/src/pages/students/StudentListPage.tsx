import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Button, Stack, CircularProgress, Alert, Snackbar, IconButton, TextField, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Download as DownloadIcon, Delete as DeleteIcon, Close as CloseIcon } from '@mui/icons-material';

// Example columns; these should be updated to match your Student model
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'fullname', headerName: 'Name', width: 200, valueGetter: (params) => `${params.row.firstname || ''} ${params.row.middlename || ''} ${params.row.lastname || ''}`.trim() },
  { field: 'class_id', headerName: 'Class', width: 120 },
  { field: 'section_id', headerName: 'Section', width: 120 },
  { field: 'email', headerName: 'Email', width: 220 },
  { field: 'actions', headerName: 'Actions', width: 200, renderCell: (params) => <Button size="small" variant="contained" onClick={() => window.location.href = `/students/profile/${params.row.id}`}>View</Button> },
];

// No static rows; data will be fetched from backend

const StudentListPage: React.FC = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState({ firstname: '', middlename: '', lastname: '', email: '', class_id: '', section_id: '' });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState<string|null>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [search, setSearch] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [snackbar, setSnackbar] = useState<{open: boolean, message: string, severity: 'success'|'error'}>({open: false, message: '', severity: 'success'});

  useEffect(() => {
    setLoading(true);
    axios.get('/api/students')
      .then((res) => {
        setStudents(res.data as any[]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message || 'Failed to fetch students');
        setLoading(false);
      });
  }, []);

  function getFilteredStudents(): any[] {
    return students.filter((s: any) => {
      const q = search.toLowerCase();
      return !search ||
        s.name?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q) ||
        s.class?.toLowerCase().includes(q) ||
        s.section?.toLowerCase().includes(q);
    });
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Student List</Typography>
      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" spacing={2} mb={2}>
          <TextField size="small" variant="outlined" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} sx={{ minWidth: 220 }} />
          <Tooltip title="Export CSV"><span><IconButton color="primary" onClick={() => {
            const filtered = getFilteredStudents();
            const csv = [
              ['First Name', 'Middle Name', 'Last Name', 'Class', 'Section', 'Email'],
              ...filtered.map((s: any) => [s.firstname, s.middlename, s.lastname, s.class_id, s.section_id, s.email])
            ].map(row => row.map((v: any) => `"${(v||'').toString().replace(/"/g,'""')}"`).join(',')).join('\n');
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'students.csv';
            a.click();
            setSnackbar({open:true,message:'Exported to CSV',severity:'success'});
          }}><DownloadIcon /></IconButton></span></Tooltip>
          <Tooltip title="Bulk Delete"><span><IconButton color="error" disabled={selectedRows.length===0} onClick={async()=>{
            try {
              for(const id of selectedRows) await axios.delete(`/api/students/${id}`);
              setSnackbar({open:true,message:'Deleted selected students',severity:'success'});
              setStudents(students.filter(s => !selectedRows.includes(s._id)));
              setSelectedRows([]);
            } catch(e:any) {
              setSnackbar({open:true,message:e.message||'Bulk delete failed',severity:'error'});
            }
          }}><DeleteIcon /></IconButton></span></Tooltip>
          <Button variant="contained" color="primary" onClick={() => setAddOpen(true)}>Add Student</Button>
          <Button variant="outlined">Import</Button>
        </Stack>
        <div style={{ height: 500, width: '100%' }}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height={300}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <DataGrid
              rows={getFilteredStudents().map((s, idx) => ({ id: s._id || idx, ...s }))}
              columns={columns}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[10, 20, 50]}
              disableRowSelectionOnClick
              autoHeight
              checkboxSelection
              onRowSelectionModelChange={ids => setSelectedRows(ids as string[])}
            />
          )}
          <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={()=>setSnackbar(s=>({...s,open:false}))} anchorOrigin={{vertical:'bottom',horizontal:'center'}}
            message={snackbar.message}
            action={<IconButton color="inherit" onClick={()=>setSnackbar(s=>({...s,open:false}))}><CloseIcon /></IconButton>}
          />
        </div>
      </Paper>
    {/* Add Student Dialog */}
    <Dialog open={addOpen} onClose={()=>setAddOpen(false)}>
      <DialogTitle>Add Student</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{mt:1,minWidth:320}}>
          {addError && <Alert severity="error">{addError}</Alert>}
          <Stack direction="row" spacing={2}>
            <TextField label="First Name" name="firstname" value={addForm.firstname} onChange={e=>setAddForm(f=>({...f,firstname:e.target.value}))} required fullWidth autoFocus />
            <TextField label="Middle Name" name="middlename" value={addForm.middlename} onChange={e=>setAddForm(f=>({...f,middlename:e.target.value}))} fullWidth />
            <TextField label="Last Name" name="lastname" value={addForm.lastname} onChange={e=>setAddForm(f=>({...f,lastname:e.target.value}))} fullWidth />
          </Stack>
          <TextField label="Email" name="email" value={addForm.email} onChange={e=>setAddForm(f=>({...f,email:e.target.value}))} required fullWidth type="email" />
          <TextField label="Class" name="class_id" value={addForm.class_id} onChange={e=>setAddForm(f=>({...f,class_id:e.target.value}))} required fullWidth />
          <TextField label="Section" name="section_id" value={addForm.section_id} onChange={e=>setAddForm(f=>({...f,section_id:e.target.value}))} required fullWidth />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>setAddOpen(false)} disabled={addLoading}>Cancel</Button>
        <Button onClick={async()=>{
          setAddLoading(true);
          setAddError(null);
          try {
            const res = await axios.post('/api/students', addForm);
            setStudents(sts=>[...sts,res.data]);
            setAddOpen(false);
            setAddForm({ firstname: '', middlename: '', lastname: '', email: '', class_id: '', section_id: '' });
            setSnackbar({open:true,message:'Student added',severity:'success'});
          } catch(e:any) {
            setAddError(e.response?.data?.message || e.message || 'Failed to add student');
          } finally {
            setAddLoading(false);
          }
        }} disabled={addLoading || !addForm.firstname || !addForm.email || !addForm.class_id || !addForm.section_id} variant="contained">
          {addLoading ? <CircularProgress size={22} /> : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
    </Box>
  );
};

export default StudentListPage;
