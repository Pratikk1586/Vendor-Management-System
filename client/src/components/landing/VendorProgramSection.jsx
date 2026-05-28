/**
 * @fileoverview VendorProgramSection detailing registration, verification, approval, and active bidding steps with department chips.
 */

import { UserPlus, FileCheck, CheckCircle2, Gavel } from 'lucide-react';

export default function VendorProgramSection() {
  const steps = [
    {
      step: '01',
      title: 'Registration',
      desc: 'Submit your supplier details, corporate credentials, and GSTIN documentation online.',
      icon: UserPlus,
    },
    {
      step: '02',
      title: 'Verification',
      desc: 'Our administrative compliance team reviews audit histories and material qualifications.',
      icon: FileCheck,
    },
    {
      step: '03',
      title: 'Approval',
      desc: 'Upon verification, receive secure access codes and active system portal credentials.',
      icon: CheckCircle2,
    },
    {
      step: '04',
      title: 'Active Bidding',
      desc: 'Browse published raw material tenders, formulate quotes, and submit secure commercial bids.',
      icon: Gavel,
    },
  ];


  return (
    <section id="vendor-program" className="bg-white text-slate-700 font-body py-20 sm:py-28 relative border-y border-slate-100">

      {/* Background radial accent light */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-blue-50/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 flex flex-col items-center">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-tata-blue mb-3">
            <span className="w-6 h-px bg-tata-blue"></span>
            <span>Vendor Partner Lifecycle</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl text-slate-900 tracking-wide uppercase leading-none mb-6">
            Joining the Vendor Program
          </h2>

          <p className="text-sm sm:text-base text-slate-500 font-normal leading-relaxed">
            We maintain an open, transparent, and completely digitized supplier onboarding program. Follow our structured four-step process to qualify as an authorized Tata Steel Colors vendor.
          </p>
        </div>

        {/* 4-Step Onboarding Process Flow */}
        <div className="relative mt-8">

          {/* Horizontal connecting structural line (Desktop only) */}
          <div className="hidden lg:block absolute top-[43px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-200/50 via-tata-blue/50 to-tata-light/50 z-0 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 relative z-10">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center group">

                  {/* Step Bubble Circle with Icon */}
                  <div className="w-20 h-20 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center relative shadow-lg group-hover:border-tata-blue group-hover:shadow-tata-blue/10 transition-all duration-300 mb-6 flex-shrink-0">
                    <Icon className="w-8 h-8 text-tata-blue group-hover:scale-105 transition-transform" />

                    {/* Index Bubble Badge */}
                    <span className="absolute -top-1.5 -right-1.5 bg-slate-100 border border-slate-250 w-6 h-6 rounded-full text-[10px] font-mono font-bold text-slate-600 flex items-center justify-center">
                      {s.step}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-wide">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-[240px] font-normal">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
