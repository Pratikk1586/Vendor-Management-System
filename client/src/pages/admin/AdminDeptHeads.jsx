/**
 * @fileoverview Admin Department Heads directory with active statistics and creation modals.
 */

import { useState } from 'react';
import { UserCheck, Plus, PlusCircle } from 'lucide-react';
import DataTable from '../../components/common/DataTable';

export default function AdminDeptHeads() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState('');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState('Raw Materials');
  const [designation, setDesignation] = useState('Sourcing Manager');

  const [deptHeads, setDeptHeads] = useState([
    { id: 'DH-01', name: 'Dr. Suresh Sen', email: 'suresh@tatasteel.com', dept: 'Raw Materials', designation: 'Sourcing Manager', status: 'Active' },
    { id: 'DH-02', name: 'Alok Prasanna', email: 'alok@tatasteel.com', dept: 'Logistics', designation: 'Logistics Director', status: 'Active' },
    { id: 'DH-03', name: 'Ankita Verma', email: 'ankita@tatasteel.com', dept: 'IT & Services', designation: 'IT Director', status: 'Pending' },
  ]);

  const handleCreateDeptHead = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    const newDH = {
      id: `DH-0${deptHeads.length + 1}`,
      name,
      email,
      dept,
      designation,
      status: 'Active',
    };

    setDeptHeads(prev => [...prev, newDH]);
    setModalOpen(false);
    triggerToast(`Directly activated Department Head profile for: ${name}`);

    // Reset inputs
    setName('');
    setEmail('');
  };

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const columns = [
    {
      key: 'name',
      label: 'Employee Details',
      render: (val, row) => (
        <div>
          <span className="block font-semibold text-slate-200">{val}</span>
          <span className="text-[10px] text-slate-500 font-mono">{row.email}</span>
        </div>
      ),
    },
    {
      key: 'dept',
      label: 'Department',
    },
    {
      key: 'designation',
      label: 'Designation Title',
    },
    {
      key: 'status',
      label: 'Account Status',
      render: (val) => (
        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
          val === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
        }`}>
          {val}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 font-body">
      
      {/* Header */}
      <div className="border-b border-steel-700/60 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">SUPER ADMIN METRICS</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Department Heads Index
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-normal">
            Monitor all sourcing department leaders, coordinate active directories, and provision direct credentials.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          type="button"
          className="sm:self-end flex items-center justify-center py-2.5 px-5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-tata-blue to-tata-light text-white shadow-lg hover:shadow-tata-blue/30 hover:scale-102 transition-all focus:outline-none"
        >
          <Plus className="w-4 h-4 mr-2" />
          Activate Dept Head
        </button>
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
          data={deptHeads}
          emptyMessage="No department heads found."
        />
      </div>

      {/* Provision Direct Modal popup */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 font-body animate-fadeIn">
          <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-6 shadow-2xl max-w-md w-full space-y-4">
            
            <div className="flex items-center space-x-2 border-b border-steel-700 pb-3">
              <UserCheck className="w-5 h-5 text-tata-gold flex-shrink-0" />
              <h3 className="text-base font-bold text-white uppercase tracking-wider">Provision Dept Head Profile</h3>
            </div>

            <form onSubmit={handleCreateDeptHead} className="space-y-4">
              <div>
                <label htmlFor="dh-name" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Full Name *
                </label>
                <input
                  id="dh-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alok Prasanna"
                  className="block w-full px-4 py-2 rounded-xl bg-steel-900 border border-steel-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue"
                />
              </div>

              <div>
                <label htmlFor="dh-email" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Official Email *
                </label>
                <input
                  id="dh-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. name@tatasteel.com"
                  className="block w-full px-4 py-2 rounded-xl bg-steel-900 border border-steel-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dh-dept" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Department *
                  </label>
                  <select
                    id="dh-dept"
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    className="block w-full px-3 py-2 rounded-xl bg-steel-900 border border-steel-700 text-xs sm:text-sm text-white focus:outline-none focus:border-tata-blue"
                  >
                    <option value="Raw Materials">Raw Materials</option>
                    <option value="Packaging">Packaging</option>
                    <option value="Logistics">Logistics</option>
                    <option value="IT & Services">IT & Services</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="dh-des" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Designation *
                  </label>
                  <input
                    id="dh-des"
                    type="text"
                    required
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="block w-full px-3 py-2 rounded-xl bg-steel-900 border border-steel-700 text-white text-xs sm:text-sm focus:outline-none focus:border-tata-blue"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-steel-700 flex items-center justify-end space-x-3.5">
                <button
                  onClick={() => setModalOpen(false)}
                  type="button"
                  className="py-2 px-4 rounded-xl border border-steel-600 bg-steel-800 text-xs font-bold text-slate-300 hover:text-white transition-colors focus:outline-none"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  className="py-2 px-5 rounded-xl bg-gradient-to-r from-tata-blue to-tata-light text-xs font-bold text-white transition-all focus:outline-none flex items-center"
                >
                  <PlusCircle className="w-4.5 h-4.5 mr-1.5" />
                  Activate profile
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
