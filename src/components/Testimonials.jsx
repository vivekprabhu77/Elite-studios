import React from 'react';
import { Star, ExternalLink } from 'lucide-react';

const REAL_REVIEWS = [
  {
    author: "Preetham Shet",
    role: "Verified Google Review • 5.0 Stars",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjUx7T8ihCwxPloEVcIxJZyGL1rPx-Tt0xK64xyfRk4RBVf14dg=s120-c-rp-mo-br100",
    initials: "PS",
    quote: "“A very professional designer Mr. Gurucharan Acharya. I would like to extend my heartfelt thanks to him. I was dealing with him regarding our Kundapura Kannada video lyrical song and posters. He has done an amazing job, we received great output. Very helpful and great service. Must recommend for design and video editing.”"
  },
  {
    author: "Uppunda Prabhu",
    role: "Verified Google Review • 5.0 Stars",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocLoY4RQIJ6EKjlaiQNGhGObuWXHyPNcnWz6moCmL6wCnbICQdj7=s120-c-rp-mo-ba12-br100",
    initials: "UP",
    quote: "“Very good designer in Kundapura and Udupi region. Elite Studios is very good for poster design, video editing, and all kinds of digital solutions. Must try!”"
  },
  {
    author: "Pramod Pai",
    role: "Verified Google Review • 5.0 Stars",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjUzAr_lJlwUGRQPfio-q0iESTnXfP2GfUWch-hqYPbqy6uSh_5D=s120-c-rp-mo-br100",
    initials: "PP",
    quote: "“Extraordinary and unique work. Very quick implementing new design concepts and latest trends. Outstanding service and communication throughout our project.”"
  },
  {
    author: "Karthik Kulal",
    role: "Verified Google Review • 5.0 Stars",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocKfTjjTOFVa-KuvO-a0wJnSjdQuAuF1vxcqtJazYldFEv8BbQ=s120-c-rp-mo-br100",
    initials: "KK",
    quote: "“Very good digital solution brand in Kundapura and Udupi region. Very high quality work on posters, social media and video editing. Must try once.”"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 px-6 md:px-12 bg-black relative overflow-hidden border-b border-white/[0.04]">
      {/* Background Spotlight */}
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-[#d4b07c]/[0.015] rounded-full blur-[110px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4b07c]/10 border border-[#d4b07c]/30 text-[#d4b07c] text-[10px] font-mono font-bold tracking-widest uppercase mb-4">
            <div className="flex text-[#d4b07c]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
            </div>
            <span>5.0 RATING ON GOOGLE REVIEWS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-none font-creative mb-4">
            WHAT OUR <span className="text-[#d4b07c]">CLIENTS SAY</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-gray-400 font-light max-w-xl mx-auto">
            Real feedback from verified clients across Kundapura, Udupi, and Karnataka.
          </p>
        </div>

        {/* Real Testimonial Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {REAL_REVIEWS.map((t) => (
            <div
              key={t.author}
              className="p-6 sm:p-8 border border-white/10 bg-[#080808] hover:border-[#d4b07c]/40 flex flex-col justify-between h-full rounded-2xl relative group transition-all duration-500 shadow-xl"
            >
              {/* Top Row: Stars + Google Badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-1 text-[#d4b07c]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-[9px] font-mono font-bold tracking-widest text-[#d4b07c] uppercase bg-[#d4b07c]/10 px-2 py-0.5 rounded-full border border-[#d4b07c]/20">
                  VERIFIED CLIENT
                </span>
              </div>

              {/* Quote Text */}
              <p className="text-sm sm:text-base text-gray-200 font-light leading-relaxed mb-8 flex-grow">
                {t.quote}
              </p>

              {/* Author Info & Profile Image */}
              <div className="border-t border-white/[0.08] pt-5 flex items-center gap-4 mt-auto">
                <div className="relative shrink-0">
                  <img 
                    src={t.avatar} 
                    alt={t.author}
                    onError={(e) => {
                      // Fallback if image fails
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#d4b07c]"
                  />
                  <div className="hidden w-12 h-12 rounded-full bg-[#d4b07c] text-black font-extrabold text-sm items-center justify-center border-2 border-white">
                    {t.initials}
                  </div>
                </div>

                <div className="text-left">
                  <h4 className="text-sm font-bold text-white tracking-wide uppercase font-display">
                    {t.author}
                  </h4>
                  <p className="text-[10px] font-mono tracking-wider text-gray-400 uppercase mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Google Reviews Link */}
        <div className="mt-12 text-center">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Elite+Studios+Siddapura"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#d4b07c] text-gray-300 hover:text-white font-bold text-xs uppercase tracking-widest transition-all hover:scale-105"
          >
            <span>READ ALL 20+ REVIEWS ON GOOGLE</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#d4b07c]" />
          </a>
        </div>

      </div>
    </section>
  );
}
