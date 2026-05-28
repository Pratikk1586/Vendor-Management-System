/**
 * @fileoverview Public layout wrapping landing, login, and registration pages.
 */

import { Outlet } from 'react-router-dom';
import LandingNavbar from '../landing/LandingNavbar';
import Footer from './Footer';

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 font-body">
      {/* Landing Top Navigation Bar */}
      <LandingNavbar />

      {/* Main Dynamic Viewport */}
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      {/* Footer Branding & Links */}
      <Footer />
    </div>
  );
}
