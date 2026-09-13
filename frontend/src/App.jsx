import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import CustomCursor from './components/common/CustomCursor';
import DashboardLayout from './components/dashboard/DashboardLayout';

import Home from './pages/public/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ReportsPage from './pages/ReportsPage';

import AdminDashboard from './pages/admin/AdminDashboard';
import StudentsPage from './pages/admin/StudentsPage';
import FinanceUsersPage from './pages/admin/FinanceUsersPage';
import FeeOverviewPage from './pages/admin/FeeOverviewPage';

import FinanceDashboard from './pages/finance/FinanceDashboard';
import StudentFeeListPage from './pages/finance/StudentFeeListPage';
import FeeManagementPage from './pages/finance/FeeManagementPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CustomCursor />
        <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<DashboardLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="students" element={<StudentsPage />} />
              <Route path="finance-users" element={<FinanceUsersPage />} />
              <Route path="fees" element={<FeeOverviewPage />} />
              <Route path="reports" element={<ReportsPage />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['finance']} />}>
            <Route path="/finance" element={<DashboardLayout />}>
              <Route path="dashboard" element={<FinanceDashboard />} />
              <Route path="students" element={<StudentFeeListPage />} />
              <Route path="fees" element={<FeeManagementPage />} />
              <Route path="reports" element={<ReportsPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
