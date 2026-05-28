/**
 * @fileoverview WhyPartnerSection showing 4 partnership advantage icon-cards.
 */

import { CreditCard, Layers, MapPin, Headphones } from 'lucide-react';

export default function WhyPartnerSection() {
  const cards = [
    {
      title: 'Timely Payments',
      desc: 'Accelerated financial settlements and prompt clearance terms through secure, digitized accounting integration.',
      icon: CreditCard,
    },
    {
      title: 'Priority Material Access',
      desc: 'Direct mill-origin allocations of high-grade ZINCALUME® and COLORBOND® steel alloys, eliminating supply chain intermediaries.',
      icon: Layers,
    },
    {
      title: 'Real-time Tracking',
      desc: 'Native tracing of raw material dispatch shipments, digital e-way bills, and physical weighbridge inputs.',
      icon: MapPin,
    },
    {
      title: 'Dedicated Support',
      desc: 'Designated sourcing officers and system technicians ready to resolve bidding or contract compliance queries.',
      icon: Headphones,
    },
  ];

  return (
    <section className="bg-sky-950 text-slate-700 font-body py-20 sm:py-28 relative">

      {/* Background ambient light */}
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-100/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Content */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 flex flex-col items-center">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-white mb-3">
            <span className="w-6 h-px bg-white"></span>
            <span>Why Choose Tata Steel Colors</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl text-blue-300 tracking-wide uppercase leading-none mb-6">
            Why Partner with Us
          </h2>

          <p className="text-sm sm:text-base text-white font-normal leading-relaxed">
            Collaborating with Tata Steel Colors grants your enterprise elite status, reliable sourcing pipelines, and transparent, high-value commercial growth.
          </p>
        </div>

        {/* 4 Icon-Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {cards.map((c, idx) => {
            const IconComponent = c.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md flex flex-col space-y-4 hover:-translate-y-2 hover:shadow-xl hover:border-tata-blue/40 transition-all duration-300 group"
              >
                {/* Icon Container with slight hover effect */}
                <div className="w-12 h-12 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center justify-center shadow-inner group-hover:bg-tata-blue/10 transition-colors">
                  <IconComponent className="w-6 h-6 text-tata-blue group-hover:scale-105 transition-transform" />
                </div>

                {/* Card Title & Desc */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-wide">
                  {c.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  {c.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
