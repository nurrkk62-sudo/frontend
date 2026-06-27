import React from 'react';
import { useDataStore } from '@/store/useDataStore';
import { ExpertCard } from '@/components/ui/ExpertCard';

export const UserFavorites = () => {
  const { favorites, experts } = useDataStore();
  const favExperts = experts.filter((e) => favorites.includes(e.id));

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Ahli Favorit Saya</h1>
        <p className="text-xs text-slate-500 mt-1">Daftar teknisi dan penyedia jasa yang Anda simpan.</p>
      </div>

      {favExperts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favExperts.map((exp) => (
            <ExpertCard key={exp.id} expert={exp} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 p-12 rounded-3xl text-center text-slate-400">
          Belum ada ahli yang Anda simpan ke favorit.
        </div>
      )}
    </div>
  );
};
