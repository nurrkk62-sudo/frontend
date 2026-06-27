import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FiSearch, FiSlash, FiKey, FiTrash2, FiEdit3 } from 'react-icons/fi';

export const AdminUserManage = () => {
  const [users, setUsers] = useState([
    { id: 'usr_101', name: 'Budi Santoso', email: 'budi@example.com', phone: '081234567890', status: 'Aktif' },
    { id: 'usr_102', name: 'Dedi Kurniawan', email: 'dedi@example.com', phone: '081999888777', status: 'Aktif' },
    { id: 'usr_103', name: 'Siska Putri', email: 'siska@example.com', phone: '085711223344', status: 'Diblokir' },
  ]);
  const [query, setQuery] = useState('');

  const handleToggleBlock = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Aktif' ? 'Diblokir' : 'Aktif' } : u));
    Swal.fire('Berhasil!', 'Status blokir akun telah diperbarui.', 'success');
  };

  const handleResetPass = (name) => {
    Swal.fire('Reset Password', `Instruksi reset password telah dikirim ke WhatsApp / Email ${name}.`, 'info');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Kelola Data Pelanggan (User)</h1>
          <p className="text-xs text-slate-500 mt-1">Cari, blokir spam, atau reset password akun pengguna.</p>
        </div>
        <input
          type="text"
          placeholder="Cari nama atau email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl w-full sm:w-64"
        />
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-900 text-slate-400 uppercase font-bold border-b border-slate-100 dark:border-slate-700">
            <tr>
              <th className="p-4">Nama Pelanggan</th>
              <th className="p-4">Email</th>
              <th className="p-4">No. WhatsApp</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-semibold text-slate-700 dark:text-slate-200">
            {users.filter(u => u.name.toLowerCase().includes(query.toLowerCase())).map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/40 transition">
                <td className="p-4 font-bold text-slate-900 dark:text-white">{u.name}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4">{u.phone}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${u.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {u.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => handleResetPass(u.name)} className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200" title="Reset Pass">
                    <FiKey />
                  </button>
                  <button onClick={() => handleToggleBlock(u.id)} className="p-2 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100" title="Blokir">
                    <FiSlash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
