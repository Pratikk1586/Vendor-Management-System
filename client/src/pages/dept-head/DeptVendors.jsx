/**
 * @fileoverview Sourcing department vendor classification management with stateful action updates and profile drawers.
 */

import { useState } from 'react';
import { Eye, Building, Mail, Phone } from 'lucide-react';
import Tabs from '../../components/common/Tabs';
import DataTable from '../../components/common/DataTable';
import Drawer from '../../components/common/Drawer';

export default function DeptVendors() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Stateful mock vendor list
  const [vendors, setVendors] = useState([
    { id: 'VEN-01', name: 'Bhartia Steel Fabrications Ltd', email: 'ramesh@bhartiasteel.co.in', mobile: '+91 98765 43210', status: 'Active', gst: '20AABCB1234A1Z5', pan: 'AABCB1234A', sector: 'Steel Fabrication', est: '1998' },
    { id: 'VEN-02', name: 'Tata Colors Packaging Corp', email: 'sales@colorpack.co.in', mobile: '+91 98765 43220', status: 'Pending', gst: '20BBBCB1234B1Z5', pan: 'BBBCB1234B', sector: 'Packaging', est: '2005' },
    { id: 'VEN-03', name: 'Standard Sourcing & Logistics', email: 'operations@stdlogistics.com', mobile: '+91 98765 43230', status: 'Active', gst: '20CCCBC1234C1Z5', pan: 'CCCBC1234C', sector: 'Logistics', est: '2012' },
    { id: 'VEN-04', name: 'Calcutta Electrical Engineering', email: 'info@calcuttapower.com', mobile: '+91 98765 43240', status: 'Suspended', gst: '20DDDCB1234D1Z5', pan: 'DDDCB1234D', sector: 'Electrical', est: '1989' },
    { id: 'VEN-05', name: 'Jharkhand Refractories Ltd', email: 'contact@jhref.com', mobile: '+91 98765 43250', status: 'Blacklisted', gst: '20EEEBC1234E1Z5', pan: 'EEEBC1234E', sector: 'Manufacturing', est: '1995' },
  ]);

  const tabs = [
    { id: 'ALL', label: 'All Suppliers', count: vendors.length },
    { id: 'Pending', label: 'Pending Queue', count: vendors.filter(v => v.status === 'Pending').length },
    { id: 'Active', label: 'Active', count: vendors.filter(v => v.status === 'Active').length },
    { id: 'Suspended', label: 'Suspended', count: vendors.filter(v => v.status === 'Suspended').length },
    { id: 'Blacklisted', label: 'Blacklisted', count: vendors.filter(v => v.status === 'Blacklisted').length },
  ];

  // Action Triggers
  const handleApprove = (id) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, status: 'Active' } : v));
  };

  const handleSuspend = (id) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, status: 'Suspended' } : v));
  };

  const handleBlacklist = (id) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, status: 'Blacklisted' } : v));
  };

  const handleInspect = (vendor) => {
    setSelectedVendor(vendor);
    setDrawerOpen(true);
  };

  // Get status color badges
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>;
      case 'Pending':
        return <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20">Pending</span>;
      case 'Suspended':
        return <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-red-500/10 text-red-300 border border-red-500/20">Suspended</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-red-950 text-red-400 border border-red-500/30">Blacklisted</span>;
    }
  };

  // Columns definition
  const columns = [
    {
      key: 'name',
      label: 'Supplier Details',
      render: (val, row) => (
        <div>
          <span className="block font-semibold text-black">{val}</span>
          <span className="text-[10px] text-slate-500 font-mono">ID: {row.id} | GST: {row.gst}</span>
        </div>
      ),
    },
    {
      key: 'sector',
      label: 'Onboarding Sector',
    },
    {
      key: 'status',
      label: 'Classification',
      render: (val) => getStatusBadge(val),
    },
    {
      key: 'actions',
      label: 'Moderation Actions',
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleInspect(row)}
            type="button"
            className="py-1 px-2 rounded bg-steel-700 hover:bg-tata-blue/20 text-[10px] font-bold text-slate-300 hover:text-white border border-steel-600 hover:border-tata-blue/40 flex items-center space-x-1 transition-all focus:outline-none"
            title="Inspect profile"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Inspect</span>
          </button>

          {row.status === 'Pending' && (
            <button
              onClick={() => handleApprove(row.id)}
              type="button"
              className="py-1 px-2 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-[10px] font-bold text-emerald-400 border border-emerald-500/20 transition-all focus:outline-none"
            >
              Approve
            </button>
          )}

          {row.status === 'Active' && (
            <button
              onClick={() => handleSuspend(row.id)}
              type="button"
              className="py-1 px-2 rounded bg-red-500/10 hover:bg-red-500/20 text-[10px] font-bold text-red-400 border border-red-500/20 transition-all focus:outline-none"
            >
              Suspend
            </button>
          )}

          {row.status !== 'Blacklisted' && (
            <button
              onClick={() => handleBlacklist(row.id)}
              type="button"
              className="py-1 px-2 rounded bg-red-950 hover:bg-red-900 text-[10px] font-bold text-red-300 border border-red-500/35 transition-all focus:outline-none"
            >
              Blacklist
            </button>
          )}
        </div>
      ),
    },
  ];

  const filteredVendors = vendors.filter((v) => activeTab === 'ALL' || v.status === activeTab);

  return (
    <div className="space-y-6 font-body">

      {/* Header */}
      <div className="border-b border-steel-700/60 pb-5">
        <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">SUPPLIER DIRECTORY</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
          Vendor Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-normal">
          Inspect, authorize, suspend, or blacklist registered suppliers based on compliance reviews.
        </p>
      </div>

      {/* Tabs list wrapper */}
      <div className="bg-steel-800/40 p-1 border border-steel-700/50 rounded-xl">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* Main DataTable panel */}
      <div className="bg-white border border-steel-700/60 rounded-2xl p-5 shadow-xl">
        <DataTable
          columns={columns}
          data={filteredVendors}
          emptyMessage="No vendors found in this queue."
        />
      </div>

      {/* Slide-in Vendor profile inspection drawer */}
      {selectedVendor && (
        <Drawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={selectedVendor.name}
          width="38rem"
        >
          <div className="space-y-6 text-xs sm:text-sm">

            {/* Header branding */}
            <div className="flex items-center space-x-3 pb-4 border-b border-steel-700">
              <div className="w-10 h-10 rounded-xl bg-steel-900 border border-steel-700 flex items-center justify-center text-tata-gold flex-shrink-0">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-black leading-tight">{selectedVendor.name}</h4>
                <div className="mt-1">{getStatusBadge(selectedVendor.status)}</div>
              </div>
            </div>

            {/* General Info list */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-tata-gold">Corporate Profile</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-slate-800 block leading-none">Registered GSTIN</span>
                  <span className="font-mono font-bold text-slate-400 block mt-1.5">{selectedVendor.gst}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-slate-800 block leading-none">Corporate PAN</span>
                  <span className="font-mono font-bold text-slate-400 block mt-1.5">{selectedVendor.pan}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-slate-800 block leading-none">Onboarding Sector</span>
                  <span className="font-semibold text-slate-400 block mt-1.5">{selectedVendor.sector}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-slate-800 block leading-none">Year Established</span>
                  <span className="font-semibold text-slate-400 block mt-1.5">{selectedVendor.est}</span>
                </div>
              </div>
            </div>

            {/* Contact Registries */}
            <div className="space-y-3.5 pt-4 border-t border-steel-700">
              <h3 className="text-xs font-bold uppercase tracking-wider text-tata-gold">Contact Registry</h3>

              <div className="space-y-2 text-slate-500">
                <div className="flex items-center space-x-2.5">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span>{selectedVendor.email}</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span>{selectedVendor.mobile}</span>
                </div>
              </div>
            </div>

            {/* Verification Documents Ticker */}
            <div className="space-y-3 pt-4 border-t border-steel-700">
              <h3 className="text-xs font-bold uppercase tracking-wider text-tata-gold">Verification Auditing</h3>

              <div className="p-3 bg-steel-900 border border-steel-700/60 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">GST Registration:</span>
                  <span className="text-emerald-400 font-bold">✓ VERIFIED</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">PAN Verification:</span>
                  <span className="text-emerald-400 font-bold">✓ VERIFIED</span>
                </div>
              </div>
            </div>

            {/* Moderation Actions bar in drawer */}
            <div className="pt-6 border-t border-steel-700 flex items-center justify-between">
              {selectedVendor.status === 'Pending' && (
                <button
                  onClick={() => {
                    handleApprove(selectedVendor.id);
                    setDrawerOpen(false);
                  }}
                  type="button"
                  className="py-2.5 px-6 rounded-xl bg-emerald-500 text-white font-bold text-xs hover:bg-emerald-600 transition-colors focus:outline-none"
                >
                  Approve Supplier
                </button>
              )}

              {selectedVendor.status === 'Active' && (
                <button
                  onClick={() => {
                    handleSuspend(selectedVendor.id);
                    setDrawerOpen(false);
                  }}
                  type="button"
                  className="py-2.5 px-6 rounded-xl bg-red-500 text-white font-bold text-xs hover:bg-red-600 transition-colors focus:outline-none"
                >
                  Suspend Supplier
                </button>
              )}

              {selectedVendor.status !== 'Blacklisted' && (
                <button
                  onClick={() => {
                    handleBlacklist(selectedVendor.id);
                    setDrawerOpen(false);
                  }}
                  type="button"
                  className="py-2.5 px-6 rounded-xl bg-red-950 text-red-300 font-bold text-xs hover:bg-red-900 border border-red-500/20 transition-colors focus:outline-none"
                >
                  Blacklist Supplier
                </button>
              )}
            </div>

          </div>
        </Drawer>
      )}

    </div>
  );
}
