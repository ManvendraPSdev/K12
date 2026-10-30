import { Eye, Trash2 } from 'lucide-react';
import Badge from '../../components/common/Badge.jsx';
import StatusChangeDropdown from './StatusChangeDropdown.jsx';
import { formatDate } from '../../utils/formatDate.js';

export default function InquiryTableRow({
  inquiry,
  onViewDetails,
  onDeleteRequest,
  onStatusChangeSuccess,
  onStatusChangeError,
}) {
  return (
    <tr className="hover:bg-slate-50/80 transition duration-100 ease-in-out border-b border-slate-100">
      {/* 1. Name */}
      <td className="px-4 py-3.5 whitespace-nowrap">
        <div className="font-semibold text-sm text-slate-900">{inquiry.name}</div>
      </td>

      {/* 2. Phone */}
      <td className="px-4 py-3.5 whitespace-nowrap text-xs sm:text-sm text-slate-600 font-mono">
        <a
          href={`tel:${inquiry.phone}`}
          className="hover:text-indigo-600 transition"
          title={`Call ${inquiry.phone}`}
        >
          {inquiry.phone}
        </a>
      </td>

      {/* 3. Email */}
      <td className="px-4 py-3.5 whitespace-nowrap text-xs sm:text-sm text-slate-600">
        <a
          href={`mailto:${inquiry.email}`}
          className="hover:text-indigo-600 hover:underline transition"
          title={`Email ${inquiry.email}`}
        >
          {inquiry.email}
        </a>
      </td>

      {/* 4. User Type */}
      <td className="px-4 py-3.5 whitespace-nowrap">
        <Badge type="userType" value={inquiry.userType} />
      </td>

      {/* 5. Category */}
      <td className="px-4 py-3.5 whitespace-nowrap">
        <Badge type="category" value={inquiry.category} />
      </td>

      {/* 6. Date */}
      <td className="px-4 py-3.5 whitespace-nowrap text-xs text-slate-500">
        {formatDate(inquiry.createdAt)}
      </td>

      {/* 7. Status */}
      <td className="px-4 py-3.5 whitespace-nowrap">
        <StatusChangeDropdown
          inquiryId={inquiry.id}
          currentStatus={inquiry.status}
          onSuccess={onStatusChangeSuccess}
          onError={onStatusChangeError}
        />
      </td>

      {/* 8. Actions */}
      <td className="px-4 py-3.5 whitespace-nowrap text-right text-xs">
        <div className="flex items-center justify-end space-x-1.5">
          {/* View Details Button */}
          <button
            type="button"
            onClick={() => onViewDetails(inquiry.id)}
            className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/50 transition cursor-pointer font-medium"
            title="View Full Inquiry Details"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">View</span>
          </button>

          {/* Delete Button */}
          <button
            type="button"
            onClick={() => onDeleteRequest(inquiry)}
            className="inline-flex items-center p-1.5 rounded-lg border border-transparent text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition cursor-pointer"
            title="Delete Inquiry"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}
