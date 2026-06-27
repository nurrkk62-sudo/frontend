import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { RoleSwitcher } from '@/components/common/RoleSwitcher';
import { useAuthStore } from '@/store/useAuthStore';

export const DashboardLayout = () => {
  const { activeRole } = useAuthStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f4f6] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar />
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        <Sidebar role={activeRole} />
        <main className="flex-1 bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <Outlet />
        </main>
      </div>
      <RoleSwitcher />
    </div>
  );
};
