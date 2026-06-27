import React, { useState } from 'react';
import { useDataStore } from '@/store/useDataStore';
import Swal from 'sweetalert2';
import { FiShoppingBag, FiMessageSquare, FiStar, FiCheckCircle, FiClock, FiXCircle, FiMapPin, FiCalendar } from 'react-icons/fi';

export const UserOrders = () => {
  const { orders, updateOrderStatus, addReview } = useDataStore();
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filteredOrders = orders.filter((o) => {
    if (filterStatus === 'ALL') return true;
    if (filterStatus === 'ACTIVE') return ['Pending', 'Diterima', 'Dalam Proses'].includes(o.status);
    if (filterStatus === 'DONE') return ['Selesai', 'Review', 'Closed'].includes(o.status);
    return o.status === filterStatus;
  });

  const handleWhatsAppChat = (ord) => {
    const text = encodeURIComponent(`Halo, saya ${ord.userName} (Order ID: ${ord.id}) terkait pesanan jasa "${ord.serviceTitle}". Ingin konfirmasi jadwal.`);
    window.open(`https://wa.me/6281234567891?text=${text}`, '_blank');
  };

  const handleOpenReview = (ord) => {
    Swal.fire({
      title: 'Beri Ulasan Pekerjaan',
      text: `Bagaimana hasil pengerjaan ${ord.expertName}?`,
      input: 'textarea',
      inputPlaceholder: 'Tulis ulasan pengalaman Anda di sini...',
      showCancelButton: true,
      confirmButtonText: 'Kirim Ulasan Bintang 5',
      confirmButtonColor: '#10B981',
    }).then((res) => {
      if (res.isConfirmed && res.value) {
        addReview({
          expertId: ord.expertId,
          userId: ord.userId,
          userName: ord.userName,
          userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
          rating: 5,
          comment: res.value
        });
        updateOrderStatus(ord.id, 'Closed');
        Swal.fire('Terima Kasih!', 'Ulasan Anda berhasil diterbitkan.', 'success');
      }
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400">Menunggu Konfirmasi Ahli</span>;
      case 'Diterima':
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400">Pesanan Diterima</span>;
      case 'Dalam Proses':
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400">Teknisi Dalam Proses</span>;
      case 'Selesai':
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">Pekerjaan Selesai</span>;
      case 'Closed':
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300">Selesai & Diulas</span>;
      default:
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-100 text-red-700">Dibatalkan</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Daftar Order Saya</h1>
          <p className="text-xs text-slate-500 mt-1">Pantau proses pengerjaan jasa offline dan beri ulasan.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {[
            { label: 'Semua', id: 'ALL' },
            { label: 'Berjalan', id: 'ACTIVE' },
            { label: 'Selesai', id: 'DONE' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap ${
                filterStatus === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((ord) => (
            <div key={ord.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-4">
              
              {/* Order Top Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-slate-400">ID: {ord.id}</span>
                  <span className="text-[11px] text-slate-400">{ord.createdAt}</span>
                </div>
                <div>{getStatusBadge(ord.status)}</div>
              </div>

              {/* Body Info */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-8 space-y-2">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                    {ord.expertCategory}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{ord.serviceTitle}</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 pt-1">
                    <p className="flex items-center gap-1.5">
                      <FiCalendar className="text-blue-500" />
                      <span>Jadwal: <strong>{ord.date} (Jam {ord.time})</strong></span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <FiMapPin className="text-blue-500" />
                      <span className="truncate">Alamat: <strong>{ord.address}</strong></span>
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 italic pt-1">
                    Catatan: "{ord.description || 'Tidak ada keluhan khusus'}"
                  </p>
                </div>

                <div className="md:col-span-4 text-left md:text-right space-y-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-700">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Total Biaya Offline</span>
                    <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                      Rp {ord.price.toLocaleString('id-ID')}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Bayar Cash/Transfer Saat Selesai</span>
                  </div>

                  <div className="flex items-center justify-start md:justify-end gap-2">
                    <button
                      onClick={() => handleWhatsAppChat(ord)}
                      className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 text-xs font-bold transition flex items-center gap-1.5 border border-emerald-200 dark:border-emerald-800"
                    >
                      <FiMessageSquare className="w-3.5 h-3.5" />
                      <span>Chat WA Ahli</span>
                    </button>

                    {ord.status === 'Selesai' && (
                      <button
                        onClick={() => handleOpenReview(ord)}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-amber-500/20 animate-bounce"
                      >
                        <FiStar className="w-3.5 h-3.5 fill-white" />
                        <span>Beri Ulasan</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-slate-800 p-12 rounded-3xl text-center text-slate-400">
            Tidak ada orderan ditemukan untuk filter ini.
          </div>
        )}
      </div>

    </div>
  );
};
