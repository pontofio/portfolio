window.Portfolio = window.Portfolio || {};

window.Portfolio.renderNav = function renderNav(navItems, container) {
  const { el } = window.Portfolio;
  container.innerHTML = '';

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

  const existingSwitch = document.getElementById('themeSwitch');
  if (existingSwitch) existingSwitch.remove();

  const sunSvg = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
  const moonSvg = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  const switchBtn = el('button', {
    id: 'themeSwitch',
    class: 'theme-toggle-switch',
    'aria-label': 'Changer de thème',
    type: 'button',
    html: `<span class="switch-track"><span class="switch-icon-left">${sunSvg}</span><span class="switch-icon-right">${moonSvg}</span><span class="switch-thumb"></span></span>`
  });

  function updateThemeUI(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      switchBtn.classList.add('is-dark');
    } else {
      switchBtn.classList.remove('is-dark');
    }
  }

  const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
  updateThemeUI(savedTheme);

  switchBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', next);
    updateThemeUI(next);
  });

  document.body.appendChild(switchBtn);
};
(function () {
  const { el } = window.Portfolio;

  function openableAttrs(item, { title, tag, desc, stack, ext, image }) {
    return {
      class: 'file-card',
      'data-ext': ext || '',
      'data-title': title,
      'data-tag': tag || '',
      'data-desc': desc || '',
      'data-image': image || item.image || '',
      'data-stack': (stack || []).join(', '),
    };
  }

  window.Portfolio.renderHero = function renderHero(profile) {
	  const content = el('div', { class: 'hero-content' }, [
		el('p', { class: 'eyebrow' }, '~/portfolio'),
		el('h1', {}, profile.name),
		el('p', { class: 'lead' }, `${profile.subtitle}. ${profile.bio}`)
	  ]);

	  const children = [content];

	  if (profile.photo) {
		children.push(
		  el('img', {
			src: profile.photo,
			alt: profile.name,
			class: 'hero-photo'
		  })
		);
	  }

	  return el('section', { id: 'accueil', class: 'hero-section' }, children);
	};
  window.Portfolio.renderTimeline = function renderTimeline(timeline) {
    const list = el(
      'ul',
      { class: 'timeline' },
      timeline.map((entry) =>
        el(
          'li',
          {
            class: 't-item',
            'data-ext': entry.ext || '',
            'data-title': entry.title,
            'data-tag': entry.tag || entry.date,
            'data-desc': entry.desc,
            'data-image': entry.image || '',
          },
          [
            el('div', { class: 't-row' }, [
              el('span', { class: 't-date' }, entry.date),
              el('div', {}, [
                el('div', { class: 't-title' }, entry.title),
                el('div', { class: 't-sub' }, entry.sub),
              ]),
            ]),
          ]
        )
      )
    );
    return el('section', { id: 'parcours' }, [
      el('p', { class: 'eyebrow' }, '01 /parcours'),
      el('h2', {}, 'Journal des événements'),
      list,
    ]);
  };

  window.Portfolio.renderSkills = function renderSkills(skillGroups) {
    const groups = el(
      'div',
      { class: 'skill-groups' },
      skillGroups.map((group) =>
        el('div', { class: 'skill-group' }, [
          el('h4', {}, group.title),
          el(
            'ul',
            {},
            group.items.map((item) => el('li', {}, item))
          ),
        ])
      )
    );
    return el('section', { id: 'competences' }, [
      el('p', { class: 'eyebrow' }, '03 /competences'),
      el('h2', {}, 'Répertoire des compétences'),
      groups,
    ]);
  };

  window.Portfolio.renderProjects = function renderProjects(projects) {
	  const grid = el(
		'div',
		{ class: 'grid' },
		projects.map((project) =>
		  el('button', openableAttrs(project, project), [
			el('div', { class: 'icon' }, project.icon),
			el('h3', {}, project.title),
			el('span', { class: 'desc' }, project.shortDesc),
			el('span', { class: 'card-link' }, '→ voir détails'),
		  ])
		)
	  );
	  return el('section', { id: 'projets' }, [
		el('p', { class: 'eyebrow' }, '02 /projets'),
		el('h2', {}, 'Fichiers du dossier'),
		grid,
	  ]);
	};

 window.Portfolio.renderEthics = function renderEthics(ethics) {
	  const grid = el(
		'div',
		{ class: 'grid' },
		ethics.items.map((item) =>
		  el('button', openableAttrs(item, item), [
			el('div', { class: 'icon' }, item.icon),
			el('h3', {}, item.title),
			el('span', { class: 'desc' }, item.shortDesc),
			el('span', { class: 'card-link' }, '→ voir détails'),
		  ])
		)
	  );
	  return el('section', { id: 'ethique' }, [
		el('p', { class: 'eyebrow' }, '04 /ethique'),
		el('h2', {}, 'Notes de bas de page'),
		el('p', { class: 'lead', style: 'margin-bottom:36px;' }, ethics.intro),
		grid,
	  ]);
	};

  window.Portfolio.renderContact = function renderContact(contact, formNode) {
    return el('section', { id: 'contact' }, [
      el('p', { class: 'eyebrow' }, '05 /contact'),
      el('h2', {}, 'Ouvrir une discussion'),
      el('p', { class: 'lead', style: 'margin-bottom:32px;' }, contact.intro),
      formNode,
      el('p', { class: 'lead', style: 'margin-top:24px; font-size:12px;' }, contact.email),
    ]);
  };
})();