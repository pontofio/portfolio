/**
 * EmailJSSender.
 * Sends the form payload via EmailJS's REST API (no SDK script needed).
 * Create an account at https://www.emailjs.com, set up a service + a
 * template, and fill in the three values below.
 *
 * Usage (in main.js):
 *   const sender = new Portfolio.emailSenders.EmailJSSender({
 *     serviceId: 'your_service_id',
 *     templateId: 'your_template_id',
 *     publicKey: 'your_public_key',
 *   });
 */
window.Portfolio = window.Portfolio || {};
window.Portfolio.emailSenders = window.Portfolio.emailSenders || {};

window.Portfolio.emailSenders.EmailJSSender = class EmailJSSender extends (
  window.Portfolio.emailSenders.EmailSender
) {
  constructor({ serviceId, templateId, publicKey }) {
    super();
    this.serviceId = serviceId;
    this.templateId = templateId;
    this.publicKey = publicKey;
  }

  async send(payload) {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: this.serviceId,
        template_id: this.templateId,
        user_id: this.publicKey,
        template_params: payload,
      }),
    });

    if (!response.ok) {
      throw new Error(`EmailJS a répondu avec le statut ${response.status}`);
    }

    return { ok: true };
  }
};
