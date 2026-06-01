/**
 * @fileoverview Admin Portal configurations settings dashboard containing forms for thresholds, limits, and banners.
 */

import { useState } from 'react';
import { Save, ToggleRight } from 'lucide-react';

export default function AdminSettings() {
  const [vendorSelfReg, setVendorSelfReg] = useState(true);
  const [announcementBanner, setAnnouncementBanner] = useState('System Maintenance: Colors portal will undergo server upgrades on May 30th from 02:00 to 04:00 AM IST.');
  const [goldThreshold, setGoldThreshold] = useState(800);
  const [platinumThreshold, setPlatinumThreshold] = useState(950);
  const [smtpServer, setSmtpServer] = useState('smtp.tatasteel.com');
  const [mandateMSME, setMandateMSME] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }, 1000);
  };

  return (
    <div className="space-y-6 font-body max-w-4xl mx-auto">

      {/* Page Header */}
      <div className="border-b border-steel-700/60 pb-5">
        <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">SUPER ADMIN SETTINGS</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900
         mt-1">
          Global Portal Configuration
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-normal">
          Configure security, email servers, registration controls, supplier score thresholds, and announcement banners.
        </p>
      </div>

      {success && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold rounded-xl animate-fadeIn">
          ✓ Portal settings updated statefully and saved successfully.
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-6">

        {/* Registration Controls & Announcement */}
        <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-tata-gold border-b border-steel-700 pb-2">
            Onboarding & Announcements
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 bg-steel-900/40 border border-steel-700/60 rounded-xl text-xs sm:text-sm">
              <div>
                <h4 className="font-semibold text-black">Vendor Self-Registration</h4>
                <p className="text-xs text-slate-500 mt-1 leading-normal">Allows external supplier portals to submit onboarding profiles.</p>
              </div>
              <button
                type="button"
                onClick={() => setVendorSelfReg(!vendorSelfReg)}
                className="text-slate-300 hover:text-white focus:outline-none"
              >
                {vendorSelfReg ? <ToggleRight className="w-12 h-8 text-tata-blue" /> : <ToggleRight className="w-12 h-8 text-slate-600 rotate-180" />}
              </button>
            </div>

            <div>
              <label htmlFor="announcement" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Live Announcement Banner text
              </label>
              <textarea
                id="announcement"
                value={announcementBanner}
                onChange={(e) => setAnnouncementBanner(e.target.value)}
                rows={2.5}
                className="block w-full px-4 py-2.5 rounded-xl bg-steel-900 border border-steel-700/80 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-tata-blue transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Scoring & Thresholds */}
        <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-tata-gold border-b border-steel-700 pb-2">
            Supplier Classification Tier Thresholds
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label htmlFor="gold-threshold" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Gold Tier Score Bound *
              </label>
              <input
                id="gold-threshold"
                type="number"
                required
                value={goldThreshold}
                onChange={(e) => setGoldThreshold(Number(e.target.value))}
                className="block w-full px-4 py-2 rounded-xl bg-steel-900 border border-steel-700/80 text-white focus:outline-none focus:border-tata-blue"
              />
            </div>

            <div>
              <label htmlFor="platinum-threshold" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Platinum Tier Score Bound *
              </label>
              <input
                id="platinum-threshold"
                type="number"
                required
                value={platinumThreshold}
                onChange={(e) => setPlatinumThreshold(Number(e.target.value))}
                className="block w-full px-4 py-2 rounded-xl bg-steel-900 border border-steel-700/80 text-white focus:outline-none focus:border-tata-blue"
              />
            </div>
          </div>
        </div>

        {/* Security & System email */}
        <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-tata-gold border-b border-steel-700 pb-2">
            System Security & SMTP Configuration
          </h3>

          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <label htmlFor="smtp" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                SMTP Relay Host *
              </label>
              <input
                id="smtp"
                type="text"
                required
                value={smtpServer}
                onChange={(e) => setSmtpServer(e.target.value)}
                className="block w-full px-4 py-2 rounded-xl bg-steel-900 border border-steel-700/80 text-white focus:outline-none focus:border-tata-blue"
              />
            </div>

            <div className="flex items-start">
              <input
                id="msme-checkbox"
                type="checkbox"
                checked={mandateMSME}
                onChange={(e) => setMandateMSME(e.target.checked)}
                className="h-4.5 w-4.5 mt-0.5 rounded bg-steel-900 border-steel-700 text-tata-blue focus:ring-tata-blue/20 focus:ring-offset-0 focus:outline-none"
              />
              <label htmlFor="msme-checkbox" className="ml-2.5 block text-xs sm:text-sm text-slate-400 leading-normal font-normal">
                Mandate MSME Certificate upload during registration.
              </label>
            </div>
          </div>
        </div>

        {/* Actions panel */}
        <div className="pt-4 flex items-center justify-end">
          <button
            type="submit"
            disabled={loading}
            className="py-2.5 px-8 rounded-xl bg-gradient-to-r from-tata-blue to-tata-light text-xs sm:text-sm font-semibold text-white shadow-lg hover:shadow-tata-blue/30 flex items-center justify-center transition-all focus:outline-none"
          >
            <Save className="w-4.5 h-4.5 mr-2" />
            {loading ? 'Saving configs...' : 'Save Portal Configurations'}
          </button>
        </div>

      </form>
    </div>
  );
}
