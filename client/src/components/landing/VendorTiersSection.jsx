/**
 * @fileoverview VendorTiersSection demonstrating Silver, Gold, and Platinum partner levels and comparisons.
 */

import { Shield, Sparkles, Award, Check } from 'lucide-react';

export default function VendorTiersSection() {
  const tiers = [
    {
      name: 'Silver Partner',
      badge: Shield,
      badgeColor: 'text-slate-400 bg-slate-400/10',
      biddingCap: 'Up to ₹50 Lakhs',
      paymentTerms: 'Net 45 Days',
      features: [
        'Access to Standard RFQs',
        'Standard Quality Reviews',
        'Regular Cargo Dispatches',
        'Email Support Desk',
      ],
      isPlatinum: false,
    },
    {
      name: 'Gold Partner',
      badge: Sparkles,
      badgeColor: 'text-amber-400 bg-amber-400/10',
      biddingCap: 'Up to ₹5 Crores',
      paymentTerms: 'Net 30 Days',
      features: [
        'Access to Priority RFQs',
        'Accelerated Verification',
        'Early Material Dispatch',
        'Designated Account Staff',
      ],
      isPlatinum: false,
    },
    {
      name: 'Platinum Partner',
      badge: Award,
      badgeColor: 'text-tata-gold bg-tata-gold/10',
      biddingCap: 'Unlimited Bidding',
      paymentTerms: 'Net 15 Days',
      features: [
        'Access to Exclusive RFQs',
        'Direct Mill-Origin Reservation',
        'Real-time Logistics Sync',
        '24/7 Priority Hotline support',
      ],
      isPlatinum: true,
    },
  ];

  return (
    <section className="bg-sky-950 text-slate-700 font-body py-20 sm:py-28 relative border-y border-slate-100">

      {/* Background visual lights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-100/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 flex flex-col items-center">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-white mb-3">
            <span className="w-6 h-px bg-white"></span>
            <span>Supplier Growth Framework</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl text-blue-300 tracking-wide uppercase leading-none mb-6">
            Vendor Classification Tiers
          </h2>

          <p className="text-sm sm:text-base text-white font-normal leading-relaxed">
            Authorized partners are categorized into performance-based commercial tiers. Achieve higher volumes, secure better terms, and gain exclusive procurement rights as you scale.
          </p>
        </div>

        {/* 3 Tier Cards Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch pt-6">
          {tiers.map((t, idx) => {
            const Icon = t.badge;
            // Map badge colors to clean light theme combinations
            const getBadgeStyles = (name) => {
              if (name.includes('Silver')) return 'text-slate-600 bg-slate-100';
              if (name.includes('Gold')) return 'text-blue-600 bg-blue-50';
              return 'text-tata-blue bg-blue-100';
            };
            const badgeClass = getBadgeStyles(t.name);

            return (
              <div
                key={idx}
                className={`rounded-2xl flex flex-col justify-between p-6 sm:p-8 relative transition-all duration-300 ${t.isPlatinum
                  ? 'bg-white border-2 border-tata-blue md:-translate-y-4 shadow-[0px_20px_207px_10px_rgba(236,_236,_243,_0.51)] scale-100 md:scale-105 z-10'
                  : 'bg-white border border-slate-200 hover:border-blue-400 shadow-md'
                  }`}
              >
                {/* Platinum Highlight Ribbon */}
                {t.isPlatinum && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-tata-blue to-tata-light text-white font-mono text-[9px] font-bold uppercase tracking-widest rounded-full shadow-md">
                    Top Tier Partner
                  </span>
                )}

                {/* Card Title & Icon Header */}
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
                    <h3 className="text-xl font-bold text-slate-900 tracking-wide">
                      {t.name}
                    </h3>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${badgeClass}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Pricing and Payment Comparison Specs */}
                  <div className="space-y-4 mb-8">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 leading-none">Bidding Capability</span>
                      <span className="text-xl font-bold text-slate-900 mt-1.5">{t.biddingCap}</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 leading-none">Payment Disbursal Terms</span>
                      <span className="text-base font-semibold text-tata-blue mt-1">{t.paymentTerms}</span>
                    </div>
                  </div>

                  {/* Bulleted checklist */}
                  <ul className="space-y-3.5 mb-8">
                    {t.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-600">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${t.isPlatinum ? 'text-tata-blue' : 'text-slate-400'}`} />
                        <span className="leading-snug font-normal">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card bottom details */}
                <div className="pt-4 border-t border-slate-100 text-[10px] text-center uppercase tracking-widest font-mono text-slate-400">
                  Performance Assured
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
