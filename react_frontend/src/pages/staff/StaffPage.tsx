import React, { useState, useEffect } from 'react';
import { useStaffCustomFields } from './useStaffCustomFields';
import { StaffCustomFields } from './StaffCustomFields';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { MenuItem } from '@mui/material';
import { getRoles } from '../../services/roleService';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Snackbar, Stack, TextField, Typography, Alert, CircularProgress, Tooltip, Tabs, Tab, Checkbox, Card, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import { RootState } from '../../store';
import { fetchStaff, createStaffMember, updateStaffMember, deleteStaffMember } from '../../features/staff/staffSlice';
import StaffDocumentsTab from './StaffDocumentsTab';
import StaffCertificatesTab from './StaffCertificatesTab';
import StaffExperienceTab from './StaffExperienceTab';
import StaffAttendanceTab from './StaffAttendanceTab';
import StaffPayrollTab from './StaffPayrollTab';
import StaffLeaveTab from './StaffLeaveTab';
import StaffFeedbackTab from './StaffFeedbackTab';
import { Staff } from '../../types';

const getColumns = (onEdit: (row: any) => void, onDelete: (row: any) => void): GridColDef[] => [
  { field: 'name', headerName: 'Name', width: 160 },
  { field: 'surname', headerName: 'Surname', width: 160 },
  { field: 'email', headerName: 'Email', width: 220 },
  { field: 'department', headerName: 'Department', width: 140 },
  { field: 'designation', headerName: 'Designation', width: 140 },
  { field: 'contact_no', headerName: 'Contact No', width: 140 },
  { field: 'gender', headerName: 'Gender', width: 100 },
  { field: 'role', headerName: 'Role', width: 140, valueGetter: (params) => params.row.role?.name || params.row.role_id || '' },
  { field: 'actions', headerName: 'Actions', width: 140, sortable: false, filterable: false, renderCell: (params) => (
      <Stack direction="row" spacing={1}>
        <Tooltip title="Edit"><IconButton color="primary" size="small" onClick={() => onEdit(params.row)}><EditIcon /></IconButton></Tooltip>
        <Tooltip title="Delete"><IconButton color="error" size="small" onClick={() => onDelete(params.row)}><DeleteIcon /></IconButton></Tooltip>
      </Stack>
    )
  },
];

const StaffPage: React.FC = () => {
  // --- Birthday List UI ---
  const [birthdayStaff, setBirthdayStaff] = useState<any[]>([]);
  const [birthdayLoading, setBirthdayLoading] = useState(false);
  const [birthdayError, setBirthdayError] = useState<string | null>(null);

  useEffect(() => {
    setBirthdayLoading(true);
    fetch('/api/staff/birthday')
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch'))
      .then(data => { setBirthdayStaff(data); setBirthdayError(null); })
      .catch(e => setBirthdayError(typeof e === 'string' ? e : 'Error fetching birthday list'))
      .finally(() => setBirthdayLoading(false));
  }, []);

  const renderBirthdayList = () => (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom>🎂 Staff Birthdays Today</Typography>
      {birthdayLoading ? (
        <CircularProgress size={28} />
      ) : birthdayError ? (
        <Alert severity="error">{birthdayError}</Alert>
      ) : birthdayStaff.length === 0 ? (
        <Typography color="text.secondary">No staff birthdays today.</Typography>
      ) : (
        <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', py: 1 }}>
          {birthdayStaff.map((s: any) => (
            <Card key={s._id} sx={{ minWidth: 220, p: 2, display: 'flex', alignItems: 'center' }}>
              <Avatar src={s.image || undefined} sx={{ width: 56, height: 56, mr: 2 }}>
                {s.name?.[0] || '?'}
              </Avatar>
              <Box>
                <Typography fontWeight={600}>{s.name} {s.surname}</Typography>
                <Typography variant="body2" color="text.secondary">{s.department?.name || s.department || ''} {s.designation?.name || s.designation || ''}</Typography>
                <Typography variant="body2" color="primary.main">Happy Birthday!</Typography>
              </Box>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );

  useEffect(() => {
    setBirthdayLoading(true);
    fetch('/api/staff/birthday')
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch'))
      .then(data => { setBirthdayStaff(data); setBirthdayError(null); })
      .catch(e => setBirthdayError(typeof e === 'string' ? e : 'Error fetching birthday list'))
      .finally(() => setBirthdayLoading(false));
  }, []);
  const dispatch = useDispatch();
  const { items: staff, loading: isLoading, error } = useSelector((state: RootState) => state.staff);
  const [search, setSearch] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [snackbar, setSnackbar] = useState<{open: boolean, message: string, severity: 'success'|'error'}>({open: false, message: '', severity: 'success'});
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editRow, setEditRow] = useState<any | null>(null);

  useEffect(() => { dispatch<any>(fetchStaff()); }, [dispatch]);

  function handleOpenAdd() { setAddOpen(true); }
  function handleCloseAdd() { setAddOpen(false); }
  function handleOpenEdit(row: any) { setEditRow(row); setEditOpen(true); }
  function handleCloseEdit() { setEditOpen(false); setEditRow(null); }

  function getFilteredStaff() {
    const q = search.toLowerCase();
    return staff.filter((s: any) =>
      !search ||
      s.name?.toLowerCase().includes(q) ||
      s.surname?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q) ||
      s.department?.toLowerCase().includes(q) ||
      s.designation?.toLowerCase().includes(q) ||
      s.contact_no?.toLowerCase().includes(q)
    );
  }

  const handleBulkDelete = async () => {
    try {
      for (const id of selectedRows) await dispatch<any>(deleteStaffMember(id));
      setSnackbar({open:true,message:'Deleted selected staff',severity:'success'});
      setSelectedRows([]);
    } catch (e: any) {
      setSnackbar({open:true,message:e.message||'Bulk delete failed',severity:'error'});
    }
  };

  const handleExport = () => {
    const filtered = getFilteredStaff();
    const csv = [
      ['Name', 'Surname', 'Email', 'Department', 'Designation', 'Contact No', 'Gender'],
      ...filtered.map((s: any) => [s.name, s.surname, s.email, s.department, s.designation, s.contact_no, s.gender])
    ].map(row => row.map((v: any) => `"${(v||'').toString().replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'staff.csv';
    a.click();
    setSnackbar({open:true,message:'Exported to CSV',severity:'success'});
  };

  return (
    <Box>
      {renderBirthdayList()}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Staff Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage teachers, staff members, and employee records
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} size="large" onClick={handleOpenAdd}>
          Add Staff Member
        </Button>
      </Stack>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Stack direction="row" spacing={2} mb={2}>
          <TextField size="small" variant="outlined" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} sx={{ minWidth: 220 }} />
          <Tooltip title="Export CSV"><span><IconButton color="primary" onClick={handleExport}><DownloadIcon /></IconButton></span></Tooltip>
          <Tooltip title="Bulk Delete"><span><IconButton color="error" disabled={selectedRows.length===0} onClick={handleBulkDelete}><DeleteIcon /></IconButton></span></Tooltip>
        </Stack>
        <div style={{ height: 500, width: '100%' }}>
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height={300}><CircularProgress /></Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <DataGrid
              rows={getFilteredStaff().map((s: any, idx: number) => ({ id: s._id || idx, ...s }))}
              columns={getColumns(handleOpenEdit, async (row) => {
                try {
                  await dispatch<any>(deleteStaffMember(row._id));
                  setSnackbar({open:true,message:'Staff member deleted',severity:'success'});
                } catch (e: any) {
                  setSnackbar({open:true,message:e.message||'Delete failed',severity:'error'});
                }
              })}
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
      <Dialog open={addOpen} onClose={handleCloseAdd} maxWidth="sm" fullWidth>
        <DialogTitle>Add Staff Member</DialogTitle>
        <DialogContent>
          <StaffForm
            mode="add"
            onClose={handleCloseAdd}
            onSuccess={() => { setSnackbar({open:true,message:'Staff member added',severity:'success'}); handleCloseAdd(); }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editOpen} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Staff Member</DialogTitle>
        <DialogContent>
          <StaffForm
            mode="edit"
            initialValues={editRow}
            onClose={handleCloseEdit}
            onSuccess={() => { setSnackbar({open:true,message:'Staff member updated',severity:'success'}); handleCloseEdit(); }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const StaffForm: React.FC<{ mode: 'add'|'edit', initialValues?: any, onClose: () => void, onSuccess: () => void }> = ({ mode, initialValues = {}, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.staff.loading);
  const error = useSelector((state: RootState) => state.staff.error);
  const [form, setForm] = useState<Partial<Staff>>({
    name: initialValues.name || '',
    surname: initialValues.surname || '',
    email: initialValues.email || '',
    department: initialValues.department || '',
    designation: initialValues.designation || '',
    contact_no: initialValues.contact_no || '',
    gender: initialValues.gender || '',
    role_id: initialValues.role_id || '',
    is_active: typeof initialValues.is_active === 'boolean' ? initialValues.is_active : true,
    password: '', // only for add
    custom_fields: initialValues.custom_fields || [],
  });
  const { fields: customFields = [], loading: cfLoading, error: cfError } = useStaffCustomFields();
  const [roles, setRoles] = useState<{ _id: string; name: string }[]>([]);
  const [touched, setTouched] = useState<{[k:string]:boolean}>({});

  useEffect(() => {
    getRoles().then((data) => setRoles(Array.isArray(data) ? data : [])).catch(() => setRoles([]));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: any; }>) {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setTouched(t => ({ ...t, [name!]: true }));
    if (name?.startsWith('custom_field_')) {
      const field_id = name.replace('custom_field_', '');
      setForm(f => ({
        ...f,
        custom_fields: (f.custom_fields || []).map(cf =>
          cf.field_id === field_id ? { ...cf, value: type === 'checkbox' ? checked : value } : cf
        ),
      }));
    } else if (name) {
      setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    }
  }

  function handleCustomFieldChange(field_id: string, value: any) {
    setForm(f => ({
      ...f,
      custom_fields: customFields.map(cf =>
        cf._id === field_id
          ? { field_id, value }
          : (f.custom_fields?.find(v => v.field_id === cf._id) || { field_id: cf._id, value: cf.default_value ?? '' })
      ),
    }));
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) {
    setTouched(t => ({ ...t, [e.target.name]: true }));
  }

  function validate(f: Partial<Staff>) {
    const errors: any = {};
    if (!f.name) errors.name = 'Required';
    if (!f.surname) errors.surname = 'Required';
    if (!f.email) errors.email = 'Required';
    if (mode === 'add' && !f.password) errors.password = 'Required';
    if (!f.role_id) errors.role_id = 'Required';
    return errors;
  }
  const errors = validate(form);
  const isValid = Object.keys(errors).length === 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    if (mode === 'add') {
      await dispatch<any>(createStaffMember(form));
    } else if (mode === 'edit' && initialValues._id) {
      await dispatch<any>(updateStaffMember({ id: initialValues._id, data: { ...form, password: undefined } }));
    }
    if (!error) onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Stack spacing={2} mt={1}>
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} onBlur={handleBlur} error={!!errors.name && touched.name} helperText={touched.name && errors.name} required fullWidth />
        <TextField label="Surname" name="surname" value={form.surname} onChange={handleChange} onBlur={handleBlur} error={!!errors.surname && touched.surname} helperText={touched.surname && errors.surname} required fullWidth />
        <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} onBlur={handleBlur} error={!!errors.email && touched.email} helperText={touched.email && errors.email} required fullWidth />
        <TextField label="Department" name="department" value={form.department} onChange={handleChange} fullWidth />
        <TextField label="Designation" name="designation" value={form.designation} onChange={handleChange} fullWidth />
        <TextField label="Contact No" name="contact_no" value={form.contact_no} onChange={handleChange} fullWidth />
        <TextField select label="Role" name="role_id" value={form.role_id || ''} onChange={handleChange} error={!!errors.role_id && touched.role_id} helperText={touched.role_id && errors.role_id} required fullWidth>
          {roles.map(role => (
            <MenuItem key={role._id} value={role._id}>{role.name}</MenuItem>
          ))}
        </TextField>
        {mode === 'add' && (
          <TextField label="Password" name="password" type="password" value={form.password || ''} onChange={handleChange} onBlur={handleBlur} error={!!errors.password && touched.password} helperText={touched.password && errors.password} required fullWidth />
        )}
        <StaffCustomFields
          customFields={customFields}
          values={form.custom_fields || []}
          loading={cfLoading}
          error={cfError}
          onChange={handleCustomFieldChange}
        />
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography id="active-label">Active</Typography>
          <Checkbox
            name="is_active"
            checked={!!form.is_active}
            onChange={handleChange}
            inputProps={{ 'aria-labelledby': 'active-label' }}
            disabled={isLoading}
          />
        </Stack>
        {error && <Alert severity="error">{error}</Alert>}
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button variant="contained" type="submit" disabled={!isValid || isLoading}>{isLoading ? <CircularProgress size={22} /> : (mode === 'add' ? 'Add' : 'Update')}</Button>
        </Stack>
      </Stack>
    </form>
  );
};

// --- Staff Documents/Certificates Tabs ---
// Only show tabs if editing or viewing a staff member
// (imports for StaffAttendanceTab, StaffPayrollTab, StaffLeaveTab, StaffFeedbackTab should be at the top)

function StaffDocumentsCertificatesTabs({ staffId }: { staffId?: string }) {
  const [tabIndex, setTabIndex] = React.useState(0);
  const user = useSelector((state: any) => state.auth.user);
  return (
    <Box mt={3}>
      <Tabs value={tabIndex} onChange={(_, v) => setTabIndex(v)}>
        <Tab label="Documents" />
        <Tab label="Certificates" />
        <Tab label="Experience" />
        <Tab label="Attendance" />
        <Tab label="Payroll" />
        <Tab label="Leave" />
        <Tab label="Feedback" />
      </Tabs>
      <Box mt={2}>
        {tabIndex === 0 && staffId && <StaffDocumentsTab staffId={staffId} />}
        {tabIndex === 1 && staffId && <StaffCertificatesTab staffId={staffId} />}
        {tabIndex === 2 && staffId && <StaffExperienceTab staffId={staffId} />}
        {tabIndex === 3 && staffId && <StaffAttendanceTab staffId={staffId} />}
        {tabIndex === 4 && staffId && <StaffPayrollTab staffId={staffId} />}
        {tabIndex === 5 && staffId && <StaffLeaveTab staffId={staffId} />}
        {tabIndex === 6 && staffId && user && <StaffFeedbackTab staffId={staffId} currentUserId={user._id} />}
        {!staffId && (
          <Typography color="text.secondary">Save staff first to manage documents, certificates, experience, attendance, payroll, leave, or feedback.</Typography>
        )}
      </Box>
    </Box>
  );
}

export default StaffPage;
