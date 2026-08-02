import React from 'react';
import WhyUs from '../components/WhyUs';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';

export default function About() {
  return (
    <div className="pt-16 md:pt-24 pb-8">
      <WhyUs />
      <Process />
      <Testimonials />
    </div>
  );
}
