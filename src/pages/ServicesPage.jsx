import React from 'react';
import Services from '../components/Services';
import FinalCTA from '../components/FinalCTA';

export default function ServicesPage() {
  return (
    <div className="pt-20 md:pt-28 bg-[#F9F6F0] text-[#393E41]">
      <Services isHomepage={false} />
      <FinalCTA />
    </div>
  );
}
