/**
 * @fileoverview TestimonialsSection containing 3 supplier quote cards with left gold accent borders.
 */

import { Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Onboarding as a Gold Tier supplier revolutionized our lead times. The automated bidding system is transparent, secure, and payouts are always fully cleared within 30 days.",
      author: "Rajesh Sharma",
      role: "Managing Director",
      company: "Sharma Alloys & Castings",
      city: "Jamshedpur",
      region: "East India",
    },
    {
      quote: "Bidding on the Spectra solar-reflective alloy tenders has been incredibly smooth. Tracking dispatches and weighbridge receipts directly in the dashboard saves hundreds of manual hours.",
      author: "Priya Nair",
      role: "Head of Sourcing",
      company: "Vanguard Logistics & Steel",
      city: "Mumbai",
      region: "West India",
    },
    {
      quote: "Earning Platinum Status unlocked mill reservations that guarantee our roll stock. The designated sourcing managers and digital audit logs make this the gold standard in procurement.",
      author: "Amit Patel",
      role: "Chief Procurement Officer",
      company: "Apex Metal Distributors",
      city: "Ahmedabad",
      region: "Central India",
    },
  ];

  return (
    <section className="bg-steel-800/20 text-slate-300 font-body py-20 sm:py-28 relative border-t border-steel-700/40">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-tata-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 flex flex-col items-center">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-tata-gold mb-3">
            <span className="w-6 h-px bg-tata-gold"></span>
            <span>Supplier Success Stories</span>
          </div>
          
          <h2 className="font-display text-4xl sm:text-6xl text-white tracking-wide uppercase leading-none mb-6">
            Partner Testimonials
          </h2>
          
          <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
            Discover how industrial suppliers, steel distributors, and logistics firms across the country achieve sustainable, secure growth through our automated vendor portal.
          </p>
        </div>

        {/* 3 Vendor Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-steel-800 border border-steel-700/60 border-l-4 border-l-tata-gold rounded-r-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl transform hover:-translate-y-1.5 transition-all duration-200 group"
            >
              
              {/* Quote Mark Visual Icon */}
              <div className="mb-6 flex justify-between items-start">
                <Quote className="w-8 h-8 text-tata-gold/20 group-hover:text-tata-gold/30 transition-colors" />
                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest leading-none">
                  {t.region}
                </span>
              </div>

              {/* Quote text body */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-8 font-normal">
                "{t.quote}"
              </p>

              {/* Author & Profile footer */}
              <div className="flex items-center space-x-3.5 pt-4 border-t border-steel-700/50">
                <div className="w-10 h-10 rounded-full bg-steel-700 flex items-center justify-center flex-shrink-0 font-bold text-tata-gold shadow-inner text-sm select-none">
                  {t.author.charAt(0)}
                </div>
                
                <div className="flex flex-col truncate">
                  <span className="text-sm font-bold text-white truncate">
                    {t.author}
                  </span>
                  <span className="text-[11px] text-slate-400 truncate mt-0.5 font-normal">
                    {t.role}, <span className="font-semibold text-slate-300">{t.company}</span>
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 truncate font-mono">
                    {t.city} Office
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
