const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-10 gap-2">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:bg-gray-300"
      >
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`w-10 h-10 rounded-lg ${
            page === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
