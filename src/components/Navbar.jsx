import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/ELITE STUDIOS.png';
import { Send } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'HOME', to: '/' },
    { label: 'ABOUT US', to: '/about' },
    { label: 'SERVICES', to: '/#services' },
    { label: 'PORTFOLIO', to: '/work' },
    { label: 'PACKAGES', to: '/#packages' },
    { label: 'CONTACT', to: '/contact' }
  ];

  // Helper to check if a navigation item is active
  const checkActive = (item) => {
    if (item.to.includes('#')) {
      const [path, hash] = item.to.split('#');
      return location.pathname === path && location.hash === `#${hash}`;
    }
    // If we're on the home page and there is a hash in location, HOME shouldn't be active
    if (item.to === '/' && location.pathname === '/' && location.hash) {
      return false;
    }
    return location.pathname === item.to;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-12 lg:px-16 ${
          isScrolled
            ? 'py-4 bg-[#050505]/90 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'pt-4 pb-6 bg-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between w-full relative h-16">
          {/* Logo */}
          <div className="absolute left-0 -top-12 md:-top-[68px] z-50">
            <Link to="/" className="flex items-center group">
              <img
                src={logo}
                alt="Elite Studios"
                className="w-auto object-contain transition-all duration-500 group-hover:scale-[1.01] h-36 md:h-[210px]"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10 mx-auto">
            {navItems.map((item) => {
              const isActive = checkActive(item);
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={`text-[10px] font-bold tracking-[0.25em] transition-all duration-300 relative py-1 uppercase ${
                    isActive ? 'text-[#d4b07c]' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#d4b07c]"></span>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block z-50">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] border border-[#d4b07c] text-[#d4b07c] transition-all duration-300 hover:bg-[#d4b07c] hover:text-black rounded-md"
            >
              <span>LET'S TALK</span>
              <Send className="w-3 h-3" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex flex-col justify-between w-6 h-4 z-50 relative focus:outline-none ml-auto"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`w-full h-0.5 bg-white transition-all duration-300 origin-left ${isMobileMenuOpen ? 'rotate-45 translate-y-[-1px]' : ''}`}></span>
            <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-full h-0.5 bg-white transition-all duration-300 origin-left ${isMobileMenuOpen ? '-rotate-45 translate-y-[1px]' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div className={`fixed inset-0 z-45 bg-[#050505] flex flex-col justify-center items-center px-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-4'}`}>
        <div className="flex flex-col gap-6 text-center">
          {navItems.map((item, idx) => {
            const isActive = checkActive(item);
            return (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ transitionDelay: `${idx * 0.06}s` }}
                className={`text-xl font-light tracking-widest uppercase hover:text-gray-400 transition-colors duration-300 ${
                  isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                } transition-all duration-500 ${isActive ? 'text-[#d4b07c]' : 'text-white'}`}
              >
                {item.label}
              </NavLink>
            );
          })}
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`mt-8 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest border border-[#d4b07c] text-[#d4b07c] transition-colors duration-300 bg-transparent rounded-md hover:bg-[#d4b07c] hover:text-black flex items-center justify-center gap-2 ${
              isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            } transition-all duration-500`}
            style={{ transitionDelay: '0.4s' }}
          >
            <span>LET'S TALK</span>
            <Send className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </>
  );
}

