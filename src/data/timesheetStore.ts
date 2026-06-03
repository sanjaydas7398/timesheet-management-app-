import type { MockTimesheet } from './mockTimesheets';
import { mockTimesheets } from './mockTimesheets';

export class TimesheetStore {
  private timesheets: MockTimesheet[] = [...mockTimesheets];

  getAll(): MockTimesheet[] {
    return [...this.timesheets];
  }

  getById(id: string): MockTimesheet | undefined {
    return this.timesheets.find((ts) => ts.id === id);
  }

  getByUserId(userId: string): MockTimesheet[] {
    return this.timesheets.filter((ts) => ts.userId === userId);
  }

  getByStatus(status: string): MockTimesheet[] {
    return this.timesheets.filter((ts) => ts.status === status);
  }

  create(data: Omit<MockTimesheet, 'id'>): MockTimesheet {
    const newTimesheet: MockTimesheet = {
      id: String(this.timesheets.length + 1),
      ...data,
    };
    this.timesheets.push(newTimesheet);
    return newTimesheet;
  }

  update(id: string, data: Partial<MockTimesheet>): MockTimesheet | null {
    const index = this.timesheets.findIndex((ts) => ts.id === id);
    if (index === -1) return null;

    this.timesheets[index] = {
      ...this.timesheets[index],
      ...data,
    };
    return this.timesheets[index];
  }

  delete(id: string): boolean {
    const index = this.timesheets.findIndex((ts) => ts.id === id);
    if (index === -1) return false;

    this.timesheets.splice(index, 1);
    return true;
  }
}

export const timesheetStore = new TimesheetStore();
