import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Stack, TextField, MenuItem, Button, ToggleButton, ToggleButtonGroup, Table, TableHead, TableRow, TableCell, TableBody, Card, CardContent, Grid, CircularProgress, Alert, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/api';

const StudentDetailsPage: React.FC = () => {
  const [classOptions, setClassOptions] = useState<any[]>([]);
  const [sectionOptions, setSectionOptions] = useState<any[]>([]);
  const [search, setSearch] = useState({ class_id: '', section_id: '', name: '' });
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [view, setView] = useState<'list'|'card'>('list');
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    setLoading(true);
    try {
      await apiService.delete(`/students/${id}`);
      setStudents(students => students.filter(s => s._id !== id));
    } catch (err) {
      alert('Failed to delete student.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch class and section options on mount
    const fetchDropdowns = async () => {
      try {
        const [classes, sections] = await Promise.all([
          apiService.getClasses(),
          apiService.getSections(),
        ]);
        setClassOptions(classes as any[]);
        setSectionOptions(sections as any[]);
      } catch (err) {
        // Optionally handle dropdown fetch errors
      }
    };
    fetchDropdowns();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      // Build query params for search
      const params = new URLSearchParams();
      if (search.class_id) params.append('class_id', search.class_id);
      if (search.section_id) params.append('section_id', search.section_id);
      if (search.name) params.append('name', search.name);
      const data = await apiService.get(`/students?${params.toString()}`);
      setStudents(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Student Details</Typography>
      <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <TextField
            label="Class"
            name="class_id"
            select
            value={search.class_id}
            onChange={handleSearchChange}
            sx={{ minWidth: 120 }}
          >
            {classOptions.map(opt => (
              <MenuItem key={opt._id || opt.id} value={opt._id || opt.id}>{opt.name || opt.class_name}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Section"
            name="section_id"
            select
            value={search.section_id}
            onChange={handleSearchChange}
            sx={{ minWidth: 120 }}
          >
            {sectionOptions.map(opt => (
              <MenuItem key={opt._id || opt.id} value={opt._id || opt.id}>{opt.name || opt.section_name}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Student Name"
            name="name"
            value={search.name}
            onChange={handleSearchChange}
            sx={{ minWidth: 180 }}
          />
          <Button variant="contained" onClick={handleSearch} disabled={loading}>Search</Button>
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(_, val) => val && setView(val)}
            sx={{ ml: 2 }}
          >
            <ToggleButton value="list">List View</ToggleButton>
            <ToggleButton value="card">Card View</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Paper>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={200}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : view === 'list' ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Admission No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Mobile</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student: any) => (
              <TableRow key={student._id}>
                <TableCell>{student.admission_no}</TableCell>
                <TableCell>{student.firstname} {student.lastname}</TableCell>
                <TableCell>{student.class_name || student.class_id}</TableCell>
                <TableCell>{student.section_name || student.section_id}</TableCell>
                <TableCell>{student.gender}</TableCell>
                <TableCell>{student.dob}</TableCell>
                <TableCell>{student.mobileno}</TableCell>
                <TableCell>
                  <Tooltip title="View">
                    <IconButton color="primary" onClick={() => navigate(`/dashboard/students/profile/${student._id}`)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton color="secondary" onClick={() => navigate(`/dashboard/students/edit/${student._id}`)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => handleDelete(student._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Grid container spacing={2}>
          {students.map((student: any) => (
            <Grid item xs={12} sm={6} md={4} key={student._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{student.firstname} {student.lastname}</Typography>
                  <Typography variant="body2">Admission No: {student.admission_no}</Typography>
                  <Typography variant="body2">Class: {student.class_name || student.class_id}</Typography>
                  <Typography variant="body2">Section: {student.section_name || student.section_id}</Typography>
                  <Typography variant="body2">Gender: {student.gender}</Typography>
                  <Typography variant="body2">DOB: {student.dob}</Typography>
                  <Typography variant="body2">Mobile: {student.mobileno}</Typography>
                  <Box mt={2} display="flex" gap={1}>
                    <Tooltip title="View">
                      <IconButton color="primary" onClick={() => navigate(`/dashboard/students/profile/${student._id}`)}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton color="secondary" onClick={() => navigate(`/dashboard/students/edit/${student._id}`)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => handleDelete(student._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default StudentDetailsPage;
