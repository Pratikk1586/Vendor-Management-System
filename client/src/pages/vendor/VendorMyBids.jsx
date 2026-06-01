/**
 * @fileoverview Vendor Submitted Bids listing page utilizing the unified DataTable component.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import DataTable from '../../components/common/DataTable';

export default function VendorMyBids() {
  const navigate = useNavigate();
  const [loading] = useState(false);

  const mockBids = [
    { id: 'BID-9021', tenderId: 'TEND-4890', title: '120 Ton Coated Steel Coils', dept: 'Raw Materials', price: '₹48,00,000', status: 'Under Review', date: '2026-05-20' },
    { id: 'BID-8910', tenderId: 'TEND-4752', title: 'High-Density Structural Packaging', dept: 'Packaging', price: '₹14,50,000', status: 'Accepted', date: '2026-05-18' },
    { id: 'BID-8877', tenderId: 'TEND-4620', title: 'Jamshedpur Factory Logistics Route', dept: 'Logistics', price: '₹22,00,000', status: 'Rejected', date: '2026-05-10' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted':
        return <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-green-500/10 text-green-400 border border-green-500/20">Accepted</span>;
      case 'Rejected':
        return <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-red-500/10 text-red-400 border border-red-500/20">Rejected</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20">Under Review</span>;
    }
  };

  const columns = [
    {
      key: 'id',
      label: 'Bid Ref',
      render: (val) => <span className="font-mono font-bold text-gray-800">{val}</span>,
    },
    {
      key: 'title',
      label: 'Sourcing Opportunity / Dept',
      render: (val, row) => (
        <div>
          <span className="block font-semibold text-slate-800">{val}</span>
          <span className="text-[10px] text-slate-500 font-mono">{row.dept} | Ref: {row.tenderId}</span>
        </div>
      ),
    },
    {
      key: 'price',
      label: 'Proposed Price',
      render: (val) => <span className="font-semibold text-gray-800">{val}</span>,
    },
    {
      key: 'date',
      label: 'Submission Date',
    },
    {
      key: 'status',
      label: 'Evaluation Status',
      render: (val) => getStatusBadge(val),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <button
          onClick={() => navigate(`/vendor/bids/${row.id}`)}
          type="button"
          className="py-1 px-2.5 rounded bg-white hover:bg-slate-400 text-[11px] font-bold text-black hover:text-white border border-steel-600 hover:border-tata-blue/45 flex items-center space-x-1 transition-all focus:outline-none"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Inspect</span>
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6 font-body">

      {/* Page Header */}
      <div className="border-b border-steel-700/60 pb-5">
        <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">PROPOSAL PORTFOLIO</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
          My Submitted Bids
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-normal">
          View evaluation logs, auditor remarks, and commercial rankings for submitted bids.
        </p>
      </div>

      {/* DataTable Container */}
      <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl">
        <DataTable
          columns={columns}
          data={mockBids}
          loading={loading}
          emptyMessage="No submitted proposals found."
        />
      </div>

    </div>
  );
}
