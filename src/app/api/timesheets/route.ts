import { NextRequest, NextResponse } from 'next/server';
import { timesheetStore } from '@/data/timesheetStore';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { filterTimesheetsAdvanced } from '@/lib/utils/timesheet.utils';

export async function GET(request: NextRequest) {
  try {
    // Authentication check
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Get query params for filtering
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const dateRange = searchParams.get('dateRange');

    let filteredTimesheets = timesheetStore.getAll();

    if (userId) {
      filteredTimesheets = timesheetStore.getByUserId(userId);
    }

    filteredTimesheets = filterTimesheetsAdvanced(
      filteredTimesheets, 
      (status as Parameters<typeof filterTimesheetsAdvanced>[1]) || undefined, 
      dateRange || undefined
    );

    return NextResponse.json({
      data: filteredTimesheets,
      total: filteredTimesheets.length,
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const newTimesheet = timesheetStore.create({
      ...body,
      status: body.status || 'draft',
    });

    return NextResponse.json({
      data: newTimesheet,
      message: 'Timesheet created successfully',
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
