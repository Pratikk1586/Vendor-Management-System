/**
 * @fileoverview Collapsible side navigation panel with role-based listings.
 */

import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import { useUiStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';
import SidebarItem from './SidebarItem';

export default function Sidebar({ navItems = [] }) {
  const { sidebarOpen, toggleSidebar } = useUiStore();
  const { user, role } = useAuthStore();

  const isCollapsed = !sidebarOpen;

  // Format display name
  const displayName = user?.name || user?.username || 'Tata Steel Staff';
  
  // Format role tag
  const formatRole = (roleStr) => {
    if (!roleStr) return 'User';
    if (roleStr.toLowerCase() === 'depthead') return 'Dept Head';
    if (roleStr.toLowerCase() === 'superadmin') return 'Super Admin';
    return roleStr.charAt(0).toUpperCase() + roleStr.slice(1).toLowerCase();
  };

  return (
    <aside
      className={`hidden md:flex flex-col bg-steel-700 border-r border-steel-600 text-white font-body select-none h-screen sticky top-0 left-0 transition-all duration-300 ease-in-out z-30 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between px-4 h-16 sm:h-20 border-b border-steel-600/80">
        <Link to="/" className="flex items-center space-x-3 overflow-hidden group">
          <div className="w-10 h-10 bg-gradient-to-br from-tata-gold to-tata-amber rounded-lg flex items-center justify-center font-display text-xl text-steel-900 font-bold shadow-lg shadow-tata-gold/10 flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
            TS
          </div>
          {!isCollapsed && (
            <div className="flex flex-col truncate animate-fadeIn">
              <span className="font-display text-base tracking-wider text-white group-hover:text-tata-gold transition-colors duration-200">
                TATA STEEL
              </span>
              <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400">
                Colors Portal
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* User Session Mini Profile Info */}
      <div className={`p-4 border-b border-steel-600/80 bg-steel-800/40 flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
        <div className="w-10 h-10 rounded-full bg-steel-600 border border-slate-500/50 flex items-center justify-center flex-shrink-0 shadow-inner">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={displayName}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-5 h-5 text-slate-300" />
          )}
        </div>
        
        {!isCollapsed && (
          <div className="flex flex-col truncate animate-fadeIn">
            <span className="text-sm font-semibold text-white truncate leading-tight">
              {displayName}
            </span>
            <span className="text-xs text-tata-gold font-medium mt-0.5">
              {formatRole(role)}
            </span>
          </div>
        )}
      </div>

      {/* Navigation Scroll Container */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 custom-scrollbar">
        {navItems.map((item, idx) => (
          <SidebarItem
            key={`${item.label}-${idx}`}
            item={item}
            collapsed={isCollapsed}
          />
        ))}
      </nav>

      {/* Sidebar Collapse Control Button */}
      <div className="p-3 border-t border-steel-600/80 bg-steel-800/20 flex items-center justify-end">
        <button
          onClick={toggleSidebar}
          type="button"
          className="w-full py-2 hover:bg-steel-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors duration-150 focus:outline-none"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 animate-pulse" />
          ) : (
            <div className="flex items-center justify-center space-x-2 text-xs font-semibold">
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse Menu</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
