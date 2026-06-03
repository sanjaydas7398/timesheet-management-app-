import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600 sm:mt-2 sm:text-base">
            Welcome back, {session.user?.name || session.user?.email}!
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-4 shadow sm:p-6">
            <h3 className="text-base font-semibold text-gray-900 sm:text-lg">Timesheets</h3>
            <p className="mt-1 text-sm text-gray-600 sm:mt-2">Manage your timesheets</p>
          </div>

          <div className="rounded-lg bg-white p-4 shadow sm:p-6">
            <h3 className="text-base font-semibold text-gray-900 sm:text-lg">Reports</h3>
            <p className="mt-1 text-sm text-gray-600 sm:mt-2">View your reports</p>
          </div>

          <div className="rounded-lg bg-white p-4 shadow sm:p-6">
            <h3 className="text-base font-semibold text-gray-900 sm:text-lg">Settings</h3>
            <p className="mt-1 text-sm text-gray-600 sm:mt-2">Configure your account</p>
          </div>
        </div>
      </div>
    </div>
  );
}
