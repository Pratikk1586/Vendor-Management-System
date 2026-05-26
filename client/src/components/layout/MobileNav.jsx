/**
 * @fileoverview Full-screen sliding drawer navigation for mobile screen widths.
 */

import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { X, User } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import SidebarItem from './SidebarItem';

export default function MobileNav({ isOpen, onClose, navItems = [] }) {
  const location = useLocation();
  const { user, role } = useAuthStore();

  // Automatically close mobile menu when pathname changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname, isOpen, onClose]);

  // Prevent background scroll when mobile navigation is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const displayName = user?.name || user?.username || 'Staff Member';
  
  const formatRole = (roleStr) => {
    if (!roleStr) return 'User';
    if (roleStr.toLowerCase() === 'depthead') return 'Dept Head';
    if (roleStr.toLowerCase() === 'superadmin') return 'Super Admin';
    return roleStr.charAt(0).toUpperCase() + roleStr.slice(1).toLowerCase();
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden font-body">
      
      {/* Dark backdrop overlay with blur */}
      <div
        className="fixed inset-0 bg-steel-900/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
        onClick={onClose}
      />

      {/* Slide-out Sidebar Drawer */}
      <div className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-steel-700 text-white flex flex-col shadow-2xl z-50 animate-slideRight">
        
        {/* Header containing brand logo and close button */}
        <div className="flex items-center justify-between px-5 h-16 sm:h-20 border-b border-steel-600/80">
          <Link to="/" className="flex items-center space-x-3 overflow-hidden">
            <div className="w-9 h-9 bg-gradient-to-br from-tata-gold to-tata-amber rounded-lg flex items-center justify-center font-display text-lg text-steel-900 font-bold shadow-lg shadow-tata-gold/10">
              TS
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm tracking-wider text-white">
                TATA STEEL
              </span>
              <span className="text-[8px] uppercase font-mono tracking-widest text-slate-400">
                Colors Portal
              </span>
            </div>
          </Link>

          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-steel-600 transition-colors focus:outline-none"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Mini Profile */}
        <div className="p-4 bg-steel-800/40 border-b border-steel-600/80 flex items-center space-x-3">
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
          <div className="flex flex-col truncate">
            <span className="text-sm font-semibold text-white truncate leading-tight">
              {displayName}
            </span>
            <span className="text-xs text-tata-gold font-medium mt-0.5">
              {formatRole(role)}
            </span>
          </div>
        </div>

        {/* Navigation List Container */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-2">
          {navItems.map((item, idx) => (
            <SidebarItem
              key={`mobile-${item.label}-${idx}`}
              item={item}
              collapsed={false}
            />
          ))}
        </nav>

        {/* Bottom Banner */}
        <div className="p-4 bg-steel-800/20 border-t border-steel-600/80 text-[10px] text-slate-500 text-center uppercase tracking-wider font-mono">
          Tata Steel colors portal
        </div>
      </div>
    </div>
  );
}
