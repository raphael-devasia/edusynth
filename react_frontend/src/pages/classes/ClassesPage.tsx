import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  School as SchoolIcon,
} from '@mui/icons-material';

// Mock classes data
const mockClasses = [
  {
    id: '1',
    name: 'Class 10',
    sections: ['A', 'B', 'C'],
    totalStudents: 120,
    classTeacher: 'Mrs. Johnson',
    subjects: 8,
    isActive: true
  },
  {
    id: '2',
    name: 'Class 9',
    sections: ['A', 'B'],
    totalStudents: 85,
    classTeacher: 'Mr. Smith',
    subjects: 7,
    isActive: true
  },
  {
    id: '3',
    name: 'Class 8',
    sections: ['A', 'B', 'C', 'D'],
    totalStudents: 150,
    classTeacher: 'Ms. Davis',
    subjects: 6,
    isActive: true
  },
  {
    id: '4',
    name: 'Class 7',
    sections: ['A', 'B'],
    totalStudents: 78,
    classTeacher: 'Mr. Wilson',
    subjects: 6,
    isActive: false
  }
];

const ClassesPage: React.FC = () => {
  const [classes] = useState(mockClasses);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
            📚 Classes Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage class information and academic structure
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} size="large">
          Add New Class
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Total Classes
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="bold" color="primary">
                    {classes.length}
                  </Typography>
                </Box>
                <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Total Sections
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="bold" color="success.main">
                    {classes.reduce((acc, cls) => acc + cls.sections.length, 0)}
                  </Typography>
                </Box>
                <SchoolIcon sx={{ fontSize: 40, color: 'success.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Total Students
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="bold" color="warning.main">
                    {classes.reduce((acc, cls) => acc + cls.totalStudents, 0)}
                  </Typography>
                </Box>
                <SchoolIcon sx={{ fontSize: 40, color: 'warning.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Active Classes
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="bold" color="info.main">
                    {classes.filter(cls => cls.isActive).length}
                  </Typography>
                </Box>
                <SchoolIcon sx={{ fontSize: 40, color: 'info.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Classes Table */}
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
            Classes List
          </Typography>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell><strong>Class Name</strong></TableCell>
                  <TableCell><strong>Sections</strong></TableCell>
                  <TableCell><strong>Students</strong></TableCell>
                  <TableCell><strong>Class Teacher</strong></TableCell>
                  <TableCell><strong>Subjects</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {classes.map((classItem) => (
                  <TableRow key={classItem.id} hover>
                    <TableCell>
                      <Typography variant="body1" fontWeight="medium">
                        {classItem.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={0.5} flexWrap="wrap">
                        {classItem.sections.map((section) => (
                          <Chip
                            key={section}
                            label={section}
                            size="small"
                            variant="outlined"
                            color="primary"
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.primary">
                        {classItem.totalStudents}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {classItem.classTeacher}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {classItem.subjects} subjects
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={classItem.isActive ? 'Active' : 'Inactive'}
                        color={classItem.isActive ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <IconButton size="small" color="info">
                          <ViewIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="primary">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ClassesPage;
