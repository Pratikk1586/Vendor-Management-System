/**
 * @fileoverview Admin Dashboard showing system-wide statistics, active pending approval queues, and custom SVG metrics.
 */

import { Link } from 'react-router-dom';
import { Shield, Users, FileText, Vote, Award, ClipboardList } from 'lucide-react';
import StatCard from '../../components/common/StatCard';

export default function AdminDashboard() {

  // Custom SVG Bar Chart: Spend distribution by department (in Lakhs)
  const spendData = [
    { label: 'RAW_MAT', val: 120, height: 'h-[120px]' },
    { label: 'PKG', val: 45, height: 'h-[45px]' },
    { label: 'LOG', val: 75, height: 'h-[75px]' },
    { label: 'CIVIL', val: 95, height: 'h-[95px]' },
    { label: 'ELEC', val: 60, height: 'h-[60px]' },
  ];

  // Custom SVG Horizontal Bar Chart: Vendor Tiers distribution
  const tierDistribution = [
    { label: 'Platinum Tier', count: 12, percent: 'w-[15%]', color: 'bg-gradient-to-r from-tata-blue to-tata-light' },
    { label: 'Gold Tier', count: 48, percent: 'w-[60%]', color: 'bg-tata-gold' },
    { label: 'Silver Tier', count: 20, percent: 'w-[25%]', color: 'bg-slate-400' },
  ];

  return (
    <div className="space-y-6 font-body">

      {/* Header Banner */}
      <div className="border-b border-steel-700/60 pb-5">
        <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">SUPER ADMIN CENTRE</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
          System Overview & Oversight
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-normal">
          Monitor multi-role registrations, cross-departmental spend metrics, active bidding safety, and security audits.
        </p>
      </div>

      {/* System Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          label="Total Registered Vendors"
          value={120}
          icon={<Users className="w-5 h-5" />}
          trend="up"
          trendValue="+12 new this quarter"
          color="border-tata-blue"
        />
        <StatCard
          label="Active Live Tenders"
          value={12}
          icon={<FileText className="w-5 h-5" />}
          trend="neutral"
          trendValue="Across all 7 departments"
          color="border-emerald-500"
        />
        <StatCard
          label="Total Proposals Evaluated"
          value={88}
          icon={<Vote className="w-5 h-5" />}
          trend="up"
          trendValue="Average 7.3 bids per tender"
          color="border-orange-500"
        />
        <StatCard
          label="Cumulative Contract Value"
          value="₹4.2 Cr"
          icon={<Award className="w-5 h-5" />}
          trend="up"
          trendValue="+₹85L added Q2-26"
          color="border-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Side Charts Panel */}
        <div className="lg:col-span-2 space-y-6">

          {/* Spend by Department Chart */}
          <div className="bg-steel-800 border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-tata-gold border-b border-slate-100 pb-3">
              Divisional Sourcing Spend (Quarterly in Lakhs)
            </h3>

            <div className="flex justify-around items-end h-48 pt-6 border-b border-slate-200 pb-2 bg-gray-100 rounded-xl p-4">
              {spendData.map((bar, idx) => (
                <div key={idx} className="flex flex-col items-center group w-14">
                  <span className="text-[10px] font-mono font-bold text-tata-gold opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                    ₹{bar.val}L
                  </span>
                  <div className={`w-8 bg-gradient-to-t from-tata-blue to-tata-light rounded-t-md ${bar.height} transition-all duration-150 hover:brightness-110`} />
                  <span className="text-[9px] font-bold text-slate-500 mt-2 font-mono">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Supplier Tier distribution */}
          <div className="bg-steel-800 border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-tata-gold border-b border-slate-100 pb-3">
              Supplier Classification Distribution
            </h3>

            <div className="space-y-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
              {tierDistribution.map((tier, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-600">{tier.label}</span>
                    <span className="text-slate-800 font-mono">{tier.count} Suppliers</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${tier.color} ${tier.percent}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Approval queues & warnings */}
        <div className="space-y-6">

          {/* Approvals count checklist panel */}
          <div className="bg-steel-800 border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <ClipboardList className="w-4.5 h-4.5 text-tata-gold" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-tata-gold">Approvals Queue</h3>
            </div>

            <div className="space-y-3">
              <Link
                to="/admin/approvals"
                className="p-3 bg-slate-50 border border-slate-200 hover:border-tata-blue/45 rounded-xl flex items-center justify-between text-xs font-semibold group transition-colors"
              >
                <span className="text-slate-500">Vendor Registrations:</span>
                <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-600 font-mono font-bold border border-orange-500/20">3 Pending</span>
              </Link>
              <Link
                to="/admin/approvals"
                className="p-3 bg-slate-50 border border-slate-200 hover:border-tata-blue/45 rounded-xl flex items-center justify-between text-xs font-semibold group transition-colors"
              >
                <span className="text-slate-500">Dept Head Activations:</span>
                <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-600 font-mono font-bold border border-orange-500/20">2 Pending</span>
              </Link>
              <Link
                to="/admin/approvals"
                className="p-3 bg-slate-50 border border-slate-200 hover:border-tata-blue/45 rounded-xl flex items-center justify-between text-xs font-semibold group transition-colors"
              >
                <span className="text-slate-500">Admin Account reviews:</span>
                <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-600 font-mono font-bold border border-orange-500/20">1 Pending</span>
              </Link>
            </div>
          </div>

          {/* Audit quick stats */}
          <div className="bg-steel-800 border border-slate-200 rounded-2xl p-5 shadow-sm text-center space-y-4 flex flex-col items-center">
            <Shield className="w-12 h-12 text-tata-gold flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Audit & Operations Ledger</h4>
              <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                System events and administrative actions are logged statefully in our centralized compliance auditor database.
              </p>
            </div>
            <Link
              to="/admin/audit-logs"
              className="w-full py-2 bg-slate-55 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 rounded-xl transition-all"
            >
              Inspect Audit Log
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
