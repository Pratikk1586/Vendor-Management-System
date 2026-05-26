/**
 * @fileoverview Sourcing department commercial bid evaluation, parameter comparisons, and contract award overlays.
 */

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Award, CheckCircle2, AlertTriangle, FileSpreadsheet } from 'lucide-react';

export default function DeptBidEvaluation() {
  const { id = 'TEND-4890' } = useParams();
  const navigate = useNavigate();

  // Stateful list of bids received
  const [bids, setBids] = useState([
    { id: 'BID-9021', vendor: 'Bhartia Steel Fabrications Ltd', price: 4800000, days: 14, techScore: 92, status: 'Pending' },
    { id: 'BID-9022', vendor: 'Standard Sourcing & Logistics', price: 4400000, days: 12, techScore: 85, status: 'Pending' },
    { id: 'BID-9023', vendor: 'Jamshedpur Packaging Corp', price: 5200000, days: 20, techScore: 96, status: 'Pending' },
  ]);

  const [selectedBid, setSelectedBid] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [contractId, setContractId] = useState('');

  // Sourcing Weights
  const techWeight = 0.6;
  const commWeight = 0.4;

  // Calculate price score: (MinPrice / ProposedPrice) * 100
  const minPrice = Math.min(...bids.map(b => b.price));
  const getPriceScore = (price) => {
    return Math.round((minPrice / price) * 100);
  };

  const getCombinedScore = (bid) => {
    const pScore = getPriceScore(bid.price);
    return Math.round((bid.techScore * techWeight) + (pScore * commWeight));
  };

  const handleTechScoreChange = (idx, val) => {
    const score = Math.min(100, Math.max(0, Number(val)));
    setBids(prev => {
      const next = [...prev];
      next[idx].techScore = score;
      return next;
    });
  };

  const handleAwardClick = (bid) => {
    setSelectedBid(bid);
    setModalOpen(true);
  };

  const handleConfirmAward = () => {
    setSuccess(true);
    setModalOpen(false);
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setContractId(`CON-${randomNum}`);
    
    // Update active bid status locally
    setBids(prev => prev.map(b => b.id === selectedBid.id ? { ...b, status: 'Accepted' } : { ...b, status: 'Rejected' }));
  };

  return (
    <div className="space-y-6 font-body">
      
      {/* Header action bar */}
      <div className="flex items-center space-x-2 border-b border-steel-700/60 pb-5">
        <button
          onClick={() => navigate(`/dept/tenders/${id}`)}
          type="button"
          className="p-2 rounded-lg bg-steel-800 hover:bg-steel-700 border border-steel-700 hover:border-steel-600 text-slate-300 hover:text-white transition-colors focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">SOURCING SCORE BOARD</span>
          <h1 className="text-xl sm:text-2xl font-bold text-white mt-0.5">Bid Evaluation & Sourcing: {id}</h1>
        </div>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-scaleUp">
          <div className="flex items-start space-x-3.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white leading-none">Contract Award Completed</h4>
              <p className="text-xs text-slate-400 mt-1.5">
                Tender contract awarded to **{selectedBid?.vendor}**. Procurement contract **{contractId}** drafted.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/dept/contracts')}
            type="button"
            className="py-1.5 px-3 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-xs font-bold text-emerald-400 border border-emerald-500/20 transition-all focus:outline-none"
          >
            Go to Contracts register
          </button>
        </div>
      )}

      {/* Comparison Scoreboard Panel */}
      <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl space-y-5">
        <div className="flex items-center space-x-2 border-b border-steel-700 pb-3">
          <FileSpreadsheet className="w-4.5 h-4.5 text-tata-gold" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-tata-gold">Commercial Bid Comparison Sheets</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-steel-700 text-slate-400">
                <th className="pb-3 font-medium">Bid Reference</th>
                <th className="pb-3 font-medium">Vendor Partner</th>
                <th className="pb-3 font-medium text-right">Price Offer</th>
                <th className="pb-3 font-medium text-center">Delivery period</th>
                <th className="pb-3 font-medium text-center w-28">Technical Score (60%)</th>
                <th className="pb-3 font-medium text-center">Combined Score</th>
                <th className="pb-3 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steel-700">
              {bids.map((bid, idx) => {
                const combined = getCombinedScore(bid);
                
                return (
                  <tr key={bid.id} className="hover:bg-steel-900/10">
                    <td className="py-3.5 font-mono font-bold text-white">{bid.id}</td>
                    <td className="py-3.5 font-semibold text-slate-200">{bid.vendor}</td>
                    <td className="py-3.5 font-medium text-white text-right">₹{bid.price.toLocaleString('en-IN')}</td>
                    <td className="py-3.5 text-center text-slate-300">{bid.days} Days</td>
                    <td className="py-3.5 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        disabled={success}
                        value={bid.techScore}
                        onChange={(e) => handleTechScoreChange(idx, e.target.value)}
                        className="w-16 px-2 py-1 rounded bg-steel-900 border border-steel-700 text-center text-xs font-mono font-bold text-white focus:outline-none focus:border-tata-blue"
                      />
                    </td>
                    <td className="py-3.5 text-center">
                      <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-tata-blue/15 text-tata-light border border-tata-blue/20">
                        {combined} / 100
                      </span>
                    </td>
                    <td className="py-3.5 text-center">
                      {bid.status === 'Accepted' ? (
                        <span className="text-emerald-400 font-bold text-xs">✓ Contract Awarded</span>
                      ) : bid.status === 'Rejected' ? (
                        <span className="text-slate-500 text-xs">Declined</span>
                      ) : (
                        <button
                          onClick={() => handleAwardClick(bid)}
                          disabled={success}
                          type="button"
                          className="py-1 px-2.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 disabled:opacity-40 text-[10px] font-bold text-emerald-400 border border-emerald-500/20 flex items-center space-x-1 mx-auto transition-all focus:outline-none"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>Award Contract</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Award Modal overlay */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 font-body animate-fadeIn">
          <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-6 shadow-2xl max-w-md w-full space-y-4">
            
            <div className="flex items-center space-x-2 border-b border-steel-700 pb-3">
              <AlertTriangle className="w-5 h-5 text-tata-gold flex-shrink-0" />
              <h3 className="text-base font-bold text-white uppercase tracking-wider">Confirm Contract Award</h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Are you sure you want to award this sourcing contract to **{selectedBid?.vendor}**? This action will generate a formal draft contract and notify the selected vendor partner.
            </p>

            <div className="pt-4 border-t border-steel-700 flex items-center justify-end space-x-3.5">
              <button
                onClick={() => setModalOpen(false)}
                type="button"
                className="py-2 px-4 rounded-xl border border-steel-600 bg-steel-800 text-xs font-bold text-slate-300 hover:text-white transition-colors focus:outline-none"
              >
                Cancel
              </button>
              
              <button
                onClick={handleConfirmAward}
                type="button"
                className="py-2 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-xs font-bold text-white transition-colors focus:outline-none"
              >
                Confirm Award
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
