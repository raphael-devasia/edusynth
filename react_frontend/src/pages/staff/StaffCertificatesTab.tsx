import React from 'react';
import { Certificate } from '../../types/staffDocument';
import { Alert, Snackbar, CircularProgress, Box, Button, Typography, Paper, Chip, IconButton, Tooltip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Upload, Download, Delete, Description } from '@mui/icons-material';
import { apiService } from '../../services/api';

interface StaffCertificatesTabProps {
  staffId: string;
}

const StaffCertificatesTab: React.FC<StaffCertificatesTabProps> = ({ staffId }) => {
  const [certificates, setCertificates] = React.useState<Certificate[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState<{open: boolean, message: string, severity: 'success'|'error'}>({open: false, message: '', severity: 'success'});
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const fetchCertificates = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiService.getStaffCertificates(staffId);
      setCertificates((res && (res as any).data ? (res as any).data : res) as Certificate[] || []);
    } catch (e: any) {
      setError(e?.message || 'Failed to load certificates');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => { if (staffId) fetchCertificates(); }, [staffId]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      await apiService.uploadStaffCertificate(staffId, file);
      fetchCertificates();
    } catch (e: any) {
      setError(e?.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this certificate?')) return;
    setLoading(true);
    setError(null);
    try {
      await apiService.deleteStaffCertificate(id);
      fetchCertificates();
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

  return (
    <Box p={2}>
      <Typography variant="h6" mb={2}>Certificates</Typography>
      <Box mb={2}>
        <Button
          variant="contained"
          component="label"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Certificate'}
          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={handleUpload}
            disabled={uploading}
          />
        </Button>
      </Box>
      {loading ? (
        <Box display="flex" alignItems="center" justifyContent="center" minHeight={80}><CircularProgress /></Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        certificates.length === 0 ? (
          <Typography color="text.secondary">No certificates uploaded.</Typography>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: 8 }}>Name</th>
                <th style={{ textAlign: 'left', padding: 8 }}>Type</th>
                <th style={{ textAlign: 'left', padding: 8 }}>Uploaded</th>
                <th style={{ textAlign: 'left', padding: 8 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert) => (
                <tr key={cert._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: 8 }}>{cert.name}</td>
                  <td style={{ padding: 8 }}>{cert.description || '-'}</td>
                  <td style={{ padding: 8 }}>{cert.created_at ? new Date(cert.created_at).toLocaleString() : '-'}</td>
                  <td style={{ padding: 8 }}>
                    <Button size="small" onClick={() => handleDownload(cert.file_url || '', cert.name || 'certificate')}>
                      Download
                    </Button>
                    <Button size="small" color="error" onClick={() => cert._id && handleDelete(cert._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
      <Snackbar open={snackbar.open} autoHideDuration={3500} onClose={() => setSnackbar(s => ({ ...s, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setSnackbar(s => ({ ...s, open: false }))} severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default StaffCertificatesTab;
