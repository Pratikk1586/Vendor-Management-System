/**
 * @fileoverview AboutCompanySection explaining Tata Steel Colors division legacy, product lineups, and statistics grid.
 */

import { Award, ShieldCheck, Flame, Globe2 } from 'lucide-react';

export default function AboutCompanySection() {
  const products = [
    { name: 'Galvasteel', desc: 'Superior zinc-aluminium alloy coating offering 4x corrosion resistance in extreme weather conditions.' },
    { name: 'Durashine', desc: 'Premium prepainted galvalume sheets designed for residential roofing, retail, and commercial structures.' },
    { name: 'Colorcoat', desc: 'Pre-painted steel cladding for large-scale industrial warehouses, featuring custom shade ranges.' },
    { name: 'Spectra', desc: 'Advanced thermo-reflective paint systems with high solar reflectance index (SRI) to lower building heat.' },
  ];

  return (
    <section id="about" className="bg-steel-900 text-slate-300 font-body py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Descriptive Text Content */}
          <div className="flex flex-col space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-tata-gold">
              <span className="w-6 h-px bg-tata-gold"></span>
              <span>Our Legacy & Materials</span>
            </div>
            
            {/* Bebas Neue Title */}
            <h2 className="font-display text-4xl sm:text-6xl text-white tracking-wide uppercase leading-none">
              Legacy of Strength,<br />
              <span className="bg-gradient-to-r from-tata-gold to-tata-amber bg-clip-text text-transparent">
                Depth of Color
              </span>
            </h2>
            
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
              For over a century, Tata Steel has pioneered metallurgy. Our dedicated **Colors Division** continues this tradition of excellence, producing premium pre-painted galvanized and galvalume sheets that support global infrastructure developments, large industrial projects, and smart housing designs.
            </p>

            {/* Product Cards Layout Grid */}
            <div id="products" className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              {products.map((prod) => (
                <div key={prod.name} className="p-4 rounded-xl bg-steel-800/40 border border-steel-700/50 hover:border-steel-600 transition-colors">
                  <h3 className="font-semibold text-white text-sm tracking-wide mb-1.5 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-tata-gold mr-2"></span>
                    {prod.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {prod.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Stylized Stats Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 relative">
            {/* Structural glowing circle in background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-tata-gold/5 rounded-full blur-[80px] pointer-events-none" />

            {/* Metric Card 1 */}
            <div className="p-6 rounded-2xl bg-steel-800 border border-steel-700/60 shadow-xl flex flex-col space-y-3 transform hover:-translate-y-1.5 transition-transform duration-200 group">
              <Award className="w-6 h-6 text-tata-gold group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="font-mono text-3xl sm:text-4xl font-bold text-white leading-none">1907</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-2">Established</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                Over 115 years of industry excellence.
              </p>
            </div>

            {/* Metric Card 2 */}
            <div className="p-6 rounded-2xl bg-steel-800 border border-steel-700/60 shadow-xl flex flex-col space-y-3 transform hover:-translate-y-1.5 transition-transform duration-200 group">
              <ShieldCheck className="w-6 h-6 text-tata-gold group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="font-mono text-3xl sm:text-4xl font-bold text-white leading-none">100%</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-2">Lead-Free</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                Committed to eco-friendly, green coatings.
              </p>
            </div>

            {/* Metric Card 3 */}
            <div className="p-6 rounded-2xl bg-steel-800 border border-steel-700/60 shadow-xl flex flex-col space-y-3 transform hover:-translate-y-1.5 transition-transform duration-200 group">
              <Flame className="w-6 h-6 text-tata-gold group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="font-mono text-3xl sm:text-4xl font-bold text-white leading-none">Class A</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-2">Fire Rated</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                Engineered for maximum thermal safety compliance.
              </p>
            </div>

            {/* Metric Card 4 */}
            <div className="p-6 rounded-2xl bg-steel-800 border border-steel-700/60 shadow-xl flex flex-col space-y-3 transform hover:-translate-y-1.5 transition-transform duration-200 group">
              <Globe2 className="w-6 h-6 text-tata-gold group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="font-mono text-3xl sm:text-4xl font-bold text-white leading-none">Global</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-2">R&D Centers</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                Continuous product research and development.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
