import { ArrowUpDown, Inbox, RefreshCw, AlertCircle } from 'lucide-react';
import InquiryTableRow from './InquiryTableRow.jsx';

export default function InquiryTable({
  inquiries = [],
  isLoading = false,
  isError = false,
  error,
  onRefetch,
  onViewDetails,
  onDeleteRequest,
  onStatusChangeSuccess,
  onStatusChangeError,
  onResetFilters,
  sortBy = 'createdAt',
  sortOrder = 'desc',
  onSortChange,
}) {
  const handleSortToggle = (field) => {
    if (!onSortChange) return;
    if (sortBy === field) {
      onSortChange(field, sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      onSortChange(field, 'desc');
    }
  };

  // 1. Error View
  if (isError) {
    return (
      <div className="bg-white border border-rose-200 rounded-2xl p-10 text-center space-y-4 shadow-xs">
        <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto border border-rose-100">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">Failed to load inquiries</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            {error?.data?.message || error?.message || 'A network error occurred while communicating with the backend.'}
          </p>
        </div>
        {onRefetch && (
          <button
            type="button"
            onClick={onRefetch}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <tr>
              <th scope="col" className="px-4 py-3.5">
                Name
              </th>
              <th scope="col" className="px-4 py-3.5">
                Phone
              </th>
              <th scope="col" className="px-4 py-3.5">
                Email
              </th>
              <th scope="col" className="px-4 py-3.5">
                User Type
              </th>
              <th scope="col" className="px-4 py-3.5">
                Category
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 cursor-pointer hover:text-slate-700 select-none"
                onClick={() => handleSortToggle('createdAt')}
              >
                <div className="flex items-center space-x-1">
                  <span>Date</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th scope="col" className="px-4 py-3.5">
                Status
              </th>
              <th scope="col" className="px-4 py-3.5 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {/* Loading Skeletons */}
            {isLoading && (
              <>
                {[...Array(5)].map((_, i) => (
                  <tr key={`skeleton-${i}`} className="animate-pulse">
                    <td className="px-4 py-4">
                      <div className="h-4 bg-slate-200 rounded w-28" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 bg-slate-200 rounded w-24" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 bg-slate-200 rounded w-32" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-5 bg-slate-200 rounded-md w-16" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-5 bg-slate-200 rounded-md w-20" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 bg-slate-200 rounded w-20" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-6 bg-slate-200 rounded-lg w-24" />
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="h-6 bg-slate-200 rounded-lg w-12 ml-auto" />
                    </td>
                  </tr>
                ))}
              </>
            )}

            {/* Empty State */}
            {!isLoading && inquiries.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-16 text-center">
                  <div className="max-w-sm mx-auto space-y-3">
                    <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                      <Inbox className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-slate-800">No inquiries found</h4>
                    <p className="text-xs text-slate-500">
                      No customer inquiries match your current search criteria or filter selections.
                    </p>
                    {onResetFilters && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={onResetFilters}
                          className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-xl transition"
                        >
                          Clear All Filters
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            )}

            {/* Inquiries Rows */}
            {!isLoading &&
              inquiries.map((inquiry) => (
                <InquiryTableRow
                  key={inquiry.id}
                  inquiry={inquiry}
                  onViewDetails={onViewDetails}
                  onDeleteRequest={onDeleteRequest}
                  onStatusChangeSuccess={onStatusChangeSuccess}
                  onStatusChangeError={onStatusChangeError}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
