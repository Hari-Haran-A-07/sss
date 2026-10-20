import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Reusable Pagination Controls
 */
const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange,
  className = "",
}) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 text-sm text-gray-600 ${className}`}
    >
      {totalItems > 0 && (
        <span className="text-xs text-gray-500">
          Showing page <span className="font-semibold text-gray-800">{currentPage}</span> of{" "}
          <span className="font-semibold text-gray-800">{totalPages}</span> ({totalItems} total)
        </span>
      )}

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4 text-gray-700" />
        </button>

        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`min-w-[32px] h-8 px-2.5 rounded-lg text-xs font-medium transition-all ${
              p === currentPage
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
