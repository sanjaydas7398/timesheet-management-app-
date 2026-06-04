'use client';

import { useState, useEffect, useCallback } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout/DashboardLayout';
import { TimesheetTable, TimesheetFilters } from '@/components/modules/TimesheetTable';
import { TimesheetDetailView } from '@/components/modules/WeekDetail';
import { Pagination } from '@/components/ui/Pagination';
import { Skeleton } from '@/components/ui/Skeleton';
import { Timesheet } from '@/types/timesheet.types';

export default function DashboardPage() {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [dateRange, setDateRange] = useState('');
  const [status, setStatus] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [selectedTimesheet, setSelectedTimesheet] = useState<Timesheet | null>(null);

  useEffect(() => {
    async function fetchTimesheets() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (status) queryParams.append('status', status);
        if (dateRange) queryParams.append('dateRange', dateRange);

        const res = await fetch(`/api/timesheets?${queryParams.toString()}`);
        if (!res.ok) throw new Error('Failed to load timesheets');
        const json = await res.json();
        setTimesheets(json.data);
      } catch {
        setError('Failed to load timesheets');
      } finally {
        setLoading(false);
      }
    }
    fetchTimesheets();
  }, [status, dateRange]);

  const handleDateRangeChange = useCallback((value: string) => {
    setDateRange(value);
    setCurrentPage(1);
  }, []);

  const handleStatusChange = useCallback((value: string) => {
    setStatus(value);
    setCurrentPage(1);
  }, []);

  const totalPages = Math.ceil(timesheets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTimesheets = timesheets.slice(startIndex, endIndex);

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  return (
    <DashboardLayout>
      {selectedTimesheet ? (
        <TimesheetDetailView
          timesheetId={selectedTimesheet.id}
          onBack={() => setSelectedTimesheet(null)}
        />
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-6 mb-32 sm:mb-6">
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
              <h2
                className="text-[18px] sm:text-[20px] md:text-[24px] font-bold text-[#111928]"
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 700,
                  lineHeight: '24px',
                  letterSpacing: '0%',
                }}
              >
                Your Timesheets
              </h2>
            </div>

            <TimesheetFilters
              dateRange={dateRange}
              status={status}
              onDateRangeChange={handleDateRangeChange}
              onStatusChange={handleStatusChange}
            />
          </div>

          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full rounded" />
              <Skeleton className="h-16 w-full rounded" />
              <Skeleton className="h-16 w-full rounded" />
              <Skeleton className="h-16 w-full rounded" />
            </div>
          ) : error ? (
            <div className="py-10 text-center text-red-500">{error}</div>
          ) : (
            <>
              <TimesheetTable
                timesheets={paginatedTimesheets}
                onViewUpdate={(ts) => setSelectedTimesheet(ts)}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={itemsPerPage}
                onPageChange={setCurrentPage}
                onPageSizeChange={handleItemsPerPageChange}
              />
            </>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
