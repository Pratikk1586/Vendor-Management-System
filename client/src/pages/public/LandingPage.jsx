/**
 * @fileoverview Public landing page assembling all Tata Steel Colors portal marketing and introductory sections.
 */

import HeroSection from '../../components/landing/HeroSection';
import StatsStrip from '../../components/landing/StatsStrip';
import AboutCompanySection from '../../components/landing/AboutCompanySection';
import WhyPartnerSection from '../../components/landing/WhyPartnerSection';
import VendorProgramSection from '../../components/landing/VendorProgramSection';
import VendorTiersSection from '../../components/landing/VendorTiersSection';
import HowBiddingWorks from '../../components/landing/HowBiddingWorks';
import TestimonialsSection from '../../components/landing/TestimonialsSection';
import BackToTop from '../../components/common/BackToTop';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-steel-900 text-slate-100 font-body relative overflow-x-hidden">
      {/* Main content sections */}
      <main className="relative">
        <HeroSection />
        <StatsStrip />
        <AboutCompanySection />
        <WhyPartnerSection />
        <VendorProgramSection />
        {/* <VendorTiersSection /> */}
        {/* <HowBiddingWorks /> */}
        <TestimonialsSection />
      </main>


      {/* Floating Scroll to Top button */}
      <BackToTop />
    </div>
  );
}
