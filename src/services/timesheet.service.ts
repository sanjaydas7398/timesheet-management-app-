import { Timesheet, TimesheetEntry } from '@/types/timesheet.types';

interface ApiResponse<T> {
  data: T;
  total?: number;
  message?: string;
}

export const timesheetService = {
  async getTimesheets(params?: {
    userId?: string;
    status?: string;
  }): Promise<ApiResponse<Timesheet[]>> {
    const queryParams = new URLSearchParams();
    if (params?.userId) queryParams.append('userId', params.userId);
    if (params?.status) queryParams.append('status', params.status);

    const response = await fetch(`/api/timesheets?${queryParams.toString()}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch timesheets');
    }

    return response.json();
  },

  async getTimesheetById(id: string): Promise<ApiResponse<Timesheet>> {
    const response = await fetch(`/api/timesheets/${id}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch timesheet');
    }

    return response.json();
  },

  async createTimesheet(data: Omit<Timesheet, 'id'>): Promise<ApiResponse<Timesheet>> {
    const response = await fetch('/api/timesheets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create timesheet');
    }

    return response.json();
  },

  async updateTimesheet(id: string, data: Partial<Timesheet>): Promise<ApiResponse<Timesheet>> {
    const response = await fetch(`/api/timesheets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update timesheet');
    }

    return response.json();
  },

  async deleteTimesheet(id: string): Promise<{ message: string }> {
    const response = await fetch(`/api/timesheets/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete timesheet');
    }

    return response.json();
  },

  async getEntries(timesheetId: string): Promise<ApiResponse<TimesheetEntry[]>> {
    const response = await fetch(`/api/timesheets/${timesheetId}/entries`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch entries');
    }

    return response.json();
  },

  async createEntry(
    timesheetId: string,
    data: Omit<TimesheetEntry, 'id' | 'timesheetId'>
  ): Promise<ApiResponse<TimesheetEntry>> {
    const response = await fetch(`/api/timesheets/${timesheetId}/entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create entry');
    }

    return response.json();
  },
};
