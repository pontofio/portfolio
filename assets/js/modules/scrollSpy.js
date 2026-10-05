/**
 * ScrollSpy.
 * Observes sections and highlights the active nav link in the dock as the user scrolls.
 */
window.Portfolio = window.Portfolio || {};

window.Portfolio.initScrollSpy = function initScrollSpy(navLinks, sections) {
  // Use scroll position or intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.dataset.target === id);
        });
      }
    });
  }, {
    rootMargin: '-15% 0px -65% 0px',
    threshold: 0
  });

  sections.forEach((section) => observer.observe(section));

  // Fallback on scroll for smooth edge cases (e.g. top of page / bottom of page)
  window.addEventListener('scroll', () => {
    if (window.scrollY < 100 && navLinks[0]) {
      navLinks.forEach((l, i) => l.classList.toggle('active', i === 0));
    } else if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
      const lastIndex = navLinks.length - 1;
      navLinks.forEach((l, i) => l.classList.toggle('active', i === lastIndex));
    }
  }, { passive: true });

  return observer;
};
