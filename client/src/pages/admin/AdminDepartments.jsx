/**
 * @fileoverview Admin organizational departments registry displaying segments cards and manager assignment tools.
 */

import { useState } from 'react';
import { UserCheck } from 'lucide-react';

export default function AdminDepartments() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);
  const [managerName, setManagerName] = useState('');
  const [toast, setToast] = useState('');

  // Stateful department segments list
  const [departments, setDepartments] = useState([
    { id: 'dept-raw-materials', code: 'RAW_MAT', name: 'Raw Materials Sourcing', category: 'procurement', head: 'Dr. Suresh Sen', budget: '₹1.2Cr' },
    { id: 'dept-packaging', code: 'PKG', name: 'Divisional Packaging', category: 'procurement', head: 'Ankita Verma', budget: '₹45L' },
    { id: 'dept-logistics', code: 'LOG', name: 'Factory Logistics', category: 'operations', head: 'Alok Prasanna', budget: '₹75L' },
    { id: 'dept-it-services', code: 'IT_SVC', name: 'IT Infrastructure & Services', category: 'technology', head: 'Unassigned', budget: '₹95L' },
    { id: 'dept-civil-works', code: 'CIVIL', name: 'Infrastructure Civil Works', category: 'infrastructure', head: 'Unassigned', budget: '₹40L' },
    { id: 'dept-electrical', code: 'ELEC', name: 'Substation Electrical Works', category: 'infrastructure', head: 'Unassigned', budget: '₹22L' },
  ]);

  const handleAssignHeadClick = (dept) => {
    setSelectedDept(dept);
    setManagerName(dept.head === 'Unassigned' ? '' : dept.head);
    setModalOpen(true);
  };

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    if (!managerName) return;

    setDepartments(prev => prev.map(d => d.id === selectedDept.id ? { ...d, head: managerName } : d));
    setModalOpen(false);
    triggerToast(`Assigned ${managerName} as Head of ${selectedDept.name}`);
  };

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  return (
    <div className="space-y-6 font-body">
      
      {/* Page Header */}
      <div className="border-b border-steel-700/60 pb-5">
        <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">SUPER ADMIN OVERVIEW</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          Divisional Segments Index
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-normal">
          Manage organizational segments, assign divisional directors, and review procurement budgets.
        </p>
      </div>

      {toast && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold rounded-xl animate-fadeIn">
          ✓ {toast}
        </div>
      )}

      {/* Grid of Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="bg-steel-800 border border-steel-700/60 hover:border-tata-blue/40 rounded-2xl p-5 shadow-xl flex flex-col justify-between group transition-colors duration-150"
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-steel-900 border border-steel-700 font-mono font-bold text-[10px] text-tata-gold">
                  {dept.code}
                </span>
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 font-bold">
                  {dept.category}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white leading-snug group-hover:text-tata-light transition-colors">
                  {dept.name}
                </h3>
              </div>

              <div className="p-3 bg-steel-900/35 border border-steel-700/50 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Divisional Head:</span>
                  <span className={`font-semibold ${dept.head === 'Unassigned' ? 'text-orange-400' : 'text-slate-300'}`}>
                    {dept.head}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Target Budget:</span>
                  <span className="font-mono font-bold text-tata-gold">{dept.budget}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-steel-700/60 flex items-center justify-end">
              <button
                onClick={() => handleAssignHeadClick(dept)}
                type="button"
                className="py-1.5 px-3 rounded-lg bg-steel-700 hover:bg-tata-blue/20 text-xs font-bold text-slate-300 hover:text-white border border-steel-600 hover:border-tata-blue/45 flex items-center space-x-1.5 transition-all focus:outline-none"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Assign Head</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Assign Head Modal popup */}
      {modalOpen && selectedDept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 font-body animate-fadeIn">
          <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-6 shadow-2xl max-w-md w-full space-y-4">
            
            <div className="flex items-center space-x-2 border-b border-steel-700 pb-3">
              <UserCheck className="w-5 h-5 text-tata-gold flex-shrink-0" />
              <h3 className="text-base font-bold text-white uppercase tracking-wider">Assign Departmental Head</h3>
            </div>

            <form onSubmit={handleAssignSubmit} className="space-y-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block leading-none">Target Division</span>
                <span className="text-sm font-bold text-white block mt-2">{selectedDept.name} ({selectedDept.code})</span>
              </div>

              <div>
                <label htmlFor="assignee-select" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Select Registered Sourcing Manager *
                </label>
                <select
                  id="assignee-select"
                  required
                  value={managerName}
                  onChange={(e) => setManagerName(e.target.value)}
                  className="block w-full px-4 py-2.5 rounded-xl bg-steel-900 border border-steel-700 text-white text-sm focus:outline-none focus:border-tata-blue"
                >
                  <option value="" disabled>-- Select Officer --</option>
                  <option value="Dr. Suresh Sen">Dr. Suresh Sen (Raw Materials)</option>
                  <option value="Alok Prasanna">Alok Prasanna (Logistics)</option>
                  <option value="Ankita Verma">Ankita Verma (IT & Services)</option>
                  <option value="Ritesh Pandey">Ritesh Pandey (Packaging)</option>
                  <option value="Arvind Jha">Arvind Jha (Civil Works)</option>
                </select>
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
                  className="py-2 px-5 rounded-xl bg-gradient-to-r from-tata-blue to-tata-light text-xs font-bold text-white transition-all focus:outline-none"
                >
                  Confirm Assignment
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
