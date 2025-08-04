import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, Alert, Stack } from '@mui/material';
import { apiService } from '../../services/api';
import { StaffLeave } from '../../types';

interface Props {
  staffId: string;
}

interface LeaveSummary {
  [leaveType: string]: number;
}

export const StaffLeaveSummary: React.FC<Props> = ({ staffId }) => {
  const [summary, setSummary] = useState<LeaveSummary>({});
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    if (!staffId) return;
    setLoading(true);
    setError(null);
    apiService.getStaffLeaves({ staff_id: staffId })
      .then((data) => {
        const leaves = data as StaffLeave[];
        const sum: LeaveSummary = {};
        leaves.forEach(l => {
          sum[l.leave_type] = (sum[l.leave_type] || 0) + 1;
        });
        setSummary(sum);
        setTotal(leaves.length);
      })
      .catch(e => setError(e.message || 'Failed to fetch leave summary'))
      .finally(() => setLoading(false));
  }, [staffId]);

  if (loading) return <CircularProgress size={24} />;
  if (error) return <Alert severity="error">{error}</Alert>;
  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>Leave Summary</Typography>
      {total === 0 ? (
        <Typography color="text.secondary">No leave records found.</Typography>
      ) : (
        <Stack direction="row" spacing={4}>
          <Box>
            <Typography variant="subtitle2">Total Leaves</Typography>
            <Typography variant="h5">{total}</Typography>
          </Box>
          {Object.entries(summary).map(([type, count]) => (
            <Box key={type}>
              <Typography variant="subtitle2">{type} Leave</Typography>
              <Typography variant="h5">{count}</Typography>
            </Box>
          ))}
        </Stack>
      )}
    </Paper>
  );
};

export default StaffLeaveSummary;
