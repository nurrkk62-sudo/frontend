import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { RoleSwitcher } from '@/components/common/RoleSwitcher';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f3f4f6] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <RoleSwitcher />
    </div>
  );
};
