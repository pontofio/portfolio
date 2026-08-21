/**
 * ScrollSpy.
 * Single responsibility: observe sections and toggle the "active" class on
 * the matching nav link. Knows nothing about how the nav or sections were
 * built.
 */
window.Portfolio = window.Portfolio || {};

window.Portfolio.initScrollSpy = function initScrollSpy(navLinks, sections, { threshold = 0.5 } = {}) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.dataset.target === entry.target.id);
        });
      }
    });
  }, { threshold });

  sections.forEach((section) => observer.observe(section));

  return observer;
};
