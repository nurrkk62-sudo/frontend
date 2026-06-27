import React from 'react';
import { useDataStore } from '@/store/useDataStore';
import { FiUsers, FiUserCheck, FiShoppingBag, FiStar, FiLayers, FiShield, FiTrendingUp } from 'react-icons/fi';

export const AdminDashboard = () => {
  const { categories, experts, orders, reviews, verifications } = useDataStore();

  const activeOrdersCount = orders.filter((o) => ['Pending', 'Diterima', 'Dalam Proses'].includes(o.status)).length;
  const pendingVerifCount = verifications.filter((v) => v.status === 'pending').length;

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-xl">
          <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">Administrator Portal</span>
          <h1 className="text-2xl sm:text-3xl font-black">Pusat Kontrol Sistem HelpIO</h1>
          <p className="text-xs sm:text-sm text-purple-100">
            Kelola verifikasi identitas teknisi, moderasi ulasan, dan pantau aktivitas ekosistem platform.
          </p>
        </div>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total User', val: 1420, icon: FiUsers, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/40' },
          { label: 'Total Ahli', val: experts.length + 12, icon: FiUserCheck, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/40' },
          { label: 'Total Order', val: orders.length + 45, icon: FiShoppingBag, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/40' },
          { label: 'Order Aktif', val: activeOrdersCount, icon: FiTrendingUp, color: 'text-cyan-500', bg: 'bg-cyan-50 dark:bg-cyan-950/40' },
          { label: 'Verif Pending', val: pendingVerifCount, icon: FiShield, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/40' },
          { label: 'Kategori Jasa', val: categories.length, icon: FiLayers, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950/40' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-5 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-800 shadow-sm flex flex-col justify-between gap-3">
              <div className={`w-10 h-10 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900 dark:text-white block">{stat.val}</span>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overview Analytics Graphic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Grafik Pertumbuhan Pengguna & Transaksi Jasa</h3>
          <div className="h-56 flex items-end justify-between gap-4 pt-8 px-4">
            {[
              { month: 'Jan', user: 30, order: 45 },
              { month: 'Feb', user: 55, order: 70 },
              { month: 'Mar', user: 80, order: 110 },
              { month: 'Apr', user: 120, order: 160 },
              { month: 'Mei', user: 170, order: 210 },
              { month: 'Jun', user: 230, order: 290 },
            ].map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full max-w-[32px] flex items-end gap-1 h-full">
                  <div className="w-1/2 bg-blue-500 rounded-t-lg" style={{ height: `${(d.user / 300) * 100}%` }} title={`User: ${d.user}`} />
                  <div className="w-1/2 bg-emerald-500 rounded-t-lg" style={{ height: `${(d.order / 300) * 100}%` }} title={`Order: ${d.order}`} />
                </div>
                <span className="text-xs font-bold text-slate-500">{d.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 pt-4 text-xs font-bold">
            <span className="flex items-center gap-2 text-blue-600"><span className="w-3 h-3 bg-blue-500 rounded-sm" /> Pertumbuhan User</span>
            <span className="flex items-center gap-2 text-emerald-600"><span className="w-3 h-3 bg-emerald-500 rounded-sm" /> Volume Pemesanan Jasa</span>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Aksi Cepat Admin</h3>
          <div className="space-y-2">
            <a href="/admin/verification" className="block p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 font-bold text-xs text-slate-800 dark:text-slate-200">
              🛡️ Verifikasi 1 Ahli Baru
            </a>
            <a href="/admin/categories" className="block p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 font-bold text-xs text-slate-800 dark:text-slate-200">
              📁 Tambah Kategori Jasa Baru
            </a>
            <a href="/admin/reviews" className="block p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 font-bold text-xs text-slate-800 dark:text-slate-200">
              ⭐ Moderasi Ulasan Spam
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};
