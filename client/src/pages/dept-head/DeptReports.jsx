/**
 * @fileoverview Sourcing department reports displaying spend charts, cycle times, and participation rates using custom SVG graphics.
 */

import { TrendingUp, DollarSign, Calendar } from 'lucide-react';

export default function DeptReports() {

  // Custom SVG Bar Chart data (spend by quarter)
  const spendData = [
    { label: 'Q3-25', val: 45, displayVal: '₹45L', height: 'h-[90px]' },
    { label: 'Q4-25', val: 65, displayVal: '₹65L', height: 'h-[130px]' },
    { label: 'Q1-26', val: 85, displayVal: '₹85L', height: 'h-[170px]' },
    { label: 'Q2-26', val: 120, displayVal: '₹1.2Cr', height: 'h-[240px]' },
  ];

  // Custom SVG bar data (tender cycle times in days)
  const cycleTimes = [
    { label: 'Tenders Drafted', value: '4 Days', percentage: 'w-[40%]', color: 'bg-tata-blue' },
    { label: 'Open Sourcing bidding', value: '14 Days', percentage: 'w-full', color: 'bg-tata-light' },
    { label: 'Commercial Evaluation', value: '5 Days', percentage: 'w-[50%]', color: 'bg-emerald-500' },
    { label: 'Contract Execution', value: '3 Days', percentage: 'w-[30%]', color: 'bg-purple-500' },
  ];

  // Bid participation rate metrics
  const participationRates = [
    { label: 'Active Registered Vendors', value: '15 Suppliers' },
    { label: 'Average Bids per Tender', value: '4.5 Proposals' },
    { label: 'Bid Acceptance Rate', value: '22%' },
  ];

  return (
    <div className="space-y-6 font-body">

      {/* Page Header */}
      <div className="border-b border-steel-700/60 pb-5">
        <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">DIVISION ANALYTICS</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
          Divisional Reports & Performance
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-normal">
          Inspect organizational spend trends, raw material procurement cycles, and supplier engagement metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Quarter Spend Bar Chart panel */}
        <div className="lg:col-span-2 bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl space-y-6">
          <div className="flex items-center space-x-2 border-b border-steel-700 pb-3">
            <DollarSign className="w-4.5 h-4.5 text-tata-gold" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-tata-gold">Divisional Sourcing Spend</h3>
          </div>

          {/* Sourcing Spend Graph Bar representation */}
          <div className="p-5 bg-steel-900 border border-steel-700/60 rounded-xl space-y-6">
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500">Spend Distribution (Quarterly)</span>

            <div className="flex justify-around items-end h-64 pt-6 border-b border-steel-700 pb-2">
              {spendData.map((bar, idx) => (
                <div key={idx} className="flex flex-col items-center group w-14">
                  <span className="text-[10px] font-mono font-bold text-tata-gold opacity-0 group-hover:opacity-100 transition-opacity mb-2">
                    {bar.displayVal}
                  </span>
                  <div className={`w-10 bg-gradient-to-t from-tata-blue to-tata-light rounded-t-lg ${bar.height} transition-all duration-300 hover:brightness-110 shadow-lg shadow-tata-blue/10`} />
                  <span className="text-xs font-semibold text-slate-400 mt-2 font-mono">{bar.label}</span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-500 font-normal leading-relaxed text-center">
              * Quarter-on-quarter procurement spend is calculated based on signed and executed contract valuations.
            </p>
          </div>
        </div>

        {/* Right column: Tender Cycle Times & Bid Participation */}
        <div className="space-y-6">

          {/* Tender Cycle times */}
          <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl space-y-5">
            <div className="flex items-center space-x-2 border-b border-steel-700 pb-2">
              <Calendar className="w-4.5 h-4.5 text-tata-gold" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-tata-gold">Tender Cycle Timelines</h3>
            </div>

            <div className="space-y-4">
              {cycleTimes.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="text-white font-mono">{item.value}</span>
                  </div>
                  <div className="w-full bg-steel-950 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${item.color} ${item.percentage}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bid Engagement rates */}
          <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl space-y-5">
            <div className="flex items-center space-x-2 border-b border-steel-700 pb-2">
              <TrendingUp className="w-4.5 h-4.5 text-tata-gold" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-tata-gold">Supplier Engagement</h3>
            </div>

            <div className="space-y-3">
              {participationRates.map((rate, idx) => (
                <div key={idx} className="p-3 bg-steel-900 border border-steel-700/50 rounded-xl flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400">{rate.label}:</span>
                  <span className="text-white font-mono">{rate.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
