import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

import AdmissionEnquiryPage from './AdmissionEnquiryPage';
import VisitorBookPage from './VisitorBookPage';
import ComplainPage from './ComplainPage';
import DispatchPage from './DispatchPage';
import SetupMastersPage from './setup/SetupMastersPage';
// Future: lazy load other front office submodules here

const FrontofficePage: React.FC = () => {
  const location = useLocation();
  console.log("FrontofficePage mounted", location);
  console.log("FrontofficePage mounted");
  return (
    <Box sx={{ width: '100%' }}>
      <Suspense fallback={<Box display="flex" justifyContent="center" mt={8}><CircularProgress /></Box>}>
        <Routes>
          <Route index element={<Navigate to="enquiry" replace />} />
          <Route path="enquiry/*" element={<AdmissionEnquiryPage />} />
          <Route path="visitor-book/*" element={<VisitorBookPage />} />
          <Route path="complain/*" element={<ComplainPage />} />
          <Route path="dispatch/*" element={<DispatchPage />} />
          <Route path="setup/*" element={<SetupMastersPage />} />
          {/* TODO: Add other submodule routes here (visitor-book, phone-call-log, etc.) */}
          <Route path="*" element={<div>Unknown front office route</div>} />
        </Routes>
      </Suspense>
    </Box>
  );
};

export default FrontofficePage;
