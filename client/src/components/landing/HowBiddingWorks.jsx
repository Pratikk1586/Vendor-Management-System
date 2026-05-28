/**
 * @fileoverview HowBiddingWorks mapping procurement tender flow in a visual horizontal timeline.
 */

import { FilePlus, UploadCloud, ClipboardList, Award } from 'lucide-react';

export default function HowBiddingWorks() {
  const steps = [
    {
      num: '1',
      title: 'Tender Published',
      desc: 'Procurement heads draft specific tenders detailing steel grades, weight volumes, and delivery criteria.',
      icon: FilePlus,
    },
    {
      num: '2',
      title: 'Vendors Bid',
      desc: 'Authorized partners formulate commercial price quotes, attach documents, and submit secure bids.',
      icon: UploadCloud,
    },
    {
      num: '3',
      title: 'Evaluation',
      desc: 'System validators and department Heads evaluate price parameters, bid caps, and vendor compliance profiles.',
      icon: ClipboardList,
    },
    {
      num: '4',
      title: 'Contract Awarded',
      desc: 'The optimal vendor is selected, digital binding agreements are signed, and escrow clearing activates.',
      icon: Award,
    },
  ];

  return (
    <section className="bg-slate-50 text-slate-700 font-body py-20 sm:py-28 relative">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-blue-50/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 flex flex-col items-center">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-tata-blue mb-3">
            <span className="w-6 h-px bg-tata-blue"></span>
            <span>Bidding Process Flow</span>
          </div>
          
          <h2 className="font-display text-4xl sm:text-6xl text-slate-900 tracking-wide uppercase leading-none mb-6">
            How Bidding Works
          </h2>
          
          <p className="text-sm sm:text-base text-slate-500 font-normal leading-relaxed">
            Our automated procurement engine ensures complete transparency and high efficiency. Understand the step-by-step bidding lifecycle from initial publication to contract sign-off.
          </p>
        </div>

        {/* Horizontal Timeline Steps (Desktop/Mobile responsive) */}
        <div className="relative mt-8">
          
          {/* Connecting line (Desktop only) */}
          <div className="hidden lg:block absolute top-[43px] left-[12%] right-[12%] border-t-2 border-dashed border-slate-200 z-0 pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {steps.map((s, idx) => {
              const StepIcon = s.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center group">
                  
                  {/* Step Bubble Bubble with Icon */}
                  <div className="w-20 h-20 rounded-full bg-white border border-slate-200 flex items-center justify-center relative shadow-lg group-hover:border-tata-blue group-hover:shadow-tata-blue/10 transition-all duration-300 mb-6 flex-shrink-0">
                    <StepIcon className="w-7 h-7 text-tata-blue group-hover:scale-105 transition-transform" />
                    
                    {/* Step Number Bubble Badge */}
                    <span className="absolute -top-1.5 -right-1.5 bg-tata-blue text-white w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center border-2 border-white shadow-md">
                      {s.num}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 tracking-wide">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-[220px] font-normal">
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
