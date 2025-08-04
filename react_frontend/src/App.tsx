import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { store } from './store';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import StudentsPage from './pages/students/StudentsPage';
import ClassesPage from './pages/classes/ClassesPage';
import SectionsPage from './pages/sections/SectionsPage';
import SessionsPage from './pages/sessions/SessionsPage';
import FeesPage from './pages/fees/FeesPage';
import LibraryPage from './pages/library/LibraryPage';
import StaffPage from './pages/staff/StaffPage';
import InventoryPage from './pages/inventory/InventoryPage';
import ExamsPage from './pages/exams/ExamsPage';
import AttendancePage from './pages/attendance/AttendancePage';
import TransportPage from './pages/transport/TransportPage';
import HostelPage from './pages/hostel/HostelPage';
import PayrollPage from './pages/payroll/PayrollPage';
import ReportsPage from './pages/reports/ReportsPage';
import SettingsPage from './pages/settings/SettingsPage';
import NotificationsPage from './pages/notifications/NotificationsPage';
import ChatPage from './pages/chat/ChatPage';
import CertificatesPage from './pages/certificates/CertificatesPage';
import HomeworkPage from './pages/homework/HomeworkPage';
import TimetablePage from './pages/timetable/TimetablePage';
import SubjectsPage from './pages/subjects/SubjectsPage';
import AdmissionsPage from './pages/admissions/AdmissionsPage';
import AlumniPage from './pages/alumni/AlumniPage';
import ExpensesPage from './pages/expenses/ExpensesPage';
import IncomePage from './pages/income/IncomePage';
import FrontofficePage from './pages/frontoffice/FrontofficePage';
import PhoneCallLogPage from './pages/frontoffice/PhoneCallLogPage';
import PostalReceivePage from './pages/frontoffice/PostalReceivePage';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <Router>
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
              <Routes>
                {/* Auth Routes */}
                <Route path="/login" element={
                  <AuthLayout>
                    <LoginPage />
                  </AuthLayout>
                } />
                
                {/* Protected Routes */}
                <Route path="/*" element={
                  <ProtectedRoute>
                    <MainLayout>
                      <Routes>
                        <Route index element={<Navigate to="/dashboard" replace />} />
                        <Route path="dashboard" element={<DashboardPage />} />
                        
                        {/* Academic Management */}
                        <Route path="dashboard/students/*" element={<StudentsPage />} />
                        <Route path="dashboard/classes/*" element={<ClassesPage />} />
                        <Route path="dashboard/sections/*" element={<SectionsPage />} />
                        <Route path="dashboard/sessions/*" element={<SessionsPage />} />
                        <Route path="dashboard/subjects/*" element={<SubjectsPage />} />
                        
                        {/* Fee Management */}
                        <Route path="dashboard/fees/*" element={<FeesPage />} />
                        
                        {/* Library Management */}
                        <Route path="dashboard/library/*" element={<LibraryPage />} />
                        
                        {/* Staff Management */}
                        <Route path="dashboard/staff/*" element={<StaffPage />} />
                        
                        {/* Inventory Management */}
                        <Route path="dashboard/inventory/*" element={<InventoryPage />} />
                        
                        {/* Examination System */}
                        <Route path="dashboard/exams/*" element={<ExamsPage />} />
                        
                        {/* Attendance Management */}
                        <Route path="dashboard/attendance/*" element={<AttendancePage />} />
                        
                        {/* Transport Management */}
                        <Route path="dashboard/transport/*" element={<TransportPage />} />
                        
                        {/* Hostel Management */}
                        <Route path="dashboard/hostel/*" element={<HostelPage />} />
                        
                        {/* Payroll Management */}
                        <Route path="dashboard/payroll/*" element={<PayrollPage />} />
                        
                        {/* Reports */}
                        <Route path="dashboard/reports/*" element={<ReportsPage />} />
                        
                        {/* Communication */}
                        <Route path="dashboard/notifications" element={<NotificationsPage />} />
                        <Route path="dashboard/chat/*" element={<ChatPage />} />
                        
                        {/* Academic Tools */}
                        <Route path="dashboard/certificates/*" element={<CertificatesPage />} />
                        <Route path="dashboard/homework/*" element={<HomeworkPage />} />
                        <Route path="dashboard/timetable/*" element={<TimetablePage />} />
                        
                        {/* Admissions */}
                        <Route path="dashboard/admissions/*" element={<AdmissionsPage />} />
                        
                        {/* Alumni */}
                        <Route path="dashboard/alumni/*" element={<AlumniPage />} />
                        
                        {/* Financial Management */}
                        <Route path="dashboard/expenses/*" element={<ExpensesPage />} />
                        <Route path="dashboard/income/*" element={<IncomePage />} />
                        
                        {/* Front Office */}
                        <Route path="/dashboard/frontoffice/postal-receive" element={<PostalReceivePage />} />
                        <Route path="/dashboard/admin/receive" element={<PostalReceivePage />} />
                        <Route path="/dashboard/frontoffice/phone-call-log" element={<PhoneCallLogPage />} />
                        <Route path="dashboard/frontoffice/*" element={<FrontofficePage />} />
                        
                        {/* Settings */}
                        <Route path="dashboard/settings/*" element={<SettingsPage />} />
                      </Routes>
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Box>
          </Router>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
