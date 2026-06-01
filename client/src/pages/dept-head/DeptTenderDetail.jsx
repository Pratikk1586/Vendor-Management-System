/**
 * @fileoverview Sourcing department tender details view and bids received inspector page.
 */

import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Vote, Sliders, ArrowUpRight } from 'lucide-react';

export default function DeptTenderDetail() {
  const { id = 'TEND-4890' } = useParams();
  const navigate = useNavigate();

  const mockTender = {
    id: id,
    title: id === 'TEND-4752' ? 'High-Density Structural Packaging Material' : '120 Ton Coated Steel Coils Procurement',
    budget: id === 'TEND-4752' ? '₹15,00,000' : '₹50,00,000',
    deadline: id === 'TEND-4752' ? '2026-06-20' : '2026-06-15',
    status: id === 'TEND-4498' ? 'Draft' : id === 'TEND-4310' ? 'Closed' : 'Active',
    dept: 'Raw Materials Sourcing',
    description: 'Requires the supply of high-grade engineering materials meeting technical specifications under schedule Annexure-A. Materials must be supplied in batches and pass strict QA testing protocols.',
    techWeight: 60,
    commWeight: 40,
    bidsCount: id === 'TEND-4498' ? 0 : 3,
    specs: [
      'Material Designation: SG-350 / HR-Coils',
      'Thickness tolerances: ±0.05 mm',
      'Width: 1250 mm Standard',
      'Compliance Standards: IS 2062 / ISO 9001',
    ],
  };

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

  return (
    <div className="space-y-6 font-body">

      {/* Header action bar */}
      <div className="flex items-center space-x-2 border-b border-steel-700/60 pb-5">
        <button
          onClick={() => navigate('/dept/tenders')}
          type="button"
          className="p-2 rounded-lg bg-steel-800 hover:bg-steel-700 border border-steel-700 hover:border-steel-600 text-slate-300 hover:text-white transition-colors focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">OPPORTUNITY CODE: {id}</span>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">Tender Specifications Details</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Side: Specifications, metrics and weights */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-6 shadow-xl space-y-5">

            <div className="flex items-start justify-between border-b border-steel-700 pb-3">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-black leading-snug">{mockTender.title}</h2>
                <span className="text-xs text-tata-gold font-medium mt-1 block">{mockTender.dept} Division</span>
              </div>
              <div>{getStatusBadge(mockTender.status)}</div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-steel-900/40 border border-steel-700/60 rounded-xl text-center text-xs">
              <div>
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-700 block leading-none">Target Budget</span>
                <span className="text-sm font-semibold text-white block mt-2">{mockTender.budget}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-700 block leading-none">Closing Due</span>
                <span className="text-sm font-semibold text-white block mt-2">{mockTender.deadline}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-700 block leading-none">Bids Lodged</span>
                <span className="text-sm font-mono font-bold text-white block mt-2">{mockTender.bidsCount} Bid(s)</span>
              </div>
            </div>

            {/* Scope details */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Material scope</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">{mockTender.description}</p>
            </div>

            {/* Tech Specs */}
            <div className="space-y-3 pt-4 border-t border-steel-700/60">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Technical Parameters</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                {mockTender.specs.map((spec, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-tata-gold font-mono flex-shrink-0 mt-0.5">•</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Right Side: Evaluation weights and Actions */}
        <div className="space-y-6">

          {/* Weights Overview */}
          <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center space-x-2 border-b border-steel-700 pb-2">
              <Sliders className="w-4.5 h-4.5 text-tata-gold" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-tata-gold">Scoring Matrix</h3>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-steel-900 border border-steel-700/60 rounded-xl flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">Technical Weight:</span>
                <span className="text-white font-mono">{mockTender.techWeight}%</span>
              </div>
              <div className="p-3 bg-steel-900 border border-steel-700/60 rounded-xl flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">Commercial Price Weight:</span>
                <span className="text-white font-mono">{mockTender.commWeight}%</span>
              </div>
            </div>
          </div>

          {/* Action Launcher Panel */}
          {mockTender.status !== 'Draft' && (
            <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl text-center space-y-4 flex flex-col items-center">
              <Vote className="w-12 h-12 text-tata-gold flex-shrink-0" />

              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wide">Bids Scoring Board</h4>
                <p className="text-[11px] text-slate-400 mt-1">Compare proposals commercially and scoring compliance sheets side-by-side.</p>
              </div>

              <button
                onClick={() => navigate(`/dept-head/tenders/${mockTender.id}/bids`)}
                type="button"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-tata-blue to-tata-light text-xs sm:text-sm font-semibold text-white shadow-lg hover:shadow-tata-blue/30 hover:scale-102 flex items-center justify-center space-x-1.5 transition-all focus:outline-none"
              >
                <span>Inspect Bids</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
