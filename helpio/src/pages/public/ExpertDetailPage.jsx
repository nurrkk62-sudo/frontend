import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDataStore } from '@/store/useDataStore';
import { 
  FiCheckCircle, FiStar, FiMapPin, FiBriefcase, FiClock, FiMessageSquare, 
  FiCalendar, FiPhone, FiHelpCircle, FiChevronDown, FiChevronUp, FiAward
} from 'react-icons/fi';

export const ExpertDetailPage = () => {
  const { id } = useParams();
  const { experts, reviews, faqs } = useDataStore();

  const expert = experts.find((e) => e.id === id) || experts[0]; // fallback to first expert for demo
  const expertReviews = reviews.filter((r) => r.expertId === expert.id);

  const [activeTab, setActiveTab] = useState('layanan'); // 'layanan', 'portofolio', 'ulasan', 'faq'
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Halo ${expert.name}, saya tertarik dengan jasa Anda (${expert.category}) di HelpIO.`);
    window.open(`https://wa.me/${expert.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner & Header Profile Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-md overflow-hidden">
        
        {/* Banner */}
        <div className="h-48 sm:h-64 w-full relative bg-slate-200 dark:bg-slate-700">
          <img
            src={expert.banner || 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&auto=format&fit=crop&q=80'}
            alt="Banner Ahli"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        </div>

        {/* Content Info */}
        <div className="p-6 sm:p-8 relative pt-0 sm:pt-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
            
            {/* Avatar + Main Details */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              <div className="relative">
                <img
                  src={expert.avatar}
                  alt={expert.name}
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover ring-4 ring-white dark:ring-slate-800 shadow-xl"
                />
                {expert.verified && (
                  <div className="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full p-1 ring-4 ring-white dark:ring-slate-800 shadow-md" title="Ahli Terverifikasi">
                    <FiCheckCircle className="w-5 h-5" />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                    {expert.category}
                  </span>
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <FiAward className="w-3.5 h-3.5" />
                    <span>Pengalaman {expert.experience}</span>
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2 mt-2">
                  <span>{expert.name}</span>
                </h1>

                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 flex-wrap">
                  <span className="flex items-center gap-1">
                    <FiMapPin className="text-slate-400" />
                    <span>{expert.location}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-amber-500 font-bold">
                    <FiStar className="fill-amber-400" />
                    <span>{expert.rating} ({expert.reviewCount} ulasan)</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <FiBriefcase className="text-slate-400" />
                    <span>{expert.completedJobs} Pekerjaan Selesai</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleWhatsAppClick}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition"
              >
                <FiMessageSquare className="w-4 h-4" />
                <span>Chat WhatsApp</span>
              </button>

              <Link
                to={`/booking/${expert.id}`}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition"
              >
                <FiCalendar className="w-4 h-4" />
                <span>Booking Jasa</span>
              </Link>
            </div>

          </div>

          {/* Bio */}
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/60 pt-4">
            {expert.bio}
          </p>
        </div>

      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Tabs Content */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 p-6 shadow-sm space-y-6">
          
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-3 overflow-x-auto">
            {[
              { id: 'layanan', label: 'Daftar Layanan & Harga' },
              { id: 'portofolio', label: 'Portofolio Hasil Kerja' },
              { id: 'ulasan', label: `Ulasan Pelanggan (${expertReviews.length})` },
              { id: 'faq', label: 'Pertanyaan Umum' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Layanan */}
          {activeTab === 'layanan' && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Layanan yang Ditawarkan</h3>
              <div className="space-y-3">
                {expert.servicesList?.map((srv) => (
                  <div key={srv.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{srv.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{srv.description}</p>
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400 pt-1">
                        <FiClock className="w-3.5 h-3.5" />
                        <span>Estimasi Pengerjaan: {srv.estTime}</span>
                      </div>
                    </div>
                    <div className="text-left sm:text-right flex flex-col sm:items-end justify-between gap-2">
                      <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                        Rp {srv.price.toLocaleString('id-ID')}
                      </span>
                      <Link
                        to={`/booking/${expert.id}`}
                        className="px-4 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition inline-block text-center"
                      >
                        Pilih Layanan
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Portofolio */}
          {activeTab === 'portofolio' && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Dokumentasi & Portofolio</h3>
              {expert.portfolio && expert.portfolio.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {expert.portfolio.map((imgUrl, idx) => (
                    <div key={idx} className="h-48 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-700">
                      <img src={imgUrl} alt="Portofolio" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">Belum ada portofolio foto yang diunggah.</p>
              )}
            </div>
          )}

          {/* Tab 3: Ulasan */}
          {activeTab === 'ulasan' && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Ulasan dari Pelanggan</h3>
              <div className="space-y-3">
                {expertReviews.length > 0 ? (
                  expertReviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={rev.userAvatar} alt="User" className="w-8 h-8 rounded-full object-cover" />
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{rev.userName}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <FiStar key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic">Belum ada ulasan untuk ahli ini.</p>
                )}
              </div>
            </div>
          )}

          {/* Tab 4: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-3">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Pertanyaan yang Sering Diajukan</h3>
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full p-4 text-left font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50"
                  >
                    <span>{faq.q}</span>
                    {openFaqIndex === idx ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  {openFaqIndex === idx && (
                    <div className="p-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Sidebar Info Card */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 p-6 shadow-sm space-y-6">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-3">
            Informasi Operasional
          </h3>

          <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
            <div>
              <span className="text-slate-400 font-medium block mb-1">Jam Operasional</span>
              <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <FiClock className="text-blue-600" />
                <span>{expert.operatingHours}</span>
              </p>
            </div>

            <div>
              <span className="text-slate-400 font-medium block mb-1">Keahlian Utama</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {expert.skills?.map((sk, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-semibold">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/60 space-y-2">
              <h4 className="font-bold text-blue-900 dark:text-blue-300 text-xs flex items-center gap-1.5">
                <FiCheckCircle className="text-blue-600" />
                <span>Pembayaran Offline</span>
              </h4>
              <p className="text-[11px] text-blue-800 dark:text-blue-400 leading-relaxed">
                Pembayaran dilakukan langsung secara Cash / COD / Transfer ke teknisi setelah pekerjaan selesai.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
