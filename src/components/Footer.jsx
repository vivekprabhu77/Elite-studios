import React from 'react';
import { Link } from 'react-router-dom';
import footerLogo from '../assets/ELITE STUDIOS.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Services', to: '/services' },
    { label: 'Work', to: '/work' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' }
  ];

  const socialLinks = [
    {
      label: 'Behance',
      url: 'https://www.behance.net/elitegraphics9',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current text-white/80 shrink-0" viewBox="0 0 24 24">
          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-4.726 3-3.101 0-5-2.072-5-5.074 0-2.883 1.874-4.926 4.792-4.926 2.946 0 4.549 1.989 4.398 4.767h-6.843c.061 1.285 1.002 2.122 2.366 2.122 1.157 0 1.848-.567 2.155-1.289h2.858zm-4.761-4.717c-1.077 0-1.802.73-1.897 1.806h3.693c-.042-1.054-.741-1.806-1.796-1.806zm-10.965-7.283h-8v14h8.337c3.125 0 5.163-1.604 5.163-4.212 0-1.889-1.058-3.08-2.39-3.567 1.059-.446 1.794-1.523 1.794-3.042 0-2.261-1.782-3.179-4.904-3.179zm-4.498 2.651h3.361c1.399 0 2.215.535 2.215 1.621 0 1.132-.862 1.674-2.28 1.674h-3.296v-3.295zm0 5.753h3.582c1.554 0 2.477.625 2.477 1.871 0 1.341-1.007 1.956-2.585 1.956h-3.474v-3.827z"/>
        </svg>
      )
    },
    {
      label: 'Instagram',
      url: 'https://www.instagram.com/elite_studios_siddapura/?__pwa=1',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current text-white/80 shrink-0" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      label: 'YouTube',
      url: 'https://www.youtube.com/@EliteGraphicsSiddapura',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current text-white/80 shrink-0" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      label: 'Facebook',
      url: 'https://www.facebook.com/share/18Ku7beirK/',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current text-white/80 shrink-0" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-black text-gray-400 py-16 lg:py-24 px-6 md:px-12 border-t border-white/[0.06] relative z-10 overflow-hidden site-footer">
      {/* Background radial spotlight highlight */}
      <div className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-[#d4b07c]/[0.03] to-transparent rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/[0.06] footer-grid">

          {/* Logo & Pitch */}
          <div className="lg:col-span-5 flex flex-col items-start text-left footer-brand-col">
            <Link to="/">
              <img
                src={footerLogo}
                alt="Elite Studios Logo"
                className="h-32 sm:h-36 lg:h-40 w-auto object-contain mb-5 select-none footer-logo-img"
              />
            </Link>
            <p className="text-xs sm:text-sm text-gray-400 font-normal leading-relaxed max-w-md footer-pitch-text">
              We design and engineer digital interfaces that demand attention. Crafting luxury minimalism, bespoke branding, and high-performance React frontends.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 flex flex-col items-start text-left footer-nav-col">
            <h4 className="text-xs uppercase font-bold tracking-[0.25em] text-[#d4b07c] font-display mb-6 footer-col-heading">
              Navigation
            </h4>
            <div className="flex flex-col gap-2.5 text-xs w-full footer-links-group">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="hover:text-[#d4b07c] text-gray-300 transition-all duration-300 tracking-wider uppercase text-[11px] font-bold flex items-center gap-2.5 group py-2.5 px-3.5 rounded-lg bg-white/[0.03] border border-white/[0.07] hover:bg-[#d4b07c]/10 hover:border-[#d4b07c]/40 footer-link-item"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4b07c] opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 shrink-0"></span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Socials Column */}
          <div className="lg:col-span-2 flex flex-col items-start text-left footer-social-col">
            <h4 className="text-xs uppercase font-bold tracking-[0.25em] text-[#d4b07c] font-display mb-6 footer-col-heading">
              Socials
            </h4>
            <div className="flex flex-col gap-2.5 text-xs w-full footer-links-group">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-xs font-semibold text-gray-300 hover:text-[#d4b07c] transition-all duration-300 group py-2.5 px-3.5 rounded-lg bg-white/[0.03] border border-white/[0.07] hover:bg-[#d4b07c]/10 hover:border-[#d4b07c]/40 footer-link-item"
                >
                  <span className="p-1 rounded-md bg-white/[0.06] text-white group-hover:bg-[#d4b07c] group-hover:text-black transition-all duration-300 shrink-0">
                    {item.icon}
                  </span>
                  <span className="tracking-wider uppercase text-[11px] font-bold">{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact / Office Column */}
          <div className="lg:col-span-3 flex flex-col items-start text-left footer-contact-col">
            <h4 className="text-xs uppercase font-bold tracking-[0.25em] text-[#d4b07c] font-display mb-6 footer-col-heading">
              Elite Office
            </h4>
            <div className="flex flex-col gap-2.5 text-xs font-light w-full footer-contact-group">
              <div className="flex flex-col gap-1 text-gray-300 py-2 px-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <span className="text-white font-semibold text-sm">Siddapura</span>
                <span className="text-xs text-gray-400">Karnataka, India</span>
                <span className="text-[11px] text-gray-400 font-mono mt-1 pt-1 border-t border-white/[0.04]">Mon - Sat: 10:30 AM - 8:00 PM</span>
              </div>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=elitestudiossiddapura@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-gray-300 hover:text-[#d4b07c] transition-all duration-300 text-xs font-semibold py-2.5 px-3.5 rounded-lg bg-white/[0.03] border border-white/[0.07] hover:bg-[#d4b07c]/10 hover:border-[#d4b07c]/40 footer-email-btn"
              >
                <span>elitestudiossiddapura@gmail.com</span>
              </a>
              <a
                href="tel:+917259174667"
                className="flex items-center gap-2.5 text-gray-300 hover:text-[#d4b07c] transition-all duration-300 text-xs font-semibold py-2.5 px-3.5 rounded-lg bg-white/[0.03] border border-white/[0.07] hover:bg-[#d4b07c]/10 hover:border-[#d4b07c]/40 footer-phone-btn"
              >
                <span>+91 7259174667</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono tracking-widest uppercase text-white/40 footer-bottom">
          <span>&copy; {currentYear} ELITE STUDIOS. ALL RIGHTS RESERVED.</span>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors duration-300">PRIVACY POLICY</a>
            <a href="#terms" className="hover:text-white transition-colors duration-300">TERMS OF SERVICE</a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-[#d4b07c] transition-colors duration-300 flex items-center gap-1 font-bold text-white/60"
            >
              <span>TOP</span>
              <span>&uarr;</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
