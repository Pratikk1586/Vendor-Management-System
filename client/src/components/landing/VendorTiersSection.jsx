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
    <section className="bg-steel-800/20 text-slate-300 font-body py-20 sm:py-28 relative border-y border-steel-700/40">
      
      {/* Background visual lights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-tata-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 flex flex-col items-center">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-tata-gold mb-3">
            <span className="w-6 h-px bg-tata-gold"></span>
            <span>Supplier Growth Framework</span>
          </div>
          
          <h2 className="font-display text-4xl sm:text-6xl text-white tracking-wide uppercase leading-none mb-6">
            Vendor Classification Tiers
          </h2>
          
          <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
            Authorized partners are categorized into performance-based commercial tiers. Achieve higher volumes, secure better terms, and gain exclusive procurement rights as you scale.
          </p>
        </div>

        {/* 3 Tier Cards Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch pt-6">
          {tiers.map((t, idx) => {
            const Icon = t.badge;
            return (
              <div
                key={idx}
                className={`rounded-2xl flex flex-col justify-between p-6 sm:p-8 relative transition-all duration-300 ${
                  t.isPlatinum
                    ? 'bg-steel-800 border-2 border-tata-gold md:-translate-y-4 shadow-[0_0_35px_rgba(200,150,12,0.25)] scale-100 md:scale-105 z-10'
                    : 'bg-steel-800/60 border border-steel-700/80 hover:border-steel-600 shadow-xl'
                }`}
              >
                {/* Platinum Highlight Ribbon */}
                {t.isPlatinum && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-tata-gold to-tata-amber text-steel-900 font-mono text-[9px] font-bold uppercase tracking-widest rounded-full shadow-md">
                    Top Tier Partner
                  </span>
                )}

                {/* Card Title & Icon Header */}
                <div>
                  <div className="flex items-center justify-between border-b border-steel-700/60 pb-5 mb-6">
                    <h3 className="text-xl font-bold text-white tracking-wide">
                      {t.name}
                    </h3>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${t.badgeColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Pricing and Payment Comparison Specs */}
                  <div className="space-y-4 mb-8">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 leading-none">Bidding Capability</span>
                      <span className="text-xl font-bold text-white mt-1.5">{t.biddingCap}</span>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 leading-none">Payment Disbursal Terms</span>
                      <span className="text-base font-semibold text-tata-gold mt-1">{t.paymentTerms}</span>
                    </div>
                  </div>

                  {/* Bulleted checklist */}
                  <ul className="space-y-3.5 mb-8">
                    {t.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-300">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${t.isPlatinum ? 'text-tata-gold' : 'text-slate-400'}`} />
                        <span className="leading-snug font-normal">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card bottom details */}
                <div className="pt-4 border-t border-steel-700/50 text-[10px] text-center uppercase tracking-widest font-mono text-slate-500">
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
