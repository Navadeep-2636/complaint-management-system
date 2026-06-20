import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

// Auth pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// User pages
import UserDashboard from './pages/user/UserDashboard';
import CreateComplaintPage from './pages/user/CreateComplaintPage';
import MyComplaintsPage from './pages/user/MyComplaintsPage';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AllComplaintsPage from './pages/admin/AllComplaintsPage';
import ManageComplaintsPage from './pages/admin/ManageComplaintsPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* User Protected */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/dashboard/create" element={<CreateComplaintPage />} />
            <Route path="/dashboard/my-complaints" element={<MyComplaintsPage />} />
          </Route>

          {/* Admin Protected */}
          <Route element={<ProtectedRoute adminOnly />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/all-complaints" element={<AllComplaintsPage />} />
            <Route path="/admin/manage" element={<ManageComplaintsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
