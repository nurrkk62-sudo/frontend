import React, { useState } from 'react';
import { useDataStore } from '@/store/useDataStore';
import Swal from 'sweetalert2';
import { FiPlus, FiFolder } from 'react-icons/fi';

export const AdminCategoryManage = () => {
  const { categories } = useDataStore();
  const [catList, setCatList] = useState(categories);

  const handleAddCat = () => {
    Swal.fire({
      title: 'Tambah Kategori Jasa Baru',
      input: 'text',
      inputPlaceholder: 'Nama Kategori (contoh: Service Mesin Cuci)',
      showCancelButton: true,
      confirmButtonText: 'Tambah',
      confirmButtonColor: '#2563EB',
    }).then((res) => {
      if (res.isConfirmed && res.value) {
        const newC = { id: 'cat_' + Date.now(), name: res.value, icon: 'FiTool', color: 'bg-indigo-500', count: 0 };
        setCatList([...catList, newC]);
        Swal.fire('Berhasil!', 'Kategori baru ditambahkan.', 'success');
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Kelola Kategori & Subkategori</h1>
          <p className="text-xs text-slate-500 mt-1">Struktur taksonomi jasa offline yang tersedia di platform.</p>
        </div>
        <button onClick={handleAddCat} className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl shadow-md flex items-center gap-2">
          <FiPlus />
          <span>Tambah Kategori</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {catList.map((c) => (
          <div key={c.id} className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">ID: {c.id}</span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">Aktif</span>
            </div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <FiFolder className="text-blue-500" />
              <span>{c.name}</span>
            </h3>
            <p className="text-xs text-slate-500">Jumlah Mitra: {c.count} Teknisi</p>
          </div>
        ))}
      </div>
    </div>
  );
};
