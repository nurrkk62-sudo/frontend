import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const INITIAL_CATEGORIES = [
  { id: 'cat_ac', name: 'Service & Cuci AC', icon: 'TbAirConditioning', color: 'bg-blue-500', count: 42, subcategories: ['Cuci AC', 'Service AC', 'Bongkar Pasang AC', 'Isi Freon'] },
  { id: 'cat_listrik', name: 'Tukang Listrik', icon: 'FiZap', color: 'bg-yellow-500', count: 35, subcategories: ['Instalasi Listrik', 'Perbaikan Korsleting', 'Pasang Lampu/Panel'] },
  { id: 'cat_ledeng', name: 'Tukang Ledeng', icon: 'FiDroplet', color: 'bg-cyan-500', count: 28, subcategories: ['Pipa Bocor', 'Pasang Kran/Wastafel', 'Pompa Air'] },
  { id: 'cat_bangunan', name: 'Tukang Bangunan', icon: 'FiHome', color: 'bg-amber-600', count: 50, subcategories: ['Renovasi Rumah', 'Perbaikan Atap', 'Perbaikan Pintu/Jendela', 'Keramik'] },
  { id: 'cat_cat', name: 'Tukang Cat Rumah', icon: 'FiEdit3', color: 'bg-indigo-500', count: 19, subcategories: ['Cat Interior', 'Cat Eksterior', 'Cat Waterproofing'] },
  { id: 'cat_elektronik', name: 'Teknisi Elektronik', icon: 'FiTv', color: 'bg-purple-500', count: 31, subcategories: ['Service TV', 'Service Mesin Cuci', 'Service Kulkas', 'Service Microwave'] },
  { id: 'cat_cctv', name: 'Teknisi CCTV', icon: 'FiCamera', color: 'bg-emerald-600', count: 15, subcategories: ['Pasang CCTV', 'Perbaikan CCTV', 'Setup IP Cam'] },
  { id: 'cat_kebersihan', name: 'Jasa Kebersihan', icon: 'FiSmile', color: 'bg-green-500', count: 60, subcategories: ['Kebersihan Rumah', 'Cuci Sofa', 'Cuci Karpet', 'Cuci Kasur', 'Sedot WC'] },
  { id: 'cat_furniture', name: 'Perbaikan Furniture', icon: 'FiBox', color: 'bg-orange-500', count: 22, subcategories: ['Servis Lemari', 'Servis Meja/Kursi', 'Custom Furniture'] },
  { id: 'cat_montir', name: 'Montir Panggilan', icon: 'FiTool', color: 'bg-red-500', count: 18, subcategories: ['Montir Mobil', 'Montir Motor', 'Jumper Aki'] },
  { id: 'cat_kebun', name: 'Tukang Kebun', icon: 'FiSun', color: 'bg-emerald-500', count: 14, subcategories: ['Potong Rumput', 'Desain Taman', 'Perawatan Tanaman'] }
];

const INITIAL_EXPERTS = [
  {
    id: 'exp_1',
    name: 'Rudi Hermawan',
    phone: '081234567891',
    whatsapp: '6281234567891',
    verified: true,
    category: 'Service & Cuci AC',
    location: 'Semarang Selatan, Semarang',
    distance: '1.2 km',
    experience: '8 Tahun',
    rating: 4.9,
    reviewCount: 128,
    completedJobs: 340,
    startingPrice: 75000,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1000&auto=format&fit=crop&q=80',
    bio: 'Teknisi AC berpengalaman dan terverifikasi di Semarang. Melayani cuci AC, perbaikan bocor freon, bongkar pasang AC rumah dan kantor dengan garansi pekerjaan 30 hari.',
    skills: ['Cuci AC Split', 'Bongkar Pasang AC', 'Isi Freon R32/R410', 'Perbaikan Modul'],
    operatingHours: 'Senin - Sabtu (08.00 - 18.00)',
    portfolio: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80'
    ],
    servicesList: [
      { id: 'srv_1', title: 'Cuci AC Split 0.5 - 2 PK', price: 75000, estTime: '45 Menit', description: 'Pembersihan evaporator, kondensor, filter, dan cuci outdoor unit.' },
      { id: 'srv_2', title: 'Isi Freon R32 / R410a', price: 150000, estTime: '30 Menit', description: 'Pengisian ulang freon AC agar dingin maksimal.' },
      { id: 'srv_3', title: 'Bongkar Pasang AC', price: 350000, estTime: '2 Jam', description: 'Bongkar unit lama dan instalasi unit baru lengkap vakum pipa.' }
    ]
  },
  {
    id: 'exp_2',
    name: 'Hendra Wijaya',
    phone: '081987654321',
    whatsapp: '6281987654321',
    verified: true,
    category: 'Tukang Listrik',
    location: 'Banyumanik, Semarang',
    distance: '2.5 km',
    experience: '10 Tahun',
    rating: 4.8,
    reviewCount: 95,
    completedJobs: 210,
    startingPrice: 100000,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1000&auto=format&fit=crop&q=80',
    bio: 'Ahli instalasi dan perbaikan kabel listrik rumah tangga maupun gedung. Bersertifikat K3 Listrik. Cepat, tepat, dan mengutamakan keamanan.',
    skills: ['Instalasi Stopkontak', 'Perbaikan Korsleting', 'Panel Listrik 3 Phase', 'Pasang Lampu Downlight'],
    operatingHours: 'Setiap Hari 24 Jam (Darurat)',
    portfolio: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80'
    ],
    servicesList: [
      { id: 'srv_4', title: 'Perbaikan Korsleting Listrik', price: 150000, estTime: '1-2 Jam', description: 'Pengecekan titik korslet dan perbaikan sakelar/MCB.' },
      { id: 'srv_5', title: 'Pasang Stopkontak / Sakelar Baru', price: 50000, estTime: '30 Menit', description: 'Jasa pasang titik titik listrik baru.' }
    ]
  },
  {
    id: 'exp_3',
    name: 'Siti Rahmawati & Tim Clean',
    phone: '085712344321',
    whatsapp: '6285712344321',
    verified: true,
    category: 'Jasa Kebersihan',
    location: 'Tembalang, Semarang',
    distance: '3.1 km',
    experience: '5 Tahun',
    rating: 5.0,
    reviewCount: 210,
    completedJobs: 520,
    startingPrice: 120000,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1000&auto=format&fit=crop&q=80',
    bio: 'Layanan Hydro-Cleaning cuci sofa, karpet, kasur busa/springbed, serta deep cleaning rumah pasca renovasi maupun pindahan. Alat modern & cairan ramah lingkungan.',
    skills: ['Cuci Sofa Fabric/Kulit', 'Cuci Springbed', 'Cuci Karpet', 'Deep Cleaning Rumah'],
    operatingHours: 'Senin - Minggu (07.00 - 19.00)',
    portfolio: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80'
    ],
    servicesList: [
      { id: 'srv_6', title: 'Cuci Sofa 3 Seater', price: 150000, estTime: '1.5 Jam', description: 'Pembersihan noda, tungau, dan pengeringan 90%.' },
      { id: 'srv_7', title: 'Cuci Springbed King Size', price: 200000, estTime: '1.5 Jam', description: 'Pembersihan ekstraksi basah anti tungau dan bau.' }
    ]
  },
  {
    id: 'exp_4',
    name: 'Bambang Sukoco (Teknisi Elektronik)',
    phone: '081322110099',
    whatsapp: '6281322110099',
    verified: true,
    category: 'Teknisi Elektronik',
    location: 'Pedurungan, Semarang',
    distance: '4.0 km',
    experience: '12 Tahun',
    rating: 4.7,
    reviewCount: 64,
    completedJobs: 180,
    startingPrice: 90000,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=1000&auto=format&fit=crop&q=80',
    bio: 'Spesialis perbaikan Mesin Cuci (Top/Front Loading) dan Kulkas 1/2 Pintu. Garansi sparepart dan jasa perbaikan.',
    skills: ['Service Mesin Cuci', 'Service Kulkas Mati/Tidak Dingin', 'Service TV LED'],
    operatingHours: 'Senin - Sabtu (08.00 - 17.00)',
    portfolio: [],
    servicesList: [
      { id: 'srv_8', title: 'Service Mesin Cuci Tidak Berputar/Bocor', price: 120000, estTime: '1-2 Jam', description: 'Pengecekan dinamo, belt, dan modul kontrol.' }
    ]
  }
];

const INITIAL_ORDERS = [
  {
    id: 'ORD-9921',
    userId: 'usr_101',
    userName: 'Budi Santoso',
    userPhone: '081234567890',
    expertId: 'exp_1',
    expertName: 'Rudi Hermawan',
    expertCategory: 'Service & Cuci AC',
    serviceTitle: 'Cuci AC Split 0.5 - 2 PK (2 Unit)',
    price: 150000,
    address: 'Jl. Pemuda No. 45, Semarang, Jawa Tengah',
    date: '2026-06-29',
    time: '10:00',
    description: 'Tolong cuci AC kamar utama dan ruang tamu. AC kamar agak kurang dingin.',
    notes: 'Ada anjing di halaman tapi sudah dikandang.',
    status: 'Dalam Proses', // 'Pending', 'Diterima', 'Dalam Proses', 'Selesai', 'Review', 'Closed', 'Cancelled'
    paymentMethod: 'Cash / Transfer Langsung saat Selesai',
    createdAt: '2026-06-27 14:20'
  },
  {
    id: 'ORD-8812',
    userId: 'usr_101',
    userName: 'Budi Santoso',
    userPhone: '081234567890',
    expertId: 'exp_3',
    expertName: 'Siti Rahmawati & Tim Clean',
    expertCategory: 'Jasa Kebersihan',
    serviceTitle: 'Cuci Sofa 3 Seater',
    price: 150000,
    address: 'Jl. Pemuda No. 45, Semarang, Jawa Tengah',
    date: '2026-06-25',
    time: '14:00',
    description: 'Sofa terkena tumpahan sirup dan agak berdebu.',
    notes: '-',
    status: 'Selesai',
    paymentMethod: 'COD / Cash setelah selesai',
    createdAt: '2026-06-24 09:15'
  }
];

const INITIAL_REVIEWS = [
  {
    id: 'rev_1',
    expertId: 'exp_1',
    userId: 'usr_102',
    userName: 'Dedi Kurniawan',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Pak Rudi datang tepat waktu, pengerjaan rapi sekali dan AC langsung dingin nyes! Harganya transparan sesuai aplikasi.',
    date: '2026-06-20'
  },
  {
    id: 'rev_2',
    expertId: 'exp_3',
    userId: 'usr_101',
    userName: 'Budi Santoso',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Hasil cuci sofa sangat bersih dan wangi. Noda sirup hilang total. Sangat direkomendasikan!',
    date: '2026-06-25'
  }
];

const INITIAL_VERIFICATIONS = [
  {
    id: 'ver_1',
    expertId: 'exp_5',
    expertName: 'Agus Tukang Kayu',
    category: 'Perbaikan Furniture',
    phone: '082112233445',
    ktpUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
    certificateUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
    status: 'pending', // 'pending', 'approved', 'rejected', 'revision'
    submittedAt: '2026-06-26 11:00'
  }
];

const INITIAL_FAQS = [
  { q: 'Bagaimana cara melakukan pembayaran?', a: 'Semua pembayaran dilakukan secara offline langsung kepada penyedia jasa (Ahli) setelah pekerjaan selesai. Pembayaran dapat berupa Cash, COD, atau Transfer Langsung ke rekening penyedia jasa. HelpIO tidak memungut biaya pembayaran online di aplikasi.' },
  { q: 'Apakah para ahli di HelpIO terverifikasi?', a: 'Ya! Setiap ahli/penyedia jasa yang terverifikasi (badge centang biru) telah melewati proses seleksi dokumen seperti KTP, portofolio pekerjaan, serta bukti sertifikasi keahlian oleh Admin HelpIO.' },
  { q: 'Bagaimana jika saya ingin mengubah jadwal pekerjaan?', a: 'Anda dapat langsung menghubungi penyedia jasa via tombol "Chat via WhatsApp" di detail pesanan Anda untuk mendiskusikan penyesuaian waktu kedatangan.' },
  { q: 'Apakah ada garansi pekerjaan?', a: 'Garansi pekerjaan bergantung pada kesepakatan awal dengan penyedia jasa. Sebagian besar ahli terverifikasi memberikan garansi 7 hingga 30 hari untuk perbaikan teknis.' }
];

export const useDataStore = create(
  persist(
    (set, get) => ({
      categories: INITIAL_CATEGORIES,
      experts: INITIAL_EXPERTS,
      orders: INITIAL_ORDERS,
      reviews: INITIAL_REVIEWS,
      verifications: INITIAL_VERIFICATIONS,
      favorites: ['exp_1'],
      faqs: INITIAL_FAQS,
      tickets: [
        { id: 'TCK-101', userId: 'usr_101', subject: 'Pertanyaan garansi service AC', category: 'Layanan', status: 'Selesai', date: '2026-06-20', message: 'Apakah garansi melingkupi kebocoran freon ulang?' }
      ],
      notifications: [
        { id: 'notif_1', title: 'Pesanan Diterima!', message: 'Pak Rudi Hermawan telah menerima pesanan Cuci AC Anda.', time: '2 jam lalu', unread: true },
        { id: 'notif_2', title: 'Promo Kebersihan Rumahan', message: 'Dapatkan potongan langsung dari teknisi terverifikasi bulan ini.', time: '1 hari lalu', unread: false }
      ],

      // Actions for Orders
      addOrder: (orderData) => {
        const newOrder = {
          id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
          status: 'Pending',
          paymentMethod: 'Cash / Transfer Langsung setelah pekerjaan selesai',
          createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          ...orderData
        };
        set((state) => ({
          orders: [newOrder, ...state.orders],
          notifications: [
            {
              id: 'notif_' + Date.now(),
              title: 'Pesanan Dibuat Successfully',
              message: `Pesanan ${newOrder.id} (${newOrder.serviceTitle}) telah dikirim ke ahli.`,
              time: 'Baru saja',
              unread: true
            },
            ...state.notifications
          ]
        }));
        return newOrder;
      },

      updateOrderStatus: (orderId, newStatus) => {
        set((state) => ({
          orders: state.orders.map((ord) =>
            ord.id === orderId ? { ...ord, status: newStatus } : ord
          ),
          notifications: [
            {
              id: 'notif_' + Date.now(),
              title: `Status Pesanan ${orderId} Diperbarui`,
              message: `Status pesanan Anda kini: ${newStatus}`,
              time: 'Baru saja',
              unread: true
            },
            ...state.notifications
          ]
        }));
      },

      // Actions for Reviews
      addReview: (reviewData) => {
        const newReview = {
          id: 'rev_' + Date.now(),
          date: new Date().toISOString().split('T')[0],
          ...reviewData
        };
        set((state) => ({
          reviews: [newReview, ...state.reviews]
        }));
      },

      // Actions for Favorites
      toggleFavorite: (expertId) => {
        set((state) => {
          const exists = state.favorites.includes(expertId);
          return {
            favorites: exists
              ? state.favorites.filter((id) => id !== expertId)
              : [...state.favorites, expertId]
          };
        });
      },

      // Expert Services CRUD
      addExpertService: (expertId, serviceObj) => {
        set((state) => ({
          experts: state.experts.map((exp) => {
            if (exp.id === expertId) {
              const newSrv = { id: 'srv_' + Date.now(), ...serviceObj };
              return { ...exp, servicesList: [...(exp.servicesList || []), newSrv] };
            }
            return exp;
          })
        }));
      },

      deleteExpertService: (expertId, serviceId) => {
        set((state) => ({
          experts: state.experts.map((exp) => {
            if (exp.id === expertId) {
              return {
                ...exp,
                servicesList: (exp.servicesList || []).filter((s) => s.id !== serviceId)
              };
            }
            return exp;
          })
        }));
      },

      // Admin Verification Actions
      updateVerificationStatus: (verId, status) => {
        set((state) => ({
          verifications: state.verifications.map((v) =>
            v.id === verId ? { ...v, status } : v
          )
        }));
      },

      // Tickets
      addTicket: (ticketData) => {
        const newTicket = {
          id: 'TCK-' + Math.floor(100 + Math.random() * 900),
          status: 'Menunggu Balasan',
          date: new Date().toISOString().split('T')[0],
          ...ticketData
        };
        set((state) => ({
          tickets: [newTicket, ...state.tickets]
        }));
        return newTicket;
      },

      markNotificationsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, unread: false }))
        }));
      }
    }),
    {
      name: 'helpio-data-storage'
    }
  )
);
