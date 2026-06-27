import React from 'react';
import { useDataStore } from '@/store/useDataStore';

export const AdminOrders = () => {
  const { orders } = useDataStore();
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Kelola Semua Pesanan Jasa Platform</h1>
        <p className="text-xs text-slate-500 mt-1">Pantau seluruh siklus transaksi offline di HelpIO.</p>
      </div>
      <div className="space-y-3">
        {orders.map(o => (
          <div key={o.id} className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold">{o.id} - {o.serviceTitle}</span>
              <p className="text-slate-400">Pelanggan: {o.userName} • Ahli: {o.expertName}</p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-bold">{o.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
