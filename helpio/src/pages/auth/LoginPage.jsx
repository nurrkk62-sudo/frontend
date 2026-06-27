import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import Swal from 'sweetalert2';
import { FiMail, FiLock, FiUser, FiBriefcase, FiShield } from 'react-icons/fi';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('budi@example.com');
  const [password, setPassword] = useState('password');
  const [role, setRole] = useState('user'); // 'user', 'expert', 'admin'

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password, role);

    Swal.fire({
      icon: 'success',
      title: 'Selamat Datang!',
      text: `Berhasil masuk sebagai ${role.toUpperCase()}.`,
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      if (role === 'admin') navigate('/admin');
      else if (role === 'expert') navigate('/expert');
      else navigate('/user');
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
            H
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Masuk Akun HelpIO</h2>
          <p className="text-xs text-slate-500">Pilih role dan masukkan akun Anda untuk melanjutkan.</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900">
          {[
            { id: 'user', label: 'Pelanggan', icon: FiUser },
            { id: 'expert', label: 'Ahli', icon: FiBriefcase },
            { id: 'admin', label: 'Admin', icon: FiShield },
          ].map((r) => {
            const Icon = r.icon;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition ${
                  role === r.id
                    ? 'bg-white dark:bg-slate-800 text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
              />
              <FiMail className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
              <a href="#" className="text-xs font-bold text-blue-600 hover:underline">Lupa Password?</a>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
              />
              <FiLock className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-500/20 transition"
          >
            Masuk Sekarang
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-slate-500">
          Belum punya akun?{' '}
          <Link to="/register-user" className="font-bold text-blue-600 hover:underline">Daftar Pelanggan</Link>
          {' atau '}
          <Link to="/register-expert" className="font-bold text-emerald-600 hover:underline">Daftar Ahli</Link>
        </div>

      </div>
    </div>
  );
};
