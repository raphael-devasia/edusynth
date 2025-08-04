import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Snackbar, Alert, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { apiService } from '../../services/api';

interface StaffAttendanceTabProps {
  staffId: string;
}

interface AttendanceRecord {
  _id: string;
  date: string;
  status: string;
  remark?: string;
}

const StaffAttendanceTab: React.FC<StaffAttendanceTabProps> = ({ staffId }) => {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{open: boolean, message: string, severity: 'success'|'error'}>({open: false, message: '', severity: 'success'});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AttendanceRecord | null>(null);
  const [form, setForm] = useState<{date: string, status: string, remark: string}>({ date: '', status: '', remark: '' });
  const [formLoading, setFormLoading] = useState(false);

  const statusOptions = ["Present", "Absent", "Leave", "Half Day", "Late"];


  const fetchAttendance = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getStaffAttendance({ staff_id: staffId });
      setAttendance(data as AttendanceRecord[]);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch attendance');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
    // eslint-disable-next-line
  }, [staffId]);

  const handleDelete = async (id: string) => {
    try {
      await apiService.deleteStaffAttendance(id);
      setSnackbar({open:true,message:'Attendance record deleted',severity:'success'});
      setAttendance(a => a.filter(r => r._id !== id));
    } catch (e: any) {
      setSnackbar({open:true,message:e.message||'Delete failed',severity:'error'});
    }
  };

  const columns: GridColDef[] = [
  { field: 'date', headerName: 'Date', width: 140, valueGetter: p => p.value ? new Date(p.value).toLocaleDateString() : '' },
  { field: 'status', headerName: 'Status', width: 120 },
  { field: 'remark', headerName: 'Remark', width: 220 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 120,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Box display="flex" gap={1}>
        <IconButton color="primary" size="small" onClick={() => handleEdit(params.row)}>
          <span className="material-icons">edit</span>
        </IconButton>
        <IconButton color="error" size="small" onClick={() => handleDelete(params.row._id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
  },
];

  const handleEdit = (row: AttendanceRecord) => {
  setEditing(row);
  setForm({
    date: row.date ? row.date.substring(0, 10) : '',
    status: row.status || '',
    remark: row.remark || '',
  });
  setDialogOpen(true);
};

const handleDialogClose = () => {
  setDialogOpen(false);
  setEditing(null);
  setForm({ date: '', status: '', remark: '' });
};

const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setForm((f) => ({ ...f, [name]: value }));
};

const handleFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setFormLoading(true);
  try {
    if (editing) {
      await apiService.updateStaffAttendance(editing._id, { ...form, staff_id: staffId });
      setSnackbar({open:true,message:'Attendance updated',severity:'success'});
    } else {
      await apiService.createOrUpdateStaffAttendance([{ ...form, staff_id: staffId }]);
      setSnackbar({open:true,message:'Attendance added',severity:'success'});
    }
    fetchAttendance();
    handleDialogClose();
  } catch (e: any) {
    setSnackbar({open:true,message:e.message||'Save failed',severity:'error'});
  } finally {
    setFormLoading(false);
  }
};

return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
  <Typography variant="h6">Attendance</Typography>
  <Box>
    <Button variant="contained" size="small" onClick={() => { setDialogOpen(true); setEditing(null); }}>Add Attendance</Button>
  </Box>
</Box>
{loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : attendance.length === 0 ? (
        <Typography color="text.secondary">No attendance records found.</Typography>
      ) : (
        <DataGrid
          autoHeight
          rows={attendance}
          columns={columns}
          getRowId={row => row._id}
          pageSizeOptions={[5, 10, 20]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          disableRowSelectionOnClick
        />
      )}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar(s => ({...s, open: false}))}>
        <Alert onClose={() => setSnackbar(s => ({...s, open: false}))} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      {/* Add/Edit Attendance Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="xs" fullWidth>
        <DialogTitle>{editing ? 'Edit Attendance' : 'Add Attendance'}</DialogTitle>
        <form onSubmit={handleFormSubmit}>
          <DialogContent>
            <Stack spacing={2} mt={1}>
              <TextField
                label="Date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleFormChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
              <TextField
                label="Status"
                name="status"
                select
                value={form.status}
                onChange={handleFormChange}
                fullWidth
                required
                SelectProps={{ native: true }}
              >
                <option value="">Select status</option>
                {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </TextField>
              <TextField
                label="Remark"
                name="remark"
                value={form.remark}
                onChange={handleFormChange}
                fullWidth
                multiline
                minRows={2}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} disabled={formLoading}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={formLoading || !form.date || !form.status}>
              {formLoading ? <CircularProgress size={22} /> : (editing ? 'Update' : 'Add')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default StaffAttendanceTab;
