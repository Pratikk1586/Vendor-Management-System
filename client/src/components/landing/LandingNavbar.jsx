import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogIn, LayoutDashboard } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { isAuthenticated, role } = useAuthStore();

  // Track window scroll coordinates to apply background effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper to determine the dashboard link based on the user's role
  const getDashboardPath = () => {
    switch (role?.toLowerCase()) {
      case 'admin':
      case 'superadmin':
        return '/admin/dashboard';
      case 'depthead':
      case 'dept_head':
        return '/dept/dashboard';
      case 'vendor':
        return '/vendor/dashboard';
      default:
        return '/';
    }
  };

  const navLinks = [
    { label: 'About', path: '/#about', targetId: 'about' },
    { label: 'Products', path: '/#products', targetId: 'products' },
    { label: 'Vendor Program', path: '/#vendor-program', targetId: 'vendor-program' },
    { label: 'Contact', path: '/#contact', targetId: 'contact' },
  ];

  const handleLinkClick = (e, item) => {
    // If we're on the home page, scroll smoothly to the target anchor
    if (window.location.pathname === '/') {
      e.preventDefault();
      const targetElement = document.getElementById(item.targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 font-body text-slate-800 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-3 sm:py-4'
        : 'bg-white/60 backdrop-blur-sm border-b border-slate-200/40 py-4 sm:py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo Brand Left */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 bg-gradient-to-br from-tata-blue to-tata-light rounded-lg flex items-center justify-center font-display text-lg text-white font-bold shadow-lg shadow-tata-blue/15 group-hover:scale-105 transition-transform duration-200">
                TS
              </div>
              <div className="flex flex-col">
                <span className="font-display text-base font-bold tracking-wider text-slate-900 group-hover:text-tata-blue transition-colors duration-200 leading-none">
                  TATA STEEL COLORS
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links Center */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link)}
                className="text-sm font-medium tracking-wide text-slate-600 hover:text-tata-blue transition-colors duration-200 py-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action Buttons Right (Session-aware) */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <Link
                to={getDashboardPath()}
                className="inline-flex items-center px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-tata-blue to-tata-light text-white shadow-md shadow-tata-blue/20 hover:scale-105 transition-all duration-200"
              >
                <LayoutDashboard className="w-3.5 h-3.5 mr-1.5" />
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 rounded-lg text-xs font-semibold border border-slate-300 text-slate-700 hover:border-tata-blue hover:text-tata-blue hover:bg-slate-50 transition-all duration-200"
                >
                  <LogIn className="w-3.5 h-3.5 mr-1.5" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-4 py-2 rounded-lg text-xs font-semibold bg-tata-blue text-white hover:bg-tata-light shadow-md shadow-tata-blue/15 hover:scale-105 transition-all duration-200"
                >
                  Register as Vendor
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 animate-fadeIn absolute left-0 right-0 z-40">
          <div className="px-4 pt-2 pb-6 space-y-4 shadow-xl">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link)}
                className="block text-base font-medium px-3 py-2 rounded-md hover:bg-slate-100 hover:text-tata-blue transition-all text-slate-700"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3 px-3">
              {isAuthenticated ? (
                <Link
                  to={getDashboardPath()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-tata-blue to-tata-light text-white text-center shadow-md"
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all text-center"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg text-sm font-semibold bg-tata-blue text-white text-center shadow-md"
                  >
                    Register as Vendor
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
