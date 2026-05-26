/**
 * @fileoverview Admin global procurement tenders overview with cancel and deadline extension moderation tools.
 */

import { useState } from 'react';
import { Calendar, Trash2 } from 'lucide-react';
import DataTable from '../../components/common/DataTable';

export default function AdminTenders() {
  const [toast, setToast] = useState('');

  // Stateful tenders registry
  const [tenders, setTenders] = useState([
    { id: 'TEND-4890', title: '120 Ton Coated Steel Coils Procurement', dept: 'Raw Materials', budget: '₹50,00,000', deadline: '2026-06-15', status: 'Active' },
    { id: 'TEND-4752', title: 'High-Density Structural Packaging Material', dept: 'Packaging', budget: '₹15,00,000', deadline: '2026-06-20', status: 'Active' },
    { id: 'TEND-4498', title: 'Blast Furnace IT Infrastructure Upgrades', dept: 'IT & Services', budget: '₹95,00,000', deadline: '2026-06-30', status: 'Draft' },
    { id: 'TEND-4310', title: 'Jamshedpur Factory Civil Foundation', dept: 'Civil Works', budget: '₹34,00,000', deadline: '2026-04-15', status: 'Closed' },
  ]);

  const handleExtendDeadline = (id) => {
    setTenders(prev => prev.map(t => {
      if (t.id === id) {
        const parts = t.deadline.split('-');
        const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
        dateObj.setDate(dateObj.getDate() + 7);
        const newDeadline = dateObj.toISOString().split('T')[0];
        
        return { ...t, deadline: newDeadline };
      }
      return t;
    }));
    triggerToast(`Extended deadline for ${id} by 7 calendar days.`);
  };

  const handleCancelTender = (id) => {
    if (window.confirm(`Are you sure you want to permanently cancel Sourcing Tender ${id}?`)) {
      setTenders(prev => prev.map(t => t.id === id ? { ...t, status: 'Closed' } : t));
      triggerToast(`Cancelled Sourcing Tender: ${id}`);
    }
  };

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>;
      case 'Draft':
        return <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-slate-500/15 text-slate-400 border border-steel-600">Draft</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-red-500/10 text-red-400 border border-red-500/20">Closed</span>;
    }
  };

  const columns = [
    {
      key: 'id',
      label: 'Tender Ref',
      render: (val) => <span className="font-mono font-bold text-white">{val}</span>,
    },
    {
      key: 'title',
      label: 'Procurement Title / Department',
      render: (val, row) => (
        <div>
          <span className="block font-semibold text-slate-200">{val}</span>
          <span className="text-[10px] text-slate-500 font-mono">{row.dept}</span>
        </div>
      ),
    },
    {
      key: 'budget',
      label: 'Budget',
      render: (val) => <span className="font-semibold text-tata-gold">{val}</span>,
    },
    {
      key: 'deadline',
      label: 'Submission due',
      render: (val) => <span className="font-mono text-slate-300">{val}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => getStatusBadge(val),
    },
    {
      key: 'actions',
      label: 'Administrative Moderation',
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          {row.status === 'Active' && (
            <>
              <button
                onClick={() => handleExtendDeadline(row.id)}
                type="button"
                className="py-1 px-2.5 rounded bg-steel-700 hover:bg-steel-600 text-[10px] font-bold text-slate-300 hover:text-white border border-steel-600 flex items-center space-x-1 transition-all focus:outline-none"
              >
                <Calendar className="w-3.5 h-3.5 text-tata-gold" />
                <span>Extend Due (+7d)</span>
              </button>
              
              <button
                onClick={() => handleCancelTender(row.id)}
                type="button"
                className="py-1 px-2.5 rounded bg-red-950 hover:bg-red-900 text-[10px] font-bold text-red-300 border border-red-500/20 flex items-center space-x-1 transition-all focus:outline-none"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>
            </>
          )}
          {row.status === 'Draft' && (
            <span className="text-xs text-slate-500 font-medium">Pending Dept Head Publish</span>
          )}
          {row.status === 'Closed' && (
            <span className="text-xs text-slate-500 font-medium">Schedule Closed</span>
          )}
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
          Procurement Tenders Oversight
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-normal">
          Monitor all cross-departmental tenders, log extension timelines, and manage active cancellation reviews.
        </p>
      </div>

      {toast && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold rounded-xl animate-fadeIn">
          ✓ {toast}
        </div>
      )}

      {/* Main DataTable panel */}
      <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl">
        <DataTable
          columns={columns}
          data={tenders}
          emptyMessage="No organizational tenders found."
        />
      </div>

    </div>
  );
}
