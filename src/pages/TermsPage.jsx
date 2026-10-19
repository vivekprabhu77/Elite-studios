import React, { useEffect } from 'react';
import Terms from '../components/Terms';

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 md:pt-28 pb-16 bg-[#F6F7EB] text-[#393E41] min-h-[85vh]">
      <Terms />
    </div>
  );
}
