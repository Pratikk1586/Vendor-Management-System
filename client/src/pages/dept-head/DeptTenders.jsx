/**
 * @fileoverview Sourcing department tenders index displaying live, closed, and draft procurement schedules.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye } from 'lucide-react';
import DataTable from '../../components/common/DataTable';

export default function DeptTenders() {
  const navigate = useNavigate();
  const [loading] = useState(false);

  const mockTenders = [
    { id: 'TEND-4890', title: '120 Ton Coated Steel Coils Procurement', budget: '₹50,00,000', deadline: '2026-06-15', status: 'Active', bidsCount: 3 },
    { id: 'TEND-4752', title: 'High-Density Structural Packaging Material', budget: '₹15,00,000', deadline: '2026-06-20', status: 'Active', bidsCount: 2 },
    { id: 'TEND-4498', title: 'Blast Furnace IT Infrastructure Upgrades', budget: '₹95,00,000', deadline: '2026-06-30', status: 'Draft', bidsCount: 0 },
    { id: 'TEND-4310', title: 'Jamshedpur Factory Civil Foundation', budget: '₹34,00,000', deadline: '2026-04-15', status: 'Closed', bidsCount: 5 },
  ];

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
      render: (val) => <span className="font-mono font-bold text-slate-700">{val}</span>,
    },
    {
      key: 'title',
      label: 'Procurement Title',
      render: (val) => <span className="font-semibold text-slate-400">{val}</span>,
    },
    {
      key: 'budget',
      label: 'Target Budget',
      render: (val) => <span className="font-semibold text-tata-gold">{val}</span>,
    },
    {
      key: 'deadline',
      label: 'Submission due',
    },
    {
      key: 'bidsCount',
      label: 'Bids Lodged',
      render: (val) => <span className="font-mono font-bold text-white">{val}</span>,
    },
    {
      key: 'status',
      label: 'Schedule Status',
      render: (val) => getStatusBadge(val),
    },
    {
      key: 'actions',
      label: 'Inspect Actions',
      render: (_, row) => (
        <button
          onClick={() => navigate(`/dept/tenders/${row.id}`)}
          type="button"
          className="py-1 px-2.5 rounded bg-steel-700 hover:bg-tata-blue/20 text-[11px] font-bold text-slate-300 hover:text-white border border-steel-600 hover:border-tata-blue/45 flex items-center space-x-1 transition-all focus:outline-none"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Spec</span>
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6 font-body">

      {/* Header with quick creation button */}
      <div className="border-b border-steel-700/60 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">DIVISION SCHEDULING</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Tender Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-normal">
            Author and publish procurement specifications, evaluate technical compliance, and monitor closing periods.
          </p>
        </div>

        <button
          onClick={() => navigate('/dept/tenders/create')}
          type="button"
          className="sm:self-end flex items-center justify-center py-2.5 px-5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-tata-blue to-tata-light text-white shadow-lg hover:shadow-tata-blue/30 hover:scale-102 transition-all focus:outline-none"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Sourcing Tender
        </button>
      </div>

      {/* Tenders DataTable Container */}
      <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl">
        <DataTable
          columns={columns}
          data={mockTenders}
          loading={loading}
          emptyMessage="No departmental tenders found."
        />
      </div>

    </div>
  );
}
