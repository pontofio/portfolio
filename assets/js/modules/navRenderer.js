/**
 * Nav renderer.
 * Single responsibility: turn nav data into link elements inside the dock.
 * Does not decide which link is active — that's ScrollSpy's job.
 */
window.Portfolio = window.Portfolio || {};

window.Portfolio.renderNav = function renderNav(navItems, container) {
  const { el } = window.Portfolio;
  navItems.forEach((item, index) => {
    const link = el(
      'a',
      {
        href: `#${item.target}`,
        'data-target': item.target,
        class: index === 0 ? 'active' : '',
      },
      item.label
    );
    container.appendChild(link);
  });
};
