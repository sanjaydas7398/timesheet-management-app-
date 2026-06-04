'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 1) {
      return pages; // No page numbers needed when only one page
    }
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-6 gap-4 w-full">
      <div className="relative w-full sm:w-auto flex justify-center sm:justify-start">
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="w-[118px] h-[36px] text-[13px] font-medium leading-[20px] tracking-normal py-2 pl-[10px] pr-[28px] gap-[6px] text-[#4A5565] border border-[#E5E7EB] rounded-lg focus:outline-none bg-[#F9FAFB] appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%234A5565' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
            backgroundPosition: 'right 0.5rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.25em 1.25em',
          }}
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
        </select>
      </div>

      <div className="w-full sm:w-auto overflow-x-auto flex justify-center sm:justify-end pb-2 sm:pb-0">
        <div className="inline-flex items-center border border-[#E5E7EB] rounded-[100px] overflow-hidden bg-[#F9FAFB]">
          {/* Previous */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 sm:px-4 py-2.5 font-sans font-medium leading-[20px] text-[13px] sm:text-[14px] text-[#6B7280] hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            Previous
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === '...'}
              className={`w-8 sm:w-10 h-10 flex-shrink-0 flex items-center justify-center font-sans leading-[20px] text-[13px] sm:text-[14px] border-l border-[#E5E7EB] transition-colors ${page === currentPage
                ? 'text-[#1C64F2] font-semibold'
                : page === '...'
                  ? 'text-[#6B7280] cursor-default font-normal'
                  : 'text-[#6B7280] hover:bg-gray-100 cursor-pointer font-normal'
                }`}
            >
              {page}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 sm:px-4 py-2.5 font-sans font-medium leading-[20px] text-[13px] sm:text-[14px] text-[#6B7280] border-l border-[#E5E7EB] hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
