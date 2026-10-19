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
    <div className="min-h-screen bg-[#F6F7EB] text-[#393E41] pt-28 md:pt-[140px] pb-24 px-6 md:px-12 relative overflow-hidden font-sans">
      {/* Subtle Gold Radial Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#E94F37]/[0.03] to-transparent rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#E94F37] block mb-4 font-display">
            INITIATE A PROJECT
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display uppercase tracking-tight text-[#393E41] leading-[1.05] mb-6">
            LET'S BUILD SOMETHING <span className="text-[#E94F37]">EXTRAORDINARY.</span>
          </h1>
          <p className="text-[#393E41]/75 text-sm sm:text-base md:text-lg font-normal leading-relaxed">
            Reach out directly via WhatsApp, email, or telephone. We respond promptly to all project inquiries.
          </p>
        </div>

        {/* Main Direct Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          {/* Card 1: WhatsApp CTA */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#393E41] border border-[#393E41] hover:border-[#E94F37]/60 transition-all duration-300 flex flex-col justify-between shadow-xl relative group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#E94F37]/15 border border-[#E94F37]/40 text-[#E94F37] flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#E94F37] block mb-2">
                INSTANT WHATSAPP CHAT
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F6F7EB] mb-3">
                Start Your Project
              </h3>
              <p className="text-xs sm:text-sm text-[#F6F7EB]/75 font-light leading-relaxed mb-8">
                Connect with our lead designers and developers on WhatsApp for instant feedback, project scope discussions, and quotes.
              </p>
            </div>

            <a
              href={getWhatsAppProjectUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#E94F37] text-[#F6F7EB] font-extrabold text-xs uppercase tracking-[0.2em] rounded-lg hover:bg-[#d03e27] transition-all duration-300 shadow-[0_4px_24px_rgba(233,79,55,0.35)] hover:scale-[1.01]"
            >
              <span>START YOUR PROJECT &rarr;</span>
            </a>
          </div>

          {/* Card 2: Official Email */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#393E41] border border-[#393E41] hover:border-[#E94F37]/40 transition-all duration-300 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-black/25 border border-[#F6F7EB]/10 text-[#F6F7EB] flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#E94F37]" />
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-md bg-black/25 hover:bg-black/40 text-[#F6F7EB]/80 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#E94F37]" />
                      <span className="text-[#E94F37] text-[10px] font-bold uppercase">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[10px] uppercase font-bold">Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#E94F37] block mb-2">
                OFFICIAL EMAIL
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-mono text-[#F6F7EB] mb-3 break-all">
                {WHATSAPP_EMAIL}
              </h3>
              <p className="text-xs sm:text-sm text-[#F6F7EB]/75 font-light leading-relaxed mb-8">
                Send project RFPs, design briefs, or documentation directly to our inbox.
              </p>
            </div>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=elitestudiossiddapura@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-black/25 border border-[#F6F7EB]/15 hover:border-[#E94F37] text-[#F6F7EB] font-bold text-xs uppercase tracking-[0.2em] rounded-lg transition-colors"
            >
              <span>SEND EMAIL (GMAIL)</span>
              <ArrowUpRight className="w-4 h-4 text-[#E94F37]" />
            </a>
          </div>

        </div>

        {/* Secondary Details: Phone & Studio Location */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
          
          {/* Phone Card */}
          <div className="p-6 rounded-xl bg-[#393E41] border border-[#393E41] flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E94F37]">
                  Telephone
                </span>
                <button
                  onClick={handleCopyPhone}
                  className="p-1 text-[#F6F7EB]/60 hover:text-[#F6F7EB] transition-colors cursor-pointer"
                  title="Copy Phone"
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-[#E94F37]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <a
                href={`tel:${WHATSAPP_FORMATTED_PHONE.replace(/\s+/g, '')}`}
                className="text-lg font-bold font-mono text-[#F6F7EB] hover:text-[#E94F37] transition-colors"
              >
                {WHATSAPP_FORMATTED_PHONE}
              </a>
            </div>
            <span className="text-[11px] text-[#F6F7EB]/60 mt-4 block">Direct Call & WhatsApp</span>
          </div>

          {/* Headquarters */}
          <div className="p-6 rounded-xl bg-[#393E41] border border-[#393E41] shadow-md">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E94F37] block mb-3">
              Studio Location
            </span>
            <h4 className="text-base font-bold text-[#F6F7EB]">Siddapura</h4>
            <p className="text-xs text-[#F6F7EB]/70">Karnataka, India</p>
          </div>

          {/* Working Hours */}
          <div className="p-6 rounded-xl bg-[#393E41] border border-[#393E41] shadow-md">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E94F37] block mb-3">
              Operating Hours
            </span>
            <h4 className="text-base font-bold text-[#F6F7EB]">Mon - Sat</h4>
            <p className="text-xs text-[#F6F7EB]/70">10:30 AM - 8:00 PM IST</p>
          </div>

        </div>

        {/* 3D Interactive Capabilities Vault */}
        <Services3DBox />

        {/* Social Links Bar */}
        <div className="p-8 rounded-2xl bg-[#393E41] border border-[#393E41] mb-20 text-center shadow-lg">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#E94F37] block mb-6 font-display">
            CONNECT ON SOCIAL MEDIA
          </span>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-black/20 border border-[#F6F7EB]/10 hover:border-[#E94F37]/50 hover:bg-[#E94F37]/15 text-xs font-bold uppercase tracking-wider text-[#F6F7EB] hover:text-[#E94F37] transition-all duration-300 flex items-center gap-2"
              >
                <span>{social.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto pt-10 border-t border-[#393E41]/10">
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#E94F37] block mb-2">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#393E41] tracking-tight">Common Inquiries</h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-[#393E41] border border-[#393E41] overflow-hidden transition-all duration-300 shadow-md"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#F6F7EB] hover:text-[#E94F37] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#E94F37] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#F6F7EB]/80 font-light leading-relaxed border-t border-[#F6F7EB]/10 pt-3">
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
