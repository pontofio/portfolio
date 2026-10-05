/**
 * Ambient Cursor Spotlight.
 * Creates a soft ambient glow following the mouse across the background.
 * Preserves 100% native cursor behavior with zero floating ring artifacts.
 */
window.Portfolio = window.Portfolio || {};

window.Portfolio.initCustomCursor = function initCustomCursor() {
  const supportsFinePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!supportsFinePointer || prefersReducedMotion) return;

  const { el } = window.Portfolio;

  // Soft Ambient Spotlight in background (no borders, no rings, pure soft light)
  const spotlight = el('div', { class: 'cursor-spotlight' });
  document.body.appendChild(spotlight);

  let isVisible = false;

  document.addEventListener('mousemove', (e) => {
    if (!isVisible) {
      isVisible = true;
      spotlight.classList.add('cursor-visible');
    }
    spotlight.style.left = `${e.clientX}px`;
    spotlight.style.top = `${e.clientY}px`;
  });

  document.addEventListener('mouseenter', () => {
    isVisible = true;
    spotlight.classList.add('cursor-visible');
  });

  document.addEventListener('mouseleave', () => {
    isVisible = false;
    spotlight.classList.remove('cursor-visible');
  });
};

