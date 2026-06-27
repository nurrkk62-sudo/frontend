import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { FiUser, FiBriefcase, FiShield, FiMoon, FiSun, FiLayers } from 'react-icons/fi';

export const RoleSwitcher = () => {
  const { activeRole, setRole, login } = useAuthStore();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('helpio_theme') === 'dark';
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('helpio_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('helpio_theme', 'light');
    }
  }, [darkMode]);

  const handleRoleChange = (role) => {
    login(`${role}@helpio.id`, 'password', role);
    setRole(role);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      {isOpen && (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col gap-2 min-w-[240px] animate-in fade-in duration-200">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Demo Control Panel
          </div>
          
          <button
            onClick={() => handleRoleChange('user')}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeRole === 'user'
                ? 'bg-orange-600 text-white shadow-md shadow-orange-500/20'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50'
            }`}
          >
            <FiUser className="w-4 h-4" />
            <span>Role: Pelanggan (User)</span>
          </button>

          <button
            onClick={() => handleRoleChange('expert')}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeRole === 'expert'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50'
            }`}
          >
            <FiBriefcase className="w-4 h-4" />
            <span>Role: Penyedia Jasa (Ahli)</span>
          </button>

          <button
            onClick={() => handleRoleChange('admin')}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeRole === 'admin'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50'
            }`}
          >
            <FiShield className="w-4 h-4" />
            <span>Role: Administrator</span>
          </button>

          <hr className="my-1 border-slate-200 dark:border-slate-700" />

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <span className="flex items-center gap-2">
              {darkMode ? <FiSun className="w-4 h-4 text-amber-400" /> : <FiMoon className="w-4 h-4 text-indigo-500" />}
              <span>{darkMode ? 'Mode Terang (Putih Keabuan)' : 'Mode Gelap (Slate Dark)'}</span>
            </span>
          </button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-4 py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition font-semibold text-xs tracking-wide"
      >
        <FiLayers className="w-4 h-4 text-orange-500 dark:text-orange-600 animate-pulse" />
        <span>Ganti Role Demo ({activeRole.toUpperCase()})</span>
      </button>
    </div>
  );
};
