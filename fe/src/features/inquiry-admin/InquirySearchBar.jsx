import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export default function InquirySearchBar({
  value = '',
  onChange,
  placeholder = 'Search by name or phone number...',
}) {
  const [searchTerm, setSearchTerm] = useState(value);

  // Sync internal input if parent clears value externally
  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  // Debounce notification to parent
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm !== value) {
        onChange(searchTerm);
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [searchTerm, value, onChange]);

  const handleClear = () => {
    setSearchTerm('');
    onChange('');
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <Search className="w-4 h-4" />
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-9 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition shadow-xs"
      />

      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition"
          aria-label="Clear search query"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
