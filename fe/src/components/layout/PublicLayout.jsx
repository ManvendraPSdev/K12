import { Link, Outlet } from 'react-router-dom';
import { GraduationCap, Shield } from 'lucide-react';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Public Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-100 group-hover:bg-indigo-700 transition">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">K12 Hunnar</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-medium px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                Inquiry Portal
              </span>
            </div>
          </Link>

          <nav className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition"
            >
              Inquiry Form
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center space-x-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-1.5 rounded-lg transition"
            >
              <Shield className="w-4 h-4" />
              <span>Admin Access</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Outlet */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Public Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} K12 Hunnar EdTech. All rights reserved.</p>
      </footer>
    </div>
  );
}
