import React from 'react';
import { useDataStore } from '@/store/useDataStore';
import Swal from 'sweetalert2';
import { FiShield, FiCheckCircle, FiXCircle, FiRefreshCw, FiFileText } from 'react-icons/fi';

export const AdminVerification = () => {
  const { verifications, updateVerificationStatus } = useDataStore();

  const handleAction = (id, statusLabel, color) => {
    updateVerificationStatus(id, statusLabel);
    Swal.fire({
      icon: 'success',
      title: `Verifikasi ${statusLabel.toUpperCase()}!`,
      text: `Status berkas pendaftaran ahli telah diubah.`,
      confirmButtonColor: color,
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Verifikasi Pendaftaran Mitra Ahli</h1>
        <p className="text-xs text-slate-500 mt-1">Periksa kelengkapan KTP, Sertifikat Keahlian, dan Portofolio calon teknisi.</p>
      </div>

      <div className="space-y-4">
        {verifications.map((v) => (
          <div key={v.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{v.expertName}</h3>
                <span className="text-xs text-slate-500">Kategori: {v.category} • WA: {v.phone}</span>
              </div>
              <span className={`px-3 py-1 text-xs font-bold rounded-full capitalize ${
                v.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : v.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
              }`}>
                Status: {v.status}
              </span>
            </div>

            {/* Document Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                  <FiFileText /> Document KTP Identitas
                </span>
                <div className="h-32 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <img src={v.ktpUrl} alt="KTP" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                  <FiFileText /> Sertifikat Keahlian / SKK
                </span>
                <div className="h-32 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <img src={v.certificateUrl} alt="Sertifikat" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
              <button
                onClick={() => handleAction(v.id, 'revision', '#F59E0B')}
                className="px-4 py-2 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 text-xs font-bold flex items-center gap-1 border border-amber-200"
              >
                <FiRefreshCw /> Minta Revisi
              </button>
              <button
                onClick={() => handleAction(v.id, 'rejected', '#EF4444')}
                className="px-4 py-2 rounded-xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 text-xs font-bold flex items-center gap-1 border border-red-200"
              >
                <FiXCircle /> Tolak (Reject)
              </button>
              <button
                onClick={() => handleAction(v.id, 'approved', '#10B981')}
                className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md flex items-center gap-1"
              >
                <FiCheckCircle /> Setujui (Approve)
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
