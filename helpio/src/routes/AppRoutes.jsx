import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';

// Public Pages
import { HomePage } from '@/pages/home/HomePage';
import { ServiceListPage } from '@/pages/public/ServiceListPage';
import { ExpertDetailPage } from '@/pages/public/ExpertDetailPage';
import { BookingPage } from '@/pages/public/BookingPage';
import { HelpPage } from '@/pages/public/HelpPage';

// Auth Pages
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterUser } from '@/pages/auth/RegisterUser';
import { RegisterExpert } from '@/pages/auth/RegisterExpert';

// User Dashboard Pages
import { UserDashboard } from '@/pages/user/UserDashboard';
import { UserOrders } from '@/pages/user/UserOrders';
import { UserFavorites } from '@/pages/user/UserFavorites';
import { UserReviews } from '@/pages/user/UserReviews';
import { UserNotifications } from '@/pages/user/UserNotifications';
import { UserSettings } from '@/pages/user/UserSettings';

// Expert Dashboard Pages
import { ExpertDashboard } from '@/pages/expert/ExpertDashboard';
import { ExpertServices } from '@/pages/expert/ExpertServices';
import { ExpertIncomingOrders } from '@/pages/expert/ExpertIncomingOrders';
import { ExpertProfile } from '@/pages/expert/ExpertProfile';
import { ExpertEarnings } from '@/pages/expert/ExpertEarnings';

// Admin Dashboard Pages
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { AdminVerification } from '@/pages/admin/AdminVerification';
import { AdminUserManage } from '@/pages/admin/AdminUserManage';
import { AdminExpertManage } from '@/pages/admin/AdminExpertManage';
import { AdminCategoryManage } from '@/pages/admin/AdminCategoryManage';
import { AdminOrders } from '@/pages/admin/AdminOrders';
import { AdminReviewManage } from '@/pages/admin/AdminReviewManage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Layout Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/jasa" element={<ServiceListPage />} />
        <Route path="/ahli/:id" element={<ExpertDetailPage />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/bantuan" element={<HelpPage />} />
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-user" element={<RegisterUser />} />
        <Route path="/register-expert" element={<RegisterExpert />} />
      </Route>

      {/* User Portal Routes */}
      <Route element={<DashboardLayout />}>
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/user/orders" element={<UserOrders />} />
        <Route path="/user/favorites" element={<UserFavorites />} />
        <Route path="/user/reviews" element={<UserReviews />} />
        <Route path="/user/notifications" element={<UserNotifications />} />
        <Route path="/user/settings" element={<UserSettings />} />

        {/* Expert Portal Routes */}
        <Route path="/expert" element={<ExpertDashboard />} />
        <Route path="/expert/services" element={<ExpertServices />} />
        <Route path="/expert/orders" element={<ExpertIncomingOrders />} />
        <Route path="/expert/profile" element={<ExpertProfile />} />
        <Route path="/expert/earnings" element={<ExpertEarnings />} />
        <Route path="/expert/reviews" element={<UserReviews />} />
        <Route path="/expert/notifications" element={<UserNotifications />} />
        <Route path="/expert/settings" element={<UserSettings />} />

        {/* Admin Portal Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/verification" element={<AdminVerification />} />
        <Route path="/admin/users" element={<AdminUserManage />} />
        <Route path="/admin/experts" element={<AdminExpertManage />} />
        <Route path="/admin/categories" element={<AdminCategoryManage />} />
        <Route path="/admin/services" element={<ExpertServices />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/reviews" element={<AdminReviewManage />} />
        <Route path="/admin/reports" element={<AdminDashboard />} />
        <Route path="/admin/settings" element={<UserSettings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
