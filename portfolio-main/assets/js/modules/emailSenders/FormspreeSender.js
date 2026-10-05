/**
 * FormspreeSender.
 * Sends the form payload to a Formspree endpoint.
 * Create a form at https://formspree.io, copy its endpoint, and pass it in.
 *
 * Usage (in main.js):
 *   const sender = new Portfolio.emailSenders.FormspreeSender('https://formspree.io/f/your-id');
 */
window.Portfolio = window.Portfolio || {};
window.Portfolio.emailSenders = window.Portfolio.emailSenders || {};

window.Portfolio.emailSenders.FormspreeSender = class FormspreeSender extends (
  window.Portfolio.emailSenders.EmailSender
) {
  constructor(endpoint) {
    super();
    this.endpoint = endpoint;
  }

  async send(payload) {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Formspree a répondu avec le statut ${response.status}`);
    }

    return response.json();
  }
};
