/**
 * @fileoverview AboutCompanySection explaining Tata Steel Colors division legacy, product lineups, and statistics grid.
 */

import { Award, ShieldCheck, Flame, Globe2 } from 'lucide-react';

export default function AboutCompanySection() {
  const products = [
    { name: 'COLORBOND® Steel', desc: 'Premium prepainted steel with outstanding durability, thermal efficiency, and aesthetic appeal for high-end roofing and cladding.' },
    { name: 'GALVALUM® Steel', desc: 'Leading aluminium-zinc alloy coated steel offering 4x the corrosion resistance of standard galvanized steel.' },
    { name: 'DURASHINE®', desc: 'Flagship retail brand providing aesthetic and durable color-coated roofing sheets for residential and commercial structures.' },
    { name: 'LYSAGHT®', desc: 'Premium B2B brand featuring custom roll-formed cladding and structural decking systems for industrial and infrastructure projects.' },
  ];

  return (
    <section id="about" className="bg-white text-slate-700 font-body py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Column: Descriptive Text Content */}
          <div className="flex flex-col space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-tata-blue">
              <span className="w-6 h-px bg-tata-blue"></span>
              <span>Our Legacy & Materials</span>
            </div>

            {/* Bebas Neue Title */}
            <h2 className="font-display text-4xl sm:text-6xl text-slate-900 tracking-wide uppercase leading-none">
              Legacy of Strength,<br />
              <span className="bg-gradient-to-r from-tata-blue to-tata-light bg-clip-text text-transparent">
                Depth of Color
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
              Formerly known as Tata BlueScope Steel, the company was rebranded as **Tata Steel Colors** in late 2025 following Tata Steel acquiring a 100% stake. Operating since 2005, we combine the global excellence of advanced coated steel technologies with Tata's rich metallurgical legacy to deliver premium color-coated and metallic solutions across the SAARC region.
            </p>

            {/* Product Cards Layout Grid */}
            <div id="products" className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              {products.map((prod) => (
                <div key={prod.name} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-colors">
                  <h3 className="font-semibold text-slate-900 text-sm tracking-wide mb-1.5 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-tata-blue mr-2"></span>
                    {prod.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {prod.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Stylized Stats Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 relative">
            {/* Structural glowing circle in background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-tata-blue/5 rounded-full blur-[80px] pointer-events-none" />

            {/* Metric Card 1 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md flex flex-col space-y-3 transform hover:-translate-y-1.5 transition-transform duration-200 group">
              <Award className="w-6 h-6 text-tata-blue group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="font-mono text-3xl sm:text-4xl font-bold text-slate-900 leading-none">2005</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-2">Established</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                20+ years of high-quality coating and roll-forming legacy.
              </p>
            </div>

            {/* Metric Card 2 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md flex flex-col space-y-3 transform hover:-translate-y-1.5 transition-transform duration-200 group">
              <ShieldCheck className="w-6 h-6 text-tata-blue group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-none">250K T</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-2">Metal Coating</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                Annual capacity at our state-of-the-art Jamshedpur plant.
              </p>
            </div>

            {/* Metric Card 3 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md flex flex-col space-y-3 transform hover:-translate-y-1.5 transition-transform duration-200 group">
              <Flame className="w-6 h-6 text-tata-blue group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-none">150K T</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-2">Color Coating</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                Equipped with advanced automated metal-painting lines.
              </p>
            </div>

            {/* Metric Card 4 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md flex flex-col space-y-3 transform hover:-translate-y-1.5 transition-transform duration-200 group">
              <Globe2 className="w-6 h-6 text-tata-blue group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="font-mono text-3xl sm:text-4xl font-bold text-slate-900 leading-none">SAARC</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-2">Territory</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                Expansive distribution network and roll-forming plants.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
