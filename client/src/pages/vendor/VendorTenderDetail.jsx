/**
 * @fileoverview Vendor tender inspection details view, supporting bid submission or reviews.
 */

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ChevronRight, Upload, AlertCircle } from 'lucide-react';

export default function VendorTenderDetail() {
  const { id = 'TEND-4890' } = useParams();
  const navigate = useNavigate();

  const [price, setPrice] = useState('');
  const [deliveryDays, setDeliveryDays] = useState('');
  const [remarks, setRemarks] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  // Submit state management
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const mockTenderDetails = {
    id: id,
    title: id === 'TEND-4752' ? 'High-Density Structural Packaging Material' : '120 Ton Coated Steel Coils Procurement',
    dept: id === 'TEND-4752' ? 'Packaging' : 'Raw Materials',
    deadline: id === 'TEND-4752' ? '2026-06-20' : '2026-06-15',
    budget: id === 'TEND-4752' ? '₹15,00,000' : '₹50,00,000',
    location: id === 'TEND-4752' ? 'Kalinganagar Factory' : 'Jamshedpur Works',
    description: 'Requires the supply of high-grade engineering materials meeting technical specifications under schedule Annexure-A. Materials must be supplied in batches and pass strict QA testing protocols at our factory gates. Delivery schedules must be strictly adhered to; late shipments are subject to liquidated damages.',
    specs: [
      'Material Designation: SG-350 / HR-Coils',
      'Thickness tolerances: ±0.05 mm',
      'Width: 1250 mm Standard',
      'Compliance Standards: IS 2062 / ISO 9001',
    ],
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    if (!price || !deliveryDays || !uploadedFile) {
      setError('Please complete all pricing inputs and attach a technical specification sheet.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate bid submission api call
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="space-y-6 font-body">

      {/* Detail Header Action Bar */}
      <div className="flex items-center space-x-2 border-b border-steel-700/60 pb-5">
        <button
          onClick={() => navigate('/vendor/tenders')}
          type="button"
          className="p-2 rounded-lg bg-stone-700 hover:bg-stone-400 border border-stone-700 hover:border-steel-600 text-slate-300 hover:text-white transition-colors focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">OPPORTUNITY CODE: {id}</span>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">Tender Analysis</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left 2 Columns: Tender Info Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-6 shadow-xl space-y-5">

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-black leading-snug">
                {mockTenderDetails.title}
              </h2>
              <span className="text-xs text-tata-gold font-medium mt-1 block">
                {mockTenderDetails.dept} Sourcing Division
              </span>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-steel-900/40 border border-steel-700/60 rounded-xl text-center">
              <div>
                <span className="text-[9px] uppercase font-mono tracking-widest text-stone-700 block leading-none">Estimated Budget</span>
                <span className="text-sm font-semibold text-black block mt-2">{mockTenderDetails.budget}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-mono tracking-widest text-stone-700 block leading-none">Target Delivery</span>
                <span className="text-sm font-semibold text-black block mt-2">{mockTenderDetails.location}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-mono tracking-widest text-stone-700 block leading-none">Submission Due</span>
                <span className="text-sm font-semibold text-red-400 block mt-2">{mockTenderDetails.deadline}</span>
              </div>
            </div>

            {/* Sourcing Specifications Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-tata-gold">Materials Overview</h3>
              <p className="text-xs sm:text-sm text-black leading-relaxed font-normal">
                {mockTenderDetails.description}
              </p>
            </div>

            {/* Detailed specs bullet lists */}
            <div className="space-y-3 pt-4 border-t border-steel-700/60">
              <h3 className="text-xs font-bold uppercase tracking-wider text-tata-gold">Technical Parameters</h3>
              <ul className="space-y-2">
                {mockTenderDetails.specs.map((spec, index) => (
                  <li key={index} className="flex items-start text-xs sm:text-sm text-black space-x-2">
                    <ChevronRight className="w-4 h-4 text-tata-gold flex-shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Right 1 Column: Interactive Bid Submission Form */}
        <div className="space-y-6">
          {isSubmitted ? (

            /* Success confirmation panel */
            <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl text-center space-y-6 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/10 flex-shrink-0 animate-scaleUp">
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wide">Bid Logged Successfully</h3>
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block mt-1">Status: UNDER EVALUATION</span>
              </div>

              <div className="p-4 bg-steel-900 border border-steel-700 w-full rounded-xl text-left space-y-2.5">
                <div className="flex justify-between border-b border-steel-700 pb-2 text-xs">
                  <span className="text-slate-400">Bid Offer:</span>
                  <span className="font-semibold text-white">₹{Number(price).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between border-b border-steel-700 pb-2 text-xs">
                  <span className="text-slate-400">Lead Delivery:</span>
                  <span className="font-semibold text-white">{deliveryDays} Calendar Days</span>
                </div>
                <div className="flex justify-between text-xs pb-1">
                  <span className="text-slate-400">Attached Spec:</span>
                  <span className="font-semibold text-tata-gold truncate max-w-[120px]">{uploadedFile}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/vendor/bids')}
                type="button"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-tata-blue to-tata-light text-sm font-semibold text-white shadow-lg hover:shadow-tata-blue/30 hover:scale-102 transition-all focus:outline-none"
              >
                Go to My Bids list
              </button>
            </div>
          ) : (

            /* Sourcing Form Panel */
            <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-tata-gold border-b border-steel-700 pb-2">
                Submit Commercial Bid Proposal
              </h3>

              <form onSubmit={handleBidSubmit} className="space-y-4">

                {/* Proposal Price input */}
                <div>
                  <label htmlFor="price-prop" className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                    Bid Amount (INR) *
                  </label>
                  <input
                    id="price-prop"
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 4500000"
                    className="block w-full px-4 py-2.5 rounded-xl hover:bg-steel-900/30 bg-white border border-steel-700/80 text-black placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors"
                  />
                </div>

                {/* Delivery schedule time in days */}
                <div>
                  <label htmlFor="lead-days" className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                    Lead Delivery Period (Days) *
                  </label>
                  <input
                    id="lead-days"
                    type="number"
                    required
                    value={deliveryDays}
                    onChange={(e) => setDeliveryDays(e.target.value)}
                    placeholder="e.g. 15"
                    className="block w-full px-4 py-2.5 rounded-xl hover:bg-steel-900/30 bg-white border border-steel-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors"
                  />
                </div>

                {/* Upload Zone */}
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-black mb-2">Technical Specification Sheets *</span>
                  <div className="relative border border-dashed border-steel-700 hover:border-steel-500 hover:bg-steel-900/30 rounded-xl p-3.5 flex flex-col items-center justify-center text-center transition-colors">
                    {uploadedFile ? (
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs text-white truncate max-w-[120px] font-semibold">{uploadedFile}</span>
                        <button type="button" onClick={() => setUploadedFile(null)} className="text-xs text-red-400 font-bold hover:text-red-300 focus:outline-none">Clear</button>
                      </div>
                    ) : (
                      <label htmlFor="proposal-file" className="cursor-pointer py-1.5">
                        <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                        <div className="text-[11px] text-black font-medium block">Click to select PDF</div>
                        <input id="proposal-file" type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>

                {/* Remarks/Optional Box */}
                <div>
                  <label htmlFor="remarks-text" className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                    Proposal Remarks (Optional)
                  </label>
                  <textarea
                    id="remarks-text"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    rows={2.5}
                    placeholder="Add any specific details..."
                    className="block w-full px-4 py-2.5 rounded-xl hover:bg-steel-900/30 bg-white border border-steel-700/80 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-tata-blue transition-colors resize-none"
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-start space-x-1.5">
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{error}</span>
                  </div>
                )}

                {/* Submission CTA button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-white border border-steel-700/80 text-sm font-semibold text-black shadow-lg hover:bg-slate-400 transition-all focus:outline-none flex items-center justify-center"
                >
                  {loading ? 'Logging Bid Proposal...' : 'Transmit Proposal Bid'}
                </button>

              </form>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
