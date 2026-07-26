import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Pagination = ({ page, totalPages, onPageChange }) => {
  const { t } = useTranslation();

  if (totalPages <= 1) return null;

  // Builds a windowed list of page numbers with "..." gaps,
  // e.g. [1, "...", 4, 5, 6, "...", 20] so the row never overflows
  // even when there are many pages.
  const getPageNumbers = () => {
    const delta = 1;
    const range = [];

    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(totalPages - 1, page + delta);
      i++
    ) {
      range.push(i);
    }

    if (page - delta > 2) range.unshift("...left");
    if (page + delta < totalPages - 1) range.push("...right");

    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  const pages = getPageNumbers();

  return (
    <div className="mt-10">
      {/* Mobile: compact Prev / Page X of Y / Next */}
      <div className="flex sm:hidden items-center justify-between gap-3">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium disabled:bg-gray-300 shrink-0"
        >
          <FaChevronLeft size={12} />
        </button>

        <span className="text-sm font-medium text-gray-600 shrink-0">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium disabled:bg-gray-300 shrink-0"
        >
          <FaChevronRight size={12} />
        </button>
      </div>

      {/* Tablet / desktop: full numbered pagination, wraps if needed */}
      <div className="hidden sm:flex flex-wrap justify-center items-center gap-2">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:bg-gray-300 text-sm md:text-base"
        >
          {t("common.previous")}
        </button>

        {pages.map((p) =>
          typeof p === "string" ? (
            <span
              key={p}
              className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-gray-400"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-9 h-9 md:w-10 md:h-10 rounded-lg text-sm md:text-base ${
                page === p ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:bg-gray-300 text-sm md:text-base"
        >
          {t("common.next")}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
