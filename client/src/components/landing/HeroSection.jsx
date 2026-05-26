/**
 * @fileoverview Public landing page Hero section with high-contrast steel visual styling.
 */

import { ArrowRight, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();

  const handlePartnerClick = (e) => {
    e.preventDefault();
    const targetElement = document.getElementById('vendor-program');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen bg-steel-900 overflow-hidden flex items-center justify-center pt-24 pb-16 font-body text-white">
      
      {/* Self-contained custom animations styling */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes customFadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-hero-load {
          animation: customFadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-delay-1 {
          animation-delay: 0.2s;
        }
        .animate-delay-2 {
          animation-delay: 0.4s;
        }
      `}} />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A2635_1px,transparent_1px),linear-gradient(to_bottom,#1A2635_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_75%,transparent_100%)] opacity-40 transform -skew-y-3 pointer-events-none" />

      {/* Ambient Radial Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-tata-blue/20 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-tata-gold/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 flex flex-col items-center">
        
        {/* Subtle top banner chip */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-steel-800 border border-steel-600 text-xs font-mono font-semibold tracking-wider uppercase text-tata-gold mb-8 opacity-0 animate-hero-load shadow-inner">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tata-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-tata-gold"></span>
          </span>
          <span>Tata Steel Colors Division</span>
        </div>

        {/* Large Bebas Neue Headline */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-wider uppercase bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent max-w-5xl mb-6 opacity-0 animate-hero-load animate-delay-1 select-none filter drop-shadow-sm">
          Powering India's<br />
          <span className="bg-gradient-to-r from-tata-gold via-tata-amber to-amber-300 bg-clip-text text-transparent">
            Steel Supply Chain
          </span>
        </h1>

        {/* Description DM Sans Subtext */}
        <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed opacity-0 animate-hero-load animate-delay-2 font-body font-normal">
          Join India's most advanced procurement network. Bid on high-value steel manufacturing tenders, coordinate contracts natively, and track supplier deliverables with complete, verified compliance.
        </p>

        {/* Dual CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto opacity-0 animate-hero-load animate-delay-2">
          
          {/* Primary Call to Action */}
          <a
            href="#vendor-program"
            onClick={handlePartnerClick}
            className="flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold bg-gradient-to-r from-tata-blue to-tata-light text-white shadow-lg shadow-tata-blue/20 hover:scale-105 hover:shadow-tata-blue/35 transition-all duration-200 group"
          >
            Partner with Us
            <ArrowRight className="w-5 h-5 ml-2.5 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Secondary Call to Action */}
          <button
            onClick={() => navigate('/tenders')}
            type="button"
            className="flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold border border-steel-600 bg-steel-800/40 text-slate-200 hover:bg-steel-800 hover:border-slate-300 hover:text-white transition-all duration-200"
          >
            <Search className="w-4.5 h-4.5 mr-2.5 text-tata-gold" />
            View Active Tenders
          </button>
        </div>

      </div>

      {/* Decorative Slide-down Chevron indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce opacity-40 hidden sm:block">
        <div className="w-6 h-10 rounded-full border-2 border-slate-400 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-scrollIndicator" />
        </div>
      </div>
    </section>
  );
}
