import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useDataStore } from '@/store/useDataStore';
import { FiSearch, FiBell, FiUser, FiLogOut, FiBriefcase, FiGrid, FiShield, FiMenu, FiX, FiCheckCircle } from 'react-icons/fi';

export const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, logout, activeRole } = useAuthStore();
  const { notifications, markNotificationsRead } = useDataStore();
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jasa?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo - Handyman Safety Orange & Slate */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-orange-500/20">
              H
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Help<span className="text-orange-600 dark:text-orange-500">IO</span>
            </span>
          </Link>

          {/* Search bar on desktop */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative min-w-[280px]">
            <input
              type="text"
              placeholder="Cari jasa (Contoh: Cuci AC, Tukang Listrik)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none transition"
            />
            <FiSearch className="absolute left-3.5 text-slate-400 w-4 h-4" />
          </form>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700 dark:text-slate-200">
          <Link to="/" className="hover:text-orange-600 dark:hover:text-orange-400 transition">Beranda</Link>
          <Link to="/jasa" className="hover:text-orange-600 dark:hover:text-orange-400 transition">Cari Jasa Offline</Link>
          <Link to="/bantuan" className="hover:text-orange-600 dark:hover:text-orange-400 transition">Bantuan & FAQ</Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifMenu(!showNotifMenu);
                    setShowProfileMenu(false);
                    if (!showNotifMenu) markNotificationsRead();
                  }}
                  className="relative p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <FiBell className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-orange-600 rounded-full ring-2 ring-white dark:ring-slate-900" />
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifMenu && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">Notifikasi</span>
                      <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">Tandai Dibaca</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/60">
                      {notifications.length > 0 ? (
                        notifications.map((n) => (
                          <div key={n.id} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{n.title}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{n.message}</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-xs text-slate-400">Tidak ada notifikasi</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile / Dashboard Menu */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowProfileMenu(!showProfileMenu);
                    setShowNotifMenu(false);
                  }}
                  className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80'}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-500/30"
                  />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[100px] truncate">
                    {currentUser?.name || 'User'}
                  </span>
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                      <p className="text-xs text-slate-400">Logged in as</p>
                      <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{currentUser?.name}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300">
                        {activeRole}
                      </span>
                    </div>

                    <div className="py-1">
                      <Link
                        to={activeRole === 'admin' ? '/admin' : activeRole === 'expert' ? '/expert' : '/user'}
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-3 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <FiGrid className="w-4 h-4 text-orange-600" />
                        <span>Dashboard {activeRole.toUpperCase()}</span>
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-700 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setShowProfileMenu(false);
                          navigate('/login');
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 text-left"
                      >
                        <FiLogOut className="w-4 h-4" />
                        <span>Keluar (Logout)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-orange-600 transition"
              >
                Masuk
              </Link>
              <Link
                to="/register-user"
                className="px-4 py-2 text-xs font-bold rounded-full bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-500/20 transition"
              >
                Daftar Pelanggan
              </Link>
              <Link
                to="/register-expert"
                className="hidden sm:inline-flex px-4 py-2 text-xs font-bold rounded-full border border-teal-600 text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/30 transition"
              >
                Daftar Ahli
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Cari jasa offline..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
            />
            <FiSearch className="absolute left-3.5 top-3 text-slate-400 w-4 h-4" />
          </form>
          <div className="flex flex-col gap-2 font-semibold text-sm text-slate-700 dark:text-slate-200">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-orange-600">Beranda</Link>
            <Link to="/jasa" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-orange-600">Cari Jasa Offline</Link>
            <Link to="/bantuan" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-orange-600">Bantuan & FAQ</Link>
          </div>
        </div>
      )}
    </header>
  );
};
