import { NextRequest, NextResponse } from 'next/server';
import { entryStore } from '@/data/entryStore';
import { timesheetStore } from '@/data/timesheetStore';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Authentication check
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Verify timesheet exists
    const timesheet = timesheetStore.getById(id);
    if (!timesheet) {
      return NextResponse.json({ error: 'Timesheet not found' }, { status: 404 });
    }

    const entries = entryStore.getByTimesheetId(id);

    return NextResponse.json({
      data: entries,
      total: entries.length,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Authentication check
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Verify timesheet exists
    const timesheet = timesheetStore.getById(id);
    if (!timesheet) {
      return NextResponse.json({ error: 'Timesheet not found' }, { status: 404 });
    }

    const newEntry = entryStore.create({
      timesheetId: id,
      ...body,
      status: body.status || 'draft',
    });

    return NextResponse.json({
      data: newEntry,
      message: 'Entry created successfully',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
