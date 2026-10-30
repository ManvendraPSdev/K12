import { useSelector } from 'react-redux';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { Shield, ArrowLeft, Loader2 } from 'lucide-react';
import LoginForm from './LoginForm';

export default function LoginPage() {
  const { isAuthenticated, token, isCheckingAuth } = useSelector((state) => state.auth);
  const location = useLocation();

  const destination = location.state?.from?.pathname || '/admin';

  // 1. Show loader while checking startup session
  if (isCheckingAuth) {
    return (
      <div className="min-h-[420px] flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto" />
          <p className="text-xs text-slate-500 font-medium">Checking administrative session...</p>
        </div>
      </div>
    );
  }

  // 2. Redirect already authenticated users away from /login to /admin
  if (isAuthenticated && token) {
    return <Navigate to={destination} replace />;
  }

  return (
    <div className="max-w-md mx-auto py-8 sm:py-12 px-4">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center mx-auto text-indigo-600 shadow-sm">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Portal</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Sign in with administrative credentials to manage inquiries, update statuses, and review CRM data.
          </p>
        </div>

        <LoginForm />

        <div className="pt-4 border-t border-slate-100 text-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-indigo-600 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Inquiry Portal</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
