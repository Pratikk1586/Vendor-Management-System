/**
 * @fileoverview Sourcing department tender creation page featuring technical spec builders and criteria sliders.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Sliders, AlertCircle } from 'lucide-react';

export default function DeptTenderCreate() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [techWeight, setTechWeight] = useState(60);
  const [commWeight, setCommWeight] = useState(40);
  const [specs, setSpecs] = useState(['']);

  // Submission states
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [refId, setRefId] = useState('');

  const handleAddSpec = () => {
    setSpecs(prev => [...prev, '']);
  };

  const handleSpecChange = (idx, val) => {
    setSpecs(prev => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  };

  const handleTechChange = (val) => {
    const num = Math.min(100, Math.max(0, Number(val)));
    setTechWeight(num);
    setCommWeight(100 - num);
  };

  const handleCommChange = (val) => {
    const num = Math.min(100, Math.max(0, Number(val)));
    setCommWeight(num);
    setTechWeight(100 - num);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!title || !budget || !deadline || !description) {
      setError('Please fill in all core procurement fields.');
      return;
    }

    if (techWeight + commWeight !== 100) {
      setError('Technical and Commercial scoring criteria weights must sum to exactly 100%.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      setRefId(`TEND-${randomNum}`);
      setSuccess(true);
    }, 1000);
  };

  if (success) {
    return (
      <div className="w-full bg-steel-800 border border-steel-700/60 rounded-2xl p-6 sm:p-10 shadow-2xl text-center font-body flex flex-col items-center max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/10 mb-6 flex-shrink-0 animate-scaleUp">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 uppercase tracking-wide">
          Sourcing Tender Published
        </h2>
        <span className="text-xs text-tata-gold font-mono uppercase tracking-widest">
          Raw Materials division
        </span>

        <div className="mt-6 p-4 rounded-xl bg-steel-900 border border-steel-700 w-full select-all">
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block leading-none">Tender ID Reference</span>
          <span className="text-base font-mono font-bold text-white block mt-2 tracking-wider">{refId}</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 mt-6 leading-relaxed">
          The procurement schedule for **{title}** has been successfully cataloged and broadcasted to eligible partners.
        </p>

        <div className="mt-8 flex space-x-4 w-full">
          <button
            onClick={() => navigate('/dept/tenders')}
            type="button"
            className="flex-1 py-2.5 rounded-xl border border-steel-600 bg-steel-800 hover:bg-steel-700 text-xs sm:text-sm font-semibold text-slate-300 transition-colors focus:outline-none"
          >
            Go to Tenders list
          </button>
          
          <button
            onClick={() => {
              setSuccess(false);
              setTitle('');
              setBudget('');
              setDeadline('');
              setDescription('');
              setTechWeight(60);
              setCommWeight(40);
              setSpecs(['']);
            }}
            type="button"
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-tata-blue to-tata-light text-xs sm:text-sm font-semibold text-white transition-all focus:outline-none"
          >
            Create Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-body max-w-4xl mx-auto">
      
      {/* Detail Header Action Bar */}
      <div className="flex items-center space-x-2 border-b border-steel-700/60 pb-5">
        <button
          onClick={() => navigate('/dept/tenders')}
          type="button"
          className="p-2 rounded-lg bg-steel-800 hover:bg-steel-700 border border-steel-700 hover:border-steel-600 text-slate-300 hover:text-white transition-colors focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">DIVISION AUTHORING</span>
          <h1 className="text-xl sm:text-2xl font-bold text-white mt-0.5">Author Procurement Tender</h1>
        </div>
      </div>

      <form onSubmit={handleCreateSubmit} className="space-y-6">
        
        {/* Step 1: Base Specs */}
        <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-tata-gold border-b border-steel-700 pb-2">
            Base Procurement Specifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label htmlFor="tender-title" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Tender Title *
              </label>
              <input
                id="tender-title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 150 Metric Tons Hot-Rolled Coils supply"
                className="block w-full px-4 py-2.5 rounded-xl bg-steel-900 border border-steel-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors"
              />
            </div>

            <div>
              <label htmlFor="tender-budget" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Target Budget (INR) *
              </label>
              <input
                id="tender-budget"
                type="number"
                required
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. 5000000"
                className="block w-full px-4 py-2.5 rounded-xl bg-steel-900 border border-steel-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors"
              />
            </div>

            <div>
              <label htmlFor="tender-deadline" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Submission Closing Deadline *
              </label>
              <input
                id="tender-deadline"
                type="date"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="block w-full px-4 py-2.5 rounded-xl bg-steel-900 border border-steel-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="tender-desc" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Materials Scope and Description Overview *
              </label>
              <textarea
                id="tender-desc"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Describe material dimensions, tolerances, chemical composition requirements, factory destination, etc..."
                className="block w-full px-4 py-2.5 rounded-xl bg-steel-900 border border-steel-700/80 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-tata-blue transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Evaluation Scoring Sliders Criteria */}
        <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 border-b border-steel-700 pb-2">
            <Sliders className="w-4.5 h-4.5 text-tata-gold" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-tata-gold">
              Evaluation Scoring Matrix Weights
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-steel-900/40 border border-steel-700/50 rounded-xl">
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wide">
                <span className="text-slate-300">Technical Scoring *</span>
                <span className="text-tata-gold font-mono">{techWeight}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={techWeight}
                onChange={(e) => handleTechChange(e.target.value)}
                className="w-full h-1.5 rounded-full bg-steel-800 appearance-none cursor-pointer accent-tata-blue"
              />
              <span className="text-[10px] text-slate-500 font-normal leading-relaxed block">
                Determines compliance value for ISO certs, tolerances, sample tests, and capacity thresholds.
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wide">
                <span className="text-slate-300">Commercial / Price Scoring *</span>
                <span className="text-tata-gold font-mono">{commWeight}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={commWeight}
                onChange={(e) => handleCommChange(e.target.value)}
                className="w-full h-1.5 rounded-full bg-steel-800 appearance-none cursor-pointer accent-tata-blue"
              />
              <span className="text-[10px] text-slate-500 font-normal leading-relaxed block">
                Determines rating weight assigned to bid price and delivery timelines.
              </span>
            </div>

          </div>
        </div>

        {/* Step 3: Detailed Tech Specs Builder */}
        <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-steel-700 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-tata-gold">
              Tender Specifications Items Builder
            </h3>
            
            <button
              onClick={handleAddSpec}
              type="button"
              className="py-1 px-2.5 rounded bg-steel-700 hover:bg-steel-600 text-[10px] font-bold text-white border border-steel-600 transition-colors focus:outline-none"
            >
              Add Spec Field
            </button>
          </div>

          <div className="space-y-3">
            {specs.map((spec, idx) => (
              <div key={idx} className="flex items-center space-x-2 animate-fadeIn">
                <span className="text-xs text-slate-400 font-mono flex-shrink-0 w-6">#{idx + 1}</span>
                <input
                  type="text"
                  value={spec}
                  onChange={(e) => handleSpecChange(idx, e.target.value)}
                  placeholder="e.g. Thickness tolerance ±0.05 mm"
                  className="block flex-grow px-3 py-2 rounded-lg bg-steel-900 border border-steel-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-tata-blue"
                />
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-start space-x-2 animate-fadeIn">
            <AlertCircle className="w-4.5 h-4.5 text-red-400 flex-shrink-0 mt-0.5" />
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {/* Actions Button Panel */}
        <div className="pt-4 flex items-center justify-end space-x-3.5">
          <button
            onClick={() => navigate('/dept/tenders')}
            type="button"
            className="py-2.5 px-6 rounded-xl border border-steel-600 bg-steel-800 hover:bg-steel-700 text-xs sm:text-sm font-semibold text-slate-300 transition-colors focus:outline-none"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="py-2.5 px-8 rounded-xl bg-gradient-to-r from-tata-blue to-tata-light text-xs sm:text-sm font-semibold text-white shadow-lg hover:shadow-tata-blue/30 transition-all focus:outline-none flex items-center justify-center"
          >
            {loading ? 'Publishing Sourcing Schedule...' : 'Publish Sourcing Tender'}
          </button>
        </div>

      </form>
    </div>
  );
}
