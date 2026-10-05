/**
 * ContactForm.
 * Handles form markup, validation, and submission delegation.
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

    this.nameField = el('input', {
      type: 'text',
      id: 'contact-name',
      name: 'name',
      placeholder: 'ex: Alex Martin',
      autocomplete: 'name',
      required: 'true'
    });

    this.emailField = el('input', {
      type: 'email',
      id: 'contact-email',
      name: 'email',
      placeholder: 'ex: alex.martin@entreprise.com',
      autocomplete: 'email',
      required: 'true'
    });

    this.subjectField = el('input', {
      type: 'text',
      id: 'contact-subject',
      name: 'subject',
      placeholder: 'ex: Échange technique / Question sur un projet SI'
    });

    this.messageField = el('textarea', {
      id: 'contact-message',
      name: 'message',
      rows: '5',
      placeholder: 'Décrivez votre projet, vos questions ou votre proposition...',
      required: 'true'
    });

    this.statusEl = el('p', { class: 'form-status', role: 'status' }, '');

    const sendSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
    this.submitBtn = el('button', {
      type: 'submit',
      class: 'send-btn',
      html: `<span>Envoyer le message</span>${sendSvg}`
    });

    const form = el('form', { class: 'contact-form', novalidate: 'true' }, [
      el('div', { class: 'field' }, [el('label', { for: 'contact-name' }, 'Nom complet *'), this.nameField]),
      el('div', { class: 'field' }, [el('label', { for: 'contact-email' }, 'Adresse email *'), this.emailField]),
      el('div', { class: 'field' }, [el('label', { for: 'contact-subject' }, 'Sujet du message'), this.subjectField]),
      el('div', { class: 'field' }, [el('label', { for: 'contact-message' }, 'Message *'), this.messageField]),
      this.submitBtn,
      this.statusEl,
    ]);

    form.addEventListener('submit', (e) => this._handleSubmit(e));
    return form;
  }

  _validate() {
    const name = this.nameField.value.trim();
    const email = this.emailField.value.trim();
    const subject = this.subjectField.value.trim();
    const message = this.messageField.value.trim();

    // Reset error styles
    [this.nameField, this.emailField, this.messageField].forEach(f => {
      f.parentElement.classList.remove('field-error');
    });

    if (!name) {
      this.nameField.parentElement.classList.add('field-error');
      this.nameField.focus();
      return { valid: false, message: 'Merci d\'indiquer votre nom.' };
    }
    if (!isValidEmail(email)) {
      this.emailField.parentElement.classList.add('field-error');
      this.emailField.focus();
      return { valid: false, message: 'Merci d\'indiquer une adresse email valide.' };
    }
    if (!message) {
      this.messageField.parentElement.classList.add('field-error');
      this.messageField.focus();
      return { valid: false, message: 'Le message ne peut pas être vide.' };
    }

    return { valid: true, payload: { name, email, subject, message } };
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
      this._setStatus('✓ Message préparé / envoyé avec succès — merci !', 'success');
      this.node.reset();
    } catch (err) {
      this._setStatus('L\'envoi a rencontré une difficulté, réessayez plus tard.', 'error');
      console.error('[ContactForm] Erreur lors de l\'envoi :', err);
    } finally {
      this.submitBtn.disabled = false;
    }
  }

  _setStatus(text, kind) {
    this.statusEl.textContent = text;
    this.statusEl.className = `form-status${kind ? ` ${kind}` : ''}`;
  }
};
