/**
 * @fileoverview Responsive 4-column footer component for public layouts.
 */

import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-steel-900 border-t border-steel-700 text-slate-300 font-body">
      {/* Top 4-Column Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">

          {/* Column 1: Logo & Tagline */}
          {/* <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 bg-gradient-to-br from-tata-gold to-tata-amber rounded-lg flex items-center justify-center font-display text-lg text-steel-900 font-bold shadow-lg shadow-tata-gold/10">
                TS
              </div>
              <div className="flex flex-col">
                <span className="font-display text-base tracking-wider text-white group-hover:text-tata-gold transition-colors duration-200">
                  TATA STEEL Colors
                </span>
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400">
                  Colors Portal
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Join the Tata Steel Colors partner network. Access premium coated steel solutions, streamline order coordination, ensure quality compliance, and track deliveries with complete transparency and reliability. Build stronger projects with trusted color-coated steel products backed by Tata Steel's expertise and innovation.
            </p>
          </div> */}

          {/* Column 2: Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-tata-gold transition-colors duration-150">
                  Home Page
                </Link>
              </li>
              <li>
                <Link to="/tenders" className="hover:text-tata-gold transition-colors duration-150">
                  Browse Tenders
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-tata-gold transition-colors duration-150">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-tata-gold transition-colors duration-150">
                  Vendor Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-tata-gold flex-shrink-0 mt-0.5" />
                <a href="https://maps.app.goo.gl/MAwrFaLd2KV7rDAk6" className="hover:text-white transition-colors duration-150">
                  Tata Steel Colors,<br />
                  Agrico Link Rd, Agrico Colony, Bara,<br />
                  Jamshedpur, Jharkhand 831009, India
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-tata-gold flex-shrink-0" />
                <a href="tel:1800 270 8333" className="hover:text-white transition-colors duration-150">
                  1800 270 8333
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-tata-gold flex-shrink-0" />
                <a href="mailto:contact@tatasteelcolors.com" className="hover:text-white transition-colors duration-150">
                  contact@tatasteelcolors.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Icons */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Connect With Us
            </h3>
            <p className="text-sm text-slate-400">
              Stay updated with active tenders and announcement updates.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.linkedin.com/company/tata-steel-colors/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-steel-800 hover:bg-tata-blue hover:text-white rounded-lg flex items-center justify-center transition-all duration-200"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              <a
                href="https://www.youtube.com/@TataSteelColors"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-steel-800 hover:bg-red-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-200"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.511a3.002 3.002 0 0 0-2.11 2.107C0 8.021 0 12 0 12s0 3.979.502 5.837a3.001 3.001 0 0 0 2.11 2.107c1.883.511 9.388.511 9.388.511s7.505 0 9.388-.511a3.002 3.002 0 0 0 2.11-2.107c.502-1.858.502-5.837.502-5.837s0-3.979-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://tatasteelcolors.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-steel-800 hover:bg-tata-gold hover:text-steel-900 rounded-lg flex items-center justify-center transition-all duration-200"
                aria-label="Website"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-steel-900/60 border-t border-steel-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-3 sm:space-y-0">
          <div>
            Copyright &copy; {currentYear} TATA STEEL COLORS PRIVATE LIMITED. CIN: U45209PN2005PTC020270. All Rights Reserved.
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="hover:text-slate-300 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
