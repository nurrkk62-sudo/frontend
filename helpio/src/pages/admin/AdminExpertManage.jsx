import React from 'react';
import { useDataStore } from '@/store/useDataStore';
import Swal from 'sweetalert2';

export const AdminExpertManage = () => {
  const { experts } = useDataStore();

  const handleSuspend = (name) => {
    Swal.fire('Status Ahli Diubah', `Akun mitra ${name} telah disuspend temporer.`, 'warning');
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Kelola Data Mitra Ahli (Penyedia Jasa)</h1>
        <p className="text-xs text-slate-500 mt-1">Status keaktifan, pembekuan akun, dan pengawasan kualitas teknisi.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-900 text-slate-400 uppercase font-bold border-b border-slate-100 dark:border-slate-700">
            <tr>
              <th className="p-4">Nama Ahli</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Rating & Review</th>
              <th className="p-4">Status Verif</th>
              <th className="p-4 text-right">Aksi Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-semibold text-slate-700 dark:text-slate-200">
            {experts.map((e) => (
              <tr key={e.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/40">
                <td className="p-4 font-bold text-slate-900 dark:text-white">{e.name}</td>
                <td className="p-4">{e.category}</td>
                <td className="p-4 text-amber-500 font-bold">{e.rating} ⭐ ({e.reviewCount})</td>
                <td className="p-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                    Verified
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleSuspend(e.name)} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-xl text-xs font-bold">
                    Suspend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
