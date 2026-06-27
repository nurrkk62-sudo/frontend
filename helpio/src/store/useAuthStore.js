import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      currentUser: {
        id: 'usr_101',
        name: 'Budi Santoso',
        email: 'budi@example.com',
        phone: '081234567890',
        role: 'user', // 'user' | 'expert' | 'admin'
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        address: 'Jl. Pemuda No. 45, Semarang, Jawa Tengah',
      },
      isAuthenticated: true,
      activeRole: 'user', // for easy role toggling during demo

      setRole: (role) => set({ activeRole: role }),

      login: (email, password, role = 'user') => {
        let userObj = {
          id: role === 'admin' ? 'adm_1' : role === 'expert' ? 'exp_1' : 'usr_101',
          name: role === 'admin' ? 'Admin HelpIO' : role === 'expert' ? 'Rudi Hermawan (Teknisi AC)' : 'Budi Santoso',
          email,
          phone: '081234567890',
          role,
          avatar: role === 'admin' 
            ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
            : role === 'expert' 
            ? 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
            : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          address: 'Jakarta, Indonesia',
        };
        set({ currentUser: userObj, isAuthenticated: true, activeRole: role });
        return { success: true, user: userObj };
      },

      registerUser: (data) => {
        const newUser = {
          id: 'usr_' + Date.now(),
          name: data.name,
          email: data.email,
          phone: data.phone,
          role: 'user',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          address: data.address || 'Indonesia',
        };
        set({ currentUser: newUser, isAuthenticated: true, activeRole: 'user' });
        return { success: true, user: newUser };
      },

      registerExpert: (data) => {
        const newExpertUser = {
          id: 'exp_' + Date.now(),
          name: data.name,
          email: data.email,
          phone: data.phone,
          role: 'expert',
          category: data.category,
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
          address: data.address,
          verified: false,
          verificationStatus: 'pending', // 'pending', 'approved', 'rejected'
        };
        set({ currentUser: newExpertUser, isAuthenticated: true, activeRole: 'expert' });
        return { success: true, user: newExpertUser };
      },

      logout: () => {
        set({ currentUser: null, isAuthenticated: false, activeRole: 'guest' });
      },

      updateProfile: (updatedData) => {
        set((state) => ({
          currentUser: { ...state.currentUser, ...updatedData }
        }));
      }
    }),
    {
      name: 'helpio-auth-storage',
    }
  )
);
