import { Routes, Route, Navigate } from 'react-router-dom';
import StudentListPage from './StudentListPage';
import StudentCreatePage from './StudentCreatePage';
import StudentEditPage from './StudentEditPage';
import StudentProfilePage from './StudentProfilePage';
import StudentSearchPage from './StudentSearchPage';
import StudentImportPage from './StudentImportPage';
import StudentBulkDeletePage from './StudentBulkDeletePage';
import StudentBulkMailPage from './StudentBulkMailPage';
import StudentMultiClassPage from './StudentMultiClassPage';
import StudentProfileSettingsPage from './StudentProfileSettingsPage';
import StudentDetailsPage from './StudentDetailsPage';
import OnlineAdmissionPage from './OnlineAdmissionPage';

const StudentsPage: React.FC = () => {
  return (
    <Routes>
      <Route index element={<StudentListPage />} />
      <Route path="list" element={<StudentListPage />} />
      <Route path="create" element={<StudentCreatePage />} />
      <Route path="edit/:id" element={<StudentEditPage />} />
      <Route path="profile/:id" element={<StudentProfilePage />} />
      <Route path="search" element={<StudentSearchPage />} />
      <Route path="import" element={<StudentImportPage />} />
      <Route path="bulk-delete" element={<StudentBulkDeletePage />} />
      <Route path="bulk-mail" element={<StudentBulkMailPage />} />
      <Route path="multi-class" element={<StudentMultiClassPage />} />
      <Route path="profile-settings" element={<StudentProfileSettingsPage />} />
      <Route path="online-admission" element={<OnlineAdmissionPage />} />
      <Route path="details" element={<StudentDetailsPage />} />
      <Route path="*" element={<Navigate to="list" replace />} />
    </Routes>
  );
};

export default StudentsPage;
