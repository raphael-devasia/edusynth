import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const CertificatesPage: React.FC = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Certificates Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Generate and manage student certificates and documents
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} size="large">
          Generate Certificate
        </Button>
      </Box>
      <Typography>Certificates management interface will be implemented here</Typography>
    </Box>
  );
};

export default CertificatesPage;
