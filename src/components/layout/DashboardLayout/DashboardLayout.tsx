'use client';

import { Header } from '@/components/layout/Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">{children}</main>
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 pb-2">
        <footer className="w-full h-[60px] bg-white rounded-lg shadow-sm p-2 flex items-center justify-center mt-2">
          <p
            className="text-[14px] font-normal text-[#6B7280]"
            style={{
              fontFamily: 'Inter',
              fontWeight: 400,
              lineHeight: '150%',
              letterSpacing: '0%',
            }}
          >
            © 2024 tentwenty. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
