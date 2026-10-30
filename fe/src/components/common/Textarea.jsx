export default function Textarea({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  rows = 4,
  maxLength,
  error,
  required = false,
  disabled = false,
  className = '',
  helperText,
}) {
  const textareaId = id || name;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-1.5">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-slate-700">
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
        )}
        {maxLength && (
          <span className="text-xs text-slate-400">
            {(value || '').length}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        id={textareaId}
        name={name}
        rows={rows}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 transition outline-none resize-y bg-white
          ${
            error
              ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100'
              : 'border-slate-300 hover:border-slate-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100'
          }
          ${disabled ? 'bg-slate-50 cursor-not-allowed opacity-60' : ''}
        `}
      />
      {error && (
        <p id={`${textareaId}-error`} className="mt-1 text-xs text-rose-600 font-medium">
          {error}
        </p>
      )}
      {!error && helperText && <p className="mt-1 text-xs text-slate-500">{helperText}</p>}
    </div>
  );
}
