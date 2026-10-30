import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { INQUIRY_STATUSES, INQUIRY_STATUS_LABELS } from '../../config/constants.js';
import { useUpdateInquiryStatusMutation } from '../../store/api/inquiryApi.js';

export default function StatusChangeDropdown({
  inquiryId,
  currentStatus,
  onSuccess,
  onError,
}) {
  const [updateStatus, { isLoading }] = useUpdateInquiryStatusMutation();
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  const handleChange = async (e) => {
    const nextStatus = e.target.value;
    if (nextStatus === currentStatus) return;

    setSelectedStatus(nextStatus);

    try {
      await updateStatus({ id: inquiryId, status: nextStatus }).unwrap();
      if (onSuccess) {
        onSuccess(
          `Inquiry status updated to ${INQUIRY_STATUS_LABELS[nextStatus] || nextStatus}.`,
        );
      }
    } catch (err) {
      // Revert local select on error
      setSelectedStatus(currentStatus);
      const errMsg =
        err?.data?.message || err?.message || 'Failed to update status. Please try again.';
      if (onError) {
        onError(errMsg);
      }
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <select
        value={selectedStatus}
        onChange={handleChange}
        disabled={isLoading}
        aria-label="Update inquiry status"
        className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500
          ${
            isLoading
              ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
              : selectedStatus === 'PENDING'
              ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
              : selectedStatus === 'IN_PROGRESS'
              ? 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
          }
        `}
      >
        {Object.entries(INQUIRY_STATUSES).map(([key, val]) => (
          <option key={key} value={val}>
            {INQUIRY_STATUS_LABELS[val] || val}
          </option>
        ))}
      </select>

      {isLoading && (
        <span className="absolute right-1 pointer-events-none flex items-center pr-1 bg-white/70 rounded">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-600" />
        </span>
      )}
    </div>
  );
}
