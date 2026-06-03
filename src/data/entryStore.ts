import type { MockTimesheetEntry } from './mockEntries';
import { mockTimesheetEntries } from './mockEntries';

export class EntryStore {
  private entries: MockTimesheetEntry[] = [...mockTimesheetEntries];

  getAll(): MockTimesheetEntry[] {
    return [...this.entries];
  }

  getById(id: string): MockTimesheetEntry | undefined {
    return this.entries.find((entry) => entry.id === id);
  }

  getByTimesheetId(timesheetId: string): MockTimesheetEntry[] {
    return this.entries.filter((entry) => entry.timesheetId === timesheetId);
  }

  create(data: Omit<MockTimesheetEntry, 'id'>): MockTimesheetEntry {
    const newEntry: MockTimesheetEntry = {
      id: String(this.entries.length + 1),
      ...data,
    };
    this.entries.push(newEntry);
    return newEntry;
  }

  update(id: string, data: Partial<MockTimesheetEntry>): MockTimesheetEntry | null {
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
