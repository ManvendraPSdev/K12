import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import PublicInquiryPage from './features/inquiry-public/PublicInquiryPage';
import LoginPage from './features/auth/LoginPage';
import AdminDashboardPage from './features/inquiry-admin/AdminDashboardPage';
import NotFoundPage from './components/common/NotFoundPage';
import { fetchCurrentAdmin } from './store/slices/authSlice';

export default function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    // If token exists in local storage on boot, verify and sync profile
    if (token) {
      dispatch(fetchCurrentAdmin());
    }
  }, [dispatch, token]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<PublicInquiryPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
        </Route>
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
