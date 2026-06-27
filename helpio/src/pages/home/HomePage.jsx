import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDataStore } from '@/store/useDataStore';
import { CategoryIcon } from '@/components/common/CategoryIcon';
import { ExpertCard } from '@/components/ui/ExpertCard';
import { 
  FiSearch, FiCheckCircle, FiShield, FiDollarSign, FiMessageSquare, 
  FiClock, FiStar, FiArrowRight, FiCheck, FiTool
} from 'react-icons/fi';

export const HomePage = () => {
  const navigate = useNavigate();
  const { categories, experts, reviews } = useDataStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery || selectedCategory) {
      navigate(`/jasa?q=${encodeURIComponent(searchQuery)}&cat=${encodeURIComponent(selectedCategory)}`);
    } else {
      navigate('/jasa');
    }
  };

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section - Real World Marketplace Handyman Theme */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-orange-50/60 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 text-xs font-bold border border-orange-200 dark:border-orange-800">
                <FiTool className="w-4 h-4 text-orange-600" />
                <span>Marketplace Tukang & Teknisi Offline Terpercaya</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                Layanan Jasa Offline Profesional <span className="text-orange-600 dark:text-orange-500">Langsung ke Rumah Anda</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Temukan ahli terverifikasi untuk Service AC, Cuci AC, Listrik, Ledeng, Kebersihan, hingga Perbaikan Rumah. Bayar langsung saat pekerjaan selesai (Cash / Transfer).
              </p>

              {/* Search Box Card */}
              <form onSubmit={handleSearch} className="p-3 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-700 max-w-2xl mx-auto lg:mx-0 grid grid-cols-1 sm:grid-cols-12 gap-2">
                <div className="sm:col-span-6 relative flex items-center">
                  <FiSearch className="absolute left-4 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Butuh jasa apa hari ini? (ex: Cuci AC)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 text-sm bg-slate-50 dark:bg-slate-900/60 rounded-2xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="sm:col-span-4 relative flex items-center">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-900/60 rounded-2xl text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                  >
                    <option value="">Semua Kategori</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full h-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-2xl shadow-md shadow-orange-500/30 transition flex items-center justify-center gap-2"
                  >
                    <span>Cari</span>
                  </button>
                </div>
              </form>

              {/* Quick stats */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-8 text-xs font-bold text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-teal-600 w-4 h-4" />
                  <span>500+ Ahli Terverifikasi</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-teal-600 w-4 h-4" />
                  <span>Tanpa Biaya Admin Online</span>
                </div>
              </div>
            </div>

            {/* Hero Graphic */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl bg-slate-900 p-6 flex flex-col justify-between overflow-hidden shadow-2xl border border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80"
                  alt="Technician Illustration"
                  className="absolute inset-0 w-full h-full object-cover opacity-80 hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                <div className="relative z-10 flex justify-end">
                  <span className="px-3.5 py-1.5 rounded-full bg-white text-xs font-bold text-slate-900 shadow-lg flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
                    Ahli Siap Dipanggil
                  </span>
                </div>

                <div className="relative z-10 p-4 rounded-2xl bg-slate-900/90 border border-slate-700 text-white space-y-1">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                    <FiStar className="fill-amber-400" />
                    <span>4.9 / 5.0 Rating Pelanggan</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-white">Teknisi AC & Tukang Profesional</h4>
                  <p className="text-[11px] text-slate-300">Datang ke lokasi tepat waktu dengan garansi pengerjaan.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Populer Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">Kategori Layanan</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Jasa Offline Populer Hari Ini
            </h2>
          </div>
          <Link to="/jasa" className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 dark:text-orange-400 hover:gap-3 transition-all">
            <span>Lihat Semua Kategori</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.slice(0, 6).map((cat) => (
            <Link
              key={cat.id}
              to={`/jasa?cat=${encodeURIComponent(cat.name)}`}
              className="group bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-xl hover:border-orange-500/50 hover:-translate-y-1 transition duration-300 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-600 text-white flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition duration-300">
                <CategoryIcon iconName={cat.icon} className="w-7 h-7" />
              </div>
              <h3 className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition line-clamp-1">
                {cat.name}
              </h3>
              <span className="text-[11px] text-slate-400 mt-1">{cat.count}+ Ahli</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Experts Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">Rekomendasi Terbaik</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Ahli & Teknisi Terverifikasi Near You
            </h2>
          </div>
          <Link to="/jasa" className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 dark:text-orange-400 hover:gap-3 transition-all">
            <span>Cari Berdasarkan Lokasi</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.slice(0, 3).map((exp) => (
            <ExpertCard key={exp.id} expert={exp} />
          ))}
        </div>
      </section>

      {/* Kenapa Memilih Kami */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400">Keunggulan Platform</span>
            <h2 className="text-3xl font-black">Kenapa Memilih HelpIO?</h2>
            <p className="text-sm text-slate-400">Platform terdepan yang mengutamakan kemudahan, keamanan, dan transparansi transaksi offline Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Ahli Terverifikasi', desc: 'Semua teknisi dan tukang wajib melewati verifikasi KTP & sertifikasi portofolio oleh tim admin.', icon: FiShield, color: 'text-orange-400' },
              { title: 'Harga Transparan', desc: 'Daftar patokan harga awal tercantum jelas di profil ahli tanpa biaya siluman.', icon: FiDollarSign, color: 'text-teal-400' },
              { title: 'Review & Rating Asli', desc: 'Ulasan murni dari pelanggan nyata yang telah selesai menggunakan jasa.', icon: FiStar, color: 'text-amber-400' },
              { title: 'Respon Cepat', desc: 'Komunikasi langsung tanpa hambatan melalui integrasi tombol WhatsApp resmi.', icon: FiMessageSquare, color: 'text-orange-300' },
              { title: 'Booking Mudah', desc: 'Formulir pemesanan ringkas untuk menentukan tanggal, jam, dan lokasi pengerjaan.', icon: FiClock, color: 'text-teal-300' },
              { title: 'Pembayaran COD / Cash', desc: '100% tanpa bayar online. Bayar langsung saat pekerjaan selesai dan Anda puas.', icon: FiCheckCircle, color: 'text-emerald-400' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 hover:border-orange-500/50 transition">
                  <div className={`w-12 h-12 rounded-2xl bg-slate-700 ${item.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cara Kerja Infographic Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">Alur Pemesanan</span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Cara Kerja Pemesanan Jasa</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">7 langkah simpel dari mencari hingga pengerjaan selesai di lokasi Anda.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 relative">
          {[
            { step: '1', title: 'Cari Jasa', desc: 'Pilih kategori atau ketik di pencarian' },
            { step: '2', title: 'Pilih Ahli', desc: 'Bandingkan profil, harga & ulasan' },
            { step: '3', title: 'Chat WhatsApp', desc: 'Diskusi detail & jam kedatangan' },
            { step: '4', title: 'Deal Harga', desc: 'Sepakati estimasi biaya akhir' },
            { step: '5', title: 'Ahli Datang', desc: 'Teknisi tiba di alamat Anda' },
            { step: '6', title: 'Pekerjaan Selesai', desc: 'Cek hasil & bayar Cash/COD' },
            { step: '7', title: 'Beri Review', desc: 'Berikan penilaian ulasan bintang' },
          ].map((item, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200 dark:border-slate-700 text-center flex flex-col items-center shadow-sm relative">
              <div className="w-10 h-10 rounded-2xl bg-orange-600 text-white font-black text-sm flex items-center justify-center mb-3 shadow-md shadow-orange-500/20">
                {item.step}
              </div>
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-white mb-1">{item.title}</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="max-w-xl space-y-4 relative z-10">
            <span className="px-3 py-1 rounded-full bg-orange-600/30 text-orange-400 text-xs font-bold uppercase tracking-wider">Ulasan Pelanggan</span>
            <h2 className="text-3xl font-black">Dipercaya Ribuan Pemilik Rumah di Semarang & Sekitarnya</h2>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-slate-800 p-6 rounded-2xl text-white space-y-3 border border-slate-700">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm italic leading-relaxed text-slate-300">"{rev.comment}"</p>
                <div className="flex items-center gap-3 pt-2">
                  <img src={rev.userAvatar} alt={rev.userName} className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-500/40" />
                  <div>
                    <h4 className="text-xs font-bold text-white">{rev.userName}</h4>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
