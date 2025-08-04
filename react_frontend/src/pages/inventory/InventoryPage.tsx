import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const InventoryPage: React.FC = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Inventory Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage school inventory, items, and stock levels
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} size="large">
          Add Item
        </Button>
      </Box>
      <Typography>Inventory management interface will be implemented here</Typography>
    </Box>
  );
};

export default InventoryPage;
