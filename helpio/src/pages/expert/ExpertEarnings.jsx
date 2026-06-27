import React from 'react';
import { useDataStore } from '@/store/useDataStore';
import { FiDollarSign, FiCheckCircle } from 'react-icons/fi';

export const ExpertEarnings = () => {
  const { orders } = useDataStore();
  const completedOrders = orders.filter(o => o.status === 'Selesai' || o.status === 'Closed');

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Pendapatan Saya</h1>
        <p className="text-xs text-slate-500 mt-1">Laporan estimasi pendapatan pembayaran offline dari hasil pengerjaan.</p>
      </div>

      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">Total Pendapatan Terkumpul</span>
          <h2 className="text-3xl font-black mt-1">Rp {(completedOrders.length * 150000).toLocaleString('id-ID')}</h2>
          <p className="text-xs text-emerald-100 mt-1">*Seluruh pembayaran diterima secara langsung di lokasi pengerjaan.</p>
        </div>
        <FiDollarSign className="w-16 h-16 text-white/20" />
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Rincian Transaksi Pekerjaan Selesai</h3>
        <div className="space-y-3">
          {completedOrders.map((ord) => (
            <div key={ord.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{ord.serviceTitle}</h4>
                <span className="text-[10px] text-slate-400">Pelanggan: {ord.userName} • {ord.date}</span>
              </div>
              <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                +Rp {ord.price.toLocaleString('id-ID')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
