import React from 'react';
import { useDataStore } from '@/store/useDataStore';
import { useAuthStore } from '@/store/useAuthStore';
import Swal from 'sweetalert2';
import { FiShoppingBag, FiCheckCircle, FiXCircle, FiPlayCircle, FiMessageSquare, FiMapPin, FiCalendar } from 'react-icons/fi';

export const ExpertIncomingOrders = () => {
  const { currentUser } = useAuthStore();
  const { orders, updateOrderStatus } = useDataStore();

  const expertOrders = orders; // show all for easy demo testing

  const handleUpdateStatus = (orderId, statusLabel) => {
    updateOrderStatus(orderId, statusLabel);
    Swal.fire({
      icon: 'success',
      title: 'Status Diperbarui!',
      text: `Status pesanan ${orderId} telah diubah menjadi: ${statusLabel}`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleWhatsAppChat = (ord) => {
    const text = encodeURIComponent(`Halo Bpk/Ibu ${ord.userName}, saya teknisi HelpIO terkait order ${ord.id} (${ord.serviceTitle}). Ingin konfirmasi alamat kedatangan.`);
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Order Masuk & Pekerjaan</h1>
        <p className="text-xs text-slate-500 mt-1">Kelola permohonan jasa dari pelanggan, terima, dan update progress pengerjaan.</p>
      </div>

      <div className="space-y-4">
        {expertOrders.map((ord) => (
          <div key={ord.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-slate-400">Order #{ord.id}</span>
                <span className="text-[11px] text-slate-400">{ord.createdAt}</span>
              </div>
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                Status: {ord.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-8 space-y-2">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{ord.serviceTitle}</h3>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  Pelanggan: <strong>{ord.userName}</strong> ({ord.userPhone})
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <FiMapPin className="text-emerald-500" />
                  <span>Alamat: <strong>{ord.address}</strong></span>
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <FiCalendar className="text-emerald-500" />
                  <span>Jadwal Minta: <strong>{ord.date} jam {ord.time}</strong></span>
                </p>
                <p className="text-xs text-slate-500 italic bg-slate-50 dark:bg-slate-900 p-3 rounded-xl">
                  Keluhan: "{ord.description}"
                </p>
              </div>

              <div className="md:col-span-4 text-left md:text-right space-y-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-700">
                <div>
                  <span className="text-[10px] text-slate-400 block">Tarif Disepakati</span>
                  <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                    Rp {ord.price.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[10px] text-slate-400 block">Terima Cash/Transfer Langsung</span>
                </div>

                <div className="flex flex-wrap items-center justify-start md:justify-end gap-2">
                  <button
                    onClick={() => handleWhatsAppChat(ord)}
                    className="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 text-xs font-bold flex items-center gap-1 border border-emerald-200"
                  >
                    <FiMessageSquare />
                    <span>WA Pelanggan</span>
                  </button>

                  {ord.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(ord.id, 'Diterima')}
                        className="px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md"
                      >
                        Terima Order
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(ord.id, 'Cancelled')}
                        className="px-3 py-2 rounded-xl bg-red-100 text-red-600 text-xs font-bold"
                      >
                        Tolak
                      </button>
                    </>
                  )}

                  {ord.status === 'Diterima' && (
                    <button
                      onClick={() => handleUpdateStatus(ord.id, 'Dalam Proses')}
                      className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md flex items-center gap-1"
                    >
                      <FiPlayCircle />
                      <span>Mulai Kerjakan</span>
                    </button>
                  )}

                  {ord.status === 'Dalam Proses' && (
                    <button
                      onClick={() => handleUpdateStatus(ord.id, 'Selesai')}
                      className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md flex items-center gap-1"
                    >
                      <FiCheckCircle />
                      <span>Tandai Selesai</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
