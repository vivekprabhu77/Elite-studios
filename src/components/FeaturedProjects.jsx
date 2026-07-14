import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import archImg from '../assets/project_architecture.png';

const PROJECTS = [
  {
    id: 1,
    client: 'Virtue Arch',
    title: 'Minimalist brutalist villa & architectural identity.',
    category: 'Branding & Web Design',
    year: '2025',
    type: 'image',
    src: archImg
  },
  {
    id: 2,
    client: 'Aura Cosmetics',
    title: 'Luxury skincare e-commerce & bottle mockups.',
    category: 'Luxury E-commerce & Brand Book',
    year: '2025',
    type: 'skincare-mockup'
  },
  {
    id: 3,
    client: 'Kinetic Lab',
    title: 'Fluid kinetic sculpture motion design system.',
    category: 'Motion Design & Brand Identity',
    year: '2026',
    type: 'motion-mockup'
  },
  {
    id: 4,
    client: 'Elevate Partners',
    title: 'Next-gen venture investment web platform.',
    category: 'Digital Platform & UI/UX',
    year: '2026',
    type: 'finance-mockup'
  }
];

export default function FeaturedProjects() {
  return (
    <section id="work" className="py-32 px-6 md:px-12 bg-[#050505] relative overflow-hidden">
      {/* Background Spotlight */}
      <div className="absolute top-[40%] left-[-10%] w-[600px] h-[600px] bg-white/[0.005] rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-24 text-left reveal">
          <span className="text-xs uppercase tracking-widest text-[#d4b07c] font-bold block mb-4 font-display">
            Selected Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none font-creative">
            FEATURED <span className="text-[#d4b07c]">PROJECTS</span>
          </h2>
        </div>

        {/* Portfolio Layout */}
        <div className="flex flex-col gap-32">
          {PROJECTS.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={project.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                } reveal`}
              >
                {/* Visual Thumbnail Column */}
                <div
                  className={`lg:col-span-7 w-full ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="group relative overflow-hidden aspect-[16/10] bg-[#0b0b0b] border border-white/5 cursor-pointer hover:border-[#d4b07c]/20 transition-colors duration-500">
                    
                    {/* Project Visual Render */}
                    <div className="w-full h-full transform group-hover:scale-[1.025] transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]">
                      {project.type === 'image' && (
                        <img
                          src={project.src}
                          alt={project.client}
                          className="w-full h-full object-cover filter brightness-[0.75] hover:brightness-[0.9] transition-all duration-[1s]"
                        />
                      )}

                      {/* Custom CSS/SVG Premium Layout for Aura Skincare */}
                      {project.type === 'skincare-mockup' && (
                        <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-tr from-[#050505] to-[#121212] overflow-hidden">
                          {/* Radial Background Spotlight */}
                          <div className="absolute w-[60%] h-[60%] rounded-full bg-[#d4b07c]/5 blur-[80px]"></div>
                          {/* Skincare Bottle CSS Illustration */}
                          <div className="w-24 h-48 bg-gradient-to-b from-[#d4b07c]/30 to-black border border-white/10 rounded-xl relative shadow-2xl flex flex-col justify-between p-4 backdrop-blur-sm transform rotate-[-6deg] group-hover:rotate-[0deg] transition-transform duration-[1s]">
                            <div className="w-16 h-8 bg-black/40 border border-white/10 mx-auto rounded-md flex items-center justify-center text-[6px] tracking-wider text-white/50">
                              AURA
                            </div>
                            <div className="h-20 w-[1px] bg-white/20 mx-auto"></div>
                            <div className="text-[6px] text-center tracking-[0.2em] uppercase text-white/40">
                              SKIN ESSENCE
                            </div>
                          </div>
                          {/* Tiny luxury layout text details */}
                          <div className="absolute bottom-6 left-6 font-mono text-[9px] text-white/30 tracking-widest uppercase">
                            02 / COSMETICS
                          </div>
                        </div>
                      )}

                      {/* Custom CSS/SVG Premium Layout for Kinetic Energy */}
                      {project.type === 'motion-mockup' && (
                        <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-[#050505] to-[#0c0d12] overflow-hidden">
                          {/* Animated SVG Abstract Waves */}
                          <svg className="w-[80%] h-[80%] opacity-40" viewBox="0 0 400 200">
                            <defs>
                              <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#d4b07c" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#d4b07c" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                            <path
                              d="M10,100 Q100,20 200,100 T390,100"
                              fill="none"
                              stroke="url(#waveGrad)"
                              strokeWidth="2"
                              className="animate-pulse-slow"
                            />
                            <path
                              d="M10,80 Q90,50 200,120 T390,80"
                              fill="none"
                              stroke="url(#waveGrad)"
                              strokeWidth="0.75"
                              strokeDasharray="4 4"
                            />
                          </svg>
                          <div className="absolute bottom-6 left-6 font-mono text-[9px] text-[#d4b07c]/60 tracking-widest uppercase">
                            03 / SCULPTURAL MOTION
                          </div>
                        </div>
                      )}

                      {/* Custom CSS/SVG Premium Layout for Elevate Capital */}
                      {project.type === 'finance-mockup' && (
                        <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-bl from-[#050505] to-[#121212] overflow-hidden p-8">
                          {/* Minimal Financial UI Dashboard Container */}
                          <div className="w-full max-w-[280px] bg-[#0d0d0d] border border-white/10 rounded p-4 font-mono text-left scale-90 sm:scale-100 group-hover:border-[#d4b07c]/20 transition-all duration-[1s] shadow-2xl">
                            <div className="flex justify-between items-center mb-6 pb-2 border-b border-white/5">
                              <span className="text-[8px] text-[#d4b07c] tracking-wider font-bold">ELEVATE PLATFORM</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-[#d4b07c] animate-pulse"></span>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <div className="text-[7px] text-white/30 uppercase">Fund Performance</div>
                                <div className="text-sm font-bold text-white tracking-tight mt-1">$4,821,080.20</div>
                              </div>
                              {/* Mini Line Chart */}
                              <div className="h-10 w-full flex items-end gap-1.5">
                                <div className="h-[20%] w-full bg-white/10 group-hover:h-[40%] transition-all duration-700"></div>
                                <div className="h-[40%] w-full bg-white/20 group-hover:h-[70%] transition-all duration-700"></div>
                                <div className="h-[30%] w-full bg-[#d4b07c]/30 group-hover:h-[50%] transition-all duration-700"></div>
                                <div className="h-[60%] w-full bg-[#d4b07c]/40 group-hover:h-[80%] transition-all duration-700"></div>
                                <div className="h-[85%] w-full bg-[#d4b07c] group-hover:h-[95%] transition-all duration-700"></div>
                              </div>
                            </div>
                          </div>
                          <div className="absolute bottom-6 left-6 font-mono text-[9px] text-white/30 tracking-widest uppercase">
                            04 / FINTECH WEB UI
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Image overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* View project diagonal arrow card overlay */}
                    <div className="absolute bottom-6 right-6 w-12 h-12 flex items-center justify-center bg-[#d4b07c] text-black border border-[#d4b07c] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 rounded-none z-20">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Text Metadata Column */}
                <div
                  className={`lg:col-span-5 text-left flex flex-col justify-center ${
                    isEven ? 'lg:order-2 lg:pl-8' : 'lg:order-1 lg:pr-8'
                  }`}
                >
                  <div className="flex items-center gap-6 mb-4 text-[10px] font-mono tracking-widest uppercase text-white/40">
                    <span className="text-[#d4b07c]">{project.client}</span>
                    <span className="w-1.5 h-1.5 bg-[#d4b07c]/30 rounded-full"></span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight mb-4 font-display group-hover:text-[#d4b07c] transition-colors duration-300">
                    {project.title}
                  </h3>

                  <span className="text-xs uppercase tracking-widest text-[#d4b07c] block mb-6 font-display font-bold">
                    {project.category}
                  </span>

                  <div>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white hover:text-[#d4b07c] transition-colors duration-300 group py-1.5 border-b border-white/20 hover:border-[#d4b07c]"
                    >
                      <span>View Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
