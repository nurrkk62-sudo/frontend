import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { OTPModal } from './OTPModal';
import Swal from 'sweetalert2';
import { FiUser, FiMail, FiPhone, FiLock, FiMapPin } from 'react-icons/fi';

export const RegisterUser = () => {
  const navigate = useNavigate();
  const { registerUser } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    address: '',
  });
  const [showOTP, setShowOTP] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowOTP(true);
  };

  const handleOTPSuccess = () => {
    setShowOTP(false);
    registerUser(formData);

    Swal.fire({
      icon: 'success',
      title: 'Registrasi Pelanggan Berhasil!',
      text: 'Akun Anda telah terverifikasi via WhatsApp.',
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      navigate('/user');
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Daftar Akun Pelanggan</h2>
          <p className="text-xs text-slate-500">Buat akun untuk mencari dan memesan jasa offline terdekat.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Nama Lengkap</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Budi Santoso"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
              />
              <FiUser className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="budi@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
              />
              <FiMail className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Nomor WhatsApp</label>
            <div className="relative">
              <input
                type="tel"
                required
                placeholder="081234567890"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-10 pr-4 py-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
              />
              <FiPhone className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Alamat Rumah</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Jl. Pemuda No. 45, Semarang"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full pl-10 pr-4 py-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
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
                className="w-full pl-10 pr-4 py-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
              />
              <FiLock className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-500/20 transition"
          >
            Lanjutkan Verifikasi WA
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-slate-500">
          Sudah punya akun?{' '}
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
