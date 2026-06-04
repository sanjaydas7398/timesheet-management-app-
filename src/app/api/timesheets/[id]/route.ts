import { NextRequest, NextResponse } from 'next/server';
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

    const timesheet = timesheetStore.getById(id);

    if (!timesheet) {
      return NextResponse.json({ error: 'Timesheet not found' }, { status: 404 });
    }

    return NextResponse.json({ data: timesheet });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

    const updatedTimesheet = timesheetStore.update(id, body);

    if (!updatedTimesheet) {
      return NextResponse.json({ error: 'Timesheet not found' }, { status: 404 });
    }

    return NextResponse.json({
      data: updatedTimesheet,
      message: 'Timesheet updated successfully',
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authentication check
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const deleted = timesheetStore.delete(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Timesheet not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Timesheet deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
