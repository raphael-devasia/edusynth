import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Snackbar, Alert, IconButton, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { apiService } from '../../services/api';
import { StaffLeave } from '../../types';
import { StaffLeaveDialog } from './StaffLeaveDialog';
import StaffLeaveSummary from './StaffLeaveSummary';
import StaffLeaveAllotmentTab from './StaffLeaveAllotmentTab';

interface StaffLeaveTabProps {
  staffId: string;
}

const StaffLeaveTab: React.FC<StaffLeaveTabProps> = ({ staffId }) => {
  const [leaves, setLeaves] = useState<StaffLeave[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{open: boolean, message: string, severity: 'success'|'error'}>({open: false, message: '', severity: 'success'});

  // Leave dialog state (create/edit)
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLeave, setEditingLeave] = useState<StaffLeave | null>(null);
  const [dialogLoading, setDialogLoading] = useState(false);
  const [dialogError, setDialogError] = useState<string|null>(null);

  const handleOpenDialog = () => {
    setEditingLeave(null);
    setDialogOpen(true);
    setDialogError(null);
  };
  const handleEdit = (leave: StaffLeave) => {
    setEditingLeave(leave);
    setDialogOpen(true);
    setDialogError(null);
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingLeave(null);
    setDialogError(null);
  };
  const handleDialogSubmit = async (leave: Omit<StaffLeave, '_id'|'created_at'|'updated_at'|'status'>) => {
    setDialogLoading(true);
    setDialogError(null);
    try {
      if (editingLeave) {
        await apiService.updateStaffLeave(editingLeave._id, { ...leave, staff_id: staffId });
        setSnackbar({open:true,message:'Leave updated successfully',severity:'success'});
      } else {
        await apiService.createStaffLeave({ ...leave, staff_id: staffId });
        setSnackbar({open:true,message:'Leave created successfully',severity:'success'});
      }
      setDialogOpen(false);
      setEditingLeave(null);
      fetchLeaves();
    } catch (e: any) {
      setDialogError(e.message || 'Failed to save leave');
    } finally {
      setDialogLoading(false);
    }
  };

  const fetchLeaves = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getStaffLeaves({ staff_id: staffId });
      setLeaves(data as StaffLeave[]);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch leave records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
    // eslint-disable-next-line
  }, [staffId]);

  const handleDelete = async (id: string) => {
    try {
      await apiService.deleteStaffLeave(id);
      setSnackbar({open:true,message:'Leave record deleted',severity:'success'});
      setLeaves(l => l.filter(r => r._id !== id));
    } catch (e: any) {
      setSnackbar({open:true,message:e.message||'Delete failed',severity:'error'});
    }
  };

  const columns: GridColDef[] = [
    { field: 'leave_type', headerName: 'Leave Type', width: 130 },
    { field: 'from_date', headerName: 'From', width: 110, valueGetter: p => p.value ? new Date(p.value).toLocaleDateString() : '' },
    { field: 'to_date', headerName: 'To', width: 110, valueGetter: p => p.value ? new Date(p.value).toLocaleDateString() : '' },
    { field: 'status', headerName: 'Status', width: 110 },
    { field: 'reason', headerName: 'Reason', width: 200 },
    { field: 'remark', headerName: 'Remark', width: 160 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton color="primary" size="small" onClick={() => handleEdit(params.row)}>
            <span className="material-icons">edit</span>
          </IconButton>
          <IconButton color="error" size="small" onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box>
      <StaffLeaveAllotmentTab staffId={staffId} />
      <StaffLeaveSummary staffId={staffId} />
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Leave Records</Typography>
        <Button variant="contained" onClick={handleOpenDialog}>Add Leave</Button>
      </Box>
      <StaffLeaveDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleDialogSubmit}
        editingLeave={editingLeave}
        loading={dialogLoading}
        error={dialogError}
        staffId={staffId}
      />
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : leaves.length === 0 ? (
        <Typography color="text.secondary">No leave records found.</Typography>
      ) : (
        <DataGrid
          autoHeight
          rows={leaves}
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
    </Box>
  );
};

export default StaffLeaveTab;
