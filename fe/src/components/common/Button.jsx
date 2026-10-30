import { Loader2 } from 'lucide-react';

export default function Button({
  type = 'button',
  variant = 'primary',
  loading = false,
  disabled = false,
  onClick,
  children,
  className = '',
  icon: Icon,
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-xl transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none text-sm px-4 py-2.5';

  const variants = {
    primary:
      'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-sm focus:ring-indigo-500',
    secondary:
      'bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 focus:ring-slate-400',
    outline:
      'border border-slate-300 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 focus:ring-indigo-500',
    danger:
      'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-sm focus:ring-rose-500',
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          <span>Please wait...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 mr-2 -ml-0.5" />}
          {children}
        </>
      )}
    </button>
  );
}
