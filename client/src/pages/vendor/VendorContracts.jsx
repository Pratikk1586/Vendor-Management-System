/**
 * @fileoverview Vendor Contracts listing page with details inspection drawer/tabs for milestones and valuations.
 */

import { useState } from 'react';
import { Calendar, CheckSquare, ShieldAlert, ChevronRight } from 'lucide-react';

export default function VendorContracts() {
  const [selectedContract, setSelectedContract] = useState(null);

  const mockContracts = [
    {
      id: 'CON-9002',
      tenderId: 'TEND-4752',
      title: 'High-Density Structural Packaging Material Contract',
      dept: 'Packaging',
      value: '₹14,50,000',
      signedDate: '2026-05-19',
      completionDate: '2026-09-30',
      status: 'Active',
      milestones: [
        { label: 'Milestone 1: Design specs approval', date: '2026-05-30', complete: true },
        { label: 'Milestone 2: Initial batch shipment (20 Tons)', date: '2026-07-15', complete: false },
        { label: 'Milestone 3: Final batch shipment (30 Tons)', date: '2026-09-15', complete: false },
        { label: 'Milestone 4: Compliance audit & final invoice release', date: '2026-09-30', complete: false },
      ],
    },
    {
      id: 'CON-8840',
      tenderId: 'TEND-4310',
      title: 'Jamshedpur Factory Civil Foundation Contract',
      dept: 'Civil Works',
      value: '₹34,00,000',
      signedDate: '2025-11-10',
      completionDate: '2026-04-15',
      status: 'Completed',
      milestones: [
        { label: 'Site preparation & soil excavation', date: '2025-11-20', complete: true },
        { label: 'Concrete pouring & foundation curing', date: '2026-02-15', complete: true },
        { label: 'Final site clearing & safety audit sign-off', date: '2026-04-10', complete: true },
      ],
    },
  ];

  return (
    <div className="space-y-6 font-body">

      {/* Page Header */}
      <div className="border-b border-steel-700/60 pb-5">
        <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">PROCUREMENT REGISTER</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-700 mt-1">
          My Active Contracts
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-normal">
          Inspect corporate procurement contracts, track delivery milestones, and check compliance terms.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Side: Contracts Register List */}
        <div className={selectedContract ? 'lg:col-span-2 space-y-4' : 'lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-5'}>
          {mockContracts.map((contract) => (
            <div
              key={contract.id}
              onClick={() => setSelectedContract(contract)}
              className={`p-5 bg-steel-800 border rounded-2xl shadow-xl hover:border-tata-blue/45 cursor-pointer flex flex-col justify-between transition-all duration-150 ${selectedContract?.id === contract.id ? 'border-tata-blue ring-1 ring-tata-blue/20' : 'border-steel-700/60'
                }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-steel-900 border border-steel-700 font-mono font-bold text-[10px] text-tata-gold">
                    {contract.id}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${contract.status === 'Active'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse'
                    : 'bg-slate-500/15 text-slate-400 border border-steel-600'
                    }`}>
                    {contract.status}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-black leading-snug">{contract.title}</h3>

                <div className="grid grid-cols-2 gap-2.5 p-3 bg-steel-900/30 border border-steel-700/50 rounded-xl text-xs">
                  <div>
                    <span className="text-[9px] uppercase font-mono tracking-widest text-slate-600">Contract Value</span>
                    <span className="block font-bold text-black mt-1">{contract.value}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-mono tracking-widest text-slate-600">Linked Tender</span>
                    <span className="block font-semibold text-black mt-1">{contract.tenderId}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-steel-700/60 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>Due: <span className="font-semibold text-slate-300">{contract.completionDate}</span></span>
                </div>
                {!selectedContract && (
                  <span className="text-xs font-bold text-tata-blue flex items-center space-x-0.5 hover:translate-x-0.5 transition-transform">
                    <span>Milestones</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Milestones details sheet */}
        {selectedContract && (
          <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl space-y-5 h-fit animate-slideRight">

            <div className="border-b border-steel-700 pb-3 flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">MILESTONES SUMMARY</span>
                <h3 className="text-sm font-bold text-black mt-1 leading-none">{selectedContract.id} Schedules</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedContract(null)}
                className="text-xs text-slate-400 hover:text-black font-bold focus:outline-none"
              >
                Close details
              </button>
            </div>

            <div className="space-y-4">
              {selectedContract.milestones.map((milestone, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex items-start space-x-3.5 transition-colors ${milestone.complete
                    ? 'bg-emerald-500/5 border-emerald-500/25 text-slate-300'
                    : 'bg-steel-900/30 border-steel-700 text-slate-400'
                    }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {milestone.complete ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <div className="w-4 h-4 rounded border border-steel-500 flex items-center justify-center text-transparent text-[8px] font-bold">✓</div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h4 className={`text-xs font-semibold ${milestone.complete ? 'text-black' : 'text-slate-800'}`}>{milestone.label}</h4>
                    <div className="flex items-center space-x-1.5 text-[10px] text-slate-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Target: <span className="font-semibold text-slate-400">{milestone.date}</span></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-steel-700/60 p-4 rounded-xl bg-steel-900 border border-steel-700/50 flex items-start space-x-2.5">
              <ShieldAlert className="w-4.5 h-4.5 text-tata-gold mt-0.5 flex-shrink-0" />
              <p className="text-[11px] leading-relaxed text-slate-400">
                To submit compliance sheets or invoice proofs for finished milestones, please contact the division manager at Jamshedpur works directly.
              </p>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
