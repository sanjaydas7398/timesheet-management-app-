'use client';

interface TimesheetFiltersProps {
  dateRange: string;
  status: string;
  onDateRangeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export function TimesheetFilters({ dateRange, status, onDateRangeChange, onStatusChange }: TimesheetFiltersProps) {
  const dropdownArrow = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`;

  return (
    <div className="flex flex-row w-full sm:w-auto gap-3 sm:gap-4">
      {/* Date Range */}
      <select
        value={dateRange}
        onChange={(e) => onDateRangeChange(e.target.value)}
        className="flex-1 sm:flex-none sm:w-[152px] h-[42px] text-[13px] sm:text-[14px] font-sans font-normal leading-[125%] tracking-normal p-[3px] pl-[12px] pr-[2rem] gap-[10px] text-[#6B7280] border border-[#D1D5DB] rounded-[8px] focus:outline-none bg-white appearance-none cursor-pointer"
        style={{
          backgroundImage: dropdownArrow,
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.25em 1.25em',
        }}
      >
        <option value="">Date Range</option>
        <option value="this-week">This Week</option>
        <option value="last-week">Last Week</option>
        <option value="this-month">This Month</option>
        <option value="last-month">Last Month</option>
      </select>

      {/* Status */}
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="flex-1 sm:flex-none sm:w-[140px] h-[42px] text-[13px] sm:text-[14px] font-sans font-normal leading-[125%] tracking-normal p-[3px] pl-[12px] pr-[2.5rem] gap-[10px] text-[#6B7280] border border-[#D1D5DB] rounded-[8px] focus:outline-none bg-white appearance-none cursor-pointer"
        style={{
          backgroundImage: dropdownArrow,
          backgroundPosition: 'right 0.75rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.25em 1.25em',
        }}
      >
        <option value="">Status</option>
        <option value="COMPLETED">Completed</option>
        <option value="INCOMPLETE">Incomplete</option>
        <option value="MISSING">Missing</option>
      </select>
    </div>
  );
}
