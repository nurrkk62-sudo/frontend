import React from 'react';
import { useDataStore } from '@/store/useDataStore';
import { FiStar } from 'react-icons/fi';

export const UserReviews = () => {
  const { reviews } = useDataStore();

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Ulasan Saya</h1>
        <p className="text-xs text-slate-500 mt-1">Riwayat ulasan dan penilaian yang telah Anda berikan.</p>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(rev.rating)].map((_, i) => (
                  <FiStar key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs text-slate-400">{rev.date}</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-medium">"{rev.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};
