import React from 'react';
import { useDataStore } from '@/store/useDataStore';
import { useAuthStore } from '@/store/useAuthStore';
import { FiShoppingBag, FiCheckCircle, FiStar, FiDollarSign, FiTrendingUp, FiMessageSquare } from 'react-icons/fi';

export const ExpertDashboard = () => {
  const { currentUser } = useAuthStore();
  const { orders, experts, reviews } = useDataStore();

  const expert = experts.find((e) => e.id === currentUser?.id) || experts[0];
  const expertOrders = orders.filter((o) => o.expertId === expert.id || true);
  const completedCount = expertOrders.filter((o) => o.status === 'Selesai' || o.status === 'Closed').length;
  const totalEarnings = completedCount * 150000;

  return (
    <div className="space-y-8">
      
      {/* Welcome Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-xl">
          <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">Dashboard Mitra Ahli</span>
          <h1 className="text-2xl sm:text-3xl font-black">Halo, {expert.name}!</h1>
          <p className="text-xs sm:text-sm text-emerald-100">
            Status Akun: <span className="font-extrabold uppercase underline">Terverifikasi Admin</span>. Siap menerima orderan dari pelanggan.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total Order Masuk', val: expertOrders.length, icon: FiShoppingBag, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/40' },
          { label: 'Order Selesai', val: completedCount, icon: FiCheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/40' },
          { label: 'Rating Saya', val: expert.rating, icon: FiStar, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/40' },
          { label: 'Total Ulasan', val: expert.reviewCount, icon: FiMessageSquare, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950/40' },
          { label: 'Est. Pendapatan', val: `Rp ${totalEarnings.toLocaleString('id-ID')}`, icon: FiDollarSign, color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-950/40' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-5 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-800 shadow-sm flex flex-col justify-between gap-3">
              <div className={`w-10 h-10 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white truncate block">{stat.val}</span>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Monthly Chart Simulation */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <FiTrendingUp className="text-emerald-500" />
              <span>Grafik Estimasi Pendapatan Bulanan (Offline Cash/Transfer)</span>
            </h3>
            <p className="text-xs text-slate-500">Performa penyelesaian pengerjaan jasa Anda bulan ini.</p>
          </div>
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
            Tahun 2026
          </span>
        </div>

        {/* Visual Bar Graph */}
        <div className="h-48 flex items-end justify-between gap-2 sm:gap-6 pt-8 px-2">
          {[
            { month: 'Jan', val: 40 },
            { month: 'Feb', val: 65 },
            { month: 'Mar', val: 50 },
            { month: 'Apr', val: 80 },
            { month: 'Mei', val: 95 },
            { month: 'Jun', val: 120 },
          ].map((bar, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <div className="w-full max-w-[40px] bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-2xl group-hover:brightness-110 transition duration-300 relative" style={{ height: `${(bar.val / 120) * 100}%` }}>
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-600 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition">
                  {bar.val}k
                </span>
              </div>
              <span className="text-xs font-bold text-slate-500">{bar.month}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
