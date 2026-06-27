import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useDataStore } from '@/store/useDataStore';
import { OTPModal } from './OTPModal';
import Swal from 'sweetalert2';
import { FiUser, FiMail, FiPhone, FiLock, FiBriefcase, FiMapPin, FiAward } from 'react-icons/fi';

export const RegisterExpert = () => {
  const navigate = useNavigate();
  const { registerExpert } = useAuthStore();
  const { categories } = useDataStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: categories[0]?.name || 'Service & Cuci AC',
    address: '',
    password: '',
  });
  const [showOTP, setShowOTP] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowOTP(true);
  };

  const handleOTPSuccess = () => {
    setShowOTP(false);
    registerExpert(formData);

    Swal.fire({
      icon: 'info',
      title: 'Registrasi Ahli Diterima!',
      text: 'Profil Anda telah terdaftar dan berada dalam status Pengajuan Verifikasi oleh Admin HelpIO.',
      confirmButtonColor: '#10B981',
      confirmButtonText: 'Masuk Dashboard Ahli',
    }).then(() => {
      navigate('/expert');
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 font-black text-2xl flex items-center justify-center mx-auto shadow-md">
            <FiBriefcase className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Daftar Sebagai Ahli / Teknisi</h2>
          <p className="text-xs text-slate-500">Dapatkan orderan jasa offline dari ribuan pelanggan terdekat.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Nama Lengkap / Nama Usaha</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Rudi Hermawan (Teknisi AC)"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
              />
              <FiUser className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Kategori Utama Jasa</label>
            <div className="relative">
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full pl-10 pr-4 py-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
              <FiAward className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Nomor WhatsApp Aktif</label>
            <div className="relative">
              <input
                type="tel"
                required
                placeholder="081234567891"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-10 pr-4 py-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
              />
              <FiPhone className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="rudi@teknisi.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
              />
              <FiMail className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Wilayah Operasional</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Semarang Selatan, Jawa Tengah"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full pl-10 pr-4 py-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
              />
              <FiMapPin className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
              />
              <FiLock className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-500/20 transition"
          >
            Lanjutkan Verifikasi WA Ahli
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-slate-500">
          Sudah punya akun ahli?{' '}
          <Link to="/login" className="font-bold text-blue-600 hover:underline">Masuk</Link>
        </div>

      </div>

      <OTPModal
        isOpen={showOTP}
        onClose={() => setShowOTP(false)}
        onSuccess={handleOTPSuccess}
        phone={formData.phone}
      />
    </div>
  );
};
