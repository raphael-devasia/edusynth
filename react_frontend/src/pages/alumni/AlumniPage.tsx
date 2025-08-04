import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography, Button, TextField, Paper, CircularProgress, Alert, Snackbar, IconButton } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const AlumniPage: React.FC = () => {
  const [alumni, setAlumni] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string|null>(null);
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<any|null>(null);
  const [form, setForm] = React.useState({ alumni_no: '', name: '', batch: '', contact: '', status: 'Active' });
  const [actionLoading, setActionLoading] = React.useState(false);
  const [actionError, setActionError] = React.useState<string|null>(null);
  const [search, setSearch] = React.useState('');
  const [snackbar, setSnackbar] = React.useState<{open: boolean, message: string, severity: 'success'|'error'}>({open: false, message: '', severity: 'success'});
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [paginationModel, setPaginationModel] = React.useState({ page: 0, pageSize: 10 });

  React.useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('/api/alumni').then(r=>r.json()).then(data=>{
      setAlumni(data);
      setLoading(false);
    }).catch(e=>{
      setError(e.message||'Failed to fetch alumni');
      setLoading(false);
    });
  }, []);

  function getFilteredAlumni() {
    return alumni.filter((a:any) => {
      const q = search.toLowerCase();
      return !search ||
        a.alumni_no?.toLowerCase().includes(q) ||
        a.name?.toLowerCase().includes(q) ||
        a.batch?.toLowerCase().includes(q) ||
        a.contact?.toLowerCase().includes(q) ||
        a.status?.toLowerCase().includes(q);
    });
  }

  const columns = [
    { field: 'alumni_no', headerName: 'Alumni No', width: 120 },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'batch', headerName: 'Batch', width: 120 },
    { field: 'contact', headerName: 'Contact', width: 150 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'actions', headerName: 'Actions', width: 160, sortable: false, renderCell: (params:any) => (
        <>
          <Button size="small" onClick={()=>{setSelected(params.row);setEditOpen(true);setForm(params.row);}}>Edit</Button>
          <Button size="small" color="error" onClick={async()=>{
            setActionLoading(true);
            try {
              await fetch(`/api/alumni/${params.row._id}`, {method:'DELETE'});
              setAlumni(alumni=>alumni.filter(a=>a._id!==params.row._id));
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
            Alumni Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage alumni records and maintain connections with former students
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} size="large" onClick={()=>{setForm({ alumni_no: '', name: '', batch: '', contact: '', status: 'Active' }); setOpen(true);}}>
          Add Alumni
        </Button>
      </Box>
      <Box mb={2}>
        <Button variant="outlined" sx={{mr:2}} onClick={() => {
          const filtered = getFilteredAlumni();
          const csv = [
            ['Alumni No', 'Name', 'Batch', 'Contact', 'Status'],
            ...filtered.map((a:any)=>[a.alumni_no,a.name,a.batch,a.contact,a.status])
          ].map(row=>row.map((v:any)=>`"${(v||'').toString().replace(/"/g,'""')}"`).join(',')).join('\n');
          const blob = new Blob([csv], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'alumni.csv';
          a.click();
        }}>Export CSV</Button>
        <Button variant="outlined" color="error" disabled={selectedRows.length===0} onClick={async()=>{
          setActionLoading(true);
          try {
            for(const id of selectedRows) await fetch(`/api/alumni/${id}`,{method:'DELETE'});
            setAlumni(alumni=>alumni.filter(a=>!selectedRows.includes(a._id)));
            setSelectedRows([]);
            setSnackbar({open:true,message:'Bulk delete successful',severity:'success'});
          } catch(e:any) {
            setSnackbar({open:true,message:e.message||'Bulk delete failed',severity:'error'});
          } finally {
            setActionLoading(false);
          }
        }}>Bulk Delete</Button>
        <TextField size="small" variant="outlined" placeholder="Search..." value={search} onChange={(e: any)=>setSearch(e.target.value)} sx={{ minWidth: 220, ml:2 }} />
      </Box>
      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={300}><CircularProgress /></Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <div style={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={getFilteredAlumni().map((a: any, idx: number)=>({id:a._id||idx,...a}))}
              columns={columns}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[10,20,50]}
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={(ids: any) => setSelectedRows(ids as string[])}
              autoHeight
            />
            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={()=>setSnackbar(s=>({...s,open:false}))} anchorOrigin={{vertical:'bottom',horizontal:'center'}} message={snackbar.message}
              action={<IconButton color="inherit" onClick={()=>setSnackbar(s=>({...s,open:false}))}><CloseIcon /></IconButton>} />
          </div>
        )}
      </Paper>
      {/* Add/Edit Alumni Dialog */}
      <Dialog open={open||editOpen} onClose={()=>{setOpen(false);setEditOpen(false);}}>
        <DialogTitle>{editOpen ? 'Edit Alumni' : 'Add Alumni'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Alumni No" name="alumni_no" value={form.alumni_no} onChange={e=>setForm(f=>({...f,alumni_no:e.target.value}))} fullWidth required />
            <TextField label="Name" name="name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} fullWidth required />
            <TextField label="Batch" name="batch" value={form.batch} onChange={e=>setForm(f=>({...f,batch:e.target.value}))} fullWidth required />
            <TextField label="Contact" name="contact" value={form.contact} onChange={e=>setForm(f=>({...f,contact:e.target.value}))} fullWidth required />
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
                await fetch(`/api/alumni/${selected._id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
                setSnackbar({open:true,message:'Alumni updated',severity:'success'});
              } else {
                const res = await fetch('/api/alumni',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
                const newAlumni = await res.json();
                setAlumni(alms=>[...alms,newAlumni]);
                setSnackbar({open:true,message:'Alumni added',severity:'success'});
              }
              setOpen(false); setEditOpen(false);
            } catch(e:any) {
              setActionError(e.message||'Save failed');
            } finally {
              setActionLoading(false);
            }
          }} disabled={actionLoading || !form.alumni_no || !form.name || !form.batch || !form.contact || !form.status}>
            {actionLoading ? <CircularProgress size={20} /> : (editOpen ? 'Save' : 'Add')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AlumniPage;
