import React from 'react';
import { StaffDocument } from '../../types/staffDocument';
import { Alert, Snackbar, CircularProgress, Box, Button, Typography, Paper, Chip, IconButton, Tooltip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Upload, Download, Delete, Description } from '@mui/icons-material';
import { apiService } from '../../services/api';

interface StaffDocumentsTabProps {
  staffId: string;
}

const StaffDocumentsTab: React.FC<StaffDocumentsTabProps> = ({ staffId }) => {
  const [documents, setDocuments] = React.useState<StaffDocument[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState<{open: boolean, message: string, severity: 'success'|'error'}>({open: false, message: '', severity: 'success'});
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const fetchDocuments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiService.getStaffDocuments(staffId);
      setDocuments((res && (res as any).data ? (res as any).data : res) as StaffDocument[] || []);
    } catch (e: any) {
      setError(e?.message || 'Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => { if (staffId) fetchDocuments(); }, [staffId]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      await apiService.uploadStaffDocument(staffId, file);
      fetchDocuments();
    } catch (e: any) {
      setError(e?.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this document?')) return;
    setLoading(true);
    setError(null);
    try {
      await apiService.deleteStaffDocument(id);
      fetchDocuments();
    } catch (e: any) {
      setError(e?.message || 'Delete failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (url: string, name: string) => {
    const link = document.createElement('a');
    link.href = url.startsWith('http') ? url : `${process.env.REACT_APP_API_URL || 'http://localhost:5001/api'}${url}`;
    link.download = name;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getColumns = (): GridColDef[] => [
    {
      field: 'original_name',
      headerName: 'Document Name',
      width: 250,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Description fontSize="small" color="action" />
          <Typography variant="body2">{params.row.original_name || params.row.name}</Typography>
        </Box>
      )
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 120,
      renderCell: (params) => (
        <Chip label={params.row.type || 'Document'} size="small" variant="outlined" />
      )
    },
    {
      field: 'size',
      headerName: 'Size',
      width: 100,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.row.size ? `${(params.row.size / 1024).toFixed(1)} KB` : '-'}
        </Typography>
      )
    },
    {
      field: 'createdAt',
      headerName: 'Uploaded',
      width: 160,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.row.createdAt ? new Date(params.row.createdAt).toLocaleDateString() : '-'}
        </Typography>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box display="flex" gap={0.5}>
          <Tooltip title="Download">
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleDownload(params.row.url || params.row.path, params.row.original_name || params.row.name || 'document')}
            >
              <Download fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDelete(params.row._id || params.row.id)}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ];

  return (
    <Box p={2}>
      <Typography variant="h6" mb={2}>Documents</Typography>
      <Box mb={2} display="flex" gap={2} alignItems="center">
        <Button
          variant="contained"
          component="label"
          disabled={uploading}
          startIcon={<Upload />}
        >
          {uploading ? 'Uploading...' : 'Upload Document'}
          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={handleUpload}
            disabled={uploading}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
          />
        </Button>
        {uploading && <CircularProgress size={20} />}
        <Typography variant="caption" color="text.secondary">
          Supported: PDF, DOC, DOCX, JPG, PNG, GIF (Max 10MB)
        </Typography>
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
      {loading ? (
        <Box display="flex" alignItems="center" justifyContent="center" minHeight={80}><CircularProgress /></Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
<Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={documents.map(doc => ({ ...doc, id: doc._id }))}
            columns={getColumns()}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            autoHeight
            loading={loading}
            slots={{
              noRowsOverlay: () => (
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                  <Typography color="text.secondary">No documents uploaded.</Typography>
                </Box>
              )
            }}
          />
        </Paper>
      )}
      <Snackbar open={snackbar.open} autoHideDuration={3500} onClose={() => setSnackbar(s => ({ ...s, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setSnackbar(s => ({ ...s, open: false }))} severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default StaffDocumentsTab;
