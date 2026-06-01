/**
 * @fileoverview Admin global reports panel, featuring tabbed directories for members, vendors, tenders, and financial audits.
 */

import { useState } from 'react';
import { Download, Users, Building, FileText, DollarSign } from 'lucide-react';
import Tabs from '../../components/common/Tabs';

export default function AdminReports() {
  const [activeTab, setActiveTab] = useState('members');
  const [toast, setToast] = useState('');

  const tabs = [
    { id: 'members', label: 'Members Audit' },
    { id: 'vendors', label: 'Vendors Activity' },
    { id: 'tenders', label: 'Tenders Pipeline' },
    { id: 'financial', label: 'Financial Statements' },
  ];

  const handleExport = (format) => {
    triggerToast(`Exporting ${activeTab} report as ${format.toUpperCase()}...`);
  };

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  return (
    <div className="space-y-6 font-body">

      {/* Page Header */}
      <div className="border-b border-steel-700/60 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">SUPER ADMIN METRICS</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            System-Wide Analytics & Exports
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-normal">
            Inspect organizational performance indicators, export compliance records, and analyze spend profiles.
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex space-x-2 sm:self-end">
          <button
            onClick={() => handleExport('csv')}
            type="button"
            className="flex items-center py-2 px-4 rounded-xl text-xs font-bold border border-steel-600 hover:border-steel-500 bg-steel-800 hover:bg-steel-700 text-slate-700 hover:text-white transition-all focus:outline-none"
          >
            <Download className="w-4 h-4 mr-1.5" />
            CSV Export
          </button>

          <button
            onClick={() => handleExport('pdf')}
            type="button"
            className="flex items-center py-2 px-4 rounded-xl text-xs font-bold bg-tata-gold hover:bg-tata-amber hover:text-white text-black transition-all focus:outline-none shadow-lg shadow-tata-gold/10"
          >
            <Download className="w-4 h-4 mr-1.5" />
            PDF Statement
          </button>
        </div>
      </div>

      {toast && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold rounded-xl animate-fadeIn">
          ✓ {toast}
        </div>
      )}

      {/* Tabs */}
      <div className="bg-steel-800/40 p-1 border border-steel-700/50 rounded-xl max-w-xl">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* Main stats panel */}
      <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-6 shadow-xl space-y-6">

        {/* PANEL: MEMBERS */}
        {activeTab === 'members' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-steel-700 pb-3">
              <Users className="w-5 h-5 text-tata-gold" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-tata-gold">Members Audit Overview</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="p-4 bg-steel-900 border border-steel-700/60 rounded-xl text-center">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-200 block leading-none">Total Registered Staff</span>
                <span className="text-2xl font-mono font-bold text-white block mt-3">6 Accounts</span>
              </div>
              <div className="p-4 bg-steel-900 border border-steel-700/60 rounded-xl text-center">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-200 block leading-none">Department Heads</span>
                <span className="text-2xl font-mono font-bold text-white block mt-3">3 Active</span>
              </div>
              <div className="p-4 bg-steel-900 border border-steel-700/60 rounded-xl text-center">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-200 block leading-none">Super Admins</span>
                <span className="text-2xl font-mono font-bold text-white block mt-3">3 Active</span>
              </div>
            </div>
          </div>
        )}

        {/* PANEL: VENDORS */}
        {activeTab === 'vendors' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-steel-700 pb-3">
              <Building className="w-5 h-5 text-tata-gold" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-tata-gold">Vendors Activity Overview</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="p-4 bg-steel-900 border border-steel-700/60 rounded-xl text-center">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-200 block leading-none">Total Partners Registered</span>
                <span className="text-2xl font-mono font-bold text-white block mt-3">120 Suppliers</span>
              </div>
              <div className="p-4 bg-steel-900 border border-steel-700/60 rounded-xl text-center">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-200 block leading-none">Active Bidders</span>
                <span className="text-2xl font-mono font-bold text-white block mt-3">80% Active Rate</span>
              </div>
              <div className="p-4 bg-steel-900 border border-steel-700/60 rounded-xl text-center">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-200 block leading-none">MSME Classification</span>
                <span className="text-2xl font-mono font-bold text-white block mt-3">28 MSME partners</span>
              </div>
            </div>
          </div>
        )}

        {/* PANEL: TENDERS */}
        {activeTab === 'tenders' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-steel-700 pb-3">
              <FileText className="w-5 h-5 text-tata-gold" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-tata-gold">Tenders Pipeline Overview</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="p-4 bg-steel-900 border border-steel-700/60 rounded-xl text-center">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-200 block leading-none">Total Published Tenders</span>
                <span className="text-2xl font-mono font-bold text-white block mt-3">12 published</span>
              </div>
              <div className="p-4 bg-steel-900 border border-steel-700/60 rounded-xl text-center">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-200 block leading-none">Completed Bids Evaluated</span>
                <span className="text-2xl font-mono font-bold text-white block mt-3">8 Closed</span>
              </div>
              <div className="p-4 bg-steel-900 border border-steel-700/60 rounded-xl text-center">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-200 block leading-none">Live Active Bidding</span>
                <span className="text-2xl font-mono font-bold text-white block mt-3">4 Live</span>
              </div>
            </div>
          </div>
        )}

        {/* PANEL: FINANCIAL */}
        {activeTab === 'financial' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-steel-700 pb-3">
              <DollarSign className="w-5 h-5 text-tata-gold" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-tata-gold">Financial spend statements</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="p-4 bg-steel-900 border border-steel-700/60 rounded-xl text-center">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-200 block leading-none">Sourcing Cumulative Spend</span>
                <span className="text-2xl font-mono font-bold text-white block mt-3">₹4.20 Cr</span>
              </div>
              <div className="p-4 bg-steel-900 border border-steel-700/60 rounded-xl text-center">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-200 block leading-none">Active ongoing Operations</span>
                <span className="text-2xl font-mono font-bold text-white block mt-3">₹2.85 Cr</span>
              </div>
              <div className="p-4 bg-steel-900 border border-steel-700/60 rounded-xl text-center">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-200 block leading-none">Average Sourcing per Contract</span>
                <span className="text-2xl font-mono font-bold text-white block mt-3">₹35.00 Lakhs</span>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
