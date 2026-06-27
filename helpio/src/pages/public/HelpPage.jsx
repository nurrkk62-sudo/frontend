import React, { useState } from 'react';
import { useDataStore } from '@/store/useDataStore';
import Swal from 'sweetalert2';
import { FiHelpCircle, FiSend, FiMessageSquare, FiChevronDown, FiChevronUp } from 'react-icons/fi';

export const HelpPage = () => {
  const { faqs, tickets, addTicket } = useDataStore();
  const [openFaq, setOpenFaq] = useState(null);

  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Layanan');
  const [message, setMessage] = useState('');

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!subject || !message) return;

    const newTck = addTicket({ subject, category, message });

    Swal.fire({
      icon: 'success',
      title: 'Tiket Bantuan Terkirim!',
      text: `Nomor Tiket: ${newTck.id}. Tim HelpIO akan merespon segera.`,
      confirmButtonColor: '#2563EB',
    });

    setSubject('');
    setMessage('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Pusat Bantuan & Tiket Support</h1>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Temukan jawaban untuk pertanyaan umum atau ajukan tiket bantuan langsung ke Tim Customer Service HelpIO.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <FiHelpCircle className="text-blue-600" />
          <span>Pertanyaan Sering Diajukan (FAQ)</span>
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center justify-between"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {openFaq === idx && (
                <div className="p-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Create Ticket Form */}
      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-6">
        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <FiSend className="text-emerald-500" />
          <span>Kirim Tiket Bantuan / Kendala</span>
        </h2>

        <form onSubmit={handleCreateTicket} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Subjek / Judul Kendala</label>
              <input
                type="text"
                required
                placeholder="Contoh: Pertanyaan seputar garansi cuci sofa"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Kategori Kendala</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100"
              >
                <option value="Layanan">Layanan Jasa</option>
                <option value="Teknisi">Perilaku Teknisi</option>
                <option value="Akun">Masalah Akun & WA</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Pesan Lengkap</label>
            <textarea
              required
              rows={4}
              placeholder="Tulis detail masalah atau pertanyaan Anda..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl shadow-md shadow-blue-500/20 transition"
          >
            Kirim Tiket Sekarang
          </button>
        </form>

        {/* Existing tickets preview */}
        {tickets.length > 0 && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase">Riwayat Tiket Anda</h3>
            {tickets.map((t) => (
              <div key={t.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold">{t.id} - {t.subject}</span>
                  <span className="text-[10px] text-slate-400 block">{t.date}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">{t.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
