import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDataStore } from '@/store/useDataStore';
import { useAuthStore } from '@/store/useAuthStore';
import Swal from 'sweetalert2';
import { FiCalendar, FiClock, FiMapPin, FiFileText, FiCamera, FiAlertTriangle, FiCheckCircle, FiDollarSign } from 'react-icons/fi';

export const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { experts, addOrder } = useDataStore();
  const { currentUser } = useAuthStore();

  const expert = experts.find((e) => e.id === id) || experts[0];

  const [selectedService, setSelectedService] = useState(expert.servicesList?.[0] || { title: expert.category, price: expert.startingPrice });
  const [address, setAddress] = useState(currentUser?.address || 'Jl. Pemuda No. 45, Semarang');
  const [date, setDate] = useState('2026-06-30');
  const [time, setTime] = useState('10:00');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [photoFileName, setPhotoFileName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      userId: currentUser?.id || 'usr_101',
      userName: currentUser?.name || 'Pelanggan HelpIO',
      userPhone: currentUser?.phone || '081234567890',
      expertId: expert.id,
      expertName: expert.name,
      expertCategory: expert.category,
      serviceTitle: selectedService.title,
      price: selectedService.price,
      address,
      date,
      time,
      description,
      notes,
    };

    addOrder(orderData);

    Swal.fire({
      icon: 'success',
      title: 'Pemesanan Berhasil Dikirim!',
      text: `Status pesanan: Menunggu Konfirmasi Ahli (${expert.name}). Silakan pantau di Dashboard Order Anda.`,
      confirmButtonColor: '#2563EB',
      confirmButtonText: 'Lihat Order Saya',
    }).then(() => {
      navigate('/user/orders');
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Form Pemesanan Jasa Offline</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Lengkapi detail pemesanan untuk ahli <span className="font-bold text-slate-800 dark:text-slate-200">{expert.name}</span> ({expert.category}).
        </p>
      </div>

      {/* Mandatory Offline Payment Warning Box */}
      <div className="p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md shadow-amber-500/30">
          <FiDollarSign className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-extrabold text-amber-900 dark:text-amber-300">
            Informasi Pembayaran (100% Offline)
          </h4>
          <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
            Pembayaran dilakukan secara langsung kepada penyedia jasa setelah pekerjaan selesai (Cash / COD / Transfer langsung). Website tidak menerima pembayaran online.
          </p>
        </div>
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-6">
        
        {/* Service Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Pilih Layanan Utama</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {expert.servicesList?.map((srv) => (
              <div
                key={srv.id}
                onClick={() => setSelectedService(srv)}
                className={`p-4 rounded-2xl cursor-pointer border transition flex flex-col justify-between gap-2 ${
                  selectedService.title === srv.title
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-2 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{srv.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1">{srv.description}</p>
                </div>
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-2">
                  Rp {srv.price.toLocaleString('id-ID')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <FiMapPin className="text-blue-600" />
            <span>Alamat Lengkap Lokasi Pengerjaan</span>
          </label>
          <textarea
            required
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Ketik alamat lengkap rumah/kantor, patokan jalan, atau nomor rumah..."
            className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <FiCalendar className="text-blue-600" />
              <span>Tanggal Pengerjaan</span>
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <FiClock className="text-blue-600" />
              <span>Jam Kedatangan</span>
            </label>
            <input
              type="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <FiFileText className="text-blue-600" />
            <span>Deskripsi Pekerjaan / Keluhan</span>
          </label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Jelaskan kondisi perbaikan atau masalah yang ingin ditangani secara detail..."
            className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Mock Upload Photo */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <FiCamera className="text-blue-600" />
            <span>Upload Foto Kendala (Opsional)</span>
          </label>
          <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 p-4 rounded-2xl text-center bg-slate-50/50 dark:bg-slate-900/50">
            <input
              type="file"
              onChange={(e) => setPhotoFileName(e.target.files[0]?.name || '')}
              className="hidden"
              id="photo-upload"
            />
            <label htmlFor="photo-upload" className="cursor-pointer text-xs font-bold text-blue-600 hover:underline">
              {photoFileName ? `File dipilih: ${photoFileName}` : 'Klik untuk upload foto pendukung'}
            </label>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Catatan Tambahan untuk Ahli</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Contoh: Titik lokasi ada di lantai 2, mohon bawa tangga lipat."
            className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-xl shadow-blue-500/20 transition flex items-center justify-center gap-2"
        >
          <FiCheckCircle className="w-5 h-5" />
          <span>Kirim Pemesanan (Tanpa Pembayaran Online)</span>
        </button>

      </form>

    </div>
  );
};
