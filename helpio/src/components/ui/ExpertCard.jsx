import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiStar, FiMapPin, FiBriefcase, FiMessageSquare, FiCalendar, FiHeart } from 'react-icons/fi';
import { useDataStore } from '@/store/useDataStore';

export const ExpertCard = ({ expert }) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useDataStore();
  const isFav = favorites.includes(expert.id);

  const handleWhatsAppClick = (e) => {
    e.stopPropagation();
    const message = encodeURIComponent(`Halo ${expert.name}, saya melihat profil Anda di HelpIO dan ingin bertanya tentang layanan jasa ${expert.category}.`);
    window.open(`https://wa.me/${expert.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <div className="group bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
      
      {/* Top Banner & Avatar Header */}
      <div>
        <div className="relative mb-4">
          <div className="h-24 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-700">
            <img
              src={expert.banner || 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80'}
              alt="Banner"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          </div>

          {/* Favorite button */}
          <button
            onClick={() => toggleFavorite(expert.id)}
            className="absolute top-2 right-2 w-9 h-9 rounded-full bg-white/90 dark:bg-slate-800/90 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-red-500 transition shadow-sm"
          >
            <FiHeart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
          </button>

          {/* Avatar floating */}
          <div className="absolute -bottom-4 left-4 flex items-end gap-2">
            <div className="relative">
              <img
                src={expert.avatar}
                alt={expert.name}
                className="w-14 h-14 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-800 shadow-md"
              />
              {expert.verified && (
                <div className="absolute -bottom-1 -right-1 bg-teal-600 text-white rounded-full p-0.5 ring-2 ring-white dark:ring-slate-800" title="Terverifikasi Admin">
                  <FiCheckCircle className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Content */}
        <div className="pt-2">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border border-orange-200/60 dark:border-orange-800">
              {expert.category}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full">
              <FiStar className="w-3.5 h-3.5 fill-amber-400" />
              <span>{expert.rating}</span>
              <span className="text-slate-400 font-normal">({expert.reviewCount})</span>
            </div>
          </div>

          <Link to={`/ahli/${expert.id}`} className="block group-hover:text-orange-600 transition">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white line-clamp-1 flex items-center gap-1.5">
              <span>{expert.name}</span>
            </h3>
          </Link>

          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-2">
            <span className="flex items-center gap-1">
              <FiMapPin className="text-orange-500" />
              <span className="truncate max-w-[120px]">{expert.location}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <FiBriefcase className="text-orange-500" />
              <span>{expert.completedJobs} Selesai</span>
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 line-clamp-2 leading-relaxed">
            {expert.bio}
          </p>
        </div>
      </div>

      {/* Pricing & Footer Actions */}
      <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/60">
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-[11px] text-slate-400 font-medium">Mulai dari</span>
          <span className="text-base font-black text-slate-900 dark:text-white">
            Rp {expert.startingPrice.toLocaleString('id-ID')}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleWhatsAppClick}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition border border-emerald-200 dark:border-emerald-800"
          >
            <FiMessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>WA Chat</span>
          </button>

          <Link
            to={`/booking/${expert.id}`}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-md shadow-orange-500/20 transition"
          >
            <FiCalendar className="w-3.5 h-3.5" />
            <span>Booking Jasa</span>
          </Link>
        </div>
      </div>

    </div>
  );
};
