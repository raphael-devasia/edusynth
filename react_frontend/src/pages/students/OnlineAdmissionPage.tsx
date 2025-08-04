import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, CircularProgress } from '@mui/material';

const OnlineAdmissionPage: React.FC = () => {
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdmissions = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/online-admission');
        setAdmissions(res.data as any[]);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmissions();
  }, []);

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>Online Admission Applications</Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Reference No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admissions.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.reference_no}</TableCell>
                  <TableCell>{row.firstname} {row.lastname}</TableCell>
                  <TableCell>{row.mobileno}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    <Button size="small" variant="contained" color="primary">View/Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default OnlineAdmissionPage;
