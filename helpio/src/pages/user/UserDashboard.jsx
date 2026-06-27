import React from 'react';
import { Link } from 'react-router-dom';
import { useDataStore } from '@/store/useDataStore';
import { useAuthStore } from '@/store/useAuthStore';
import { FiShoppingBag, FiClock, FiCheckCircle, FiHeart, FiStar, FiActivity, FiArrowRight } from 'react-icons/fi';

export const UserDashboard = () => {
  const { currentUser } = useAuthStore();
  const { orders, favorites, reviews } = useDataStore();

  const userOrders = orders.filter((o) => o.userId === currentUser?.id || true); // fallback for demo
  const activeOrders = userOrders.filter((o) => ['Pending', 'Diterima', 'Dalam Proses'].includes(o.status));
  const completedOrders = userOrders.filter((o) => o.status === 'Selesai' || o.status === 'Closed');

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-xl">
          <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">Dashboard Pelanggan</span>
          <h1 className="text-2xl sm:text-3xl font-black">Selamat Datang, {currentUser?.name || 'Budi Santoso'}!</h1>
          <p className="text-xs sm:text-sm text-blue-100">
            Kelola pesanan jasa offline, pantau status pengerjaan teknisi, dan lihat riwayat aktivitas Anda.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total Order', val: userOrders.length, icon: FiShoppingBag, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/40' },
          { label: 'Order Berjalan', val: activeOrders.length, icon: FiClock, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/40' },
          { label: 'Order Selesai', val: completedOrders.length, icon: FiCheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/40' },
          { label: 'Ahli Favorit', val: favorites.length, icon: FiHeart, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/40' },
          { label: 'Ulasan Ditulis', val: reviews.length, icon: FiStar, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950/40' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`p-5 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-800 shadow-sm flex flex-col justify-between gap-3`}>
              <div className={`w-10 h-10 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900 dark:text-white">{stat.val}</span>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Orders Quick View & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Active Orders List */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <FiClock className="text-amber-500" />
              <span>Pesanan Jasa Sedang Berjalan</span>
            </h3>
            <Link to="/user/orders" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
              <span>Lihat Semua</span>
              <FiArrowRight />
            </Link>
          </div>

          <div className="space-y-3">
            {activeOrders.length > 0 ? (
              activeOrders.map((ord) => (
                <div key={ord.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400">
                        {ord.id}
                      </span>
                      <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                        {ord.status}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{ord.serviceTitle}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Ahli: <span className="font-semibold text-slate-700 dark:text-slate-300">{ord.expertName}</span></p>
                    <span className="text-[11px] text-slate-400 block mt-1">Jadwal: {ord.date} jam {ord.time}</span>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 block mb-2">
                      Rp {ord.price.toLocaleString('id-ID')}
                    </span>
                    <Link
                      to="/user/orders"
                      className="px-4 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition inline-block"
                    >
                      Detail Status
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic py-4 text-center">Tidak ada pesanan yang sedang berjalan saat ini.</p>
            )}
          </div>
        </div>

        {/* Riwayat Aktivitas */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-4">
            <FiActivity className="text-blue-600" />
            <span>Riwayat Aktivitas</span>
          </h3>

          <div className="space-y-4">
            {[
              { title: 'Membuat Pemesanan ORD-9921', time: '27 Juni 2026', desc: 'Jasa Cuci AC dengan Rudi Hermawan' },
              { title: 'Memberikan Ulasan bintang 5', time: '25 Juni 2026', desc: 'Ulasan untuk Siti Rahmawati & Tim Clean' },
              { title: 'Menambahkan Ahli Favorit', time: '20 Juni 2026', desc: 'Rudi Hermawan disimpan ke favorit' },
            ].map((act, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                <div>
                  <h5 className="font-bold text-slate-800 dark:text-slate-200">{act.title}</h5>
                  <p className="text-[11px] text-slate-500">{act.desc}</p>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
