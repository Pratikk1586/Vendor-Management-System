/**
 * @fileoverview Admin system audit logs registry displaying searchable administrative records and operations logs.
 */

import { useState } from 'react';
import { Download, Clock, Calendar } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import SearchInput from '../../components/common/SearchInput';

export default function AdminAuditLog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState('');

  const mockLogs = [
    { id: 'LOG-3001', username: 'Super Admin Rohan', role: 'hr_admin', action: 'Co-signed and executed Contract CON-9002', date: '2026-05-25', time: '12:00:15', ip: '10.240.12.90' },
    { id: 'LOG-3002', username: 'Sourcing Manager Suresh', role: 'dept_head', action: 'Technical criteria weights modified for TEND-4890', date: '2026-05-25', time: '11:45:00', ip: '10.240.15.22' },
    { id: 'LOG-3003', username: 'Bhartia Steel MD Ramesh', role: 'vendor', action: 'Logged Bid Proposal BID-9021 for SGD-350 Coils', date: '2026-05-25', time: '11:15:30', ip: '10.240.80.45' },
    { id: 'LOG-3004', username: 'Super Admin Rohan', role: 'hr_admin', action: 'Directly provisioned Department Head profile for Ankita Verma', date: '2026-05-25', time: '10:00:10', ip: '10.240.12.90' },
  ];

  const handleExport = () => {
    triggerToast('Downloading system audit logs ledger as CSV...');
  };

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const columns = [
    {
      key: 'id',
      label: 'Log Ref',
      render: (val) => <span className="font-mono font-bold text-white">{val}</span>,
    },
    {
      key: 'username',
      label: 'Portal Session / Role',
      render: (val, row) => (
        <div>
          <span className="block font-semibold text-slate-200">{val}</span>
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold">{row.role}</span>
        </div>
      ),
    },
    {
      key: 'action',
      label: 'Administrative Operations Action',
      render: (val) => <span className="font-medium text-slate-300 leading-normal">{val}</span>,
    },
    {
      key: 'timestamp',
      label: 'Date & Time',
      render: (_, row) => (
        <div className="flex flex-col text-[10px] text-slate-500 font-mono">
          <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" />{row.date}</span>
          <span className="flex items-center mt-1"><Clock className="w-3 h-3 mr-1" />{row.time}</span>
        </div>
      ),
    },
    {
      key: 'ip',
      label: 'IP Address',
      render: (val) => <span className="font-mono text-slate-500 select-all">{val}</span>,
    },
  ];

  const filteredLogs = mockLogs.filter((log) => {
    return log.username.toLowerCase().includes(searchTerm.toLowerCase()) || log.action.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6 font-body">
      
      {/* Page Header */}
      <div className="border-b border-steel-700/60 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">COMPLIANCE REGISTER</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            System Audit Log
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-normal">
            Track real-time administrative operations, membership modifications, settings overrides, and bid submissions.
          </p>
        </div>

        <button
          onClick={handleExport}
          type="button"
          className="sm:self-end flex items-center justify-center py-2.5 px-5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-tata-blue to-tata-light text-white shadow-lg hover:shadow-tata-blue/30 hover:scale-102 transition-all focus:outline-none"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Audit Logs (CSV)
        </button>
      </div>

      {toast && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold rounded-xl animate-fadeIn">
          ✓ {toast}
        </div>
      )}

      {/* Sourcing Search filter */}
      <div className="p-4 rounded-2xl bg-steel-800 border border-steel-700/60 flex items-center justify-between gap-4">
        <div className="max-w-md w-full">
          <SearchInput onSearch={setSearchTerm} placeholder="Search logs by action or manager name..." />
        </div>
      </div>

      {/* Main DataTable panel */}
      <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl">
        <DataTable
          columns={columns}
          data={filteredLogs}
          emptyMessage="No system audit logs match the query filters."
        />
      </div>

    </div>
  );
}
