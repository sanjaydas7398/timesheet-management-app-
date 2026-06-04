'use client';

import { useState, useEffect } from 'react';
import { TimesheetEntry, Timesheet } from '@/types/timesheet.types';
import { AddEntryModal } from '@/components/modules/AddEntryModal';
import { Skeleton } from '@/components/ui/Skeleton';

export interface TimesheetDetailViewProps {
  timesheetId: string;
  onBack: () => void;
}

export function TimesheetDetailView({
  timesheetId,
  onBack,
}: TimesheetDetailViewProps) {
  const [currentEntries, setCurrentEntries] = useState<TimesheetEntry[]>([]);
  const [timesheet, setTimesheet] = useState<Timesheet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editingEntry, setEditingEntry] = useState<TimesheetEntry | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [tsRes, entriesRes] = await Promise.all([
          fetch(`/api/timesheets/${timesheetId}`),
          fetch(`/api/timesheets/${timesheetId}/entries`)
        ]);
        
        if (!tsRes.ok || !entriesRes.ok) throw new Error('Failed to fetch data');
        
        const tsJson = await tsRes.json();
        const entriesJson = await entriesRes.json();
        
        setTimesheet(tsJson.data);
        setCurrentEntries(entriesJson.data);
      } catch {
        setError('Failed to load timesheet details');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [timesheetId]);

  // Calculate dynamic date range from entries or props
  const calculateDateRange = (entries: TimesheetEntry[]): string => {
    if (timesheet) {
      const start = new Date(timesheet.startDate);
      const end = new Date(timesheet.endDate);
      const startDay = start.getDate();
      const endDay = end.getDate();
      const month = end.toLocaleDateString('en-US', { month: 'long' });
      const year = end.getFullYear();
      return `${startDay} - ${endDay} ${month}, ${year}`;
    }

    if (entries.length === 0) return '';
    const dates = entries.map(e => new Date(e.date)).sort((a, b) => a.getTime() - b.getTime());
    const startDateCalc = dates[0];
    const endDateCalc = dates[dates.length - 1];

    const startDay = startDateCalc.getDate();
    const endDay = endDateCalc.getDate();
    const month = endDateCalc.toLocaleDateString('en-US', { month: 'long' });
    const year = endDateCalc.getFullYear();

    return `${startDay} - ${endDay} ${month}, ${year}`;
  };

  const dynamicDateRange = calculateDateRange(currentEntries);

  const handleAddTask = (data: Partial<TimesheetEntry>) => {
    if (editingEntry) {
      // Update existing entry
      setCurrentEntries(currentEntries.map(entry =>
        entry.id === editingEntry.id
          ? { ...entry, ...data, updatedAt: new Date().toISOString() }
          : entry
      ));
      setEditingEntry(null);
    } else {
      // Add new entry
      const newEntry: TimesheetEntry = {
        id: `new-${Date.now()}`,
        timesheetId: timesheetId,
        date: selectedDate || new Date().toISOString().split('T')[0],
        hours: data.hours || 0,
        description: data.description || '',
        projectName: data.projectName || '',
        workType: data.workType || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setCurrentEntries([...currentEntries, newEntry]);
    }
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  const handleOpenModal = (date: string) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
    setEditingEntry(null);
  };

  const handleDeleteEntry = (entryId: string) => {
    setCurrentEntries(currentEntries.filter(e => e.id !== entryId));
    setShowDropdown(null);
  };

  const handleEditEntry = (entry: TimesheetEntry) => {
    setEditingEntry(entry);
    setSelectedDate(entry.date);
    setIsModalOpen(true);
    setShowDropdown(null);
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  const groupEntriesByDate = (entries: TimesheetEntry[]) => {
    const grouped = entries.reduce((acc, entry) => {
      const date = entry.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(entry);
      return acc;
    }, {} as Record<string, TimesheetEntry[]>);
    return grouped;
  };

  const calculateWeekTotal = (entries: TimesheetEntry[]): number => {
    return entries.reduce((sum, entry) => sum + entry.hours, 0);
  };



  const groupedEntries = groupEntriesByDate(currentEntries);
  const weekTotal = calculateWeekTotal(currentEntries);
  const weekProgress = Math.min((weekTotal / 40) * 100, 100);

  // Get all dates in the week range (including empty days)
  const getAllDatesInWeek = () => {
    const dates: string[] = [];

    // If timesheet is available, use its start and end dates
    if (timesheet) {
      const start = new Date(timesheet.startDate);
      const end = new Date(timesheet.endDate);
      const current = new Date(start);

      while (current <= end) {
        dates.push(current.toISOString().split('T')[0]);
        current.setDate(current.getDate() + 1);
      }
      return dates;
    }

    // Fallback: Calculate from entries
    if (currentEntries.length > 0) {
      const entryDates = currentEntries.map(e => new Date(e.date));
      const minDate = new Date(Math.min(...entryDates.map(d => d.getTime())));
      const maxDate = new Date(Math.max(...entryDates.map(d => d.getTime())));
      const current = new Date(minDate);

      while (current <= maxDate) {
        dates.push(current.toISOString().split('T')[0]);
        current.setDate(current.getDate() + 1);
      }
    }

    return dates;
  };

  const allDates = getAllDatesInWeek();

    if (loading) {
      return (
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 space-y-4">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-40 w-full mt-6" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 text-center text-red-500 py-10">
          {error}
          <button onClick={onBack} className="block mt-4 text-blue-500 hover:underline mx-auto">
            Go back
          </button>
        </div>
      );
    }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        {/* Back Button */}
        

        {/* Week Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
          <div>
            <h2
              className="text-[20px] sm:text-[24px] font-semibold text-[#111928] mb-1"
              style={{ fontFamily: 'Inter', fontWeight: 600, lineHeight: '150%', letterSpacing: '0%' }}
            >
              This week&apos;s timesheet {timesheet ? `(Week ${timesheet.weekNumber})` : ''}
            </h2>
            <p
              className="text-[14px] text-[#6B7280]"
              style={{ fontFamily: 'Inter', fontWeight: 400, lineHeight: '150%', letterSpacing: '0%' }}
            >
              {dynamicDateRange}
            </p>
          </div>
          {/* Progress */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-[14px] font-medium text-[#111928]"
                style={{ fontFamily: 'Inter', fontWeight: 500, lineHeight: '150%', letterSpacing: '0%' }}
              >
                {weekTotal}/40 hrs
              </span>
              <span
                className="text-[12px] font-normal text-[#6B7280]"
                style={{ fontFamily: 'Inter', fontWeight: 400, lineHeight: '150%', letterSpacing: '0%' }}
              >
                {Math.round(weekProgress)}%
              </span>
            </div>
            <div className="w-[120px] sm:w-[200px] h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FF8A4C] transition-all duration-300"
                style={{ width: `${weekProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Daily Entries */}
        <div className="space-y-6">
          {allDates.map((date) => {
            const dayEntries = groupedEntries[date] || [];

            return (
              <div key={date} className="flex flex-col sm:flex-row gap-2 sm:gap-6 border-b border-gray-100 pb-6 last:border-b-0 mt-4 sm:mt-0">
                {/* Date Label - Fixed Width Left Column */}
                <div className="w-full sm:w-[80px] flex-shrink-0 mb-2 sm:mb-0">
                  <h3
                    className="text-[18px] font-semibold text-[#111928]"
                    style={{ fontFamily: 'Inter', fontWeight: 600, lineHeight: '150%', letterSpacing: '0%' }}
                  >
                    {formatDate(date)}
                  </h3>
                </div>

                {/* Content - Right Column */}
                <div className="flex-1 min-w-0">
                  {/* Task Entries */}
                  {dayEntries.length > 0 && (
                    <div className="space-y-2 mb-3">
                      {dayEntries.map((entry) => (
                        <div key={entry.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group" style={{ paddingTop: '0.75rem', paddingBottom: '0.75rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 flex-1 min-w-0 w-full mb-2 sm:mb-0">
                            {/* Description */}
                            <p
                              className="text-[16px] font-medium text-[#111928] truncate flex-1"
                              style={{ fontFamily: 'Inter', fontWeight: 500, lineHeight: '150%', letterSpacing: '0%' }}
                              title={entry.description}
                            >
                              {entry.description}
                            </p>
                            {/* Hours */}
                            <span
                              className="text-[14px] font-normal text-[#9CA3AF] flex-shrink-0"
                              style={{ fontFamily: 'Inter', fontWeight: 400, lineHeight: '125%', letterSpacing: '0%' }}
                            >
                              {entry.hours} hrs
                            </span>
                            {/* Project Badge */}
                            <span
                              className="inline-flex px-2.5 py-1 text-[12px] font-medium text-[#1E429F] bg-[#EFF6FF] rounded flex-shrink-0"
                              style={{ fontFamily: 'Inter', fontWeight: 500, lineHeight: '150%', letterSpacing: '0%', textAlign: 'center', verticalAlign: 'middle' }}
                            >
                              {entry.projectName}
                            </span>
                          </div>
                          {/* Actions - Three Dots */}
                          <div className="relative flex-shrink-0 self-end sm:self-auto mt-[-32px] sm:mt-0 sm:ml-4">
                            <button
                              onClick={() => setShowDropdown(showDropdown === entry.id ? null : entry.id)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                              aria-label="More options"
                            >
                              <svg className="w-5 h-5 text-[#6B7280]" fill="currentColor" viewBox="0 0 24 24">
                                <circle cx="5" cy="12" r="2" />
                                <circle cx="12" cy="12" r="2" />
                                <circle cx="19" cy="12" r="2" />
                              </svg>
                            </button>
                            {/* Dropdown */}
                            {showDropdown === entry.id && (
                              <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                                <button
                                  onClick={() => handleEditEntry(entry)}
                                  className="w-full px-4 py-2 text-left text-[14px] font-normal text-[#374151] hover:bg-gray-50 transition-colors cursor-pointer"
                                  style={{ fontFamily: 'Inter', fontWeight: 400, lineHeight: '150%', letterSpacing: '0%' }}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteEntry(entry.id)}
                                  className="w-full px-4 py-2 text-left text-[14px] font-normal text-[#E02424] hover:bg-gray-50 transition-colors cursor-pointer"
                                  style={{ fontFamily: 'Inter', fontWeight: 400, lineHeight: '150%', letterSpacing: '0%' }}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Task Button */}
                  <button
                    onClick={() => handleOpenModal(date)}
                    className="w-full border-2 border-[#6B7280] border-dashed rounded-lg bg-white text-[16px] font-medium text-[#6B7280] hover:text-[#1A56DB] hover:border-[#1A56DB] hover:bg-[#EFF6FF] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    style={{ fontFamily: 'Inter', fontWeight: 500, lineHeight: '150%', letterSpacing: '0%', verticalAlign: 'middle', paddingTop: '0.5rem', paddingBottom: '0.5rem', paddingLeft: '1rem', paddingRight: '1rem' }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add new task
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Entry Modal */}
      <AddEntryModal
        key={editingEntry ? editingEntry.id : `new-${selectedDate}`}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddTask}
        date={selectedDate || undefined}
        initialData={editingEntry ? {
          projectName: editingEntry.projectName,
          workType: editingEntry.workType,
          description: editingEntry.description,
          hours: editingEntry.hours,
          date: editingEntry.date,
        } : undefined}
      />
    </>
  );
}
