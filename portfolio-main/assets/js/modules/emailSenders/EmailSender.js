/**
 * EmailSender interface.
 * Any concrete sender (EmailJS, Formspree, a mock for local testing) must
 * implement `send(payload)` and return a Promise. ContactForm depends only
 * on this shape (dependency inversion) — swapping providers never requires
 * touching contactForm.js.
 *
 * payload: { name: string, email: string, message: string }
 */
window.Portfolio = window.Portfolio || {};
window.Portfolio.emailSenders = window.Portfolio.emailSenders || {};

window.Portfolio.emailSenders.EmailSender = class EmailSender {
  async send(payload) {
    throw new Error('send() must be implemented by a concrete EmailSender');
  }
};
