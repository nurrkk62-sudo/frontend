import React from 'react';
import { useDataStore } from '@/store/useDataStore';
import { FiBell, FiCheckCircle } from 'react-icons/fi';

export const UserNotifications = () => {
  const { notifications } = useDataStore();

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Notifikasi</h1>
        <p className="text-xs text-slate-500 mt-1">Pemberitahuan terkini mengenai status pesanan Anda.</p>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div key={n.id} className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <FiBell className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{n.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">{n.message}</p>
              <span className="text-[10px] text-slate-400 block pt-1">{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
