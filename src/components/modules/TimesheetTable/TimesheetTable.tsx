'use client';

import { Timesheet, TimesheetStatus } from '@/types/timesheet.types';
import { Badge, BadgeVariant } from '@/components/ui/Badge';

interface TimesheetTableProps {
  timesheets: Timesheet[];
  onViewUpdate?: (timesheet: Timesheet) => void;
}

const actionText: Record<TimesheetStatus, string> = {
  COMPLETED: 'View',
  INCOMPLETE: 'Update',
  MISSING: 'Create',
};

export function TimesheetTable({ timesheets, onViewUpdate }: TimesheetTableProps) {
  const formatDateRange = (startDate: string, endDate: string): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startDay = start.getDate();
    const endDay = end.getDate();
    const month = end.toLocaleDateString('en-US', { month: 'long' });
    const year = end.getFullYear();
    
    return `${startDay} - ${endDay} ${month}, ${year}`;
  };

  return (
    <div className="overflow-x-auto -mx-3 sm:-mx-0">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)]">
          <table className="w-full block sm:table">
            <thead className="bg-[#F9FAFB] hidden sm:table-header-group">
              <tr className="border-b border-gray-200">
                {/* WEEK # Column */}
                <th className="w-auto sm:w-[120px] px-4 sm:px-6 py-3 text-left">
                  <div className="flex items-center gap-2 sm:gap-10">
                    <span 
                      className="text-[12px] font-sans font-semibold leading-[150%] tracking-normal text-[#6B7280] uppercase whitespace-nowrap"
                    >
                      WEEK #
                    </span>
                    <svg className="w-3 h-3 text-[#9CA3AF] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m0 0l-5-5m5 5l5-5" />
                    </svg>
                  </div>
                </th>
                {/* DATE Column */}
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-[12px] font-sans font-semibold leading-[150%] tracking-normal text-[#6B7280] uppercase"
                    >
                      DATE
                    </span>
                    <svg className="w-3 h-3 text-[#9CA3AF] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m0 0l-5-5m5 5l5-5" />
                    </svg>
                  </div>
                </th>
                {/* STATUS Column */}
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center gap-4">
                    <span 
                      className="text-[12px] font-sans font-semibold leading-[150%] tracking-normal text-[#6B7280] uppercase"
                    >
                      STATUS
                    </span>
                    <svg className="w-3 h-3 text-[#9CA3AF] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m0 0l-5-5m5 5l5-5" />
                    </svg>
                  </div>
                </th>
                {/* ACTIONS Column */}
                <th className="w-auto px-4 py-3 text-center bg-[#F9FAFB]">
                  <span 
                    className="text-[12px] font-sans font-semibold leading-[150%] tracking-normal text-[#6B7280] uppercase text-center"
                  >
                    ACTIONS
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white block sm:table-row-group">
              {timesheets.map((timesheet) => (
                <tr key={timesheet.id} className="block sm:table-row border-b border-gray-200 sm:border-gray-100 hover:bg-gray-50 transition-colors p-4 sm:p-0">
                  {/* Week Number */}
                  <td className="flex justify-between items-center sm:table-cell px-0 sm:px-6 py-2 sm:py-4 whitespace-nowrap bg-white sm:bg-[#F9FAFB] border-b sm:border-0 border-gray-100 mb-2 sm:mb-0">
                    <span className="sm:hidden text-[12px] font-semibold text-[#6B7280] uppercase">Week #</span>
                    <span 
                      className="text-[14px] font-sans font-medium sm:font-normal leading-[150%] tracking-normal text-[#111928]"
                    >
                      {timesheet.weekNumber}
                    </span>
                  </td>
                  {/* Date Range */}
                  <td className="flex justify-between items-center sm:table-cell px-0 sm:px-4 py-2 sm:py-4 border-b sm:border-0 border-gray-100 mb-2 sm:mb-0">
                    <span className="sm:hidden text-[12px] font-semibold text-[#6B7280] uppercase">Date</span>
                    <span 
                      className="text-[13px] lg:text-[14px] font-sans font-normal leading-[150%] tracking-normal text-[#6B7280]"
                    >
                      {formatDateRange(timesheet.startDate, timesheet.endDate)}
                    </span>
                  </td>
                  {/* Status Badge */}
                  <td className="flex justify-between items-center sm:table-cell px-0 sm:px-4 py-2 sm:py-4 border-b sm:border-0 border-gray-100 mb-3 sm:mb-0">
                    <span className="sm:hidden text-[12px] font-semibold text-[#6B7280] uppercase">Status</span>
                    <Badge variant={timesheet.status.toLowerCase() as BadgeVariant}>
                      {timesheet.status}
                    </Badge>
                  </td>
                  {/* Action Button */}
                  <td className="flex justify-center sm:table-cell px-0 sm:px-4 py-2 sm:py-4 text-center">
                    <button
                      onClick={() => onViewUpdate?.(timesheet)}
                      className="w-full sm:w-auto bg-[#F9FAFB] sm:bg-transparent border sm:border-0 border-gray-200 rounded-lg sm:rounded-none py-2 sm:py-0 text-[14px] lg:text-[16px] font-sans font-medium sm:font-normal leading-[125%] tracking-normal text-[#1C64F2] hover:text-blue-800 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {actionText[timesheet.status]}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
