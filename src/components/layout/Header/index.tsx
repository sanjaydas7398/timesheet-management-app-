'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';

export function Header() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E5E7EB] bg-white">
      <div className="flex h-16 items-center justify-between  px-4 sm:px-6 lg:px-8">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-6 sm:gap-8">
          <Link href="/dashboard" className="flex items-center">
            <span className="text-xl font-semibold text-[#111928] sm:text-2xl">ticktock</span>
          </Link>

          <nav className="hidden sm:flex sm:gap-6">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-[#111928] transition-colors hover:text-[#1C64F2]"
            >
              Timesheets
            </Link>
          </nav>
        </div>

        {/* User Menu */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#111928] transition-colors hover:bg-[#F3F4F6]"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <span>{session?.user?.name || session?.user?.email || 'User'}</span>
            <svg
              className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg border border-[#E5E7EB] bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="border-b border-[#E5E7EB] px-4 py-2">
                <p className="text-sm font-medium text-[#111928]">
                  {session?.user?.name || 'User'}
                </p>
                <p className="text-xs text-[#6B7280]">{session?.user?.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="block w-full px-4 py-2 text-left text-sm text-[#111928] transition-colors hover:bg-[#F3F4F6]"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
