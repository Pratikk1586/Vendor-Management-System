/**
 * @fileoverview Vendor profile details page divided into tab views for general info, contacts, documents, and tier metrics.
 */

import { useState } from 'react';
import { Building, Contact, FileSpreadsheet, Award, Calendar, CheckCircle2, ShieldCheck, Mail, Phone, MapPin, Tag } from 'lucide-react';
import Tabs from '../../components/common/Tabs';

export default function VendorProfile() {
  const [activeTab, setActiveTab] = useState('info');

  const tabs = [
    { id: 'info', label: 'Company Info' },
    { id: 'contact', label: 'Contact Details' },
    { id: 'docs', label: 'Documents' },
    { id: 'performance', label: 'Tier & Performance' },
  ];

  const mockCompany = {
    companyName: 'Bhartia Steel Fabrications Ltd',
    gstNumber: '20AABCB1234A1Z5',
    panNumber: 'AABCB1234A',
    yearEstablished: '1998',
    companyType: 'Private Limited',
    industrySector: 'Steel Fabrication',
    website: 'www.bhartiasteel.co.in',
    departments: ['Raw Materials', 'Logistics', 'Civil Works'],
  };

  const mockContacts = {
    primaryName: 'Ramesh Bhartia',
    primaryDesignation: 'Managing Director',
    primaryEmail: 'ramesh@bhartiasteel.co.in',
    primaryMobile: '+91 98765 43210',
    altName: 'Anil Bhartia',
    altMobile: '+91 98765 43211',
    address: 'Plot 45, Phase-2, Adityapur Industrial Area, Jamshedpur, Jharkhand - 831013',
    locations: ['Jamshedpur', 'Kalinganagar', 'Kolkata'],
  };

  const mockDocs = [
    { name: 'GST Registration Certificate', status: 'Warning', expiry: '2026-06-06', color: 'border-orange-500/30 text-orange-400 bg-orange-500/5' },
    { name: 'PAN Corporate Identification Card', status: 'Active', expiry: 'Lifetime Verified', color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5' },
    { name: 'Certificate of Incorporation (COI)', status: 'Active', expiry: 'Lifetime Verified', color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5' },
    { name: 'MSME Registration Certificate', status: 'Active', expiry: '2029-12-31', color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5' },
    { name: 'Cancelled Bank Cheque Copy', status: 'Active', expiry: 'Lifetime Verified', color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5' },
  ];

  const mockPerformance = {
    tier: 'Gold Supplier',
    points: 875,
    metrics: [
      { name: 'Quality compliance rate', value: '98.4%', width: 'w-[98.4%]' },
      { name: 'On-time delivery punctuality', value: '95.2%', width: 'w-[95.2%]' },
      { name: 'Bid commitment accuracy', value: '100%', width: 'w-full' },
      { name: 'Contract milestone completion', value: '92.0%', width: 'w-[92.0%]' },
    ],
  };

  return (
    <div className="space-y-6 font-body">
      
      {/* Profile Header */}
      <div className="border-b border-steel-700/60 pb-5">
        <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">WORKSPACE PROFILE</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          {mockCompany.companyName}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-normal">
          Manage corporate credentials, document validations, and view divisional compliance evaluations.
        </p>
      </div>

      {/* Tabs list wrapper */}
      <div className="bg-steel-800/40 p-1 border border-steel-700/50 rounded-xl max-w-2xl">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* Tab Panels */}
      <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-6 shadow-xl">
        
        {/* PANEL 1: COMPANY INFO */}
        {activeTab === 'info' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-steel-700 pb-3">
              <Building className="w-5 h-5 text-tata-gold" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-tata-gold">Corporate Credentials</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block leading-none">Legal Company Name</span>
                <span className="text-sm font-semibold text-white block mt-1.5">{mockCompany.companyName}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block leading-none">Registered GSTIN</span>
                <span className="text-sm font-mono font-bold text-white block mt-1.5">{mockCompany.gstNumber}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block leading-none">Company Permanent Account Number (PAN)</span>
                <span className="text-sm font-mono font-bold text-white block mt-1.5">{mockCompany.panNumber}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block leading-none">Year Established</span>
                <span className="text-sm font-semibold text-white block mt-1.5">{mockCompany.yearEstablished}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block leading-none">Company Structure</span>
                <span className="text-sm font-semibold text-white block mt-1.5">{mockCompany.companyType}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block leading-none">Primary Industry Sector</span>
                <span className="text-sm font-semibold text-white block mt-1.5">{mockCompany.industrySector}</span>
              </div>
              <div className="space-y-1 sm:col-span-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block leading-none">Official Website URL</span>
                <a href={`https://${mockCompany.website}`} target="_blank" rel="noreferrer" className="text-sm font-medium text-tata-blue hover:underline block mt-1.5">
                  {mockCompany.website}
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-steel-700/60">
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block leading-none mb-3.5">Participating Departments</span>
              <div className="flex flex-wrap gap-2">
                {mockCompany.departments.map((dept, index) => (
                  <span key={index} className="px-2.5 py-1 rounded bg-steel-900 border border-steel-700 text-xs font-semibold text-slate-300">
                    {dept}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PANEL 2: CONTACT DETAILS */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-steel-700 pb-3">
              <Contact className="w-5 h-5 text-tata-gold" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-tata-gold">Corporate Contact Registry</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-steel-900/40 border border-steel-700/60 space-y-3.5">
                <div className="border-b border-steel-700 pb-2.5">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">Primary Sourcing Representative</span>
                  <h4 className="text-base font-bold text-white mt-1">{mockContacts.primaryName}</h4>
                  <span className="text-xs text-slate-400 font-medium">{mockContacts.primaryDesignation}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-slate-300 space-x-2.5">
                    <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>{mockContacts.primaryEmail}</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-300 space-x-2.5">
                    <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>{mockContacts.primaryMobile}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-steel-900/40 border border-steel-700/60 space-y-3.5">
                <div className="border-b border-steel-700 pb-2.5">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500">Alternate Contact Representative</span>
                  <h4 className="text-base font-bold text-white mt-1">{mockContacts.altName}</h4>
                  <span className="text-xs text-slate-400 font-medium">Operations Partner</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-slate-300 space-x-2.5">
                    <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>{mockContacts.altMobile}</span>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2 p-4 rounded-xl bg-steel-900/40 border border-steel-700/60 flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-slate-400 mt-1 flex-shrink-0" />
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500">Registered Office Address</span>
                  <p className="text-sm font-medium text-slate-300 leading-relaxed mt-1.5">{mockContacts.address}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-steel-700/60">
              <div className="flex items-center space-x-2 mb-3.5">
                <Tag className="w-4 h-4 text-slate-400" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500">Operational Locations</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {mockContacts.locations.map((loc, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-full bg-tata-blue/10 border border-tata-blue/20 text-xs font-semibold text-tata-light">
                    {loc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PANEL 3: DOCUMENTS */}
        {activeTab === 'docs' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-steel-700 pb-3">
              <FileSpreadsheet className="w-5 h-5 text-tata-gold" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-tata-gold">Uploaded Verification files</h3>
            </div>

            <div className="space-y-3">
              {mockDocs.map((doc, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-steel-900/40 border border-steel-700/60 gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-white">{doc.name}</h4>
                    <div className="flex items-center text-xs text-slate-400 space-x-2.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>Valid Till: <span className="font-semibold text-slate-300">{doc.expiry}</span></span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3.5 flex-shrink-0">
                    <span className={`px-2.5 py-1 rounded border text-xs font-semibold tracking-wide uppercase ${doc.color}`}>
                      {doc.status === 'Active' ? '✓ ACTIVE' : '⚠ RENEWAL DUE'}
                    </span>
                    <button type="button" className="text-xs font-bold text-tata-blue hover:text-tata-light transition-colors">
                      View File
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PANEL 4: TIER & PERFORMANCE */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-steel-700 pb-3">
              <Award className="w-5 h-5 text-tata-gold" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-tata-gold">Vendor Classifications</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Active Tier */}
              <div className="p-5 rounded-2xl bg-steel-900 border border-steel-700 flex flex-col justify-center items-center text-center space-y-4">
                <ShieldCheck className="w-14 h-14 text-tata-gold flex-shrink-0 animate-pulse" />
                <div>
                  <h4 className="text-xl font-bold text-white uppercase tracking-wide">{mockPerformance.tier}</h4>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold block mt-1">Level 2 Qualified Partner</span>
                </div>
                <div className="p-3 border border-steel-700/60 rounded-xl bg-steel-800/40 w-full text-center">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block leading-none">Cumulative Sourcing Score</span>
                  <span className="text-2xl font-mono font-bold text-white block mt-2">{mockPerformance.points} / 1000</span>
                </div>
              </div>

              {/* Performance Metrics Bars */}
              <div className="p-5 rounded-2xl bg-steel-900 border border-steel-700 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-steel-700 pb-2">
                  Divisional Performance Indicators
                </h4>

                <div className="space-y-3.5">
                  {mockPerformance.metrics.map((metric, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span className="text-slate-400">{metric.name}</span>
                        <span className="text-white font-semibold font-mono">{metric.value}</span>
                      </div>
                      <div className="w-full bg-steel-800 h-2 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r from-tata-blue to-tata-light rounded-full ${metric.width}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Testimonials notes */}
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/25 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Your performance score is within the **Gold Tier** band. This grants prioritized payment processing terms, material sourcing access on active bidding events, and an authorization ticket for specialized engineering tenders.
              </p>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
