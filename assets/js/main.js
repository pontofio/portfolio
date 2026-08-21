/**
 * Composition root — wires all modules together.
 * This is the only file that knows the whole app; every other module only
 * knows its own job. All modules attach themselves to window.Portfolio,
 * loaded in order via plain <script> tags in index.html (no ES module
 * `import`, so the site opens directly by double-clicking index.html).
 */
(function () {
  const P = window.Portfolio;

  // To go live with real email delivery, swap ConsoleEmailSender for one of:
  //   new P.emailSenders.FormspreeSender('https://formspree.io/f/your-id')
  // or
  //   new P.emailSenders.EmailJSSender({ serviceId, templateId, publicKey })
  const emailSender = new P.emailSenders.ConsoleEmailSender();

  async function bootstrap() {
    const content = await P.loadContent();

    const navContainer = document.getElementById('nav');
    const app = document.getElementById('app');

    P.renderNav(content.nav, navContainer);

    const contactForm = new P.ContactForm(emailSender);

    app.append(
      P.renderHero(content.profile),
      P.renderTimeline(content.timeline),
      P.renderProjects(content.projects),
      P.renderSkills(content.skillGroups),
      P.renderEthics(content.ethics),
      P.renderContact(content.contact, contactForm.node)
    );

    const windowController = new P.WindowController({
      overlay: document.getElementById('overlay'),
      windowEl: document.getElementById('window'),
      closeBtn: document.getElementById('closeBtn'),
    });
    windowController.bindOpenTriggers(document.querySelectorAll('.file-card, .t-item'));

    P.initCustomCursor('.file-card, .t-item, a, button');

    P.initScrollSpy(
      Array.from(navContainer.querySelectorAll('a')),
      Array.from(app.querySelectorAll('section'))
    );
  }

  bootstrap().catch((err) => {
    console.error('[main] Échec du chargement du portfolio :', err);
  });
})();
