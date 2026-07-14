import React from 'react';
import WhyUs from '../components/WhyUs';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';

export default function About() {
  return (
    <div className="pt-24 md:pt-[140px] pb-16">
      <WhyUs />
      <Process />
      <Testimonials />
    </div>
  );
}
