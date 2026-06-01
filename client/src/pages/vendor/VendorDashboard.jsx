/**
 * @fileoverview Vendor dashboard landing view displaying stat counts, recent bids, recent notifications, and quick actions.
 */

import { Link } from 'react-router-dom';
import { FileText, Award, AlertCircle, TrendingUp, Search, Upload, Bell } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import { useAuthStore } from '../../store/authStore';

export default function VendorDashboard() {
  const { user } = useAuthStore();

  const mockRecentBids = [
    { id: 'BID-9021', tenderTitle: '120 Ton Coated Steel Coils', dept: 'Raw Materials', price: '₹48,00,000', status: 'Under Review', date: '2026-05-20' },
    { id: 'BID-8910', tenderTitle: 'High-Density Structural Packaging', dept: 'Packaging', price: '₹14,50,000', status: 'Accepted', date: '2026-05-18' },
    { id: 'BID-8877', tenderTitle: 'Jamshedpur Factory Logistics Route', dept: 'Logistics', price: '₹22,00,000', status: 'Rejected', date: '2026-05-10' },
  ];

  const mockAlerts = [
    { id: 1, message: 'GST Certificate expires in 12 days. Please upload a renewed certificate.', type: 'warning' },
    { id: 2, message: 'Tender RAW_MAT-2026-015 has been updated with new drawings.', type: 'info' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-500/10 text-green-400 border border-green-500/20';
      case 'Rejected':
        return 'bg-red-500/10 text-red-400 border border-red-500/20';
      default:
        return 'bg-orange-500/10 text-orange-400 border border-orange-500/20';
    }
  };

  return (
    <div className="space-y-6 font-body">

      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-5">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">WORKSPACE DASHBOARD</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-700 mt-1">
            Welcome Back, {user?.name || 'Partner'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-normal">
            Monitor active tenders, bid evaluations, compliance documents, and contracts.
          </p>
        </div>
      </div>

      {/* Statistics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          label="Active Submitted Bids"
          value={3}
          icon={<FileText className="w-5 h-5" />}
          trend="up"
          trendValue="+1 submitted this week"
          color="border-tata-blue"
        />
        <StatCard
          label="Won Contracts"
          value={8}
          icon={<Award className="w-5 h-5" />}
          trend="up"
          trendValue="2 contracts active"
          color="border-emerald-500"
        />
        <StatCard
          label="Compliance Documents"
          value="4 / 5"
          icon={<AlertCircle className="w-5 h-5" />}
          trend="down"
          trendValue="1 document renewal due"
          color="border-orange-500"
        />
        <StatCard
          label="Profile Completion"
          value="95%"
          icon={<TrendingUp className="w-5 h-5" />}
          trend="neutral"
          trendValue="Taxes & Bank Verified"
          color="border-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Side: Bids & Quick Actions */}
        <div className="lg:col-span-2 space-y-6">

          {/* Recent Bids Panel */}
          <div className="bg-steel-800 border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-tata-gold">
                Recent Bid Submissions
              </h3>
              <Link to="/vendor/bids" className="text-xs text-tata-blue hover:text-tata-light font-bold transition-colors">
                View All Bids
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-steel-700 text-slate-400">
                    <th className="pb-2.5 font-medium">Bid Reference</th>
                    <th className="pb-2.5 font-medium">Tender Title</th>
                    <th className="pb-2.5 font-medium">Value</th>
                    <th className="pb-2.5 font-medium">Evaluation Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockRecentBids.map((bid) => (
                    <tr key={bid.id} className="hover:bg-slate-50">
                      <td className="py-3 font-mono font-semibold text-slate-900">{bid.id}</td>
                      <td className="py-3 text-slate-700">
                        <span className="block font-bold text-slate-900">{bid.tenderTitle}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{bid.dept}</span>
                      </td>
                      <td className="py-3 font-semibold text-slate-900">{bid.price}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold tracking-wider ${getStatusBadge(bid.status)}`}>
                          {bid.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="bg-steel-800 border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-tata-gold border-b border-slate-100 pb-3 mb-4">
              Quick Operations Directory
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link
                to="/vendor/tenders"
                className="flex flex-col items-center justify-center p-4 border border-slate-200 hover:border-tata-blue/50 bg-slate-50/50 hover:bg-tata-blue/5 rounded-xl text-center group transition-all duration-150"
              >
                <Search className="w-6 h-6 text-slate-400 group-hover:text-tata-light mb-2 transition-colors" />
                <span className="text-xs font-bold text-slate-900">Browse Tenders</span>
              </Link>

              <Link
                to="/vendor/tenders"
                className="flex flex-col items-center justify-center p-4 border border-slate-200 hover:border-tata-blue/50 bg-slate-50/50 hover:bg-tata-blue/5 rounded-xl text-center group transition-all duration-150"
              >
                <FileText className="w-6 h-6 text-slate-400 group-hover:text-tata-light mb-2 transition-colors" />
                <span className="text-xs font-bold text-slate-900">Submit a Bid</span>
              </Link>

              <Link
                to="/vendor/profile"
                className="flex flex-col items-center justify-center p-4 border border-slate-200 hover:border-tata-blue/50 bg-slate-50/50 hover:bg-tata-blue/5 rounded-xl text-center group transition-all duration-150"
              >
                <Upload className="w-6 h-6 text-slate-400 group-hover:text-tata-light mb-2 transition-colors" />
                <span className="text-xs font-bold text-slate-900">Upload Document</span>
              </Link>

              <Link
                to="/vendor/contracts"
                className="flex flex-col items-center justify-center p-4 border border-slate-200 hover:border-tata-blue/50 bg-slate-50/50 hover:bg-tata-blue/5 rounded-xl text-center group transition-all duration-150"
              >
                <Award className="w-6 h-6 text-slate-400 group-hover:text-tata-light mb-2 transition-colors" />
                <span className="text-xs font-bold text-slate-900">My Contracts</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Right Side: Compliance Alerts & Notifications */}
        <div className="space-y-6">

          {/* Notifications / Alerts Panel */}
          <div className="bg-steel-800 border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 text-tata-gold" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-tata-gold">
                  Recent Alerts
                </h3>
              </div>
              <Link to="/vendor/notifications" className="text-xs text-tata-blue hover:text-tata-light font-bold transition-colors">
                View All
              </Link>
            </div>

            <div className="space-y-3.5 flex-1">
              {mockAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3.5 rounded-xl border flex items-start space-x-2.5 ${alert.type === 'warning'
                    ? 'bg-red-50 border-red-100 text-red-700'
                    : 'bg-tata-blue/5 border-tata-blue/15 text-slate-600'
                    }`}
                >
                  <AlertCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${alert.type === 'warning' ? 'text-red-500' : 'text-tata-light'}`} />
                  <p className="text-xs leading-relaxed font-normal">{alert.message}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-150 text-center">
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block leading-none">Profile Verification Status</span>
              <span className="text-xs font-bold text-emerald-600 block mt-2.5 uppercase tracking-wide">✓ ACTIVE & VERIFIED</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
