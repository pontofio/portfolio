/**
 * CustomCursor.
 * Single responsibility: render a small trailing cursor and grow it over
 * clickable elements. Self-disables on touch devices / reduced motion by
 * simply not activating (native cursor is untouched in that case).
 */
window.Portfolio = window.Portfolio || {};

window.Portfolio.initCustomCursor = function initCustomCursor(clickableSelector) {
  const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!supportsFinePointer || prefersReducedMotion) return;

  const { el } = window.Portfolio;
  const dot = el('div', { class: 'cursor-dot' });
  const ring = el('div', { class: 'cursor-ring' });
  document.body.append(dot, ring);
  document.body.classList.add('custom-cursor-active');

  let ringX = window.innerWidth / 2;
  let ringY = window.innerHeight / 2;
  let targetX = ringX;
  let targetY = ringY;

  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    dot.style.left = `${targetX}px`;
    dot.style.top = `${targetY}px`;
  });

  function animate() {
    // gentle easing so the ring trails slightly behind the dot
    ringX += (targetX - ringX) * 0.18;
    ringY += (targetY - ringY) * 0.18;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(clickableSelector)) {
      ring.classList.add('is-active');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(clickableSelector)) {
      ring.classList.remove('is-active');
    }
  });
};
