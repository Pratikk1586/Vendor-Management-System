/**
 * @fileoverview Admin cross-departmental vendor oversight sheet with override controls and document trackers.
 */

import { useState } from 'react';
import { Building2, ShieldAlert, Award, Calendar, ToggleLeft, ToggleRight } from 'lucide-react';
import Tabs from '../../components/common/Tabs';
import DataTable from '../../components/common/DataTable';

export default function AdminVendors() {
  const [activeTab, setActiveTab] = useState('list');
  const [toast, setToast] = useState('');

  // Stateful vendor directory
  const [vendors, setVendors] = useState([
    { id: 'VEN-01', name: 'Bhartia Steel Fabrications Ltd', sector: 'Steel Fabrication', status: 'Active', tier: 'Gold', gstExpiry: '2026-06-06' },
    { id: 'VEN-02', name: 'Tata Colors Packaging Corp', sector: 'Packaging', status: 'Active', tier: 'Silver', gstExpiry: '2029-12-31' },
    { id: 'VEN-03', name: 'Standard Sourcing & Logistics', sector: 'Logistics', status: 'Active', tier: 'Platinum', gstExpiry: '2028-10-15' },
    { id: 'VEN-04', name: 'Calcutta Electrical Engineering', sector: 'Electrical', status: 'Suspended', tier: 'Silver', gstExpiry: '2026-05-20' },
  ]);

  const tabs = [
    { id: 'list', label: 'All Vendors Registry' },
    { id: 'expiry', label: 'Document Expiry Tracker' },
  ];

  const handleToggleStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    setVendors(prev => prev.map(v => v.id === id ? { ...v, status: nextStatus } : v));
    triggerToast(`Override Status: Changed ${id} to ${nextStatus}`);
  };

  const handleUpgradeTier = (id, currentTier) => {
    let nextTier = 'Silver';
    if (currentTier === 'Silver') nextTier = 'Gold';
    else if (currentTier === 'Gold') nextTier = 'Platinum';
    
    setVendors(prev => prev.map(v => v.id === id ? { ...v, tier: nextTier } : v));
    triggerToast(`Override Tier: Upgraded ${id} to ${nextTier}`);
  };

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const getStatusBadge = (status) => {
    return status === 'Active' 
      ? <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
      : <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-red-500/10 text-red-300 border border-red-500/20">Suspended</span>;
  };

  const getTierBadge = (tier) => {
    switch (tier) {
      case 'Platinum':
        return <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-gradient-to-r from-tata-blue to-tata-light text-white">Platinum</span>;
      case 'Gold':
        return <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-tata-gold/15 text-tata-gold border border-tata-gold/20">Gold</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-slate-500/10 text-slate-400 border border-steel-600">Silver</span>;
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Supplier Details',
      render: (val, row) => (
        <div>
          <span className="block font-semibold text-slate-200">{val}</span>
          <span className="text-[10px] text-slate-500 font-mono">ID: {row.id} | {row.sector}</span>
        </div>
      ),
    },
    {
      key: 'tier',
      label: 'Classification Tier',
      render: (val) => getTierBadge(val),
    },
    {
      key: 'status',
      label: 'Security Status',
      render: (val) => getStatusBadge(val),
    },
    {
      key: 'actions',
      label: 'Administrative Overrides',
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleToggleStatus(row.id, row.status)}
            type="button"
            className="py-1 px-2.5 rounded bg-steel-700 hover:bg-steel-600 text-[10px] font-bold text-slate-300 hover:text-white border border-steel-600 flex items-center space-x-1 transition-all focus:outline-none"
            title="Toggle active status"
          >
            {row.status === 'Active' ? <ToggleRight className="w-4 h-4 text-emerald-400" /> : <ToggleLeft className="w-4 h-4 text-slate-400" />}
            <span>Override Lock</span>
          </button>
          
          <button
            onClick={() => handleUpgradeTier(row.id, row.tier)}
            type="button"
            className="py-1 px-2.5 rounded bg-steel-700 hover:bg-steel-600 text-[10px] font-bold text-slate-300 hover:text-white border border-steel-600 flex items-center space-x-1 transition-all focus:outline-none"
          >
            <Award className="w-3.5 h-3.5 text-tata-gold" />
            <span>Shift Tier</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 font-body">
      
      {/* Page Header */}
      <div className="border-b border-steel-700/60 pb-5">
        <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">SUPER ADMIN METRICS</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          Vendor Partner Oversight
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-normal">
          Monitor all cross-departmental registered vendors, manage security override toggles, and track doc expiries.
        </p>
      </div>

      {toast && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold rounded-xl animate-fadeIn">
          ✓ {toast}
        </div>
      )}

      {/* Tabs */}
      <div className="bg-steel-800/40 p-1 border border-steel-700/50 rounded-xl max-w-md">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl">
        {activeTab === 'list' ? (
          
          /* Master Table */
          <DataTable
            columns={columns}
            data={vendors}
            emptyMessage="No vendors found."
          />
        ) : (
          
          /* Document Expiry Tracker */
          <div className="space-y-4">
            <div className="p-4 bg-steel-900/40 border border-steel-700/60 rounded-xl flex items-center space-x-3 text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              <ShieldAlert className="w-5 h-5 text-tata-gold flex-shrink-0" />
              <p>
                The document audit ledger lists document compliance parameters expiring within the next 30 days. Action overrides allow locking non-compliant profiles statefully.
              </p>
            </div>

            <div className="space-y-3">
              {vendors.map((v) => {
                const date = new Date(v.gstExpiry);
                const expired = date < new Date();
                const days = Math.round((date - new Date()) / (1000 * 60 * 60 * 24));
                
                return (
                  <div key={v.id} className="p-4 bg-steel-900/20 border border-steel-700/50 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-white">{v.name}</h4>
                      <div className="flex items-center text-[10px] text-slate-500 font-mono space-x-3">
                        <span className="flex items-center"><Building2 className="w-3.5 h-3.5 mr-1" />ID: {v.id}</span>
                        <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" />Expires: {v.gstExpiry}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 flex-shrink-0">
                      {expired ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20">Expired</span>
                      ) : days <= 15 ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20">Renewal Due ({days} Days)</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Compliant</span>
                      )}
                      <button
                        onClick={() => handleToggleStatus(v.id, v.status)}
                        type="button"
                        className="py-1 px-2.5 rounded bg-steel-700 hover:bg-steel-600 text-[10px] font-bold text-white border border-steel-600 focus:outline-none"
                      >
                        {v.status === 'Active' ? 'Suspend Supplier' : 'Activate Supplier'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
