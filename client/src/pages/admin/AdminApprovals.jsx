/**
 * @fileoverview Admin Approvals queues page, splitting pending activations into Vendors, Dept Heads, and Admins.
 */

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import Tabs from '../../components/common/Tabs';

export default function AdminApprovals() {
  const [activeTab, setActiveTab] = useState('vendors');
  const [toastMessage, setToastMessage] = useState('');

  // Stateful pending lists
  const [vendors, setVendors] = useState([
    { id: 'APP-V01', name: 'Aditya Birla Packaging', email: 'admin@birlapack.co.in', sector: 'Packaging', daysPending: 2, docs: ['GST Cert', 'PAN Card'] },
    { id: 'APP-V02', name: 'Hindustan Heavy Logistics', email: 'ops@hindlogistics.com', sector: 'Logistics', daysPending: 5, docs: ['GST Cert', 'PAN Card', 'COI'] },
    { id: 'APP-V03', name: 'Ranchi Foundry Works', email: 'ranchifoundry@gmail.com', sector: 'Steel Fabrication', daysPending: 9, docs: ['GST Cert', 'PAN Card'] },
  ]);

  const [deptHeads, setDeptHeads] = useState([
    { id: 'APP-DH01', name: 'Ritesh Pandey', email: 'ritesh@tatasteel.com', dept: 'Packaging', designation: 'Packaging Manager', daysPending: 1, docs: ['Employee ID', 'HR Auth'] },
    { id: 'APP-DH02', name: 'Ankita Verma', email: 'ankita@tatasteel.com', dept: 'IT & Services', designation: 'IT Director', daysPending: 4, docs: ['Employee ID', 'HR Auth'] },
  ]);

  const [admins, setAdmins] = useState([
    { id: 'APP-AD01', name: 'Sandeep Roy', email: 'sandeep@tatasteel.com', designation: 'Compliance Officer', daysPending: 3, docs: ['Employee ID', 'HR Auth'] },
  ]);

  const tabs = [
    { id: 'vendors', label: 'Vendor Partners', count: vendors.length },
    { id: 'dept_heads', label: 'Department Heads', count: deptHeads.length },
    { id: 'admins', label: 'Admins Queue', count: admins.length },
  ];

  const handleApprove = (type, id, name) => {
    if (type === 'vendors') {
      setVendors(prev => prev.filter(v => v.id !== id));
    } else if (type === 'dept_heads') {
      setDeptHeads(prev => prev.filter(d => d.id !== id));
    } else {
      setAdmins(prev => prev.filter(a => a.id !== id));
    }
    triggerToast(`Approved member: ${name}`);
  };

  const handleReject = (type, id, name) => {
    if (type === 'vendors') {
      setVendors(prev => prev.filter(v => v.id !== id));
    } else if (type === 'dept_heads') {
      setDeptHeads(prev => prev.filter(d => d.id !== id));
    } else {
      setAdmins(prev => prev.filter(a => a.id !== id));
    }
    triggerToast(`Declined activation for: ${name}`);
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2000);
  };

  const getDelayBadge = (days) => {
    if (days >= 7) {
      return <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse">Pending {days} Days (Critical)</span>;
    }
    if (days >= 4) {
      return <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20">Pending {days} Days (Moderate)</span>;
    }
    return <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-tata-blue/15 text-tata-light border border-tata-blue/20">Pending {days} Days</span>;
  };

  return (
    <div className="space-y-6 font-body">
      
      {/* Page Header */}
      <div className="border-b border-steel-700/60 pb-5">
        <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">WORKFLOW REGISTRY</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          Pending Approvals Queue
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-normal">
          Review, approve, or decline system onboarding registration requests from external suppliers and internal staff.
        </p>
      </div>

      {toastMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold rounded-xl animate-fadeIn">
          ✓ {toastMessage}
        </div>
      )}

      {/* Tabs */}
      <div className="bg-steel-800/40 p-1 border border-steel-700/50 rounded-xl max-w-xl">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* PANEL: VENDORS */}
        {activeTab === 'vendors' && (
          vendors.length > 0 ? (
            vendors.map((v) => (
              <div key={v.id} className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-steel-900 border border-steel-700 font-mono font-bold text-[10px] text-tata-gold">{v.id}</span>
                    {getDelayBadge(v.daysPending)}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white leading-tight">{v.name}</h4>
                    <span className="text-[10px] font-mono text-slate-500">{v.email}</span>
                  </div>
                  <div className="p-3 bg-steel-900/40 border border-steel-700/60 rounded-xl text-xs space-y-2">
                    <div>
                      <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block leading-none">Sector</span>
                      <span className="font-semibold text-slate-300 block mt-1.5">{v.sector}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block leading-none">Attached Documents</span>
                      <span className="font-semibold text-tata-light block mt-1.5">{v.docs.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-steel-700/60 flex space-x-3 w-full">
                  <button
                    onClick={() => handleReject('vendors', v.id, v.name)}
                    type="button"
                    className="flex-1 py-2 rounded-xl border border-red-500/25 bg-red-950/20 text-xs font-bold text-red-400 hover:bg-red-900 hover:text-white transition-colors focus:outline-none flex items-center justify-center"
                  >
                    <X className="w-4 h-4 mr-1.5" />
                    Decline
                  </button>
                  
                  <button
                    onClick={() => handleApprove('vendors', v.id, v.name)}
                    type="button"
                    className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-xs font-bold text-white transition-colors focus:outline-none flex items-center justify-center shadow-lg shadow-emerald-500/10"
                  >
                    <Check className="w-4 h-4 mr-1.5" />
                    Approve
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="md:col-span-2 py-12 text-center text-slate-400 text-sm bg-steel-800 border border-steel-700/60 rounded-2xl">
              No pending vendor registration requests.
            </div>
          )
        )}

        {/* PANEL: DEPT HEADS */}
        {activeTab === 'dept_heads' && (
          deptHeads.length > 0 ? (
            deptHeads.map((d) => (
              <div key={d.id} className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-steel-900 border border-steel-700 font-mono font-bold text-[10px] text-tata-gold">{d.id}</span>
                    {getDelayBadge(d.daysPending)}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white leading-tight">{d.name}</h4>
                    <span className="text-[10px] font-mono text-slate-500">{d.email}</span>
                  </div>
                  <div className="p-3 bg-steel-900/40 border border-steel-700/60 rounded-xl text-xs space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block leading-none">Department</span>
                        <span className="font-semibold text-slate-300 block mt-1.5">{d.dept}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block leading-none">Designation</span>
                        <span className="font-semibold text-slate-300 block mt-1.5">{d.designation}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block leading-none">Employee Verification files</span>
                      <span className="font-semibold text-tata-light block mt-1.5">{d.docs.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-steel-700/60 flex space-x-3 w-full">
                  <button
                    onClick={() => handleReject('dept_heads', d.id, d.name)}
                    type="button"
                    className="flex-1 py-2 rounded-xl border border-red-500/25 bg-red-950/20 text-xs font-bold text-red-400 hover:bg-red-900 hover:text-white transition-colors focus:outline-none flex items-center justify-center"
                  >
                    <X className="w-4 h-4 mr-1.5" />
                    Decline
                  </button>
                  <button
                    onClick={() => handleApprove('dept_heads', d.id, d.name)}
                    type="button"
                    className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-xs font-bold text-white transition-colors focus:outline-none flex items-center justify-center shadow-lg shadow-emerald-500/10"
                  >
                    <Check className="w-4 h-4 mr-1.5" />
                    Approve
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="md:col-span-2 py-12 text-center text-slate-400 text-sm bg-steel-800 border border-steel-700/60 rounded-2xl">
              No pending department head requests.
            </div>
          )
        )}

        {/* PANEL: ADMINS */}
        {activeTab === 'admins' && (
          admins.length > 0 ? (
            admins.map((a) => (
              <div key={a.id} className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-steel-900 border border-steel-700 font-mono font-bold text-[10px] text-tata-gold">{a.id}</span>
                    {getDelayBadge(a.daysPending)}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white leading-tight">{a.name}</h4>
                    <span className="text-[10px] font-mono text-slate-500">{a.email}</span>
                  </div>
                  <div className="p-3 bg-steel-900/40 border border-steel-700/60 rounded-xl text-xs space-y-2">
                    <div>
                      <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block leading-none">Designation</span>
                      <span className="font-semibold text-slate-300 block mt-1.5">{a.designation}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block leading-none">Onboarding Verification files</span>
                      <span className="font-semibold text-tata-light block mt-1.5">{a.docs.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-steel-700/60 flex space-x-3 w-full">
                  <button
                    onClick={() => handleReject('admins', a.id, a.name)}
                    type="button"
                    className="flex-1 py-2 rounded-xl border border-red-500/25 bg-red-950/20 text-xs font-bold text-red-400 hover:bg-red-900 hover:text-white transition-colors focus:outline-none flex items-center justify-center"
                  >
                    <X className="w-4 h-4 mr-1.5" />
                    Decline
                  </button>
                  <button
                    onClick={() => handleApprove('admins', a.id, a.name)}
                    type="button"
                    className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-xs font-bold text-white transition-colors focus:outline-none flex items-center justify-center shadow-lg shadow-emerald-500/10"
                  >
                    <Check className="w-4 h-4 mr-1.5" />
                    Approve
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="md:col-span-2 py-12 text-center text-slate-400 text-sm bg-steel-800 border border-steel-700/60 rounded-2xl">
              No pending admin activation requests.
            </div>
          )
        )}

      </div>

    </div>
  );
}
