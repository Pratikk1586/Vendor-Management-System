/**
 * @fileoverview Department Head workspace dashboard layout wrapper.
 */

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, FileSignature, CheckSquare, FileCheck, BarChart3, LogOut } from 'lucide-react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import MobileNav from './MobileNav';

export default function DeptHeadLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Define navigation items configured for the Department Head role
  const deptNavItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dept/dashboard',
    },
    {
      label: 'Vendor Management',
      icon: Users,
      path: '/dept/vendors',
    },
    {
      label: 'Tender Management',
      icon: FileSignature,
      path: '/dept/tenders',
    },
    {
      label: 'Bid Evaluation',
      icon: CheckSquare,
      path: '/dept/bids',
    },
    {
      label: 'Contracts',
      icon: FileCheck,
      path: '/dept/contracts',
    },
    {
      label: 'Reports',
      icon: BarChart3,
      path: '/dept/reports',
    },
    {
      label: 'Logout',
      icon: LogOut,
      path: '/logout',
    },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-steel-900 text-slate-700 font-body">

      {/* Desktop Sidebar */}
      <Sidebar navItems={deptNavItems} />

      {/* Mobile Drawer Navigation */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        navItems={deptNavItems}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">

        {/* Workspace Top Header Bar */}
        <TopNavbar onMobileMenuToggle={() => setMobileNavOpen(true)} />

        {/* Scrollable Work Viewport */}
        <main className="flex-1 overflow-y-auto bg-white p-4 sm:p-6 lg:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}
