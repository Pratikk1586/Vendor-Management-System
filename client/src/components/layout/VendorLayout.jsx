/**
 * @fileoverview Vendor dashboard workspace layout wrapper.
 */

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutDashboard, Search, FileText, Briefcase, User, Bell, LogOut } from 'lucide-react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import MobileNav from './MobileNav';
import { useNotificationStore } from '../../store/notificationStore';

export default function VendorLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { unreadCount } = useNotificationStore();

  // Define navigation items configured for the Vendor role
  const vendorNavItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/vendor/dashboard',
    },
    {
      label: 'Browse Tenders',
      icon: Search,
      path: '/vendor/tenders',
    },
    {
      label: 'My Bids',
      icon: FileText,
      path: '/vendor/bids',
    },
    {
      label: 'My Contracts',
      icon: Briefcase,
      path: '/vendor/contracts',
    },
    {
      label: 'My Profile',
      icon: User,
      path: '/vendor/profile',
    },
    {
      label: 'Notifications',
      icon: Bell,
      path: '/vendor/notifications',
      badge: unreadCount,
    },
    {
      label: 'Logout',
      icon: LogOut,
      path: '/logout',
    },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-steel-900 text-slate-700 font-body">
      
      {/* Desktop Sidebar (hidden on mobile, visible on medium screens and up) */}
      <Sidebar navItems={vendorNavItems} />

      {/* Mobile Sidebar Navigation Drawer Overlay */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        navItems={vendorNavItems}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* Workspace Top Header Bar */}
        <TopNavbar onMobileMenuToggle={() => setMobileNavOpen(true)} />

        {/* Scrollable Work Viewport */}
        <main className="flex-1 overflow-y-auto bg-steel-900 p-4 sm:p-6 lg:p-8 custom-scrollbar">
          {/* Outlet renders matched sub-routes */}
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}
