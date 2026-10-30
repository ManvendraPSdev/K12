import { Link } from 'react-router-dom';
import { Lock, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center mx-auto text-indigo-600">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Admin Portal</h2>
          <p className="text-sm text-slate-500">
            Shell page ready. Authentication form and Bearer JWT integration will be finalized in Phase 6B.
          </p>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1">
          <div className="flex items-center space-x-1.5 font-semibold text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Auth State Configuration:</span>
          </div>
          <p>• Redux auth slice configured with loginAdmin thunk.</p>
          <p>• Axios Bearer token interceptors active.</p>
          <p>• Token stored in localStorage (passwords never stored).</p>
        </div>

        <div className="flex justify-between items-center pt-2">
          <Link
            to="/"
            className="inline-flex items-center space-x-1 text-sm text-slate-600 hover:text-indigo-600"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Public View</span>
          </Link>
          <Link
            to="/admin"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Test Protected Route &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
