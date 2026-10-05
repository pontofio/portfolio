/**
 * Section Renderers.
 * Builds the HTML structure for each portfolio section.
 */
window.Portfolio = window.Portfolio || {};

(function () {
  const { el } = window.Portfolio;

  function openableAttrs(item, { title, tag, desc, stack, ext, image, category }) {
    return {
      class: 'file-card',
      tabindex: '0',
      'role': 'button',
      'data-ext': ext || '',
      'data-category': category || '',
      'data-title': title || '',
      'data-tag': tag || '',
      'data-desc': desc || '',
      'data-image': image || item.image || '',
      'data-stack': (stack || []).join(', '),
    };
  }

  // Toast notification helper
  function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = el('div', { id: 'toast', class: 'toast', role: 'status', 'aria-live': 'polite' });
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // Floating Action Button (CV FAB)
  function initCvFab(cvPdfPath = 'assets/CV.pdf') {
    const existingFab = document.getElementById('cvFab');
    if (existingFab) existingFab.remove();

    const viewSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
    const dlSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';
    const cvMainSvg = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>';

    const fabContainer = el('div', { id: 'cvFab', class: 'cv-fab-container' }, [
      el('div', { class: 'cv-fab-options' }, [
        el('a', {
          href: cvPdfPath,
          target: '_blank',
          rel: 'noopener noreferrer',
          class: 'cv-fab-bubble',
          html: `${viewSvg}<span>Consulter le CV (PDF)</span>`
        }),
        el('a', {
          href: cvPdfPath,
          download: 'CV_Fiona_Pontoparia.pdf',
          class: 'cv-fab-bubble',
          html: `${dlSvg}<span>Télécharger le PDF</span>`
        })
      ]),
      el('button', {
        class: 'cv-fab-trigger',
        type: 'button',
        'aria-label': 'Options du CV',
        title: 'Curriculum Vitae',
        html: `${cvMainSvg}<span class="cv-fab-tooltip">CV</span>`
      })
    ]);

    const trigger = fabContainer.querySelector('.cv-fab-trigger');
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      fabContainer.classList.toggle('is-open');
    });

    document.addEventListener('click', (e) => {
      if (!fabContainer.contains(e.target)) {
        fabContainer.classList.remove('is-open');
      }
    });

    document.body.appendChild(fabContainer);
  }

  // Hero Section
  // Hero Section
  window.Portfolio.renderHero = function renderHero(profile) {
    initCvFab(profile.cvPdf || 'assets/CV.pdf');

    // Status Pill
    const statusPill = el('div', { class: 'hero-badge' }, [
      el('span', { class: 'status-dot-pulse' }),
      el('span', { class: 'badge-text' }, profile.status || 'À l\'écoute d\'opportunités · Alternance Ingénieure')
    ]);

    // Heading with warm greeting & gradient highlight
    const heading = el('h1', { class: 'hero-title' }, [
      el('span', { class: 'hero-greeting' }, 'Bonjour, je suis'),
      el('span', { class: 'hero-name-gradient' }, profile.name)
    ]);

    // Subtitle & Bio
    const roleBadge = el('div', { class: 'hero-role-badge' }, profile.subtitle);
    const bioText = el('p', { class: 'hero-bio' }, profile.bio);

    // Quick Highlight Chips
    const chipsRow = el('div', { class: 'hero-chips-row' }, [
      el('span', { class: 'hero-chip' }, '🎓 Itii Picardie · Cycle Ingénieur'),
      el('span', { class: 'hero-chip' }, '🏢 Saverglass · Études & Dév.'),
      profile.location ? el('span', { class: 'hero-chip' }, `📍 ${profile.location}`) : null
    ].filter(Boolean));

    // Action CTA Buttons
    const actions = el('div', { class: 'hero-actions' }, [
      el('a', { href: '#projets', class: 'btn-primary' }, [
        el('span', {}, 'Explorer mes projets'),
        el('span', { class: 'btn-arrow' }, '↓')
      ]),
      el('a', {
        href: profile.cvPdf || 'assets/CV.pdf',
        target: '_blank',
        rel: 'noopener noreferrer',
        class: 'btn-secondary'
      }, [
        el('svg', {
          width: '16',
          height: '16',
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': '2',
          html: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>'
        }),
        el('span', {}, 'Consulter le CV (PDF)')
      ]),
      el('a', { href: '#contact', class: 'btn-ghost' }, 'Me contacter →')
    ]);

    const leftCol = el('div', { class: 'hero-text-col' }, [
      statusPill,
      heading,
      roleBadge,
      bioText,
      chipsRow,
      actions
    ]);

    // Right Column: Sleek Modern Profile Card
    let rightCol = null;
    if (profile.photo) {
      rightCol = el('div', { class: 'hero-card-col' }, [
        el('div', { class: 'profile-card' }, [
          el('div', { class: 'profile-card-image-wrap' }, [
            el('img', { src: profile.photo, alt: profile.name, class: 'profile-card-photo' }),
            el('div', { class: 'profile-card-overlay-badge' }, [
              el('span', { class: 'status-dot-pulse mini' }),
              el('span', {}, 'Saverglass × Itii')
            ])
          ]),
          el('div', { class: 'profile-card-body' }, [
            el('div', { class: 'profile-card-name' }, profile.name),
            el('div', { class: 'profile-card-role' }, 'Cheffe de Projet MOA / MOE'),
            el('div', { class: 'profile-card-stats' }, [
              el('div', { class: 'mini-stat' }, [
                el('span', { class: 'mini-stat-val' }, '3+ ans'),
                el('span', { class: 'mini-stat-lbl' }, 'Parcours SI')
              ]),
              el('div', { class: 'mini-stat' }, [
                el('span', { class: 'mini-stat-val' }, '60+'),
                el('span', { class: 'mini-stat-lbl' }, 'Applications')
              ]),
              el('div', { class: 'mini-stat' }, [
                el('span', { class: 'mini-stat-val' }, 'MOA/MOE'),
                el('span', { class: 'mini-stat-lbl' }, 'Double profil')
              ])
            ])
          ])
        ])
      ]);
    }

    return el('section', { id: 'accueil', class: 'hero-section modern-hero' }, [leftCol, rightCol].filter(Boolean));
  };

  // Timeline Section
  window.Portfolio.renderTimeline = function renderTimeline(timeline) {
    const list = el(
      'div',
      { class: 'timeline-track' },
      timeline.map((entry) => {
        const node = el('div', { class: 'timeline-node', title: entry.type || '' }, entry.icon || '●');

        const header = el('div', { class: 'timeline-header' }, [
          el('span', { class: 'timeline-date' }, entry.date),
          entry.type ? el('span', { class: 'timeline-type' }, entry.type) : null
        ].filter(Boolean));

        const titleRow = el('div', { class: 'timeline-title-row' }, [
          el('h3', { class: 'timeline-title' }, entry.title),
          entry.sub ? el('span', { class: 'timeline-sub' }, `· ${entry.sub}`) : null
        ].filter(Boolean));

        const descEl = entry.desc ? el('p', { class: 'timeline-desc' }, entry.desc) : null;

        let mediaBadge = null;
        if (entry.image) {
          mediaBadge = el('span', { class: 'timeline-media-badge' }, [
            el('span', {}, '📷'),
            el('span', {}, 'Photo disponible · Cliquez pour voir')
          ]);
        }

        const body = el('div', { class: 'timeline-body' }, [
          header,
          titleRow,
          descEl,
          mediaBadge
        ].filter(Boolean));

        return el(
          'div',
          {
            class: 'timeline-item',
            tabindex: '0',
            role: 'button',
            'data-ext': entry.ext || '.log',
            'data-title': entry.title,
            'data-tag': entry.tag || entry.date,
            'data-desc': `<div class='modal-block'><h4 class='modal-subtitle'>${entry.title} — ${entry.sub || ''}</h4><p>${entry.desc}</p></div>`,
            'data-image': entry.image || '',
            'data-category': 'parcours'
          },
          [node, body]
        );
      })
    );

    return el('section', { id: 'parcours' }, [
      el('p', { class: 'eyebrow' }, '01 /parcours'),
      el('h2', {}, 'Parcours & Expériences'),
      el('p', { class: 'lead' }, 'Mon cursus d\'ingénieure, mes immersions en entreprise et mes engagements citoyens.'),
      list,
    ]);
  };

  // Projects Section
  window.Portfolio.renderProjects = function renderProjects(projects, categories = []) {
    const defaultCategories = [
      { id: 'all', label: 'Tous les projets' },
      { id: 'si', label: 'Gestion de projet & SI' },
      { id: 'sec', label: 'Sécurité SI' },
      { id: 'dev', label: 'Développement Web' },
      { id: 'aca', label: 'Académique' }
    ];
    const catList = categories.length > 0 ? categories : defaultCategories;

    // Filter Buttons Bar
    const filterContainer = el('div', { class: 'project-filters', role: 'tablist' });
    catList.forEach((cat, index) => {
      const btn = el('button', {
        class: `filter-btn${index === 0 ? ' active' : ''}`,
        'data-filter': cat.id,
        role: 'tab',
        'aria-selected': index === 0 ? 'true' : 'false'
      }, cat.label);

      btn.addEventListener('click', () => {
        filterContainer.querySelectorAll('.filter-btn').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filter = cat.id;
        const cards = grid.querySelectorAll('.file-card');
        cards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('is-hidden');
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
      filterContainer.appendChild(btn);
    });

    // Render Cards
    const codePlaceholderSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>';

    const grid = el(
      'div',
      { class: 'grid' },
      projects.map((project) => {
        const attrs = openableAttrs(project, project);
        attrs['data-category'] = project.category || 'si';

        // Media thumbnail
        let mediaEl = null;
        if (project.image) {
          mediaEl = el('div', { class: 'card-media' }, [
            el('img', { src: project.image, alt: project.title, loading: 'lazy' })
          ]);
        } else {
          mediaEl = el('div', { class: 'card-media' }, [
            el('div', { class: 'card-media-placeholder', html: `${codePlaceholderSvg}<span>Système & Support</span>` })
          ]);
        }

        // Top badges overlay
        const badgesOverlay = el('div', { class: 'card-badges' }, [
          el('span', { class: 'card-ext-badge' }, project.ext || '.app'),
          project.statusBadge ? el('span', { class: 'card-status-badge' }, project.statusBadge) : null
        ].filter(Boolean));
        mediaEl.appendChild(badgesOverlay);

        // Tech stack chips
        const stackContainer = el('div', { class: 'card-stack' },
          (project.stack || []).slice(0, 4).map(tech => el('span', { class: 'stack-chip' }, tech))
        );

        // Card Content
        const contentEl = el('div', { class: 'card-content' }, [
          project.categoryLabel ? el('span', { class: 'card-category' }, project.categoryLabel) : null,
          el('h3', {}, project.title),
          el('p', { class: 'desc' }, project.shortDesc),
          stackContainer,
          el('div', { class: 'card-footer' }, [
            el('span', { class: 'card-action-text' }, 'Consulter la fiche projet →')
          ])
        ].filter(Boolean));

        const card = el('div', attrs, [mediaEl, contentEl]);
        return card;
      })
    );

    return el('section', { id: 'projets' }, [
      el('p', { class: 'eyebrow' }, '02 /projets'),
      el('h2', {}, 'Projets & Réalisations Applicatives'),
      el('p', { class: 'lead' }, 'Déploiement d\'ERP, sécurisation SI, développement web et ingénierie des exigences.'),
      filterContainer,
      grid,
    ]);
  };

  // Skills Section
  window.Portfolio.renderSkills = function renderSkills(skillGroups) {
    // Live Search Filter for Skills
    const searchIconSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
    const searchInput = el('input', {
      type: 'text',
      placeholder: 'Filtrer les compétences (ex: Python, ERP, MOA...)',
      'aria-label': 'Rechercher une compétence'
    });

    const searchBar = el('div', { class: 'skills-search-bar' }, [
      el('span', { class: 'skills-search-icon', html: searchIconSvg }),
      searchInput
    ]);

    const groups = el(
      'div',
      { class: 'skill-groups' },
      skillGroups.map((group) => {
        const itemsList = el(
          'ul',
          {},
          group.items.map((item) => el('li', {}, item))
        );

        return el('div', { class: 'skill-group' }, [
          el('div', { class: 'skill-group-header' }, [
            group.icon ? el('span', { class: 'skill-group-icon' }, group.icon) : null,
            el('h4', {}, group.title),
          ].filter(Boolean)),
          itemsList
        ]);
      })
    );

    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const allLis = groups.querySelectorAll('li');
      allLis.forEach((li) => {
        if (!q) {
          li.classList.remove('skill-match');
        } else if (li.textContent.toLowerCase().includes(q)) {
          li.classList.add('skill-match');
        } else {
          li.classList.remove('skill-match');
        }
      });
    });

    return el('section', { id: 'competences' }, [
      el('p', { class: 'eyebrow' }, '03 /compétences'),
      el('h2', {}, 'Répertoire des Compétences'),
      el('p', { class: 'lead' }, 'Une double compétence à la croisée de la gestion de projet fonctionnelle (MOA) et du socle technique (MOE).'),
      searchBar,
      groups,
    ]);
  };

  // Ethics Section
  window.Portfolio.renderEthics = function renderEthics(ethics) {
    const grid = el(
      'div',
      { class: 'ethics-grid' },
      ethics.items.map((item) => {
        const attrs = openableAttrs(item, item);
        attrs.class = 'ethics-card';
        attrs['data-category'] = 'engagement';

        return el('div', attrs, [
          el('div', { class: 'ethics-header' }, [
            el('div', { class: 'ethics-icon' }, item.icon || '♥'),
            item.tag ? el('span', { class: 't-date' }, item.tag) : null
          ].filter(Boolean)),
          el('h3', {}, item.title),
          item.shortDesc ? el('div', { class: 'hero-subtitle', style: 'font-size:0.92rem; margin-bottom:0.5rem;' }, item.shortDesc) : null,
          el('p', { class: 'desc' }, item.desc),
          el('span', { class: 'card-action-text', style: 'margin-top:auto;' }, 'Lire le retour d\'expérience →')
        ]);
      })
    );

    return el('section', { id: 'ethique' }, [
      el('p', { class: 'eyebrow' }, '04 /éthique & rse'),
      el('h2', {}, 'Engagements & Valeurs Humaines'),
      el('p', { class: 'lead' }, ethics.intro),
      grid,
    ]);
  };

  // Contact Section
  window.Portfolio.renderContact = function renderContact(contact, formNode) {
    // Left column: Contact Info Cards
    const copySvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
    const mailSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>';
    const mapPinSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';
    const ghSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>';

    const copyBtn = el('button', {
      type: 'button',
      class: 'btn-copy-email',
      title: 'Copier l\'adresse email',
      html: `${copySvg}<span>Copier</span>`
    });

    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(contact.email);
        showToast('✓ Adresse e-mail copiée dans le presse-papier !');
      } catch (e) {
        showToast(`Email : ${contact.email}`);
      }
    });

    const emailCard = el('div', { class: 'contact-card' }, [
      el('div', { class: 'contact-card-title', html: `${mailSvg}<span>Adresse E-mail</span>` }),
      el('div', { class: 'contact-email-row' }, [
        el('a', { href: `mailto:${contact.email}`, class: 'contact-email-text' }, contact.email),
        copyBtn
      ])
    ]);

    const locationCard = contact.location ? el('div', { class: 'contact-card' }, [
      el('div', { class: 'contact-card-title', html: `${mapPinSvg}<span>Localisation & Mobilité</span>` }),
      el('div', { class: 'contact-email-text', style: 'font-size:0.88rem; font-weight:500;' }, contact.location)
    ]) : null;

    let githubCard = null;
    if (contact.githubUsername) {
      githubCard = el('div', { class: 'contact-card' }, [
        el('div', { class: 'contact-card-title', html: `${ghSvg}<span>Profil GitHub</span>` }),
        el('a', {
          href: `https://github.com/${contact.githubUsername}`,
          target: '_blank',
          rel: 'noopener noreferrer',
          class: 'contact-email-text',
          style: 'color:var(--primary);'
        }, `@${contact.githubUsername}`),
        el('div', { class: 'github-chart-container' }, [
          el('img', {
            src: `https://ghchart.rshah.org/059669/${contact.githubUsername}`,
            alt: `Activité GitHub de ${contact.githubUsername}`,
            class: 'github-chart',
            onerror: function () { this.style.display = 'none'; }
          })
        ])
      ]);
    }

    const cvCard = el('div', { class: 'contact-card' }, [
      el('div', { class: 'contact-card-title' }, 'Curriculum Vitae'),
      el('div', { style: 'display:flex; gap:0.5rem; flex-wrap:wrap; margin-top:0.3rem;' }, [
        el('a', { href: 'assets/CV.pdf', target: '_blank', class: 'btn-secondary', style: 'padding:0.5rem 1rem; font-size:0.84rem;' }, 'Consulter en ligne'),
        el('a', { href: 'assets/CV.pdf', download: 'CV_Fiona_Pontoparia.pdf', class: 'btn-primary', style: 'padding:0.5rem 1rem; font-size:0.84rem;' }, 'Télécharger (PDF)')
      ])
    ]);

    const infoCol = el('div', { class: 'contact-info-col' }, [
      emailCard,
      locationCard,
      githubCard,
      cvCard
    ].filter(Boolean));

    const formCol = el('div', { class: 'contact-form-col' }, [formNode]);

    const layout = el('div', { class: 'contact-layout' }, [infoCol, formCol]);

    return el('section', { id: 'contact' }, [
      el('p', { class: 'eyebrow' }, '05 /contact'),
      el('h2', {}, 'Entrer en Contact'),
      el('p', { class: 'lead' }, contact.intro),
      layout
    ]);
  };
})();
