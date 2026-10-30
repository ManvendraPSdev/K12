import { useState, useCallback, useEffect } from 'react';
import {
  LayoutDashboard,
  RefreshCw,
  SlidersHorizontal,
  CheckCircle2,
  X,
  RotateCcw,
} from 'lucide-react';
import InquiryTable from './InquiryTable.jsx';
import InquirySearchBar from './InquirySearchBar.jsx';
import InquiryFilters from './InquiryFilters.jsx';
import Pagination from '../../components/common/Pagination.jsx';
import InquiryDetailModal from './InquiryDetailModal.jsx';
import DeleteConfirmModal from './DeleteConfirmModal.jsx';
import { useGetInquiriesQuery } from '../../store/api/inquiryApi.js';
import { DEFAULT_PAGE_LIMIT } from '../../config/constants.js';

export default function AdminDashboardPage() {
  // Query Filters & Pagination State
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(DEFAULT_PAGE_LIMIT);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [userType, setUserType] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // Modals & Notifications
  const [selectedInquiryId, setSelectedInquiryId] = useState(null);
  const [inquiryToDelete, setInquiryToDelete] = useState(null);
  const [notification, setNotification] = useState(null);

  // Auto-dismiss feedback notification after 4 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Construct query parameters matching backend validator
  const queryParams = {
    page,
    limit,
    sortBy,
    sortOrder,
    ...(search ? { search: search.trim() } : {}),
    ...(category ? { category } : {}),
    ...(userType ? { userType } : {}),
    ...(status ? { status } : {}),
  };

  // Fetch inquiries with RTK Query
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetInquiriesQuery(queryParams);

  const inquiries = data?.inquiries || [];
  const pagination = data?.pagination || {
    page: 1,
    limit,
    total: 0,
    totalPages: 0,
  };

  // Search handler (resets page to 1)
  const handleSearchChange = useCallback((newSearch) => {
    setSearch(newSearch);
    setPage(1);
  }, []);

  // Filter change handler (resets page to 1)
  const handleFilterChange = useCallback((key, value) => {
    if (key === 'category') setCategory(value);
    if (key === 'userType') setUserType(value);
    if (key === 'status') setStatus(value);
    setPage(1);
  }, []);

  // Reset all filters & search
  const handleResetFilters = useCallback(() => {
    setSearch('');
    setCategory('');
    setUserType('');
    setStatus('');
    setPage(1);
  }, []);

  // Sort change handler
  const handleSortChange = useCallback((newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setPage(1);
  }, []);

  // Page limit change handler
  const handleLimitChange = useCallback((newLimit) => {
    setLimit(newLimit);
    setPage(1);
  }, []);

  // Handle status update notifications
  const handleStatusChangeSuccess = (message) => {
    setNotification({ type: 'success', message });
  };

  const handleStatusChangeError = (message) => {
    setNotification({ type: 'error', message });
  };

  // Handle delete completion
  const handleDeleteSuccess = (message) => {
    setNotification({ type: 'success', message });

    // If deleting the last item on the page, navigate back one page if applicable
    if (inquiries.length <= 1 && page > 1) {
      setPage((prev) => Math.max(1, prev - 1));
    }
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Inquiry Management
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
              {pagination.total} Total
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review admissions, scholarship queries, and event registrations submitted by students and parents.
          </p>
        </div>

        {/* Manual Refresh Button */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition shadow-2xs disabled:opacity-50"
            title="Refresh inquiry records"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 text-slate-500 ${isFetching ? 'animate-spin text-indigo-600' : ''}`}
            />
            <span>{isFetching ? 'Updating...' : 'Refresh Data'}</span>
          </button>
        </div>
      </div>

      {/* Toast Notification Banner */}
      {notification && (
        <div
          role="status"
          className={`px-4 py-3 rounded-xl border flex items-center justify-between text-xs sm:text-sm shadow-xs transition-all ${
            notification.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
            <span className="font-medium">{notification.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="p-1 text-slate-400 hover:text-slate-600 transition"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Filter and Search Bar Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Bar */}
          <InquirySearchBar
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by name or phone number..."
          />

          {/* Filter Dropdowns */}
          <InquiryFilters
            category={category}
            userType={userType}
            status={status}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />
        </div>
      </div>

      {/* Inquiry Data Table */}
      <InquiryTable
        inquiries={inquiries}
        isLoading={isLoading}
        isError={isError}
        error={error}
        onRefetch={refetch}
        onViewDetails={(id) => setSelectedInquiryId(id)}
        onDeleteRequest={(inquiry) => setInquiryToDelete(inquiry)}
        onStatusChangeSuccess={handleStatusChangeSuccess}
        onStatusChangeError={handleStatusChangeError}
        onResetFilters={handleResetFilters}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />

      {/* Server-Side Pagination */}
      {!isLoading && !isError && pagination.total > 0 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          totalItems={pagination.total}
          limit={pagination.limit}
          onPageChange={(newPage) => setPage(newPage)}
          onLimitChange={handleLimitChange}
        />
      )}

      {/* Inquiry Details Modal */}
      <InquiryDetailModal
        inquiryId={selectedInquiryId}
        isOpen={Boolean(selectedInquiryId)}
        onClose={() => setSelectedInquiryId(null)}
        onStatusUpdateSuccess={handleStatusChangeSuccess}
        onStatusUpdateError={handleStatusChangeError}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        inquiry={inquiryToDelete}
        isOpen={Boolean(inquiryToDelete)}
        onClose={() => setInquiryToDelete(null)}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </div>
  );
}
