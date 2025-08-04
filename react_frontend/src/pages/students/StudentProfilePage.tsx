import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Avatar, Stack, Divider, Button, CircularProgress, Alert } from '@mui/material';

const StudentProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);
  const navigate = useNavigate();

  // Disable/Enable UI state (move hooks to top)
  const [disableModalOpen, setDisableModalOpen] = useState(false);
  const [disableReason, setDisableReason] = useState('');
  const [disableNote, setDisableNote] = useState('');
  const [disableLoading, setDisableLoading] = useState(false);
  const [actionError, setActionError] = useState<string|null>(null);
  const [actionSuccess, setActionSuccess] = useState<string|null>(null);

  // Disable reasons from backend
  const [disableReasons, setDisableReasons] = useState<string[]>([]);
  useEffect(() => {
    axios.get('/api/disable-reasons')
      .then(res => {
        if (Array.isArray(res.data)) {
          if (typeof res.data[0] === 'string') {
            setDisableReasons(res.data);
          } else {
            setDisableReasons(res.data.map((r: any) => r.reason));
          }
        }
      })
      .catch(() => setDisableReasons([]));
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/students/${id}`)
      .then(res => {
        setStudent(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.message || err.message || 'Failed to fetch student');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={300}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!student) {
    return <Alert severity="info">Student not found.</Alert>;
  }


  const handleDisable = async () => {
    setDisableLoading(true);
    setActionError(null);
    try {
      const res = await axios.post(`/api/students/${id}/disable`, { dis_reason: disableReason, dis_note: disableNote });
      setStudent(res.data);
      setDisableModalOpen(false);
      setActionSuccess('Student disabled successfully.');
    } catch (err: any) {
      setActionError(err.response?.data?.error || err.message || 'Failed to disable student');
    } finally {
      setDisableLoading(false);
    }
  };

  const handleEnable = async () => {
    setDisableLoading(true);
    setActionError(null);
    try {
      const res = await axios.post(`/api/students/${id}/enable`);
      setStudent(res.data);
      setActionSuccess('Student enabled successfully.');
    } catch (err: any) {
      setActionError(err.response?.data?.error || err.message || 'Failed to enable student');
    } finally {
      setDisableLoading(false);
    }
  };


  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Student Profile</Typography>
      <Paper elevation={2} sx={{ p: 3, maxWidth: 600 }}>
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Avatar sx={{ width: 72, height: 72 }}>{student.name?.[0] || '?'}</Avatar>
          <Stack direction="row" spacing={3} alignItems="center">
  {student.image && (
    <img src={student.image.startsWith('http') ? student.image : `/uploads/students/${student.image}`} alt="Student" width={100} height={100} style={{ borderRadius: 8, objectFit: 'cover' }} />
  )}
  <Box>
    <Typography variant="h5">{`${student.firstname} ${student.middlename || ''} ${student.lastname || ''}`.trim()}</Typography>
    <Typography color="text.secondary">Admission No: {student.admission_no}</Typography>
    <Typography color="text.secondary">Roll No: {student.roll_no}</Typography>
    <Typography color="text.secondary">Class: {student.class_id} | Section: {student.section_id}</Typography>
    <Typography color="text.secondary">Session: {student.session_id}</Typography>
    <Typography color="text.secondary">Gender: {student.gender} | DOB: {student.dob ? new Date(student.dob).toLocaleDateString() : ''}</Typography>
    <Typography color="text.secondary">Mobile: {student.mobileno} | Email: {student.email}</Typography>
    <Typography color="text.secondary">RTE: {student.rte}</Typography>
  </Box>
</Stack>
<Divider sx={{ my: 2 }} />
<Box mb={2}>
  <Typography variant="subtitle1" fontWeight="bold">Address</Typography>
  <Typography color="text.secondary">Current: {student.current_address}</Typography>
  <Typography color="text.secondary">Permanent: {student.permanent_address}</Typography>
  <Typography color="text.secondary">City: {student.city}, State: {student.state}, Pincode: {student.pincode}</Typography>
</Box>
<Box mb={2}>
  <Typography variant="subtitle1" fontWeight="bold">Parent / Guardian</Typography>
  <Typography color="text.secondary">Father: {student.father_name} ({student.father_phone}) - {student.father_occupation}</Typography>
  <Typography color="text.secondary">Mother: {student.mother_name} ({student.mother_phone}) - {student.mother_occupation}</Typography>
  <Typography color="text.secondary">Guardian: {student.guardian_name} ({student.guardian_phone}) - {student.guardian_occupation}</Typography>
  <Typography color="text.secondary">Guardian Address: {student.guardian_address}</Typography>
  <Typography color="text.secondary">Guardian Is: {student.guardian_is}</Typography>
</Box>
<Box mb={2}>
  <Typography variant="subtitle1" fontWeight="bold">Academic & Other Info</Typography>
  <Typography color="text.secondary">Admission Date: {student.admission_date ? new Date(student.admission_date).toLocaleDateString() : ''}</Typography>
  <Typography color="text.secondary">Previous School: {student.previous_school}</Typography>
  <Typography color="text.secondary">Religion: {student.religion}</Typography>
  <Typography color="text.secondary">Blood Group: {student.blood_group}</Typography>
  <Typography color="text.secondary">Height: {student.height} | Weight: {student.weight} | Measurement Date: {student.measurement_date ? new Date(student.measurement_date).toLocaleDateString() : ''}</Typography>
  <Typography color="text.secondary">School House: {student.school_house_id}</Typography>
  <Typography color="text.secondary">Hostel Room: {student.hostel_room_id}</Typography>
  <Typography color="text.secondary">Note: {student.note}</Typography>
</Box>
        </Stack>
        <Divider sx={{ my: 2 }} />

        {/* Disable/Enable section */}
        {student.is_active ? (
          <>
            <Button
              variant="outlined"
              color="error"
              sx={{ mr: 2 }}
              onClick={() => setDisableModalOpen(true)}
              disabled={disableLoading}
            >
              Disable Student
            </Button>
          </>
        ) : (
          <>
            <Box mb={2}>
              <Typography variant="h6" color="error">This student is DISABLED</Typography>
              <Typography color="text.secondary">Reason: {student.dis_reason}</Typography>
              <Typography color="text.secondary">Note: {student.dis_note}</Typography>
              <Typography color="text.secondary">Date: {student.disable_at ? new Date(student.disable_at).toLocaleDateString() : ''}</Typography>
            </Box>
            <Button
              variant="contained"
              color="success"
              sx={{ mr: 2 }}
              onClick={handleEnable}
              disabled={disableLoading}
            >
              Enable Student
            </Button>
          </>
        )}
        <Button variant="contained" color="primary" onClick={() => navigate(`/students/edit/${id}`)} sx={{ mt: 2 }}>Edit Profile</Button>

        {/* Disable Modal */}
        {disableModalOpen && (
          <Box
            position="fixed"
            top={0}
            left={0}
            width="100vw"
            height="100vh"
            bgcolor="rgba(0,0,0,0.3)"
            zIndex={1000}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Paper elevation={3} sx={{ p: 4, minWidth: 320 }}>
              <Typography variant="h6" gutterBottom>Disable Student</Typography>
              <Box mb={2}>
                <Typography>Select Reason</Typography>
                <select
                  value={disableReason}
                  onChange={e => setDisableReason(e.target.value)}
                  style={{ width: '100%', padding: 8, marginTop: 4 }}
                >
                  <option value="">Select...</option>
                  {disableReasons.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </Box>
              <Box mb={2}>
                <Typography>Note (optional)</Typography>
                <textarea
                  value={disableNote}
                  onChange={e => setDisableNote(e.target.value)}
                  rows={3}
                  style={{ width: '100%', padding: 8, marginTop: 4 }}
                />
              </Box>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button onClick={() => setDisableModalOpen(false)} disabled={disableLoading}>Cancel</Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDisable}
                  disabled={!disableReason || disableLoading}
                >
                  {disableLoading ? 'Disabling...' : 'Confirm Disable'}
                </Button>
              </Stack>
              {actionError && <Alert severity="error" sx={{ mt: 2 }}>{actionError}</Alert>}
            </Paper>
          </Box>
        )}
        {actionSuccess && <Alert severity="success" sx={{ mt: 2 }}>{actionSuccess}</Alert>}
      </Paper>
    </Box>
  );
};

export default StudentProfilePage;
