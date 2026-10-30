import {
  USER_TYPE_LABELS,
  INQUIRY_CATEGORY_LABELS,
  INQUIRY_STATUS_LABELS,
  STATUS_COLORS,
} from '../../config/constants.js';

export default function Badge({
  type = 'default',
  value,
  size = 'md',
  className = '',
}) {
  if (!value) return null;

  // 1. Status Badges
  if (type === 'status') {
    const label = INQUIRY_STATUS_LABELS[value] || value;
    const color = STATUS_COLORS[value] || {
      bg: 'bg-slate-50',
      text: 'text-slate-700',
      border: 'border-slate-200',
      dot: 'bg-slate-400',
    };

    const sizeClasses =
      size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

    return (
      <span
        className={`inline-flex items-center space-x-1.5 font-medium rounded-full border ${color.bg} ${color.text} ${color.border} ${sizeClasses} ${className}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${color.dot}`} />
        <span>{label}</span>
      </span>
    );
  }

  // 2. User Type Badges
  if (type === 'userType') {
    const label = USER_TYPE_LABELS[value] || value;
    const styles = {
      PARENT: 'bg-purple-50 text-purple-700 border-purple-200',
      STUDENT: 'bg-sky-50 text-sky-700 border-sky-200',
      SCHOOL: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    }[value] || 'bg-slate-50 text-slate-700 border-slate-200';

    return (
      <span
        className={`inline-flex items-center font-medium rounded-md border px-2 py-0.5 text-xs ${styles} ${className}`}
      >
        {label}
      </span>
    );
  }

  // 3. Category Badges
  if (type === 'category') {
    const label = INQUIRY_CATEGORY_LABELS[value] || value;
    const styles = {
      SCHOLARSHIP: 'bg-amber-50 text-amber-800 border-amber-200',
      CONCERT: 'bg-rose-50 text-rose-700 border-rose-200',
      ADMISSION: 'bg-teal-50 text-teal-700 border-teal-200',
      GENERAL_QUERY: 'bg-slate-100 text-slate-700 border-slate-200',
    }[value] || 'bg-slate-50 text-slate-700 border-slate-200';

    return (
      <span
        className={`inline-flex items-center font-medium rounded-md border px-2 py-0.5 text-xs ${styles} ${className}`}
      >
        {label}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center font-medium rounded-md border bg-slate-50 text-slate-700 border-slate-200 px-2 py-0.5 text-xs ${className}`}
    >
      {value}
    </span>
  );
}
