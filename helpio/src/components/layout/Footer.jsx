import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiFacebook, FiTwitter, FiYoutube, FiDollarSign, FiShield } from 'react-icons/fi';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Offline Payment Highlight Banner */}
        <div className="mb-12 p-6 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-emerald-950 border border-blue-900/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <FiDollarSign className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <span>Metode Pembayaran 100% Offline (COD / Cash / Transfer Direct)</span>
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                HelpIO tidak menyediakan payment gateway online. Semua transaksi dilakukan langsung antara pelanggan dan ahli setelah pengerjaan selesai di lokasi.
              </p>
            </div>
          </div>
          <span className="px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold whitespace-nowrap">
            Tanpa Biaya Admin Online
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/30">
                H
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Help<span className="text-blue-500">IO</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 pr-4">
              Platform Marketplace Jasa Offline Terpercaya di Indonesia. Mempertemukan Anda dengan teknisi, tukang, dan ahli profesional terverifikasi untuk berbagai kebutuhan rumah tangga dan bisnis.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center transition text-slate-300">
                <FiInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center transition text-slate-300">
                <FiFacebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center transition text-slate-300">
                <FiTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center transition text-slate-300">
                <FiYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Perusahaan */}
          <div>
            <h4 className="text-sm font-bold text-white tracking-wider uppercase mb-4">Perusahaan</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition">Tentang Kami</Link></li>
              <li><Link to="/jasa" className="hover:text-blue-400 transition">Kategori Jasa</Link></li>
              <li><Link to="/register-expert" className="hover:text-blue-400 transition">Gabung Jadi Ahli</Link></li>
              <li><a href="#" className="hover:text-blue-400 transition">Karir & Berita</a></li>
            </ul>
          </div>

          {/* Col 3: Bantuan & Legal */}
          <div>
            <h4 className="text-sm font-bold text-white tracking-wider uppercase mb-4">Bantuan & Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/bantuan" className="hover:text-blue-400 transition">FAQ (Tanya Jawab)</Link></li>
              <li><Link to="/bantuan" className="hover:text-blue-400 transition">Pusat Bantuan</Link></li>
              <li><a href="#" className="hover:text-blue-400 transition">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Syarat & Ketentuan</a></li>
            </ul>
          </div>

          {/* Col 4: Kontak */}
          <div>
            <h4 className="text-sm font-bold text-white tracking-wider uppercase mb-4">Hubungi Kami</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <FiMapPin className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                <span>Jl. Pemuda No. 123, Semarang, Jawa Tengah</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>0812-3456-7890 (WA Only)</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>support@helpio.id</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 HelpIO Marketplace Jasa Offline. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-6">
            <span>Privasi</span>
            <span>Syarat Kerja</span>
            <span>Peta Situs</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
