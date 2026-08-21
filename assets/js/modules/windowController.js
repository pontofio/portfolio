/**
 * WindowController.
 * Single responsibility: open/close/populate the popup window.
 * Works on ANY element that carries the shared data-title / data-tag /
 * data-desc / data-stack contract, whatever section it came from
 * (Liskov substitution: a project card, a timeline item, and an ethics
 * card are interchangeable "openable" items to this controller).
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
    this.descEl.textContent = desc || '';

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

  /** Wires click handling for a collection of openable elements. */
  bindOpenTriggers(elements) {
    elements.forEach((element) => {
      element.addEventListener('click', () => this.open(element));
    });
  }
};
