import React, { useState } from 'react';
import { useDataStore } from '@/store/useDataStore';
import { useAuthStore } from '@/store/useAuthStore';
import Swal from 'sweetalert2';
import { FiSave, FiUser, FiMapPin, FiClock, FiPhone, FiAward } from 'react-icons/fi';

export const ExpertProfile = () => {
  const { currentUser } = useAuthStore();
  const { experts } = useDataStore();
  const expert = experts.find((e) => e.id === currentUser?.id) || experts[0];

  const [bio, setBio] = useState(expert.bio || '');
  const [hours, setHours] = useState(expert.operatingHours || '');

  const handleSave = (e) => {
    e.preventDefault();
    Swal.fire('Berhasil!', 'Profil ahli telah diperbarui.', 'success');
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Profil Mitra Ahli</h1>
        <p className="text-xs text-slate-500 mt-1">Ubah bio deskripsi layanan dan jam operasional usaha Anda.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase">Nama Lengkap / Brand</label>
          <input type="text" disabled value={expert.name} className="w-full p-3 text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-500 cursor-not-allowed" />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase">Kategori Utama</label>
          <input type="text" disabled value={expert.category} className="w-full p-3 text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-500 cursor-not-allowed" />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase">Bio & Deskripsi Keahlian</label>
          <textarea rows={4} value={bio} onChange={(e) => setBio(e.target.value)} className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500" />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase">Jam Operasional</label>
          <input type="text" value={hours} onChange={(e) => setHours(e.target.value)} className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500" />
        </div>

        <button type="submit" className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-md shadow-emerald-500/20 transition flex items-center justify-center gap-2">
          <FiSave />
          <span>Simpan Profil Ahli</span>
        </button>
      </form>
    </div>
  );
};
