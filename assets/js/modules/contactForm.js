/**
 * ContactForm.
 * Single responsibility: render the form, validate input, and delegate
 * sending to whatever EmailSender it was given. It never picks a concrete
 * sender itself (dependency inversion) — main.js decides which
 * implementation to inject.
 */
window.Portfolio = window.Portfolio || {};

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

window.Portfolio.ContactForm = class ContactForm {
  /**
   * @param {EmailSender} emailSender - any object implementing send(payload)
   */
  constructor(emailSender) {
    this.emailSender = emailSender;
    this.node = this._buildNode();
  }

  _buildNode() {
    const { el } = window.Portfolio;

    this.nameField = el('input', { type: 'text', id: 'name', name: 'name', placeholder: 'Votre nom', required: 'true' });
    this.emailField = el('input', { type: 'email', id: 'email', name: 'email', placeholder: 'vous@exemple.com', required: 'true' });
    this.messageField = el('textarea', { id: 'message', name: 'message', rows: '4', placeholder: 'Votre message...', required: 'true' });
    this.statusEl = el('p', { class: 'form-status', role: 'status' }, '');
    this.submitBtn = el('button', { type: 'submit', class: 'send-btn' }, 'Envoyer');

    const form = el('form', { class: 'contact-form', novalidate: 'true' }, [
      el('div', { class: 'field' }, [el('label', { for: 'name' }, 'Nom'), this.nameField]),
      el('div', { class: 'field' }, [el('label', { for: 'email' }, 'Email'), this.emailField]),
      el('div', { class: 'field' }, [el('label', { for: 'message' }, 'Message'), this.messageField]),
      this.submitBtn,
      this.statusEl,
    ]);

    form.addEventListener('submit', (e) => this._handleSubmit(e));
    return form;
  }

  _validate() {
    const name = this.nameField.value.trim();
    const email = this.emailField.value.trim();
    const message = this.messageField.value.trim();

    if (!name) return { valid: false, message: 'Merci d\'indiquer votre nom.' };
    if (!isValidEmail(email)) return { valid: false, message: 'Merci d\'indiquer un email valide.' };
    if (!message) return { valid: false, message: 'Le message ne peut pas être vide.' };

    return { valid: true, payload: { name, email, message } };
  }

  async _handleSubmit(event) {
    event.preventDefault();

    const result = this._validate();
    if (!result.valid) {
      this._setStatus(result.message, 'error');
      return;
    }

    this.submitBtn.disabled = true;
    this._setStatus('Envoi en cours…', '');

    try {
      await this.emailSender.send(result.payload);
      this._setStatus('Message envoyé — merci !', 'success');
      this.node.reset();
    } catch (err) {
      this._setStatus('L\'envoi a échoué, réessayez plus tard.', 'error');
      console.error('[ContactForm] send failed:', err);
    } finally {
      this.submitBtn.disabled = false;
    }
  }

  _setStatus(text, kind) {
    this.statusEl.textContent = text;
    this.statusEl.className = `form-status${kind ? ` ${kind}` : ''}`;
  }
};
