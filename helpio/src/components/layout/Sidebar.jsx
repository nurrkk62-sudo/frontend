import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  FiGrid, FiSearch, FiShoppingBag, FiHeart, FiStar, FiBell, FiSettings, FiLogOut,
  FiUser, FiImage, FiTool, FiCheckSquare, FiDollarSign, FiShield, FiUsers, FiLayers, FiAlertCircle
} from 'react-icons/fi';

export const Sidebar = ({ role = 'user' }) => {
  const navigate = useNavigate();
  const { logout, currentUser } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getMenuItems = () => {
    if (role === 'admin') {
      return [
        { label: 'Dashboard Admin', path: '/admin', icon: FiGrid },
        { label: 'Verifikasi Ahli', path: '/admin/verification', icon: FiShield, badge: '1' },
        { label: 'Kelola User', path: '/admin/users', icon: FiUsers },
        { label: 'Kelola Ahli', path: '/admin/experts', icon: FiUser },
        { label: 'Kelola Kategori', path: '/admin/categories', icon: FiLayers },
        { label: 'Kelola Order', path: '/admin/orders', icon: FiShoppingBag },
        { label: 'Kelola Review', path: '/admin/reviews', icon: FiStar },
        { label: 'Pengaturan', path: '/admin/settings', icon: FiSettings },
      ];
    }

    if (role === 'expert') {
      return [
        { label: 'Dashboard Ahli', path: '/expert', icon: FiGrid },
        { label: 'Profil Saya', path: '/expert/profile', icon: FiUser },
        { label: 'Jasa Saya', path: '/expert/services', icon: FiTool },
        { label: 'Order Masuk', path: '/expert/orders', icon: FiShoppingBag, badge: '1' },
        { label: 'Review & Rating', path: '/expert/reviews', icon: FiStar },
        { label: 'Pendapatan', path: '/expert/earnings', icon: FiDollarSign },
        { label: 'Notifikasi', path: '/expert/notifications', icon: FiBell },
        { label: 'Pengaturan', path: '/expert/settings', icon: FiSettings },
      ];
    }

    // Default: User
    return [
      { label: 'Dashboard User', path: '/user', icon: FiGrid },
      { label: 'Cari Jasa', path: '/jasa', icon: FiSearch },
      { label: 'Order Saya', path: '/user/orders', icon: FiShoppingBag },
      { label: 'Favorit Ahli', path: '/user/favorites', icon: FiHeart },
      { label: 'Review Saya', path: '/user/reviews', icon: FiStar },
      { label: 'Notifikasi', path: '/user/notifications', icon: FiBell },
      { label: 'Pengaturan', path: '/user/settings', icon: FiSettings },
    ];
  };

  const menuItems = getMenuItems();

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between p-4 min-h-[calc(100vh-4rem)]">
      <div>
        {/* User Card Header */}
        <div className="p-3 mb-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80'}
            alt="User"
            className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-500/20"
          />
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{currentUser?.name}</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 capitalize">{role} Portal</p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/user' || item.path === '/expert' || item.path === '/admin'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] bg-red-500 text-white rounded-full font-bold">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Logout button */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
        >
          <FiLogOut className="w-4 h-4" />
          <span>Keluar Akun</span>
        </button>
      </div>
    </aside>
  );
};
