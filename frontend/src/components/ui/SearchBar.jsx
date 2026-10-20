import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

/**
 * Reusable debounced search bar
 *
 * @param {string} value - Current value
 * @param {Function} onChange - Callback triggered after debounce
 * @param {string} placeholder - Input placeholder
 * @param {number} delay - Debounce delay in ms (default 300)
 */
const SearchBar = ({
  value: initialValue = "",
  onChange,
  placeholder = "Search...",
  delay = 300,
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (onChange && searchTerm !== initialValue) {
        onChange(searchTerm);
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [searchTerm, delay, onChange, initialValue]);

  const handleClear = () => {
    setSearchTerm("");
    if (onChange) onChange("");
  };

  return (
    <div className={`relative flex items-center w-full max-w-md ${className}`}>
      <Search className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
      />
      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 p-0.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          title="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
