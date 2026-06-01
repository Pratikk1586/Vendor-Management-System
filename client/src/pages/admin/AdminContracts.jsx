/**
 * @fileoverview Admin global contracts overview displaying active registers and pending co-signing cards.
 */

import { useState } from 'react';
import { ShieldCheck, Clock } from 'lucide-react';
import DataTable from '../../components/common/DataTable';

export default function AdminContracts() {
  const [toast, setToast] = useState('');

  // Stateful pending super admin review contract
  const [pendingContract, setPendingContract] = useState({
    id: 'CON-9002',
    vendor: 'Bhartia Steel Fabrications Ltd',
    title: 'High-Density Structural Packaging Material Contract',
    value: '₹14,50,000',
    dueDate: '2026-09-30',
  });

  // Stateful contracts index
  const [contracts, setContracts] = useState([
    { id: 'CON-8840', vendor: 'Tata Colors Packaging Corp', title: 'Jamshedpur Factory Civil Foundation Contract', value: '₹34,00,000', signedDate: '2025-11-10', dueDate: '2026-04-15', status: 'Completed' },
  ]);

  const handleCoSign = () => {
    const newContract = {
      id: pendingContract.id,
      vendor: pendingContract.vendor,
      title: pendingContract.title,
      value: pendingContract.value,
      signedDate: new Date().toISOString().split('T')[0],
      dueDate: pendingContract.dueDate,
      status: 'Active',
    };

    setContracts(prev => [newContract, ...prev]);
    setPendingContract(null);
    triggerToast(`Co-signed & Authorized Contract: ${newContract.id}`);
  };

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const getStatusBadge = (status) => {
    return status === 'Active'
      ? <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
      : <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-slate-500/10 text-slate-400 border border-steel-600">Completed</span>;
  };

  const columns = [
    {
      key: 'id',
      label: 'Contract Ref',
      render: (val) => <span className="font-mono font-bold text-black">{val}</span>,
    },
    {
      key: 'title',
      label: 'Contract Sourcing Details / Partner',
      render: (val, row) => (
        <div>
          <span className="block font-semibold text-slate-700">{val}</span>
          <span className="text-[10px] text-slate-500 font-mono">Vendor: {row.vendor}</span>
        </div>
      ),
    },
    {
      key: 'value',
      label: 'Contract Value',
      render: (val) => <span className="font-semibold text-tata-gold">{val}</span>,
    },
    {
      key: 'signedDate',
      label: 'Signed Date',
    },
    {
      key: 'dueDate',
      label: 'Due Date',
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => getStatusBadge(val),
    },
  ];

  return (
    <div className="space-y-6 font-body">

      {/* Page Header */}
      <div className="border-b border-steel-700/60 pb-5">
        <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">SUPER ADMIN METRICS</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
          Contracts Oversight & Ledger
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-normal">
          Review department awarded contract parameters, execute final super-admin co-signatures, and monitor milestones.
        </p>
      </div>

      {toast && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold rounded-xl animate-fadeIn">
          ✓ {toast}
        </div>
      )}

      {/* Contract Pending Co-signature Card */}
      {pendingContract && (
        <div className="p-5 bg-steel-900 border border-tata-gold/20 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5 animate-fadeIn">
          <div className="space-y-3.5">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded bg-tata-gold/15 text-tata-gold border border-tata-gold/20 font-mono font-bold text-[10px]">{pendingContract.id}</span>
              <span className="text-[9px] uppercase font-mono tracking-widest bg-orange-500/10 text-orange-400 border border-orange-500/20 px-1.5 py-0.5 rounded flex items-center"><Clock className="w-3 h-3 mr-1" />Pending Co-Signature</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">{pendingContract.title}</h3>
              <p className="text-xs text-slate-400 mt-1 font-semibold">Awarded to Partner: {pendingContract.vendor} | Value: <span className="text-tata-gold font-mono">{pendingContract.value}</span></p>
            </div>
          </div>

          <button
            onClick={handleCoSign}
            type="button"
            className="py-2.5 px-6 rounded-xl bg-tata-gold hover:bg-tata-amber text-xs sm:text-sm font-bold text-steel-900 shadow-lg shadow-tata-gold/10 flex items-center justify-center flex-shrink-0 transition-all focus:outline-none"
          >
            <ShieldCheck className="w-4.5 h-4.5 mr-2" />
            Co-Sign & Execute Contract
          </button>
        </div>
      )}

      {/* Main DataTable panel */}
      <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-tata-gold border-b border-steel-700 pb-2">
          Global Contracts Directory
        </h3>

        <DataTable
          columns={columns}
          data={contracts}
          emptyMessage="No contracts signed yet."
        />
      </div>

    </div>
  );
}
