/**
 * Section renderers.
 * Single responsibility per function: turn one slice of content data into
 * DOM nodes for one section. Adding a new section type means adding a new
 * function here — existing renderers never need to change (open/closed).
 *
 * Every renderer that produces a clickable "openable" item emits the same
 * data-* attributes (title, tag, desc, stack, ext) so the WindowController
 * can handle any of them identically without knowing which section they
 * came from.
 */
window.Portfolio = window.Portfolio || {};

(function () {
  const { el } = window.Portfolio;

  function openableAttrs(item, { title, tag, desc, stack, ext }) {
    return {
      class: 'file-card',
      'data-ext': ext || '',
      'data-title': title,
      'data-tag': tag || '',
      'data-desc': desc || '',
      'data-stack': (stack || []).join(', '),
    };
  }

  window.Portfolio.renderHero = function renderHero(profile) {
    return el('section', { id: 'accueil' }, [
      el('p', { class: 'eyebrow' }, '~/portfolio'),
      el('h1', {}, profile.name),
      el('p', { class: 'lead' }, `${profile.subtitle}. ${profile.bio}`),
    ]);
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
      el('p', { class: 'eyebrow' }, '01 — /parcours'),
      el('h2', {}, 'Journal des évènements'),
      list,
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
        ])
      )
    );

    return el('section', { id: 'projets' }, [
      el('p', { class: 'eyebrow' }, '02 — /projets'),
      el('h2', {}, 'Fichiers du dossier'),
      grid,
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
      el('p', { class: 'eyebrow' }, '03 — /competences'),
      el('h2', {}, 'Répertoire des compétences'),
      groups,
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
        ])
      )
    );

    return el('section', { id: 'ethique' }, [
      el('p', { class: 'eyebrow' }, '04 — /ethique'),
      el('h2', {}, 'Notes de bas de page'),
      el('p', { class: 'lead', style: 'margin-bottom:36px;' }, ethics.intro),
      grid,
    ]);
  };

  window.Portfolio.renderContact = function renderContact(contact, formNode) {
    return el('section', { id: 'contact' }, [
      el('p', { class: 'eyebrow' }, '05 — /contact'),
      el('h2', {}, 'Ouvrir une discussion'),
      el('p', { class: 'lead', style: 'margin-bottom:32px;' }, contact.intro),
      formNode,
      el('p', { class: 'lead', style: 'margin-top:24px; font-size:12px;' }, contact.email),
    ]);
  };
})();
