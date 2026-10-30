import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export default function Alert({
  type = 'info',
  title,
  message,
  errors = [],
  onClose,
  className = '',
}) {
  const styles = {
    success: {
      container: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      icon: CheckCircle2,
      iconColor: 'text-emerald-500',
    },
    error: {
      container: 'bg-rose-50 border-rose-200 text-rose-800',
      icon: XCircle,
      iconColor: 'text-rose-500',
    },
    warning: {
      container: 'bg-amber-50 border-amber-200 text-amber-800',
      icon: AlertTriangle,
      iconColor: 'text-amber-500',
    },
    info: {
      container: 'bg-indigo-50 border-indigo-200 text-indigo-800',
      icon: Info,
      iconColor: 'text-indigo-500',
    },
  };

  const current = styles[type] || styles.info;
  const IconComponent = current.icon;

  return (
    <div
      role="alert"
      className={`border rounded-xl p-4 flex items-start space-x-3 text-sm ${current.container} ${className}`}
    >
      <IconComponent className={`w-5 h-5 flex-shrink-0 mt-0.5 ${current.iconColor}`} />
      <div className="flex-1">
        {title && <h4 className="font-semibold">{title}</h4>}
        {message && <p className={title ? 'mt-1' : ''}>{message}</p>}
        {errors && errors.length > 0 && (
          <ul className="mt-2 list-disc list-inside space-y-1 text-xs">
            {errors.map((err, idx) => (
              <li key={idx}>
                {err.field ? <strong className="capitalize">{err.field}: </strong> : null}
                {err.message}
              </li>
            ))}
          </ul>
        )}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 transition -mr-1 -mt-1 p-1"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
