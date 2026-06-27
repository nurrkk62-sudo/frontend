import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDataStore } from '@/store/useDataStore';
import { ExpertCard } from '@/components/ui/ExpertCard';
import { FiSearch, FiFilter, FiSliders, FiCheckCircle, FiRefreshCw } from 'react-icons/fi';

export const ServiceListPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCat = searchParams.get('cat') || '';

  const { categories, experts } = useDataStore();

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCat);
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('rating'); // 'rating', 'distance', 'price', 'jobs'

  const filteredExperts = useMemo(() => {
    return experts
      .filter((exp) => {
        const matchQuery =
          !query ||
          exp.name.toLowerCase().includes(query.toLowerCase()) ||
          exp.category.toLowerCase().includes(query.toLowerCase()) ||
          exp.bio.toLowerCase().includes(query.toLowerCase());
        
        const matchCat = !category || exp.category === category;
        const matchRating = exp.rating >= minRating;
        const matchVerified = !verifiedOnly || exp.verified;

        return matchQuery && matchCat && matchRating && matchVerified;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price') return a.startingPrice - b.startingPrice;
        if (sortBy === 'jobs') return b.completedJobs - a.completedJobs;
        return 0;
      });
  }, [experts, query, category, minRating, verifiedOnly, sortBy]);

  const handleReset = () => {
    setQuery('');
    setCategory('');
    setMinRating(0);
    setVerifiedOnly(false);
    setSortBy('rating');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Cari Jasa & Teknisi Offline</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Menampilkan {filteredExperts.length} teknisi dan penyedia jasa terverifikasi.
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Cari kata kunci (ex: Cuci AC)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-blue-500 text-slate-900 dark:text-slate-100"
          />
          <FiSearch className="absolute left-3.5 top-3 text-slate-400 w-4 h-4" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Filters */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <FiFilter className="text-blue-600" />
              <span>Filter Jasa</span>
            </h3>
            <button
              onClick={handleReset}
              className="text-xs font-bold text-slate-400 hover:text-blue-600 flex items-center gap-1 transition"
            >
              <FiRefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Kategori</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 text-xs font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="">Semua Kategori</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Status Verification Filter */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Status Ahli</label>
            <label className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 cursor-pointer border border-slate-200/60 dark:border-slate-700/60">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <FiCheckCircle className="text-blue-600 w-4 h-4" />
                <span>Hanya Ahli Terverifikasi</span>
              </span>
            </label>
          </div>

          {/* Minimum Rating Filter */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Minimal Rating</label>
            <div className="grid grid-cols-4 gap-2">
              {[0, 4.0, 4.5, 4.8].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`py-2 text-xs font-bold rounded-xl border transition ${
                    minRating === r
                      ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {r === 0 ? 'Semua' : `${r}+ ⭐`}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Experts List Area */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Sorting Header */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Urutkan Berdasarkan:</span>
            <div className="flex items-center gap-2">
              {[
                { label: 'Rating Tertinggi', value: 'rating' },
                { label: 'Harga Terendah', value: 'price' },
                { label: 'Paling Banyak Pekerjaan', value: 'jobs' },
              ].map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSortBy(s.value)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                    sortBy === s.value
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Expert Cards Grid */}
          {filteredExperts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExperts.map((exp) => (
                <ExpertCard key={exp.id} expert={exp} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 p-12 rounded-3xl border border-slate-200 dark:border-slate-700 text-center space-y-3">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 text-slate-400 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                !
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Ahli Tidak Ditemukan</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">Coba ubah kata kunci pencarian atau reset filter kategori Anda.</p>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md"
              >
                Reset Semua Filter
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
