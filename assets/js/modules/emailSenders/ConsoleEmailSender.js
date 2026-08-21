/**
 * ConsoleEmailSender.
 * Placeholder implementation: logs the payload instead of sending it.
 * Swap this for EmailJSSender or FormspreeSender (see the other files in
 * this folder) once real credentials are ready — nothing else in the app
 * needs to change.
 */
window.Portfolio = window.Portfolio || {};
window.Portfolio.emailSenders = window.Portfolio.emailSenders || {};

window.Portfolio.emailSenders.ConsoleEmailSender = class ConsoleEmailSender extends (
  window.Portfolio.emailSenders.EmailSender
) {
  async send(payload) {
    console.info('[ConsoleEmailSender] Message prêt à être envoyé :', payload);
    return { ok: true, simulated: true };
  }
};
