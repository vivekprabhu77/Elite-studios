export const WHATSAPP_PHONE = '917259174667';
export const WHATSAPP_FORMATTED_PHONE = '+91 7259174667';
export const WHATSAPP_EMAIL = 'elitestudiossiddapura@gmail.com';

export const DEFAULT_WHATSAPP_MESSAGE = `Hi Elite Studios! 👋

I'm interested in your services and would like to discuss my project with your team.

Could you please guide me on the next steps?

Looking forward to hearing from you. 😊`;

export const getWhatsAppProjectUrl = () => {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE)}`;
};
