/**
 * @fileoverview Department Head dashboard view displaying departmental stats, recent activities, and upcoming deadlines.
 */

import { Users, FileText, Vote, Award, Calendar, AlertCircle, ArrowUpRight } from 'lucide-react';
import StatCard from '../../components/common/StatCard';

export default function DeptDashboard() {
  const mockDeptInfo = {
    name: 'Raw Materials Sourcing Division',
    code: 'RAW_MAT',
    manager: 'Dr. Suresh Sen',
    location: 'Jamshedpur Central Offices',
  };

  const mockActivities = [
    { id: 1, text: 'Bhartia Steel Fabrications Ltd submitted BID-9021 for SGD-350 Coated Steel Coils.', time: '2 hours ago' },
    { id: 2, text: 'Contract CON-9002 High-Density Structural Packaging signed and executed.', time: '1 day ago' },
    { id: 3, text: 'Technical evaluation finalized for electrical subsystem tender ELEC-901.', time: '2 days ago' },
  ];

  const mockAlerts = [
    { id: 1, title: 'Tender Closing soon', desc: 'Tender RAW_MAT-2026-081 deadline closes in 4 calendar days.', type: 'warning' },
    { id: 2, title: 'Pending Vendor Approval', desc: '3 new supplier onboarding profiles are awaiting verification review.', type: 'info' },
  ];

  return (
    <div className="space-y-6 font-body">

      {/* Header Banner */}
      <div className="border-b border-steel-700/60 pb-5">
        <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">DIVISION MANAGER WORKSPACE</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
          {mockDeptInfo.name}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-normal">
          Manage local vendor classifications, active procurement contracts, and scoring matrix evaluations.
        </p>
      </div>

      {/* Sourcing Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          label="Sourced Dept Vendors"
          value={15}
          icon={<Users className="w-5 h-5" />}
          trend="up"
          trendValue="+2 active this month"
          color="border-tata-blue"
        />
        <StatCard
          label="Active Live Tenders"
          value={4}
          icon={<FileText className="w-5 h-5" />}
          trend="neutral"
          trendValue="1 draft tender"
          color="border-emerald-500"
        />
        <StatCard
          label="Bids Awaiting Review"
          value={18}
          icon={<Vote className="w-5 h-5" />}
          trend="up"
          trendValue="9 new submissions"
          color="border-orange-500"
        />
        <StatCard
          label="Departmental Contracts"
          value={8}
          icon={<Award className="w-5 h-5" />}
          trend="up"
          trendValue="3 active operations"
          color="border-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Side: Department Info & Activities */}
        <div className="lg:col-span-2 space-y-6">

          {/* Department Metadata Details */}
          <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-tata-gold border-b border-steel-700 pb-3 mb-4">
              Division Overview
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block leading-none">Division Code</span>
                <span className="font-semibold text-slate-800 block mt-2 font-mono">{mockDeptInfo.code}</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block leading-none">Divisional Head</span>
                <span className="font-semibold text-slate-800 block mt-2">{mockDeptInfo.manager}</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl sm:col-span-2">
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block leading-none">Office headquarters</span>
                <span className="font-semibold text-slate-700 block mt-2">{mockDeptInfo.location}</span>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-tata-gold border-b border-steel-700 pb-3 mb-4">
              Recent Sourcing Activities
            </h3>

            <div className="space-y-4">
              {mockActivities.map((act) => (
                <div key={act.id} className="flex items-start space-x-3.5 pb-3 border-b border-steel-700 last:border-b-0 last:pb-0">
                  <div className="w-8 h-8 rounded-lg bg-steel-900 border border-steel-700/60 flex items-center justify-center flex-shrink-0 text-slate-400">
                    <ArrowUpRight className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-normal font-normal">{act.text}</p>
                    <span className="text-[10px] text-slate-500 block mt-1 font-mono">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Alerts */}
        <div className="space-y-6">

          <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl flex flex-col h-full">
            <div className="flex items-center space-x-2 border-b border-steel-700 pb-3 mb-4">
              <Calendar className="w-4.5 h-4.5 text-tata-gold" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-tata-gold">Action Items</h3>
            </div>

            <div className="space-y-4 flex-grow">
              {mockAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3.5 rounded-xl border flex items-start space-x-3 ${alert.type === 'warning'
                    ? 'bg-red-50 border-red-100 text-red-700'
                    : 'bg-tata-blue/5 border-tata-blue/15 text-slate-600'
                    }`}
                >
                  <AlertCircle className={`w-4.5 h-4.5 flex-shrink-0 mt-0.5 ${alert.type === 'warning' ? 'text-red-500' : 'text-tata-light'}`} />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-800 leading-none">{alert.title}</h4>
                    <p className="text-[11px] leading-relaxed font-normal text-slate-500">{alert.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
