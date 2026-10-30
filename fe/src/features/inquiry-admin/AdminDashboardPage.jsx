import { LayoutDashboard, Filter, Search, Table } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
            <LayoutDashboard className="w-6 h-6 text-indigo-600" />
            <span>Inquiry Management Dashboard</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Protected Admin Route shell active. Full CRM table, filters, and status controls will be implemented in Phase 6B.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-3">
            <Search className="w-5 h-5 text-indigo-600 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-800 text-sm">Search Feature Ready</p>
              <p className="text-xs text-slate-500">Query backend by name or phone</p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-3">
            <Filter className="w-5 h-5 text-indigo-600 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-800 text-sm">Filters Configured</p>
              <p className="text-xs text-slate-500">Category, User Type & Status</p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-3">
            <Table className="w-5 h-5 text-indigo-600 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-800 text-sm">RTK Query Wired</p>
              <p className="text-xs text-slate-500">Pagination & status mutations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
