/**
 * @fileoverview Admin global bids monitoring panel featuring flag controls and suspicious bid warnings.
 */

import { useState } from 'react';
import { ShieldAlert, Flag, CheckCircle } from 'lucide-react';
import DataTable from '../../components/common/DataTable';

export default function AdminBids() {
  const [toast, setToast] = useState('');

  // Stateful bids listing
  const [bids, setBids] = useState([
    { id: 'BID-9021', tenderId: 'TEND-4890', vendor: 'Bhartia Steel Fabrications Ltd', price: '₹48,00,000', status: 'Under Review', flagged: false, alert: null },
    { id: 'BID-9022', tenderId: 'TEND-4890', vendor: 'Standard Sourcing & Logistics', price: '₹44,00,000', status: 'Under Review', flagged: false, alert: null },
    { id: 'BID-9023', tenderId: 'TEND-4890', vendor: 'Jamshedpur Packaging Corp', price: '₹75,00,000', status: 'Under Review', flagged: true, alert: 'High Outlier (Exceeds lowest bid by 70%)' },
    { id: 'BID-8910', tenderId: 'TEND-4752', vendor: 'Tata Colors Packaging Corp', price: '₹14,50,000', status: 'Accepted', flagged: false, alert: null },
  ]);

  const handleToggleFlag = (id, currentFlagged) => {
    setBids(prev => prev.map(b => b.id === id ? { ...b, flagged: !currentFlagged, alert: !currentFlagged ? 'Manually Flagged by Admin' : null } : b));
    triggerToast(currentFlagged ? `Cleared security flag for bid: ${id}` : `Flagged bid ${id} for audit investigation.`);
  };

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const getStatusBadge = (status) => {
    return status === 'Accepted'
      ? <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Accepted</span>
      : <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20">Under Review</span>;
  };

  const columns = [
    {
      key: 'id',
      label: 'Bid Ref',
      render: (val) => <span className="font-mono font-bold text-black">{val}</span>,
    },
    {
      key: 'vendor',
      label: 'Vendor Partner / Tender Ref',
      render: (val, row) => (
        <div>
          <span className="block font-semibold text-slate-700">{val}</span>
          <span className="text-[10px] text-slate-500 font-mono">Tender ID: {row.tenderId}</span>
        </div>
      ),
    },
    {
      key: 'price',
      label: 'Proposed Price',
      render: (val) => <span className="font-semibold text-black">{val}</span>,
    },
    {
      key: 'alert',
      label: 'Security Warnings',
      render: (val, row) => (
        row.flagged ? (
          <div className="flex items-center text-xs text-red-400 space-x-1 font-medium bg-red-950/20 border border-red-500/20 px-2 py-1 rounded-lg">
            <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate max-w-[150px]">{val || 'Investigating'}</span>
          </div>
        ) : (
          <span className="text-xs text-slate-500 font-normal">✓ Clean Pass</span>
        )
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => getStatusBadge(val),
    },
    {
      key: 'actions',
      label: 'Moderation',
      render: (_, row) => (
        <button
          onClick={() => handleToggleFlag(row.id, row.flagged)}
          type="button"
          className={`py-1 px-2.5 rounded text-[10px] font-bold border transition-all focus:outline-none flex items-center space-x-1 ${row.flagged
            ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20'
            : 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20'
            }`}
        >
          {row.flagged ? <CheckCircle className="w-3.5 h-3.5" /> : <Flag className="w-3.5 h-3.5" />}
          <span>{row.flagged ? 'Clear Alert' : 'Flag Bid'}</span>
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6 font-body">

      {/* Page Header */}
      <div className="border-b border-steel-700/60 pb-5">
        <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">SUPER ADMIN METRICS</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
          Bidding Safety & Oversight
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-normal">
          Track commercial bid details, audit price outliers, flag suspicious proposals, and manage compliance investigations.
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
          data={bids}
          emptyMessage="No bids found."
        />
      </div>

    </div>
  );
}
