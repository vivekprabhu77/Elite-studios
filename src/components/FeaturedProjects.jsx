import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getProjects } from '../utils/portfolioStore';

const CATEGORY_TABS = [
  'ALL',
  'Website Design',
  'Graphic Design',
  'Digital Marketing',
  'Video Editing',
  'Live Streaming',
  'Social Media'
];

export default function FeaturedProjects() {
  const [projects, setProjects] = useState(getProjects());
  const [activeCategory, setActiveCategory] = useState('ALL');

  useEffect(() => {
    const handleUpdate = () => {
      setProjects(getProjects());
    };
    window.addEventListener('portfolio-updated', handleUpdate);
    return () => window.removeEventListener('portfolio-updated', handleUpdate);
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === 'ALL') return true;
    const cat = (p.category || '').toLowerCase();
    const filter = activeCategory.toLowerCase();
    return cat.includes(filter) || filter.includes(cat);
  });

  return (
    <section id="work" className="scroll-mt-28 md:scroll-mt-36 pt-10 md:pt-14 pb-16 md:pb-24 px-6 md:px-12 bg-black relative overflow-hidden text-left">
      {/* Background Spotlight */}
      <div className="absolute top-[40%] left-[-10%] w-[600px] h-[600px] bg-white/[0.005] rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-8 md:mb-10 reveal">
          <span className="text-xs uppercase tracking-widest text-[#d4b07c] font-bold block mb-2 font-display">
            Selected Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none font-creative">
            FEATURED <span className="text-[#d4b07c]">PROJECTS</span>
          </h2>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12 pb-4 border-b border-white/10 reveal">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`px-5 py-2.5 text-xs font-mono tracking-widest uppercase transition-all duration-300 rounded-none border ${
                  isActive
                    ? 'bg-[#d4b07c] text-black border-[#d4b07c] font-bold shadow-[0_0_20px_rgba(212,176,124,0.2)]'
                    : 'bg-[#0a0a0a] text-white/60 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Portfolio Grid Layout: 3 Projects Per Row */}
        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center border border-white/5 bg-[#0b0b0b] p-12 max-w-2xl mx-auto reveal">
            <p className="text-xs font-mono uppercase tracking-widest text-[#d4b07c] mb-3 font-bold">
              {projects.length === 0 ? 'Database Empty' : 'No Projects Found'}
            </p>
            <p className="text-sm text-gray-300 font-light mb-6 leading-relaxed">
              {projects.length === 0
                ? 'All sample data has been cleared. Upload your images from the Admin Portal to see them saved in your MySQL database.'
                : `No projects match the "${activeCategory}" category. Try selecting "ALL" or upload a project under this category.`}
            </p>
            <a
              href="/admin"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4b07c] text-black font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors"
            >
              <span>Go to Admin Portal</span>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {filteredProjects.map((project, idx) => {
              const targetUrl = project.website_url || project.websiteUrl || '#contact';
              const hasExternalLink = Boolean(project.website_url || project.websiteUrl);

              return (
                <div
                  key={project.id || idx}
                  className="group flex flex-col bg-[#0b0b0b] border border-white/5 hover:border-[#d4b07c]/40 transition-all duration-500 reveal rounded-none overflow-hidden"
                >
                  {/* Top Image Container */}
                  <div className="relative aspect-[16/10] bg-[#050505] overflow-hidden cursor-pointer border-b border-white/5">
                    {project.src ? (
                      <img
                        src={project.src}
                        alt={project.client}
                        className="w-full h-full object-cover filter brightness-[0.8] group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#0d0d0d] text-white/20 font-mono text-xs">
                        NO IMAGE
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Hover Arrow Overlay */}
                    <a
                      href={targetUrl}
                      target={hasExternalLink ? '_blank' : '_self'}
                      rel="noreferrer"
                      className="absolute bottom-4 right-4 w-10 h-10 bg-[#d4b07c] text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Bottom Info Stacked Below Image */}
                  <div className="p-6 flex flex-col justify-between flex-grow text-left">
                    <div>
                      {/* Client & Year Header */}
                      <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest uppercase text-white/40 mb-2">
                        <span className="text-[#d4b07c] font-bold">{project.client}</span>
                        <span>•</span>
                        <span>{project.year || '2026'}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug mb-3 font-display group-hover:text-[#d4b07c] transition-colors duration-300 line-clamp-2">
                        {project.title}
                      </h3>

                      {/* Category Badge */}
                      <span className="text-[10px] uppercase tracking-widest text-[#d4b07c] font-bold block mb-4 font-display">
                        {project.category}
                      </span>
                    </div>

                    {/* Action Button Link */}
                    <div className="pt-4 border-t border-white/5 mt-auto">
                      <a
                        href={targetUrl}
                        target={hasExternalLink ? '_blank' : '_self'}
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/80 hover:text-[#d4b07c] transition-colors duration-300 group py-1"
                      >
                        <span>{hasExternalLink ? 'Visit Live Website' : 'View Case Study'}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
