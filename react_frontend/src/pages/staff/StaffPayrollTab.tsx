import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Snackbar, Alert, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { apiService } from '../../services/api';

interface StaffPayrollTabProps {
  staffId: string;
}

interface PayrollRecord {
  _id: string;
  month: number;
  year: number;
  net_salary: number;
  status?: string;
}

const monthNames = [
  '', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const StaffPayrollTab: React.FC<StaffPayrollTabProps> = ({ staffId }) => {
  const [payrolls, setPayrolls] = useState<PayrollRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{open: boolean, message: string, severity: 'success'|'error'}>({open: false, message: '', severity: 'success'});

  const fetchPayrolls = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getPayrolls({ staff_id: staffId });
      setPayrolls(Array.isArray(data) ? data : [data]);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch payroll records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayrolls();
    // eslint-disable-next-line
  }, [staffId]);

  const handleDelete = async (id: string) => {
    try {
      await apiService.deletePayroll(id);
      setSnackbar({open:true,message:'Payroll record deleted',severity:'success'});
      setPayrolls(p => p.filter(r => r._id !== id));
    } catch (e: any) {
      setSnackbar({open:true,message:e.message||'Delete failed',severity:'error'});
    }
  };

  const columns: GridColDef[] = [
    { field: 'month', headerName: 'Month', width: 120, valueGetter: p => monthNames[p.row.month] || p.row.month },
    { field: 'year', headerName: 'Year', width: 100 },
    { field: 'net_salary', headerName: 'Net Salary', width: 140, valueFormatter: p => p.value ? `₹${p.value.toLocaleString()}` : '' },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton color="error" size="small" onClick={() => handleDelete(params.row._id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h6" mb={2}>Payroll</Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : payrolls.length === 0 ? (
        <Typography color="text.secondary">No payroll records found.</Typography>
      ) : (
        <DataGrid
          autoHeight
          rows={payrolls}
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

export default StaffPayrollTab;
