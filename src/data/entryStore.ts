import type { TimesheetEntry } from '@/types/timesheet.types';
import { mockTimesheetEntries } from './mockEntries';

export class EntryStore {
  private entries: TimesheetEntry[] = [...mockTimesheetEntries];

  getAll(): TimesheetEntry[] {
    return [...this.entries];
  }

  getById(id: string): TimesheetEntry | undefined {
    return this.entries.find((entry) => entry.id === id);
  }

  getByTimesheetId(timesheetId: string): TimesheetEntry[] {
    return this.entries.filter((entry) => entry.timesheetId === timesheetId);
  }

  create(data: Omit<TimesheetEntry, 'id'>): TimesheetEntry {
    const newEntry: TimesheetEntry = {
      id: String(this.entries.length + 1),
      ...data,
    };
    this.entries.push(newEntry);
    return newEntry;
  }

  update(id: string, data: Partial<TimesheetEntry>): TimesheetEntry | null {
    const index = this.entries.findIndex((entry) => entry.id === id);
    if (index === -1) return null;

    this.entries[index] = {
      ...this.entries[index],
      ...data,
    };
    return this.entries[index];
  }

  delete(id: string): boolean {
    const index = this.entries.findIndex((entry) => entry.id === id);
    if (index === -1) return false;

    this.entries.splice(index, 1);
    return true;
  }
}

export const entryStore = new EntryStore();