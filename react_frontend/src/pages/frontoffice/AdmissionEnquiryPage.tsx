import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Stack, CircularProgress, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { apiService } from '../../services/api';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

interface AdmissionEnquiry {
  _id?: string;
  name: string;
  contact: string;
  email: string;
  address: string;
  class: string;
  number_of_child: number;
  source: string;
  reference: string;
  assigned: string;
  next_follow_up_date: string;
  enquiry_date: string;
  status: string;
  description?: string;
}

const sourceOptions = [
  'advertisement', 'online', 'friend', 'site', 'Google Ads', 'admission campaign', 'office'
];
const referenceOptions = [
  'staff', 'parents', 'student', 'lower wing', 'partner school', 'self'
];

const AdmissionEnquiryPage: React.FC = () => {
  console.log("AdmissionEnquiryPage mounted");
  const [enquiries, setEnquiries] = useState<AdmissionEnquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [snackbar, setSnackbar] = useState<{open: boolean, message: string, severity: 'success'|'error'}>({open: false, message: '', severity: 'success'});

  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdmissionEnquiry | null>(null);

  const handleOpenDelete = (enquiry: AdmissionEnquiry) => {
    setDeleteTarget(enquiry);
    setDeleteDialogOpen(true);
  };
  const handleCloseDelete = () => {
    setDeleteDialogOpen(false);
    setDeleteTarget(null);
  };
  const handleConfirmDelete = async () => {
    if (!deleteTarget?._id) return;
    try {
      await apiService.deleteAdmissionEnquiry(deleteTarget._id);
      setSnackbar({ open: true, message: 'Enquiry deleted successfully', severity: 'success' });
      handleCloseDelete();
      fetchEnquiries();
    } catch (e: any) {
      setSnackbar({ open: true, message: e.message || 'Failed to delete enquiry', severity: 'error' });
    }
  };

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<AdmissionEnquiry>({
    name: '',
    contact: '',
    email: '',
    address: '',
    class: '',
    number_of_child: 1,
    source: '',
    reference: '',
    assigned: '',
    next_follow_up_date: '',
    enquiry_date: '',
    status: 'Active',
    description: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof AdmissionEnquiry, string>>>({});

  // Dropdown state
  const [staffOptions, setStaffOptions] = useState<any[]>([]);
  const [classOptions, setClassOptions] = useState<any[]>([]);

  useEffect(() => {
    fetchEnquiries();
    fetchDropdowns();
  }, []);

  const fetchDropdowns = async () => {
    try {
      const [staffResRaw, classResRaw] = await Promise.all([
        apiService.getStaff(),
        apiService.getClasses()
      ]);
      // Type guards for API responses
      const staffRes: any[] = Array.isArray(staffResRaw)
        ? staffResRaw
        : (staffResRaw && typeof staffResRaw === 'object' && 'data' in staffResRaw && Array.isArray((staffResRaw as any).data))
        ? (staffResRaw as any).data
        : [];
      const classRes: any[] = Array.isArray(classResRaw)
        ? classResRaw
        : (classResRaw && typeof classResRaw === 'object' && 'data' in classResRaw && Array.isArray((classResRaw as any).data))
        ? (classResRaw as any).data
        : [];
      setStaffOptions(staffRes);
      setClassOptions(classRes);
    } catch (e: any) {
      // Optionally handle dropdown fetch errors
    }
  };


  const fetchEnquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getAdmissionEnquiries();
      setEnquiries(response.data as AdmissionEnquiry[]);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch enquiries');
    } finally {
      setLoading(false);
    }
  };


  const handleOpenDialog = (enquiry?: AdmissionEnquiry) => {
    if (enquiry) {
      setEditMode(true);
      setForm({
        name: enquiry.name || '',
        contact: enquiry.contact || '',
        email: enquiry.email || '',
        address: enquiry.address || '',
        class: enquiry.class || '',
        number_of_child: enquiry.number_of_child || 1,
        source: enquiry.source || '',
        reference: enquiry.reference || '',
        assigned: enquiry.assigned || '',
        next_follow_up_date: enquiry.next_follow_up_date || '',
        enquiry_date: enquiry.enquiry_date || '',
        status: enquiry.status || 'Active',
        description: enquiry.description || ''
      });
    } else {
      setEditMode(false);
      setForm({
        name: '',
        contact: '',
        email: '',
        address: '',
        class: '',
        number_of_child: 1,
        source: '',
        reference: '',
        assigned: '',
        next_follow_up_date: '',
        enquiry_date: '',
        status: 'Active',
        description: ''
      });
    }
    setFormErrors({});
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // Validation
  const validateForm = () => {
    const errors: Partial<Record<keyof AdmissionEnquiry, string>> = {};
    if (!form.name?.trim()) errors.name = 'Name is required';
    if (!form.contact?.trim()) errors.contact = 'Contact is required';
    if (!form.email?.trim()) errors.email = 'Email is required';
    if (!form.address?.trim()) errors.address = 'Address is required';
    if (!form.enquiry_date?.trim()) errors.enquiry_date = 'Date is required';
    if (!form.status?.trim()) errors.status = 'Status is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormChange = (field: keyof AdmissionEnquiry, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    setFormErrors(e => ({ ...e, [field]: undefined }));
  };

  // Type-safe event handlers for TextField/Select
  const handleTextFieldChange = (field: keyof AdmissionEnquiry) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleFormChange(field, e.target.value);
  };
  const handleSelectChange = (field: keyof AdmissionEnquiry) => (e: React.ChangeEvent<{ value: unknown }>) => {
    handleFormChange(field, e.target.value as string);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      if (editMode && form._id) {
        await apiService.updateAdmissionEnquiry(form._id, form);
        setSnackbar({ open: true, message: 'Enquiry updated successfully', severity: 'success' });
      } else {
        await apiService.createAdmissionEnquiry(form);
        setSnackbar({ open: true, message: 'Enquiry added successfully', severity: 'success' });
      }
      handleCloseDialog();
      fetchEnquiries();
    } catch (e: any) {
      setSnackbar({ open: true, message: e.message || 'Error saving enquiry', severity: 'error' });
    }
  };

  return (
    <Box p={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" fontWeight="bold">Admission Enquiry</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>Add Enquiry</Button>
      </Stack>
      <Paper sx={{ p: 2 }}>
        {loading ? (
          <Box display="flex" justifyContent="center"><CircularProgress /></Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Box>
            {/* DataGrid for enquiries */}
            {enquiries.length === 0 ? (
              <Typography>No enquiries found.</Typography>
            ) : (
              <div style={{ height: 480, width: '100%' }}>
                <DataGrid
                  rows={enquiries.map((e, idx) => ({ id: e._id || idx, ...e }))}
                  columns={[
                    { field: 'name', headerName: 'Name', flex: 1 },
                    { field: 'contact', headerName: 'Contact', flex: 1 },
                    { field: 'email', headerName: 'Email', flex: 1 },
                    { field: 'address', headerName: 'Address', flex: 1 },
                    { field: 'enquiry_date', headerName: 'Date', flex: 1 },
                    { field: 'status', headerName: 'Status', flex: 1 },
                    { field: 'description', headerName: 'Description', flex: 1 },
                    {
                      field: 'actions',
                      headerName: 'Actions',
                      sortable: false,
                      filterable: false,
                      renderCell: (params: GridRenderCellParams) => (
                        <Stack direction="row" spacing={1}>
                          <Button size="small" variant="outlined" onClick={() => handleOpenDialog(params.row as AdmissionEnquiry)}>Edit</Button>
                          <Button size="small" color="error" variant="outlined" onClick={() => handleOpenDelete(params.row as AdmissionEnquiry)}>Delete</Button>
                        </Stack>
                      ),
                      width: 150
                    }
                  ]}
                  pageSizeOptions={[5, 10, 20]}
                  initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                  disableRowSelectionOnClick
                  autoHeight
                />
              </div>
            )}
          </Box>
        )}
      </Paper>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar(s => ({...s, open: false}))}>
        <Alert onClose={() => setSnackbar(s => ({...s, open: false}))} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    {/* Add/Edit Enquiry Dialog */}
    <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
      <DialogTitle>{editMode ? 'Edit Admission Enquiry' : 'Add Admission Enquiry'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Name"
            value={form.name}
            onChange={handleTextFieldChange('name')}
            error={!!formErrors.name}
            helperText={formErrors.name}
            fullWidth
            required
          />
          <TextField
            label="Contact"
            value={form.contact}
            onChange={handleTextFieldChange('contact')}
            error={!!formErrors.contact}
            helperText={formErrors.contact}
            fullWidth
            required
          />
          <TextField
            label="Email"
            value={form.email}
            onChange={handleTextFieldChange('email')}
            error={!!formErrors.email}
            helperText={formErrors.email}
            fullWidth
            required
          />
          <TextField
            label="Address"
            value={form.address}
            onChange={handleTextFieldChange('address')}
            error={!!formErrors.address}
            helperText={formErrors.address}
            fullWidth
            required
          />
          <TextField
            label="Class"
            select
            value={form.class}
            onChange={handleTextFieldChange('class')}
            error={!!formErrors.class}
            helperText={formErrors.class}
            fullWidth
            required
          >
            {classOptions.map((cls: { _id: string; name: string }) => (
              <MenuItem key={cls._id} value={cls._id}>{cls.name}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Number of Child"
            type="number"
            value={form.number_of_child}
            onChange={handleTextFieldChange('number_of_child')}
            error={!!formErrors.number_of_child}
            helperText={formErrors.number_of_child}
            fullWidth
            required
          />
          <TextField
            label="Source"
            select
            value={form.source}
            onChange={handleTextFieldChange('source')}
            error={!!formErrors.source}
            helperText={formErrors.source}
            fullWidth
            required
          >
            {sourceOptions.map((option: string) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Reference"
            select
            value={form.reference}
            onChange={handleTextFieldChange('reference')}
            error={!!formErrors.reference}
            helperText={formErrors.reference}
            fullWidth
            required
          >
            {referenceOptions.map((option: string) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Assigned"
            select
            value={form.assigned}
            onChange={handleTextFieldChange('assigned')}
            error={!!formErrors.assigned}
            helperText={formErrors.assigned}
            fullWidth
            required
          >
            {staffOptions.map((staff: { _id: string; name: string }) => (
              <MenuItem key={staff._id} value={staff._id}>{staff.name}</MenuItem>
            ))}
          </TextField>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Enquiry Date"
              value={form.enquiry_date ? dayjs(form.enquiry_date) : null}
              onChange={date => handleFormChange('enquiry_date', date ? dayjs(date).format('YYYY-MM-DD') : '')}
              slotProps={{ textField: { fullWidth: true, required: true, error: !!formErrors.enquiry_date, helperText: formErrors.enquiry_date } }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Next Follow Up Date"
              value={form.next_follow_up_date ? dayjs(form.next_follow_up_date) : null}
              onChange={date => handleFormChange('next_follow_up_date', date ? dayjs(date).format('YYYY-MM-DD') : '')}
              slotProps={{ textField: { fullWidth: true, required: true, error: !!formErrors.next_follow_up_date, helperText: formErrors.next_follow_up_date } }}
            />
          </LocalizationProvider>
          <TextField
            label="Description"
            value={form.description}
            onChange={handleTextFieldChange('description')}
            error={!!formErrors.description}
            helperText={formErrors.description}
            fullWidth
            multiline
            rows={2}
          />
          <TextField
            label="Status"
            select
            value={form.status}
            onChange={handleTextFieldChange('status')}
            error={!!formErrors.status}
            helperText={formErrors.status}
            fullWidth
            required
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
            <MenuItem value="Converted">Converted</MenuItem>
            <MenuItem value="Lost">Lost</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} disabled={loading}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>{editMode ? 'Update' : 'Save'}</Button>
      </DialogActions>
    </Dialog>
    {/* Delete Confirmation Dialog */}
    <Dialog open={deleteDialogOpen} onClose={handleCloseDelete}>
      <DialogTitle>Delete Admission Enquiry</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this enquiry{deleteTarget ? `: ${deleteTarget.name}` : ''}?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDelete} disabled={loading}>Cancel</Button>
        <Button onClick={handleConfirmDelete} color="error" variant="contained" disabled={loading}>Delete</Button>
      </DialogActions>
    </Dialog>
  </Box>
  );
};

export default AdmissionEnquiryPage;
