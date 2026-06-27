import React, { useState } from 'react';
import { useDataStore } from '@/store/useDataStore';
import { useAuthStore } from '@/store/useAuthStore';
import Swal from 'sweetalert2';
import { FiTool, FiPlus, FiTrash2, FiEdit3, FiClock, FiCheck } from 'react-icons/fi';

export const ExpertServices = () => {
  const { currentUser } = useAuthStore();
  const { experts, addExpertService, deleteExpertService } = useDataStore();

  const expert = experts.find((e) => e.id === currentUser?.id) || experts[0];

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newEstTime, setNewEstTime] = useState('1 Jam');
  const [newDesc, setNewDesc] = useState('');

  const handleAddService = (e) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;

    addExpertService(expert.id, {
      title: newTitle,
      price: parseInt(newPrice, 10),
      estTime: newEstTime,
      description: newDesc,
    });

    setShowAddModal(false);
    setNewTitle('');
    setNewPrice('');
    setNewDesc('');

    Swal.fire({
      icon: 'success',
      title: 'Jasa Berhasil Ditambahkan!',
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleDelete = (serviceId) => {
    Swal.fire({
      title: 'Hapus Layanan Ini?',
      text: 'Pelanggan tidak akan dapat melihat layanan ini lagi.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      confirmButtonText: 'Ya, Hapus',
    }).then((res) => {
      if (res.isConfirmed) {
        deleteExpertService(expert.id, serviceId);
        Swal.fire('Terhapus!', 'Layanan telah dihapus.', 'success');
      }
    });
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Kelola Layanan Jasa Saya</h1>
          <p className="text-xs text-slate-500 mt-1">Tambah, edit, atau sesuaikan tarif jasa yang Anda tawarkan ke pelanggan.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-md shadow-emerald-500/20 transition flex items-center gap-2"
        >
          <FiPlus className="w-4 h-4" />
          <span>Tambah Jasa Baru</span>
        </button>
      </div>

      <div className="space-y-4">
        {expert.servicesList && expert.servicesList.length > 0 ? (
          expert.servicesList.map((srv) => (
            <div key={srv.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                  Aktif
                </span>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{srv.title}</h3>
                <p className="text-xs text-slate-500 max-w-xl">{srv.description}</p>
                <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400 pt-1">
                  <FiClock className="w-3.5 h-3.5" />
                  <span>Estimasi Pengerjaan: {srv.estTime}</span>
                </div>
              </div>

              <div className="text-left sm:text-right space-y-2 border-t sm:border-t-0 border-slate-100 dark:border-slate-700 pt-3 sm:pt-0">
                <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 block">
                  Rp {srv.price.toLocaleString('id-ID')}
                </span>
                <button
                  onClick={() => handleDelete(srv.id)}
                  className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition flex items-center gap-1 inline-block"
                >
                  <FiTrash2 className="w-3.5 h-3.5" />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-slate-800 p-12 rounded-3xl text-center text-slate-400">
            Belum ada jasa ditambahkan. Klik tombol "Tambah Jasa Baru".
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Tambah Jasa Offline Baru</h3>
            <form onSubmit={handleAddService} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Nama Layanan Jasa</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Service Freon AC Split"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Harga Mulai (Rp)</label>
                <input
                  type="number"
                  required
                  placeholder="150000"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Estimasi Waktu</label>
                <input
                  type="text"
                  placeholder="45 Menit / 1 Jam"
                  value={newEstTime}
                  onChange={(e) => setNewEstTime(e.target.value)}
                  className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Deskripsi Pengerjaan</label>
                <textarea
                  rows={2}
                  placeholder="Penjelasan ringkas pekerjaan..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-2xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-emerald-600 text-white font-bold text-xs rounded-2xl shadow-md"
                >
                  Simpan Jasa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
