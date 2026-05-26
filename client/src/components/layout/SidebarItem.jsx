import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function SidebarItem({ item, collapsed, depth = 0 }) {
  const { label, icon: Icon, path, badge, children } = item;
  const location = useLocation();
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();

  // Check if any child item path matches the current active location
  const hasActiveChild = children?.some(
    (child) => location.pathname === child.path || location.pathname.startsWith(child.path + '/')
  );

  const [expanded, setExpanded] = useState(hasActiveChild);

  // Synchronize state when hasActiveChild prop changes directly in render to satisfy react-hooks/set-state-in-effect
  const [prevHasActiveChild, setPrevHasActiveChild] = useState(hasActiveChild);
  if (hasActiveChild !== prevHasActiveChild) {
    setPrevHasActiveChild(hasActiveChild);
    setExpanded(hasActiveChild);
  }

  // Synchronize state when collapsed prop changes directly in render to satisfy react-hooks/set-state-in-effect
  const [prevCollapsed, setPrevCollapsed] = useState(collapsed);
  if (collapsed !== prevCollapsed) {
    setPrevCollapsed(collapsed);
    if (collapsed) {
      setExpanded(false);
    }
  }

  const toggleExpand = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const handleItemClick = (e) => {
    if (path === '/logout' || label?.toLowerCase() === 'logout') {
      e.preventDefault();
      clearAuth();
      navigate('/login');
    }
  };

  // Shared active styles for layout links
  const activeClass = 'bg-tata-blue text-white font-semibold shadow-md shadow-tata-blue/20';
  const inactiveClass = 'text-slate-300 hover:bg-steel-600 hover:text-white';
  const baseClass = `flex items-center w-full px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group relative ${
    collapsed ? 'justify-center' : ''
  }`;

  // Depth indent styling
  const indentStyle = !collapsed && depth > 0 ? { paddingLeft: `${depth * 1.2 + 0.75}rem` } : {};

  // If item has sub-items (children), render an expandable button
  if (children && children.length > 0) {
    return (
      <div className="w-full">
        <button
          onClick={toggleExpand}
          style={indentStyle}
          className={`${baseClass} ${hasActiveChild && !expanded ? 'bg-steel-600/30 text-tata-gold' : inactiveClass}`}
        >
          {Icon && (
            <Icon
              className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                collapsed ? '' : 'mr-3'
              } ${hasActiveChild && !expanded ? 'text-tata-gold' : 'text-slate-400 group-hover:text-white'}`}
            />
          )}

          {!collapsed && (
            <>
              <span className="flex-1 text-left truncate">{label}</span>
              <ChevronDown
                className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                  expanded ? 'transform rotate-180 text-white' : 'text-slate-400'
                }`}
              />
            </>
          )}

          {/* Hover label tooltip when collapsed */}
          {collapsed && (
            <div className="absolute left-full ml-4 px-2 py-1 bg-steel-900 border border-steel-600 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 pointer-events-none z-50 shadow-xl">
              {label}
            </div>
          )}
        </button>

        {/* Child recursive list */}
        {expanded && !collapsed && (
          <div className="mt-1 space-y-1 overflow-hidden transition-all duration-300 animate-slideDown">
            {children.map((child, idx) => (
              <SidebarItem
                key={`${child.label}-${idx}`}
                item={child}
                collapsed={collapsed}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // standard clickable sidebar page link
  return (
    <NavLink
      to={path}
      onClick={handleItemClick}
      style={indentStyle}
      className={({ isActive }) =>
        `${baseClass} ${isActive ? activeClass : inactiveClass}`
      }
      end={path === '/admin/dashboard' || path === '/vendor/dashboard' || path === '/dept/dashboard'}
    >
      {({ isActive }) => (
        <>
          {Icon && (
            <Icon
              className={`w-5 h-5 flex-shrink-0 transition-all ${
                collapsed ? '' : 'mr-3'
              } ${isActive ? 'text-white scale-105' : 'text-slate-400 group-hover:text-white'}`}
            />
          )}

          {!collapsed && (
            <span className="flex-1 text-left truncate">{label}</span>
          )}

          {/* Optional Badge (e.g. notification unread counts) */}
          {badge !== undefined && badge > 0 && !collapsed && (
            <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold leading-none text-white bg-red-500 rounded-full animate-pulse">
              {badge}
            </span>
          )}

          {/* Hover label tooltip when collapsed */}
          {collapsed && (
            <div className="absolute left-full ml-4 px-2 py-1 bg-steel-900 border border-steel-600 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 pointer-events-none z-50 shadow-xl">
              {label}
              {badge !== undefined && badge > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded-full">
                  {badge}
                </span>
              )}
            </div>
          )}
        </>
      )}
    </NavLink>
  );
}
