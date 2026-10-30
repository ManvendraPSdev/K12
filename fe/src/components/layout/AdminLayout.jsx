import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { LogOut, LayoutDashboard, UserCheck, GraduationCap } from 'lucide-react';
import { logoutAdmin } from '../../store/slices/authSlice';

export default function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutAdmin());
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800">
      {/* Admin Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/admin" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm">
                <GraduationCap className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900 tracking-tight">K12 CRM</span>
                <span className="ml-2 text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
                  Admin Workspace
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-2">
              <Link
                to="/admin"
                className="inline-flex items-center space-x-2 text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Inquiries CRM</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-medium text-slate-800">{admin?.name || 'Administrator'}</span>
              <span className="text-xs text-slate-400 hidden sm:inline">({admin?.email})</span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center space-x-1.5 text-sm font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition"
              title="Sign out of Admin Dashboard"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
