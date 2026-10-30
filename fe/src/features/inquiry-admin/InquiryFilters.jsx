import { Filter, RotateCcw } from 'lucide-react';
import {
  USER_TYPES,
  USER_TYPE_LABELS,
  INQUIRY_CATEGORIES,
  INQUIRY_CATEGORY_LABELS,
  INQUIRY_STATUSES,
  INQUIRY_STATUS_LABELS,
} from '../../config/constants.js';

export default function InquiryFilters({
  category = '',
  userType = '',
  status = '',
  onFilterChange,
  onResetFilters,
}) {
  const hasActiveFilters = Boolean(category || userType || status);

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {/* Category Filter */}
      <div className="relative">
        <select
          value={category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          aria-label="Filter by category"
          className="appearance-none pl-3 pr-8 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition shadow-xs cursor-pointer"
        >
          <option value="">All Categories</option>
          {Object.entries(INQUIRY_CATEGORIES).map(([key, val]) => (
            <option key={key} value={val}>
              {INQUIRY_CATEGORY_LABELS[val] || val}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>

      {/* User Type Filter */}
      <div className="relative">
        <select
          value={userType}
          onChange={(e) => onFilterChange('userType', e.target.value)}
          aria-label="Filter by user type"
          className="appearance-none pl-3 pr-8 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition shadow-xs cursor-pointer"
        >
          <option value="">All User Types</option>
          {Object.entries(USER_TYPES).map(([key, val]) => (
            <option key={key} value={val}>
              {USER_TYPE_LABELS[val] || val}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>

      {/* Status Filter */}
      <div className="relative">
        <select
          value={status}
          onChange={(e) => onFilterChange('status', e.target.value)}
          aria-label="Filter by status"
          className="appearance-none pl-3 pr-8 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition shadow-xs cursor-pointer"
        >
          <option value="">All Statuses</option>
          {Object.entries(INQUIRY_STATUSES).map(([key, val]) => (
            <option key={key} value={val}>
              {INQUIRY_STATUS_LABELS[val] || val}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>

      {/* Reset Filters Button */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition cursor-pointer"
          title="Reset all filters"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      )}
    </div>
  );
}
