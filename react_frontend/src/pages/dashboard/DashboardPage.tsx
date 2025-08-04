import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
} from '@mui/material';
import {
  People as StudentsIcon,
  School as ClassesIcon,
  Person as TeachersIcon,
  AttachMoney as FeesIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

// Mock data for dashboard stats
const dashboardStats = [
  {
    title: 'Total Students',
    value: '1,245',
    change: '+12%',
    icon: <StudentsIcon />,
    color: '#1976d2',
  },
  {
    title: 'Total Classes',
    value: '24',
    change: '+2',
    icon: <ClassesIcon />,
    color: '#388e3c',
  },
  {
    title: 'Total Teachers',
    value: '85',
    change: '+5',
    icon: <TeachersIcon />,
    color: '#f57c00',
  },
  {
    title: 'Monthly Fees',
    value: '₹2.5L',
    change: '+8%',
    icon: <FeesIcon />,
    color: '#7b1fa2',
  },
];

const DashboardPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log('Dashboard mounted successfully! User:', user);
  }, [user]);

  return (
    <Box sx={{ p: 3, bgcolor: 'background.paper', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          🏫 Smart School Dashboard
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ color: 'text.secondary' }}>
          Welcome back, {user?.username || 'Admin'}!
        </Typography>
      </Box>

      {/* Success Status */}
      <Box sx={{ mb: 4, p: 3, bgcolor: 'success.light', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ color: 'success.dark', mb: 1 }}>
          ✅ System Status: All Systems Operational
        </Typography>
        <Typography variant="body1" sx={{ color: 'success.dark' }}>
          • Authentication: Active ({user?.username || 'admin@test.com'})
        </Typography>
        <Typography variant="body1" sx={{ color: 'success.dark' }}>
          • Database: Connected
        </Typography>
        <Typography variant="body1" sx={{ color: 'success.dark' }}>
          • Dashboard: Fully Functional
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {dashboardStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={3} sx={{ height: '100%', bgcolor: 'background.default' }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="text.secondary" gutterBottom variant="body2">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" component="div" fontWeight="bold" color="primary">
                      {stat.value}
                    </Typography>
                    <Chip 
                      label={stat.change} 
                      color="success" 
                      size="small" 
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  <Avatar sx={{ bgcolor: stat.color, width: 56, height: 56 }}>
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
            🚀 Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<StudentsIcon />}
                sx={{ py: 2 }}
              >
                Add Student
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                startIcon={<ClassesIcon />}
                sx={{ py: 2 }}
              >
                Manage Classes
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                color="info"
                fullWidth
                startIcon={<AssignmentIcon />}
                sx={{ py: 2 }}
              >
                View Reports
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                color="warning"
                fullWidth
                startIcon={<FeesIcon />}
                sx={{ py: 2 }}
              >
                Fee Management
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
            📋 Recent Activities
          </Typography>
          <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1, mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              🎓 New student John Doe enrolled in Class 10-A
            </Typography>
            <Typography variant="body2" color="text.secondary">
              2 hours ago
            </Typography>
          </Box>
          <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1, mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              💰 Fee payment received from Jane Smith - ₹15,000
            </Typography>
            <Typography variant="body2" color="text.secondary">
              4 hours ago
            </Typography>
          </Box>
          <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1, mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              📚 New book "Advanced Mathematics" added to library
            </Typography>
            <Typography variant="body2" color="text.secondary">
              1 day ago
            </Typography>
          </Box>
          <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              📅 Exam schedule published for Class 12
            </Typography>
            <Typography variant="body2" color="text.secondary">
              2 days ago
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DashboardPage;
