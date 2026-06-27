import React from 'react';
import { useDataStore } from '@/store/useDataStore';
import Swal from 'sweetalert2';
import { FiTrash2, FiSlash, FiStar } from 'react-icons/fi';

export const AdminReviewManage = () => {
  const { reviews } = useDataStore();

  const handleDeleteReview = (id) => {
    Swal.fire('Terhapus!', `Review ${id} telah dihapus karena terdeteksi spam.`, 'success');
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Moderasi Review & Ulasan</h1>
        <p className="text-xs text-slate-500 mt-1">Pengawasan ulasan spam atau kata-kata kasar dari pelanggan/ahli.</p>
      </div>

      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">{r.userName}</span>
                <span className="text-[10px] text-slate-400">• {r.date}</span>
              </div>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(r.rating)].map((_, i) => (
                  <FiStar key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 italic">"{r.comment}"</p>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => handleDeleteReview(r.id)} className="px-3.5 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold flex items-center gap-1">
                <FiTrash2 /> Hapus Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
