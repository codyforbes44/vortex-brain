import { SEOHead } from '@/components/SEOHead';
import { Footer } from '@/components/Footer';
import { PricingSection } from '@/components/landing/PricingSection';
import { useAnimateIn } from '@/lib/animations';

const PricingPage = () => {
  const showPricing = useAnimateIn(false, 300);

  return (
    <>
      <SEOHead 
        title="Pricing"
        description="Choose the perfect Vortex plan for your needs. Start free and upgrade as your second brain grows. Plans for individuals and teams."
        keywords="vortex pricing, second brain pricing, PKM pricing, knowledge management plans"
      />
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingSection showPricing={showPricing} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PricingPage;
