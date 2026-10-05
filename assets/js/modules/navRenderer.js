/**
 * Nav renderer.
 * Single responsibility: turn nav data and theme switcher into interactive elements inside the dock.
 */
window.Portfolio = window.Portfolio || {};

window.Portfolio.renderNav = function renderNav(navItems, container) {
  const { el } = window.Portfolio;
  container.innerHTML = '';

  // Create dock wrapper if not already present
  let wrapper = container.parentElement;
  if (!wrapper || !wrapper.classList.contains('dock-wrapper')) {
    // If container is nav#nav, wrap it or append switch beside it
  }

  // Generate nav links
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

  // Create or retrieve Theme Switch
  const existingSwitch = document.getElementById('themeSwitch');
  if (existingSwitch) existingSwitch.remove();

  const sunSvg = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
  const moonSvg = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  const switchBtn = el('button', {
    id: 'themeSwitch',
    class: 'theme-toggle-switch',
    'aria-label': 'Changer de thème (clair/sombre)',
    type: 'button',
    html: `<span class="switch-track"><span class="switch-icon-left">${sunSvg}</span><span class="switch-icon-right">${moonSvg}</span><span class="switch-thumb"></span></span>`
  });

  function updateTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      switchBtn.classList.add('is-dark');
    } else {
      switchBtn.classList.remove('is-dark');
    }
  }

  // Detect preferred theme or saved theme
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  updateTheme(initialTheme);

  switchBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', next);
    updateTheme(next);
  });

  // Append switchBtn next to container inside dock-wrapper
  if (container.parentElement && container.parentElement.classList.contains('dock-wrapper')) {
    container.parentElement.appendChild(switchBtn);
  } else {
    // Wrap container and switch
    const parent = container.parentElement || document.body;
    const dockWrap = el('div', { class: 'dock-wrapper' });
    parent.insertBefore(dockWrap, container);
    dockWrap.appendChild(container);
    dockWrap.appendChild(switchBtn);
  }
};
