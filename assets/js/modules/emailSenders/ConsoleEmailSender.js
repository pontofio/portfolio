/**
 * ConsoleEmailSender.
 * Default sender that opens the client's mail application with the message
 * pre-filled (targeting pontofiona@gmail.com) and logs to console.
 * Swap this for FormspreeSender or EmailJSSender in main.js once an API key is set.
 */
window.Portfolio = window.Portfolio || {};
window.Portfolio.emailSenders = window.Portfolio.emailSenders || {};

window.Portfolio.emailSenders.ConsoleEmailSender = class ConsoleEmailSender extends (
  window.Portfolio.emailSenders.EmailSender
) {
  constructor(recipientEmail = 'pontofiona@gmail.com') {
    super();
    this.recipientEmail = recipientEmail;
  }

  async send(payload) {
    console.info('[ConsoleEmailSender] Message prêt à être envoyé :', payload);
    
    // Fallback directly to mailto so the message actually reaches Fiona
    const subject = encodeURIComponent(payload.subject || `Contact Portfolio — ${payload.name}`);
    const body = encodeURIComponent(
      `Nom: ${payload.name}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}`
    );
    const mailtoUrl = `mailto:${this.recipientEmail}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 400);

    return { ok: true, simulated: true };
  }
};
