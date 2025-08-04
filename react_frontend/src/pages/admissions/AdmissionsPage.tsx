import React from 'react';
import { Box, Typography, Button, Paper, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, Snackbar, IconButton } from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import {
  fetchApplications,
  createApplication,
  updateApplication,
  deleteApplication,
  clearError
} from '../../features/admissions/admissionsSlice';

import { AppDispatch } from '../../store';

const AdmissionsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { applications: admissions, isLoading, error } = useSelector((state: RootState) => state.admissions); // Correct: matches admissionsSlice
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<any|null>(null);
  const [form, setForm] = React.useState({ admission_no: '', name: '', class: '', section: '', status: 'Pending' });
  const [actionLoading, setActionLoading] = React.useState(false);
  const [actionError, setActionError] = React.useState<string|null>(null);
  const [search, setSearch] = React.useState('');
  const [snackbar, setSnackbar] = React.useState<{open: boolean, message: string, severity: 'success'|'error'}>({open: false, message: '', severity: 'success'});
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [paginationModel, setPaginationModel] = React.useState({ page: 0, pageSize: 10 });

  React.useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  function getFilteredAdmissions() {
    return admissions.filter((a:any) => {
      const q = search.toLowerCase();
      return !search ||
        a.admission_no?.toLowerCase().includes(q) ||
        a.name?.toLowerCase().includes(q) ||
        a.class?.toLowerCase().includes(q) ||
        a.section?.toLowerCase().includes(q) ||
        a.status?.toLowerCase().includes(q);
    });
  }

  const columns = [
    { field: 'admission_no', headerName: 'Admission No', width: 120 },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'class', headerName: 'Class', width: 100 },
    { field: 'section', headerName: 'Section', width: 100 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'actions', headerName: 'Actions', width: 160, sortable: false, renderCell: (params:any) => (
        <>
          <Button size="small" onClick={()=>{setSelected(params.row);setEditOpen(true);setForm(params.row);}}>Edit</Button>
          <Button size="small" color="error" onClick={async()=>{
            setActionLoading(true);
            try {
              await dispatch(deleteApplication(params.row._id) as any);
              setSnackbar({open:true,message:'Deleted',severity:'success'});
            } catch(e:any) {
              setSnackbar({open:true,message:e.message||'Delete failed',severity:'error'});
            } finally {
              setActionLoading(false);
            }
          }}>Delete</Button>
        </>
      )
    }
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Admissions Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage student admissions, applications, and enrollment process
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} size="large" onClick={()=>{setForm({ admission_no: '', name: '', class: '', section: '', status: 'Pending' }); setOpen(true);}}>
          New Application
        </Button>
      </Box>
      <Box mb={2}>
        <Button variant="outlined" sx={{mr:2}} onClick={()=>{
          const filtered = getFilteredAdmissions();
          const csv = [
            ['Admission No', 'Name', 'Class', 'Section', 'Status'],
            ...filtered.map((a:any)=>[a.admission_no,a.name,a.class,a.section,a.status])
          ].map(row=>row.map((v:any)=>`"${(v||'').toString().replace(/"/g,'""')}"`).join(',')).join('\n');
          const blob = new Blob([csv], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'admissions.csv';
          a.click();
        }}>Export CSV</Button>
        <Button variant="outlined" color="error" disabled={selectedRows.length===0} onClick={async()=>{
          setActionLoading(true);
          try {
            for(const id of selectedRows) await fetch(`/api/admissions/${id}`,{method:'DELETE'});
            // setAdmissions removed: admissions state comes from Redux, not local state. Use dispatch(fetchApplications()) after delete if needed.
            setSelectedRows([]);
            setSnackbar({open:true,message:'Bulk delete successful',severity:'success'});
          } catch(e:any) {
            setSnackbar({open:true,message:e.message||'Bulk delete failed',severity:'error'});
          } finally {
            setActionLoading(false);
          }
        }}>Bulk Delete</Button>
        <TextField size="small" variant="outlined" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} sx={{ minWidth: 220, ml:2 }} />
      </Box>
      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={300}><CircularProgress /></Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <div style={{ height: 500, width: '100%' }}>
            
            <DataGrid
              rows={getFilteredAdmissions().map((a:any,idx:number)=>({id:a._id||idx,...a}))}
              columns={columns}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[10,20,50]}
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={ids=>setSelectedRows(ids as string[])}
              autoHeight
            />
            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={()=>setSnackbar(s=>({...s,open:false}))} anchorOrigin={{vertical:'bottom',horizontal:'center'}} message={snackbar.message}
              action={<IconButton color="inherit" onClick={()=>setSnackbar(s=>({...s,open:false}))}><CloseIcon /></IconButton>} />
          </div>
        )}
      </Paper>
      {/* Add/Edit Admission Dialog */}
      <Dialog open={open||editOpen} onClose={()=>{setOpen(false);setEditOpen(false);}}>
        <DialogTitle>{editOpen ? 'Edit Admission' : 'Add Admission'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Admission No" name="admission_no" value={form.admission_no} onChange={e=>setForm(f=>({...f,admission_no:e.target.value}))} fullWidth required />
            <TextField label="Name" name="name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} fullWidth required />
            <TextField label="Class" name="class" value={form.class} onChange={e=>setForm(f=>({...f,class:e.target.value}))} fullWidth required />
            <TextField label="Section" name="section" value={form.section} onChange={e=>setForm(f=>({...f,section:e.target.value}))} fullWidth required />
            <TextField label="Status" name="status" value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))} fullWidth required />
            {actionError && <Alert severity="error">{actionError}</Alert>}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setOpen(false);setEditOpen(false);}}>Cancel</Button>
          <Button variant="contained" onClick={async()=>{
            setActionLoading(true);
            setActionError(null);
            try {
              if(editOpen && selected) {
                await dispatch(updateApplication({ id: selected._id, data: form }) as any);
                setSnackbar({open:true,message:'Admission updated',severity:'success'});
              } else {
                await dispatch(createApplication(form) as any);
                setSnackbar({open:true,message:'Admission added',severity:'success'});
              }
              setOpen(false); setEditOpen(false);
            } catch(e:any) {
              setActionError(e.message||'Save failed');
            } finally {
              setActionLoading(false);
            }
          }} disabled={actionLoading || !form.admission_no || !form.name || !form.class || !form.section || !form.status}>
            {actionLoading ? <CircularProgress size={20} /> : (editOpen ? 'Save' : 'Add')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdmissionsPage;
