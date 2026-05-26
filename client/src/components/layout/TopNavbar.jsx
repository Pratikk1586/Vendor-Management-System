/**
 * @fileoverview Authenticated workspace top navigation bar featuring breadcrumbs, notifications, and profile menus.
 */

import { useState, useEffect, useRef, Fragment } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Bell, Menu, User, LogOut, Key, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import { useNotificationStore } from '../../store/notificationStore';

export default function TopNavbar({ onMobileMenuToggle }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  const { user, role, clearAuth } = useAuthStore();
  const { toggleSidebar } = useUiStore();
  const { unreadCount } = useNotificationStore();

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  // Generate responsive breadcrumbs
  const getBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    if (pathnames.length === 0) return [{ label: 'Home', path: '/' }];

    return pathnames.map((value, index) => {
      const path = `/${pathnames.slice(0, index + 1).join('/')}`;
      
      // Capitalize and format value string (e.g. "dept-heads" -> "Dept Heads")
      let label = value
        .replace(/-/g, ' ')
        .replace(/_/g, ' ')
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      // Shorten specific system terms for visuals
      if (label.toLowerCase() === 'dept') label = 'Department';
      if (label.toLowerCase() === 'depthead') label = 'Dept Head';

      return { label, path };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  // Notification page redirection matching roles
  const getNotificationPath = () => {
    const prefix = role?.toLowerCase() === 'admin' || role?.toLowerCase() === 'superadmin' 
      ? 'admin' 
      : role?.toLowerCase() === 'depthead' || role?.toLowerCase() === 'dept_head' 
      ? 'dept' 
      : 'vendor';
    return `/${prefix}/notifications`;
  };

  const getProfilePath = () => {
    const prefix = role?.toLowerCase() === 'admin' || role?.toLowerCase() === 'superadmin' 
      ? 'admin' 
      : role?.toLowerCase() === 'depthead' || role?.toLowerCase() === 'dept_head' 
      ? 'dept' 
      : 'vendor';
    return `/${prefix}/profile`;
  };

  return (
    <header className="bg-steel-800 border-b border-steel-600 h-16 sm:h-20 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20 text-white font-body select-none">
      
      {/* Left: Hamburger & Dynamic Breadcrumbs */}
      <div className="flex items-center space-x-4">
        {/* Toggle Button for Desktop (collapses sidebar) & Mobile Nav toggle */}
        <button
          onClick={onMobileMenuToggle || toggleSidebar}
          type="button"
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-steel-700 transition-colors focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5 sm:w-6 h-6" />
        </button>

        {/* Breadcrumb Path Trail */}
        <nav className="hidden sm:flex items-center space-x-2 text-xs md:text-sm font-medium text-slate-400" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, idx) => (
            <Fragment key={crumb.path}>
              {idx > 0 && <span className="text-slate-500">/</span>}
              {idx === breadcrumbs.length - 1 ? (
                <span className="text-tata-gold font-semibold truncate max-w-[120px] md:max-w-[200px]">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className="hover:text-slate-200 transition-colors duration-150 truncate max-w-[100px] md:max-w-[150px]"
                >
                  {crumb.label}
                </Link>
              )}
            </Fragment>
          ))}
        </nav>
      </div>

      {/* Right: Notifications & User Session Menu */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        
        {/* Notification Bell Badge */}
        <Link
          to={getNotificationPath()}
          className="p-2 sm:p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-steel-700 transition-all duration-150 relative group"
          title="In-app notifications"
        >
          <Bell className="w-5 h-5 group-hover:scale-105 transition-transform" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-4 h-4 bg-red-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center border border-steel-800 animate-pulse">
              {unreadCount}
            </span>
          )}
        </Link>

        {/* Vertical Divider */}
        <div className="w-px h-6 bg-steel-600"></div>

        {/* User Account Settings Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            type="button"
            className="flex items-center space-x-2 sm:space-x-3 p-1.5 sm:p-2 rounded-lg hover:bg-steel-700 transition-all text-left focus:outline-none"
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-steel-600 border border-slate-500 flex items-center justify-center flex-shrink-0">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-4 h-4 text-slate-300" />
              )}
            </div>
            
            <div className="hidden md:flex flex-col select-none">
              <span className="text-xs sm:text-sm font-semibold text-white truncate max-w-[120px]">
                {user?.name || user?.username || 'Staff'}
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                {role?.toLowerCase() === 'depthead' ? 'Dept Head' : role || 'User'}
              </span>
            </div>
            <ChevronDown className={`hidden md:block w-4 h-4 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'transform rotate-180' : ''}`} />
          </button>

          {/* User Account Menu Cards */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2.5 w-56 rounded-xl bg-steel-800 border border-steel-600 shadow-2xl overflow-hidden z-50 animate-slideDown">
              <div className="p-3 bg-steel-900/40 border-b border-steel-600 flex md:hidden flex-col">
                <span className="text-sm font-semibold text-white truncate">
                  {user?.name || user?.username || 'Staff'}
                </span>
                <span className="text-xs text-tata-gold font-medium mt-0.5">
                  {role || 'User'}
                </span>
              </div>
              
              <div className="p-1.5 space-y-1">
                <Link
                  to={getProfilePath()}
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center w-full px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-steel-700 hover:text-white transition-colors duration-150"
                >
                  <User className="w-4 h-4 mr-2.5 text-slate-400" />
                  My Profile
                </Link>
                
                <Link
                  to="/change-password"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center w-full px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-steel-700 hover:text-white transition-colors duration-150"
                >
                  <Key className="w-4 h-4 mr-2.5 text-slate-400" />
                  Change Password
                </Link>
              </div>

              <div className="p-1.5 border-t border-steel-600 bg-steel-900/20">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    handleLogout();
                  }}
                  type="button"
                  className="flex items-center w-full px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-150"
                >
                  <LogOut className="w-4 h-4 mr-2.5 text-red-400/80" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
