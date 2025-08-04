import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
} from '@mui/material';
import { School as SchoolIcon } from '@mui/icons-material';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                textAlign: 'center',
                color: 'white',
                mb: { xs: 4, md: 0 },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3,
                }}
              >
                <SchoolIcon sx={{ fontSize: 60, mr: 2 }} />
                <Typography variant="h3" component="h1" fontWeight="bold">
                  Smart School
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ mb: 2, opacity: 0.9 }}>
                Management System
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.8, maxWidth: 400, mx: 'auto' }}>
                Streamline your educational institution with our comprehensive 
                school management solution. Manage students, staff, academics, 
                and operations all in one place.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Paper
                elevation={24}
                sx={{
                  p: 4,
                  width: '100%',
                  maxWidth: 400,
                  borderRadius: 3,
                }}
              >
                {children}
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AuthLayout;
