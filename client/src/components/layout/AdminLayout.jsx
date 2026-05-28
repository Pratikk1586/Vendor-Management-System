/**
 * @fileoverview System Super Admin workspace dashboard layout wrapper.
 */

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  ShieldAlert,
  Building2,
  UserCheck,
  Network,
  FileText,
  Vote,
  Award,
  LineChart,
  History,
  KeyRound,
  Settings,
  LogOut,
  Users,
  ClipboardList
} from 'lucide-react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import MobileNav from './MobileNav';

export default function AdminLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Define navigation items configured for the Super Admin / Admin role (supporting nested child routes)
  const adminNavItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin/dashboard',
    },
    {
      label: 'Members',
      icon: ShieldAlert,
      children: [
        {
          label: 'All Members',
          icon: Users,
          path: '/admin/members/all',
        },
        {
          label: 'Approvals Queue',
          icon: ClipboardList,
          path: '/admin/members/approvals',
        },
      ],
    },
    {
      label: 'Vendors',
      icon: Building2,
      path: '/admin/vendors',
    },
    {
      label: 'Department Heads',
      icon: UserCheck,
      path: '/admin/dept-heads',
    },
    {
      label: 'Departments',
      icon: Network,
      path: '/admin/departments',
    },
    {
      label: 'Tender Oversight',
      icon: FileText,
      path: '/admin/tenders',
    },
    {
      label: 'Bid Oversight',
      icon: Vote,
      path: '/admin/bids',
    },
    {
      label: 'Contracts',
      icon: Award,
      path: '/admin/contracts',
    },
    {
      label: 'Reports & Analytics',
      icon: LineChart,
      path: '/admin/reports',
    },
    {
      label: 'Audit Log',
      icon: History,
      path: '/admin/audit-logs',
    },
    {
      label: 'Auth Codes',
      icon: KeyRound,
      path: '/admin/auth-codes',
    },
    {
      label: 'Settings',
      icon: Settings,
      path: '/admin/settings',
    },
    {
      label: 'Logout',
      icon: LogOut,
      path: '/logout',
    },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-steel-900 text-slate-700 font-body">
      
      {/* Desktop Sidebar (renders expandable child sub-items) */}
      <Sidebar navItems={adminNavItems} />

      {/* Mobile Sidebar Navigation Drawer Overlay */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        navItems={adminNavItems}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* Workspace Top Header Bar */}
        <TopNavbar onMobileMenuToggle={() => setMobileNavOpen(true)} />

        {/* Scrollable Work Viewport */}
        <main className="flex-1 overflow-y-auto bg-steel-900 p-4 sm:p-6 lg:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}
