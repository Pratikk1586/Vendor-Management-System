/**
 * @fileoverview Admin master user directory showing combined roles (Vendors, Dept Heads, Admins) and bulk action bars.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import Tabs from '../../components/common/Tabs';
import DataTable from '../../components/common/DataTable';
import SearchInput from '../../components/common/SearchInput';

export default function AdminMembers() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  // Stateful members directory
  const [members, setMembers] = useState([
    { id: 'MEM-01', name: 'Bhartia Steel Fabrications Ltd', email: 'ramesh@bhartiasteel.co.in', role: 'vendor', status: 'Active' },
    { id: 'MEM-02', name: 'Dr. Suresh Sen', email: 'suresh@tatasteel.com', role: 'dept_head', status: 'Active' },
    { id: 'MEM-03', name: 'Aditya Birla Packaging', email: 'admin@birlapack.co.in', role: 'vendor', status: 'Pending' },
    { id: 'MEM-04', name: 'Rohan Sharma', email: 'rohan@tatasteel.com', role: 'hr_admin', status: 'Active' },
    { id: 'MEM-05', name: 'Arvind Jha', email: 'arvind@tatasteel.com', role: 'dept_head', status: 'Suspended' },
  ]);

  const tabs = [
    { id: 'ALL', label: 'All Members', count: members.length },
    { id: 'vendor', label: 'Vendors Only', count: members.filter(m => m.role === 'vendor').length },
    { id: 'dept_head', label: 'Department Heads', count: members.filter(m => m.role === 'dept_head').length },
    { id: 'hr_admin', label: 'HR Administrators', count: members.filter(m => m.role === 'hr_admin').length },
  ];

  const handleSelectRow = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBulkActivate = () => {
    setMembers(prev => prev.map(m => selectedIds.includes(m.id) ? { ...m, status: 'Active' } : m));
    setSelectedIds([]);
  };

  const handleBulkSuspend = () => {
    setMembers(prev => prev.map(m => selectedIds.includes(m.id) ? { ...m, status: 'Suspended' } : m));
    setSelectedIds([]);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>;
      case 'Pending':
        return <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20">Pending</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-red-500/10 text-red-300 border border-red-500/20">Suspended</span>;
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'vendor':
        return <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-tata-blue/10 text-tata-light border border-tata-blue/20">Vendor</span>;
      case 'dept_head':
        return <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Dept Head</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">HR Admin</span>;
    }
  };

  const columns = [
    {
      key: 'select',
      label: '',
      render: (_, row) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(row.id)}
          onChange={() => handleSelectRow(row.id)}
          className="h-4 w-4 rounded bg-steel-900 border-steel-700 text-tata-blue focus:ring-offset-0 focus:outline-none"
        />
      ),
    },
    {
      key: 'id',
      label: 'ID Ref',
      render: (val) => <span className="font-mono font-bold text-gray-500">{val}</span>,
    },
    {
      key: 'name',
      label: 'Profile Details',
      render: (val, row) => (
        <div>
          <span className="block font-semibold text-balck">{val}</span>
          <span className="text-[10px] text-slate-500 font-mono">{row.email}</span>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role Tier',
      render: (val) => getRoleBadge(val),
    },
    {
      key: 'status',
      label: 'Account Status',
      render: (val) => getStatusBadge(val),
    },
    {
      key: 'actions',
      label: 'Operations',
      render: (_, row) => (
        <button
          onClick={() => navigate(`/admin/members/${row.id}`)}
          type="button"
          className="py-1 px-2.5 rounded bg-steel-700 hover:bg-tata-blue/20 text-[11px] font-bold text-slate-300 hover:text-black border border-steel-600 hover:border-tata-blue/45 flex items-center space-x-1 transition-all focus:outline-none"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Manage Profile</span>
        </button>
      ),
    },
  ];

  // Filters application
  const filteredMembers = members.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'ALL' || m.role === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6 font-body">

      {/* Header */}
      <div className="border-b border-steel-700/60 pb-5">
        <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">MEMBERSHIP DIRECTORY</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
          Master User Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-normal">
          Inspect combined vendor profiles, departmental leaders, and admin workspace accounts.
        </p>
      </div>

      {/* Sourcing Search filter */}
      <div className="p-4 rounded-2xl bg-steel-800 border border-steel-700/60 flex items-center justify-between gap-4">
        <div className="max-w-md w-full">
          <SearchInput onSearch={setSearchTerm} placeholder="Search members by name or email..." />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-steel-800/40 p-1 border border-steel-700/50 rounded-xl">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="p-3 bg-steel-950 border border-steel-700 text-slate-600 rounded-xl flex items-center justify-between text-xs font-semibold animate-fadeIn">
          <span>{selectedIds.length} members selected for bulk operations:</span>
          <div className="flex space-x-2">
            <button
              onClick={handleBulkActivate}
              type="button"
              className="py-1 px-3 rounded bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-colors focus:outline-none"
            >
              Bulk Activate
            </button>
            <button
              onClick={handleBulkSuspend}
              type="button"
              className="py-1 px-3 rounded bg-red-500 text-white font-bold hover:bg-red-600 transition-colors focus:outline-none"
            >
              Bulk Suspend
            </button>
          </div>
        </div>
      )}

      {/* Members directory main table */}
      <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl">
        <DataTable
          columns={columns}
          data={filteredMembers}
          emptyMessage="No members match the query filters."
        />
      </div>

    </div>
  );
}
