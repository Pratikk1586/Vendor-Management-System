/**
 * @fileoverview Vendor Bid detail and tracking sheet showing status timelines and evaluation logs.
 */

import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MessageSquare } from 'lucide-react';

export default function VendorBidDetail() {
  const { id = 'BID-9021' } = useParams();
  const navigate = useNavigate();

  const mockBidDetails = {
    id: id,
    tenderId: 'TEND-4890',
    title: '120 Ton Coated Steel Coils Procurement',
    dept: 'Raw Materials',
    submittedPrice: '₹48,00,000',
    deliveryDays: '14 Calendar Days',
    date: '2026-05-20',
    status: id === 'BID-8910' ? 'Accepted' : id === 'BID-8877' ? 'Rejected' : 'Under Review',
    techScore: id === 'BID-8910' ? '98/100' : id === 'BID-8877' ? '60/100' : 'Pending',
    evalNotes: id === 'BID-8910'
      ? 'Technical specification compliance confirmed. Commercial pricing matches targets.'
      : id === 'BID-8877'
        ? 'Pricing proposal exceeded budget constraints. Delivery schedule did not align with blast furnace timelines.'
        : 'Material properties and sample certs are currently undergoing compliance verification.',
  };

  const getTimelineSteps = () => {
    const isAccepted = mockBidDetails.status === 'Accepted';
    const isRejected = mockBidDetails.status === 'Rejected';

    return [
      { label: 'Submitted', desc: `Logged on ${mockBidDetails.date}`, active: true, color: 'bg-tata-blue' },
      { label: 'Evaluation', desc: isRejected ? 'Rejected' : 'Technical Reviewing', active: true, color: isRejected ? 'bg-red-500' : 'bg-orange-500' },
      { label: 'Award Contract', desc: isAccepted ? 'Awarded' : isRejected ? 'Declined' : 'Pending Award Decision', active: isAccepted || isRejected, color: isAccepted ? 'bg-emerald-500' : isRejected ? 'bg-red-500' : 'bg-steel-600' },
    ];
  };

  return (
    <div className="space-y-6 font-body">

      {/* Action Header */}
      <div className="flex items-center space-x-2 border-b border-steel-700/60 pb-5">
        <button
          onClick={() => navigate('/vendor/bids')}
          type="button"
          className="p-2 rounded-lg bg-steel-800 hover:bg-slate-500 border border-steel-700 hover:border-steel-600 text-slate-300 hover:text-white transition-colors focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">PROPOSAL FILE REFERENCE</span>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-700 mt-0.5">Bid Specifications: {id}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Side: Bid stats and evaluation remarks */}
        <div className="lg:col-span-2 space-y-6">

          {/* Bid Summary Cards */}
          <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-6 shadow-xl space-y-5">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block leading-none">Linked Opportunity</span>
              <h2 className="text-base sm:text-lg font-bold text-black mt-1.5 leading-snug">{mockBidDetails.title}</h2>
              <span className="text-xs text-tata-gold font-medium mt-1 block">Tender ID: {mockBidDetails.tenderId} | {mockBidDetails.dept} Division</span>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-steel-900/40 border border-steel-700/60 rounded-xl">
              <div>
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block leading-none">Commercial Bid price</span>
                <span className="text-base font-semibold text-black block mt-2">{mockBidDetails.submittedPrice}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block leading-none">Lead Delivery Time</span>
                <span className="text-base font-semibold text-black block mt-2">{mockBidDetails.deliveryDays}</span>
              </div>
            </div>
          </div>

          {/* Sourcing Committee Remarks */}
          <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center space-x-2 border-b border-steel-700 pb-3">
              <MessageSquare className="w-4.5 h-4.5 text-tata-gold" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-tata-gold">Technical Committee Remarks</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 bg-steel-600 border border-steel-700/60 rounded-xl">
                <span className="text-[12px] uppercase font-bold tracking-widest text-black block leading-none">Technical Score</span>
                <span className="text-md text-slate-100 block mt-1.5">{mockBidDetails.techScore}</span>
              </div>
              <div className="p-3 bg-steel-600 border border-steel-700/60 rounded-xl sm:col-span-2">
                <span className="text-[12px] uppercase font-bold tracking-widest text-black block leading-none">Compliance Comments</span>
                <p className="text-xs text-slate-100 leading-normal mt-1.5">{mockBidDetails.evalNotes}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Status Tracker Timeline */}
        <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl space-y-6">
          <div className="flex items-center space-x-2 border-b border-steel-700 pb-3">
            <Clock className="w-4.5 h-4.5 text-tata-gold" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-tata-gold">Status Roadmap</h3>
          </div>

          <div className="relative pl-6 space-y-6 border-l-2 border-steel-700">
            {getTimelineSteps().map((step, idx) => (
              <div key={idx} className="relative">
                {/* Timeline node dot */}
                <div className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 border-steel-800 ${step.color} shadow-lg`} />

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-black leading-none">{step.label}</h4>
                  <p className="text-xs text-slate-400 font-medium">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-steel-700/60 text-center">
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block leading-none">Current Phase</span>
            <span className="text-xs font-bold text-tata-gold block mt-2 uppercase tracking-wide">
              {mockBidDetails.status}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
