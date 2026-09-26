import React from 'react';

const SERVICES_TERMS = [
  {
    num: '01',
    title: 'Web Development',
    terms: [
      'Website development will follow the features and scope agreed in the quotation.',
      'Client must provide required content, images, logos, and information on time.',
      'Additional features or major changes outside the agreed scope may have additional charges.',
      'Domain, hosting, third-party services, and renewals are charged separately unless included in the quotation.'
    ]
  },
  {
    num: '02',
    title: 'Graphic Design',
    terms: [
      'Designs will be created according to the agreed requirements and specifications.',
      'The number of revisions will be limited to the amount mentioned in the quotation/package.',
      'Major changes or completely new concepts may be treated as additional work.',
      'Final files will be delivered in the agreed formats; source/editable files are included only when specified.'
    ]
  },
  {
    num: '03',
    title: 'Video Editing',
    terms: [
      'Editing will be completed according to the agreed duration, style, format, and requirements.',
      'Client is responsible for providing usable footage, images, audio, logos, and other required materials.',
      'Included revisions will follow the limit mentioned in the quotation/package.',
      'Premium assets, licensed music, stock footage, or additional editing requirements may involve extra charges.'
    ]
  },
  {
    num: '04',
    title: 'Digital Marketing',
    terms: [
      'Marketing activities will follow the services and platforms included in the selected package.',
      'Advertising budget paid to Meta, Google, or other platforms is separate unless specifically mentioned.',
      'Elite Studios does not guarantee specific leads, sales, followers, reach, or revenue.',
      'Campaign performance may vary due to market conditions, competition, platform algorithms, and other external factors.'
    ]
  },
  {
    num: '05',
    title: 'Social Media Handling',
    terms: [
      'Content creation and management will be provided according to the selected monthly package.',
      'Posts, reels, platforms, and revisions are limited to the quantities mentioned in the package.',
      'Client must provide required business information, offers, photos, videos, and approvals on time.',
      'Unused monthly content does not carry forward unless specifically agreed.'
    ]
  },
  {
    num: '06',
    title: 'Live Streaming',
    terms: [
      'Live streaming services depend on the agreed equipment, venue, internet, power, and streaming platform.',
      'Changes in event timing, location, duration, or equipment requirements may result in additional charges.',
      'Elite Studios will make reasonable efforts to provide a stable stream but cannot guarantee uninterrupted service due to external technical issues.',
      'Platform restrictions, internet failures, power failures, or third-party outages are outside Elite Studios\' control.'
    ]
  }
];

const GENERAL_TERMS = [
  'Payment terms and advance amounts will be mentioned in the quotation.',
  'Work outside the agreed scope may be charged separately.',
  'Project timelines may change due to delayed content, approvals, payments, or third-party services.',
  'Once work has started, cancellation and refund terms will depend on the work completed and expenses incurred.'
];

const ADDITIONAL_SERVICES_TERMS = [
  {
    prefix: 'Any feature, service, revision, integration, or requirement outside the agreed quotation/package will be considered an ',
    strong: 'Additional Service',
    suffix: '.'
  },
  {
    text: 'Additional Services will be quoted separately based on the work, time, resources, and third-party costs involved.'
  },
  {
    text: 'Work on an Additional Service will begin after Client approval of the applicable cost or quotation.'
  },
  {
    text: 'Additional Services may affect the original project timeline and may require separate payment or advance payment.'
  }
];

export default function Terms() {
  return (
    <section
      id="terms"
      className="scroll-mt-24 md:scroll-mt-32 py-4 md:py-8 px-6 md:px-12 lg:px-16 bg-[#050505] text-[#f3f4f6] relative"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Main Section Header */}
        <div className="mb-12 md:mb-16 text-left reveal">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4b07c] font-bold block mb-3 font-display">
            Legal & Policies
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase font-display mb-4">
            Terms of Service
          </h2>
          <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed max-w-3xl">
            These Terms apply to services provided by Elite Studios. By confirming a project or making payment, the Client agrees to the applicable terms below.
          </p>
        </div>

        {/* Six Service Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_TERMS.map((service, index) => (
            <div
              key={service.num}
              className="p-6 sm:p-7 bg-[#0b0b0b] border border-white/[0.06] flex flex-col justify-start text-left transition-colors duration-300 hover:border-white/15 reveal"
              style={{ transitionDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/[0.06]">
                <span className="font-mono text-xs text-[#d4b07c] font-semibold tracking-wider">
                  {service.num}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-white/30">
                  Service Terms
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight font-display mb-4">
                {service.title}
              </h3>

              <ul className="space-y-3 flex-1">
                {service.terms.map((term, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-400 font-normal leading-relaxed"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#d4b07c]/70 mt-1.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* General Terms Subsection */}
        <div className="mt-8 sm:mt-10 p-6 sm:p-8 bg-[#090909] border border-white/[0.06] text-left reveal">
          <div className="flex items-center gap-3 mb-5 pb-3 border-b border-white/[0.06]">
            <span className="w-2 h-2 rounded-full bg-[#d4b07c]" aria-hidden="true" />
            <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-display">
              General Terms
            </h3>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5">
            {GENERAL_TERMS.map((term, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-400 font-normal leading-relaxed"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#d4b07c]/60 mt-1.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Separate Additional Services Subsection */}
        <div className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-white/[0.08] text-left reveal">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4b07c] font-bold block mb-2.5 font-display">
              Scope & Add-ons
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase font-display mb-3">
              Additional Services — Terms & Conditions
            </h3>
            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-3xl">
              Any service, feature, revision, integration, or requirement outside the agreed quotation or package will be considered an Additional Service.
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-8">
            {ADDITIONAL_SERVICES_TERMS.map((item, index) => (
              <li
                key={index}
                className="p-4 sm:p-5 bg-[#0b0b0b] border border-white/[0.05] flex items-start gap-3 text-xs sm:text-sm text-gray-300 font-normal leading-relaxed"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#d4b07c] mt-2 shrink-0"
                  aria-hidden="true"
                />
                {item.strong ? (
                  <span>
                    {item.prefix}
                    <strong className="font-semibold text-white">{item.strong}</strong>
                    {item.suffix}
                  </span>
                ) : (
                  <span>{item.text}</span>
                )}
              </li>
            ))}
          </ul>

          {/* Supporting line: Examples of Additional Services */}
          <div className="p-5 sm:p-6 bg-[#080808] border border-white/[0.04]">
            <h4 className="text-xs uppercase tracking-widest text-[#d4b07c] font-bold font-display mb-2">
              Examples of Additional Services
            </h4>
            <p className="text-xs sm:text-sm text-gray-400 font-normal leading-relaxed">
              Additional Services may include extra website features, custom dashboards, mobile apps, AI integrations, payment gateways, APIs, SEO, extra designs/videos, photography/videography, influencer collaborations, hosting, domain services, premium software, on-site services, urgent work, and other requirements outside the original scope.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
