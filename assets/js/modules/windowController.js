/**
 * WindowController.
 * Single responsibility: open/close/populate the popup window.
 */
window.Portfolio = window.Portfolio || {};

window.Portfolio.WindowController = class WindowController {
  constructor({ overlay, windowEl, closeBtn }) {
    this.overlay = overlay;
    this.windowEl = windowEl;
    this.closeBtn = closeBtn;
    this.pathEl = windowEl.querySelector('#win-path');
    this.titleEl = windowEl.querySelector('#win-title');
    this.tagEl = windowEl.querySelector('#win-tag');
    this.descEl = windowEl.querySelector('#win-desc');
    this.stackEl = windowEl.querySelector('#win-stack');
    this.imgEl = windowEl.querySelector('#win-img');

    this.closeBtn.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }

  open(sourceEl) {
    const rect = sourceEl.getBoundingClientRect();
    this.windowEl.style.setProperty('--origin-x', `${rect.left + rect.width / 2}px`);
    this.windowEl.style.setProperty('--origin-y', `${rect.top + rect.height / 2}px`);

    const { title, tag, desc, stack, image } = sourceEl.dataset;

    this.pathEl.textContent = title || '';
    this.titleEl.textContent = title || '';
    this.tagEl.textContent = tag || '';
    this.descEl.innerHTML = desc || '';

    if (this.imgEl) {
      if (image) {
        this.imgEl.src = image;
        this.imgEl.alt = title || '';
        this.imgEl.style.display = 'block';
      } else {
        this.imgEl.src = '';
        this.imgEl.style.display = 'none';
      }
    }

    this.stackEl.innerHTML = '';
    (stack || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((tech) => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = tech;
        this.stackEl.appendChild(span);
      });

    this.overlay.classList.add('open');
  }

  close() {
    this.overlay.classList.remove('open');
  }

  bindOpenTriggers(elements) {
    elements.forEach((element) => {
      element.addEventListener('click', () => this.open(element));
    });
  }
};
