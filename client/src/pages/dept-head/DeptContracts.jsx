/**
 * @fileoverview Sourcing department contracts monitoring page, supporting milestone updates and post-contract score cards.
 */

import { useState } from 'react';
import { Calendar, CheckSquare, ShieldCheck, Star } from 'lucide-react';

export default function DeptContracts() {
  const [selectedContract, setSelectedContract] = useState(null);
  const [rating, setRating] = useState(8);
  const [ratingNotes, setRatingNotes] = useState('');
  const [ratedStatus, setRatedStatus] = useState(false);

  // Stateful list of contracts
  const [contracts, setContracts] = useState([
    {
      id: 'CON-9002',
      vendor: 'Bhartia Steel Fabrications Ltd',
      title: 'High-Density Structural Packaging Material Contract',
      value: '₹14,50,000',
      signedDate: '2026-05-19',
      dueDate: '2026-09-30',
      status: 'Active',
      milestones: [
        { label: 'Milestone 1: Design specs approval', date: '2026-05-30', complete: true },
        { label: 'Milestone 2: Initial batch shipment (20 Tons)', date: '2026-07-15', complete: false },
        { label: 'Milestone 3: Final batch shipment (30 Tons)', date: '2026-09-15', complete: false },
      ],
      performanceRating: null,
    },
    {
      id: 'CON-8840',
      vendor: 'Tata Colors Packaging Corp',
      title: 'Jamshedpur Factory Civil Foundation Contract',
      value: '₹34,00,000',
      signedDate: '2025-11-10',
      dueDate: '2026-04-15',
      status: 'Completed',
      milestones: [
        { label: 'Site preparation & soil excavation', date: '2025-11-20', complete: true },
        { label: 'Concrete pouring & foundation curing', date: '2026-02-15', complete: true },
        { label: 'Final site clearing & safety audit sign-off', date: '2026-04-10', complete: true },
      ],
      performanceRating: 9,
    },
  ]);

  const handleToggleMilestone = (contractIdx, milestoneIdx) => {
    setContracts(prev => {
      const next = [...prev];
      const targetMilestone = next[contractIdx].milestones[milestoneIdx];
      targetMilestone.complete = !targetMilestone.complete;
      return next;
    });
  };

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    setRatedStatus(true);
    setContracts(prev => prev.map(c => c.id === selectedContract.id ? { ...c, performanceRating: rating } : c));
  };

  const handleSelectContract = (contract) => {
    setSelectedContract(contract);
    setRating(contract.performanceRating || 8);
    setRatingNotes('');
    setRatedStatus(!!contract.performanceRating);
  };

  return (
    <div className="space-y-6 font-body">
      
      {/* Page Header */}
      <div className="border-b border-steel-700/60 pb-5">
        <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">DIVISION CONTRACTS MONITOR</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          Active Procurement Contracts
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-normal">
          Track active supplier contract parameters, check milestone timelines, and file performance score cards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Contracts Register List */}
        <div className={selectedContract ? 'lg:col-span-2 space-y-4' : 'lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-5'}>
          {contracts.map((contract) => (
            <div
              key={contract.id}
              onClick={() => handleSelectContract(contract)}
              className={`p-5 bg-steel-800 border rounded-2xl shadow-xl hover:border-tata-blue/45 cursor-pointer flex flex-col justify-between transition-all duration-150 ${
                selectedContract?.id === contract.id ? 'border-tata-blue ring-1 ring-tata-blue/20' : 'border-steel-700/60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-steel-900 border border-steel-700 font-mono font-bold text-[10px] text-tata-gold">
                    {contract.id}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                    contract.status === 'Active' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-slate-500/15 text-slate-400 border border-steel-600'
                  }`}>
                    {contract.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug">{contract.title}</h3>
                  <span className="text-[10px] text-slate-500 font-mono block mt-1">Vendor Partner: {contract.vendor}</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 p-3 bg-steel-900/30 border border-steel-700/50 rounded-xl text-xs">
                  <div>
                    <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500">Contract Value</span>
                    <span className="block font-bold text-white mt-1">{contract.value}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500">Signed Date</span>
                    <span className="block font-semibold text-slate-300 mt-1">{contract.signedDate}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-steel-700/60 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>Completion Due: <span className="font-semibold text-slate-300">{contract.dueDate}</span></span>
                </div>
                {contract.performanceRating && (
                  <span className="text-[10px] uppercase font-bold bg-tata-gold/15 text-tata-gold border border-tata-gold/25 px-1.5 py-0.5 rounded flex items-center space-x-0.5">
                    <Star className="w-3 h-3 text-tata-gold fill-tata-gold" />
                    <span>Rating: {contract.performanceRating}/10</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Milestones checklist and feedback rating cards */}
        {selectedContract && (
          <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl space-y-6 h-fit animate-slideRight">
            
            <div className="border-b border-steel-700 pb-3 flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">MILESTONE AUDIT & FEEDBACK</span>
                <h3 className="text-sm font-bold text-white mt-1 leading-none">{selectedContract.id} Review</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedContract(null)}
                className="text-xs text-slate-400 hover:text-white font-bold focus:outline-none"
              >
                Close detail
              </button>
            </div>

            {/* Milestones checklist section */}
            <div className="space-y-3">
              <h4 className="text-[10px] uppercase font-mono tracking-widest text-slate-500">Authorized Milestones Checklist</h4>
              <div className="space-y-2">
                {selectedContract.milestones.map((milestone, milestoneIdx) => {
                  const contractIdx = contracts.findIndex(c => c.id === selectedContract.id);
                  return (
                    <div
                      key={milestoneIdx}
                      className={`p-3 rounded-xl border flex items-start space-x-3.5 transition-colors ${
                        milestone.complete
                          ? 'bg-emerald-500/5 border-emerald-500/25 text-slate-300'
                          : 'bg-steel-900/30 border-steel-700 text-slate-400 hover:bg-steel-900/50'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleToggleMilestone(contractIdx, milestoneIdx)}
                        className="mt-0.5 flex-shrink-0 focus:outline-none"
                      >
                        {milestone.complete ? (
                          <CheckSquare className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <div className="w-4 h-4 rounded border border-steel-500 flex items-center justify-center text-transparent text-[8px] font-bold">✓</div>
                        )}
                      </button>

                      <div className="space-y-1">
                        <h5 className={`text-xs font-semibold ${milestone.complete ? 'text-white' : 'text-slate-300'}`}>{milestone.label}</h5>
                        <span className="text-[10px] text-slate-500 font-mono block">Target: {milestone.date}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Performance Review section */}
            <div className="pt-4 border-t border-steel-700/60 space-y-3">
              <h4 className="text-[10px] uppercase font-mono tracking-widest text-slate-500">Post-Contract Performance Score Card</h4>
              
              {ratedStatus ? (
                <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center space-x-2">
                  <ShieldCheck className="w-4.5 h-4.5 flex-shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider">✓ Evaluation Submitted Successfully</span>
                </div>
              ) : (
                <form onSubmit={handleRatingSubmit} className="space-y-3.5">
                  <div>
                    <label htmlFor="rating-sel" className="block text-[10px] uppercase font-mono tracking-widest text-slate-400 mb-1.5">
                      Supplier Performance Rating (0 - 10) *
                    </label>
                    <select
                      id="rating-sel"
                      required
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="block w-full px-3 py-2 rounded-lg bg-steel-900 border border-steel-700 text-xs sm:text-sm text-white focus:outline-none focus:border-tata-blue"
                    >
                      {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(n => (
                        <option key={n} value={n}>{n} - {n >= 8 ? 'Excellent' : n >= 6 ? 'Average' : 'Needs Work'}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="notes-area" className="block text-[10px] uppercase font-mono tracking-widest text-slate-400 mb-1.5">
                      Sourcing Comments Review *
                    </label>
                    <textarea
                      id="notes-area"
                      required
                      value={ratingNotes}
                      onChange={(e) => setRatingNotes(e.target.value)}
                      rows={2.5}
                      placeholder="Comment on material quality, lead compliance, communication punctuality..."
                      className="block w-full px-3 py-2 rounded-lg bg-steel-900 border border-steel-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-tata-blue resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-tata-blue hover:bg-tata-light text-xs font-bold text-white transition-colors focus:outline-none"
                  >
                    Submit Performance Rating
                  </button>
                </form>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
