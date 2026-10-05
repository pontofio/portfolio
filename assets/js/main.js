/**
 * Composition root — wires all modules together.
 * Attach all modules to window.Portfolio, loaded in order via <script> tags.
 */
(function () {
  const P = window.Portfolio;

  // Real email delivery can be plugged in using Formspree or EmailJS:
  //   new P.emailSenders.FormspreeSender('https://formspree.io/f/your-id')
  // or
  //   new P.emailSenders.EmailJSSender({ serviceId, templateId, publicKey })
  const emailSender = new P.emailSenders.ConsoleEmailSender('pontofiona@gmail.com');

  async function bootstrap() {
    const content = await P.loadContent();

    const navContainer = document.getElementById('nav');
    const app = document.getElementById('app');

    // Build Nav and Theme switcher
    P.renderNav(content.nav, navContainer);

    // Build Contact Form
    const contactForm = new P.ContactForm(emailSender);

    // Build Sections
    app.append(
      P.renderHero(content.profile),
      P.renderTimeline(content.timeline),
      P.renderProjects(content.projects, content.projectCategories),
      P.renderSkills(content.skillGroups, content.skillsEvolution),
      P.renderEthics(content.ethics),
      P.renderContact(content.contact, contactForm.node)
    );

    // Setup Window / Detail Modal Controller
    const windowController = new P.WindowController({
      overlay: document.getElementById('overlay'),
      windowEl: document.getElementById('window'),
      closeBtn: document.getElementById('closeBtn'),
      prevBtn: document.getElementById('winPrevBtn'),
      nextBtn: document.getElementById('winNextBtn'),
    });

    // Bind all openable cards & items to modal controller
    windowController.bindOpenTriggers(
      document.querySelectorAll('.file-card, .timeline-item, .ethics-card')
    );

    // Setup Ambient Spotlight Cursor
    P.initCustomCursor();

    // Setup ScrollSpy for Nav links
    P.initScrollSpy(
      Array.from(navContainer.querySelectorAll('a')),
      Array.from(app.querySelectorAll('section'))
    );
  }

  bootstrap().catch((err) => {
    console.error('[main] Échec du chargement du portfolio :', err);
  });
})();
