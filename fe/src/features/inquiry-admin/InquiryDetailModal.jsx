import { Loader2, Mail, Phone, Calendar, User, Tag, Clock, FileText, AlertCircle } from 'lucide-react';
import Modal from '../../components/common/Modal.jsx';
import Badge from '../../components/common/Badge.jsx';
import StatusChangeDropdown from './StatusChangeDropdown.jsx';
import { useGetInquiryByIdQuery } from '../../store/api/inquiryApi.js';
import { formatDateTime } from '../../utils/formatDate.js';
import {
  USER_TYPE_LABELS,
  INQUIRY_CATEGORY_LABELS,
} from '../../config/constants.js';

export default function InquiryDetailModal({
  inquiryId,
  isOpen,
  onClose,
  onStatusUpdateSuccess,
  onStatusUpdateError,
}) {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetInquiryByIdQuery(inquiryId, {
    skip: !inquiryId || !isOpen,
  });

  const inquiry = data?.inquiry;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Inquiry Details"
      size="lg"
    >
      {isLoading && (
        <div className="py-12 flex flex-col items-center justify-center text-slate-500 space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          <p className="text-sm font-medium">Fetching inquiry record...</p>
        </div>
      )}

      {isError && !isLoading && (
        <div className="py-8 text-center space-y-4">
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto border border-rose-100">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-slate-900">Failed to load inquiry</h4>
            <p className="text-sm text-slate-500 mt-1">
              {error?.message || error?.data?.message || 'The requested inquiry could not be retrieved.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => refetch()}
            className="px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl text-xs font-semibold transition"
          >
            Retry Loading
          </button>
        </div>
      )}

      {inquiry && !isLoading && (
        <div className="space-y-6">
          {/* Header Row: Name & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900">{inquiry.name}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <Badge type="userType" value={inquiry.userType} />
                <Badge type="category" value={inquiry.category} />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-slate-500">Status:</span>
              <StatusChangeDropdown
                inquiryId={inquiry.id}
                currentStatus={inquiry.status}
                onSuccess={onStatusUpdateSuccess}
                onError={onStatusUpdateError}
              />
            </div>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-slate-400 font-medium">Email Address</p>
                <a
                  href={`mailto:${inquiry.email}`}
                  className="font-medium text-indigo-600 hover:underline break-all"
                >
                  {inquiry.email}
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-slate-400 font-medium">Phone Number</p>
                <a
                  href={`tel:${inquiry.phone}`}
                  className="font-medium text-slate-800 hover:text-indigo-600"
                >
                  {inquiry.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-slate-400 font-medium">Submitted On</p>
                <p className="font-medium text-slate-700">{formatDateTime(inquiry.createdAt)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-slate-400 font-medium">Last Updated</p>
                <p className="font-medium text-slate-700">{formatDateTime(inquiry.updatedAt)}</p>
              </div>
            </div>
          </div>

          {/* Inquiry Message Box */}
          <div className="space-y-2">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5 text-indigo-600" />
              <span>Inquiry Message</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 text-slate-800 text-sm leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
              {inquiry.message || 'No message content provided.'}
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-100 text-xs text-slate-400">
            <span>ID: <code className="font-mono text-slate-600">{inquiry.id}</code></span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
