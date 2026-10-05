/**
 * WindowController.
 * Controls opening, closing, cycling, and populating the project/detail popup window.
 */
window.Portfolio = window.Portfolio || {};

window.Portfolio.WindowController = class WindowController {
  constructor({ overlay, windowEl, closeBtn, prevBtn, nextBtn }) {
    this.overlay = overlay;
    this.windowEl = windowEl;
    this.closeBtn = closeBtn;
    this.prevBtn = prevBtn;
    this.nextBtn = nextBtn;

    this.pathEl = windowEl.querySelector('#win-path');
    this.titleEl = windowEl.querySelector('#win-title');
    this.tagEl = windowEl.querySelector('#win-tag');
    this.categoryEl = windowEl.querySelector('#win-category');
    this.descEl = windowEl.querySelector('#win-desc');
    this.stackEl = windowEl.querySelector('#win-stack');
    this.imgEl = windowEl.querySelector('#win-img');
    this.mediaWrapEl = windowEl.querySelector('#win-media-wrap');

    this.items = [];
    this.currentIndex = -1;
    this.lastFocusedElement = null;

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.navigate(-1));
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.navigate(1));
    }

    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (!this.isOpen()) return;
      if (e.key === 'Escape') {
        this.close();
      } else if (e.key === 'ArrowLeft') {
        this.navigate(-1);
      } else if (e.key === 'ArrowRight') {
        this.navigate(1);
      }
    });
  }

  isOpen() {
    return this.overlay.classList.contains('open');
  }

  open(sourceEl) {
    this.lastFocusedElement = sourceEl;
    this.currentIndex = this.items.indexOf(sourceEl);
    this.populate(sourceEl);

    this.overlay.classList.add('open');
    document.body.classList.add('modal-open');
    if (this.closeBtn) this.closeBtn.focus();
  }

  close() {
    this.overlay.classList.remove('open');
    document.body.classList.remove('modal-open');
    if (this.lastFocusedElement) {
      this.lastFocusedElement.focus();
    }
  }

  navigate(direction) {
    if (this.items.length === 0) return;
    
    // Filter to only visible items (skip filtered-out project cards)
    const visibleItems = this.items.filter((item) => !item.classList.contains('is-hidden'));
    if (visibleItems.length === 0) return;

    let currentVisibleIndex = visibleItems.indexOf(this.items[this.currentIndex]);
    if (currentVisibleIndex === -1) currentVisibleIndex = 0;

    currentVisibleIndex = (currentVisibleIndex + direction + visibleItems.length) % visibleItems.length;
    const targetItem = visibleItems[currentVisibleIndex];
    if (targetItem) {
      this.currentIndex = this.items.indexOf(targetItem);
      this.populate(targetItem);
    }
  }

  populate(sourceEl) {
    const { title, tag, desc, stack, image, ext, category } = sourceEl.dataset;
    const displayExt = ext ? (ext.startsWith('.') ? ext : `.${ext}`) : '.txt';

    if (this.pathEl) {
      const cleanTitle = (title || 'fichier')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-');
      this.pathEl.textContent = `~/portfolio/${category ? `${category}/` : ''}${cleanTitle}${displayExt}`;
    }

    if (this.titleEl) this.titleEl.textContent = title || '';
    if (this.tagEl) {
      this.tagEl.textContent = tag || '';
      this.tagEl.style.display = tag ? 'inline-block' : 'none';
    }

    if (this.categoryEl) {
      if (category) {
        this.categoryEl.textContent = category.toUpperCase();
        this.categoryEl.style.display = 'inline-block';
      } else {
        this.categoryEl.style.display = 'none';
      }
    }

    if (this.descEl) this.descEl.innerHTML = desc || '';

    if (this.imgEl && this.mediaWrapEl) {
      if (image) {
        this.imgEl.src = image;
        this.imgEl.alt = title || 'Aperçu du projet';
        this.mediaWrapEl.style.display = 'block';
      } else {
        this.imgEl.src = '';
        this.mediaWrapEl.style.display = 'none';
      }
    }

    if (this.stackEl) {
      this.stackEl.innerHTML = '';
      const stackItems = (stack || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      if (stackItems.length > 0) {
        this.stackEl.style.display = 'flex';
        stackItems.forEach((tech) => {
          const span = document.createElement('span');
          span.className = 'tag';
          span.textContent = tech;
          this.stackEl.appendChild(span);
        });
      } else {
        this.stackEl.style.display = 'none';
      }
    }

    // Scroll window body back to top on content change
    const bodyEl = this.windowEl.querySelector('.window-body');
    if (bodyEl) bodyEl.scrollTop = 0;
  }

  bindOpenTriggers(elements) {
    this.items = Array.from(elements);
    this.items.forEach((element) => {
      element.addEventListener('click', () => this.open(element));
      // Keyboard Enter/Space activation for accessibility
      element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.open(element);
        }
      });
    });
  }
};
