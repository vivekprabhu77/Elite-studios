import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  MapPin, 
  Check, 
  Copy, 
  ArrowUpRight,
  Clock,
  ChevronDown
} from 'lucide-react';
import { getWhatsAppProjectUrl, WHATSAPP_FORMATTED_PHONE, WHATSAPP_EMAIL } from '../utils/whatsapp';
import Services3DBox from '../components/Services3DBox';
import '../contact-responsive.css';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const socialLinks = [
    { label: 'Behance', url: 'https://www.behance.net/elitegraphics9' },
    { label: 'Instagram', url: 'https://www.instagram.com/elite_studios_siddapura/?__pwa=1' },
    { label: 'YouTube', url: 'https://www.youtube.com/@EliteGraphicsSiddapura' },
    { label: 'Facebook', url: 'https://www.facebook.com/share/18Ku7beirK/' }
  ];

  const faqs = [
    {
      q: 'How fast can we begin your project?',
      a: 'Once we align on scope and contract, onboarding begins immediately. Project turnarounds range between 2 to 4 weeks depending on requirements.'
    },
    {
      q: 'What happens when I click "Start Your Project"?',
      a: 'Clicking "Start Your Project" opens WhatsApp directly with a pre-filled message so you can chat directly with our team.'
    },
    {
      q: 'Do you work with international clients?',
      a: 'Yes, over half of our clients are global. We manage communication seamlessly across time zones.'
    },
    {
      q: 'Can I email project briefs or RFPs?',
      a: 'Yes, feel free to send any documentation directly to elitestudiossiddapura@gmail.com.'
    }
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(WHATSAPP_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(WHATSAPP_FORMATTED_PHONE);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 md:pt-[140px] pb-24 px-6 md:px-12 relative overflow-hidden font-sans">
      {/* Subtle Gold Radial Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#d4b07c]/[0.06] to-transparent rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#d4b07c] block mb-4 font-display">
            INITIATE A PROJECT
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display uppercase tracking-tight text-white leading-[1.05] mb-6">
            LET'S BUILD SOMETHING <span className="text-[#d4b07c]">EXTRAORDINARY.</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg font-normal leading-relaxed">
            Reach out directly via WhatsApp, email, or telephone. We respond promptly to all project inquiries.
          </p>
        </div>

        {/* Main Direct Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          {/* Card 1: WhatsApp CTA */}
          <div className="p-8 sm:p-10 rounded-2xl bg-white/[0.02] border border-[#d4b07c]/30 hover:border-[#d4b07c]/60 transition-all duration-300 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.8)] relative group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#d4b07c]/10 border border-[#d4b07c]/40 text-[#d4b07c] flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#d4b07c] block mb-2">
                INSTANT WHATSAPP CHAT
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Start Your Project
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed mb-8">
                Connect with our lead designers and developers on WhatsApp for instant feedback, project scope discussions, and quotes.
              </p>
            </div>

            <a
              href={getWhatsAppProjectUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#d4b07c] text-black font-extrabold text-xs uppercase tracking-[0.2em] rounded-lg hover:bg-[#c39f6b] transition-all duration-300 shadow-[0_0_25px_rgba(212,176,124,0.25)] hover:scale-[1.01]"
            >
              <span>START YOUR PROJECT &rarr;</span>
            </a>
          </div>

          {/* Card 2: Official Email */}
          <div className="p-8 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#d4b07c]" />
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.1] text-gray-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#d4b07c]" />
                      <span className="text-[#d4b07c] text-[10px] font-bold uppercase">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[10px] uppercase font-bold">Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#d4b07c] block mb-2">
                OFFICIAL EMAIL
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-mono text-white mb-3 break-all">
                {WHATSAPP_EMAIL}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed mb-8">
                Send project RFPs, design briefs, or documentation directly to our inbox.
              </p>
            </div>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=elitestudiossiddapura@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/[0.04] border border-white/[0.1] hover:border-[#d4b07c]/50 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-lg transition-colors"
            >
              <span>SEND EMAIL (GMAIL)</span>
              <ArrowUpRight className="w-4 h-4 text-[#d4b07c]" />
            </a>
          </div>

        </div>

        {/* Secondary Details: Phone & Studio Location */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
          
          {/* Phone Card */}
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4b07c]">
                  Telephone
                </span>
                <button
                  onClick={handleCopyPhone}
                  className="p-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy Phone"
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-[#d4b07c]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <a
                href={`tel:${WHATSAPP_FORMATTED_PHONE.replace(/\s+/g, '')}`}
                className="text-lg font-bold font-mono text-white hover:text-[#d4b07c] transition-colors"
              >
                {WHATSAPP_FORMATTED_PHONE}
              </a>
            </div>
            <span className="text-[11px] text-gray-500 mt-4 block">Direct Call & WhatsApp</span>
          </div>

          {/* Headquarters */}
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.08]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4b07c] block mb-3">
              Studio Location
            </span>
            <h4 className="text-base font-bold text-white">Siddapura</h4>
            <p className="text-xs text-gray-400">Karnataka, India</p>
          </div>

          {/* Working Hours */}
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.08]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4b07c] block mb-3">
              Operating Hours
            </span>
            <h4 className="text-base font-bold text-white">Mon - Sat</h4>
            <p className="text-xs text-gray-400">10:30 AM - 8:00 PM IST</p>
          </div>

        </div>

        {/* 3D Interactive Capabilities Vault */}
        <Services3DBox />

        {/* Social Links Bar */}
        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] mb-20 text-center">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#d4b07c] block mb-6 font-display">
            CONNECT ON SOCIAL MEDIA
          </span>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#d4b07c]/40 hover:bg-[#d4b07c]/10 text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-[#d4b07c] transition-all duration-300 flex items-center gap-2"
              >
                <span>{social.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto pt-10 border-t border-white/[0.08]">
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#d4b07c] block mb-2">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Common Inquiries</h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-white/[0.02] border border-white/[0.08] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-white hover:text-[#d4b07c] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#d4b07c] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-gray-400 font-light leading-relaxed border-t border-white/[0.04] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
