/**
 * ContentLoader.
 * Single responsibility: return the site's content data.
 * In the static build, content.js has already attached the data to
 * window.PORTFOLIO_CONTENT (loaded via a plain <script> tag before this
 * file) — no fetch() needed, so it also works when opened via file://.
 */
window.Portfolio = window.Portfolio || {};

window.Portfolio.loadContent = async function loadContent() {
  if (!window.PORTFOLIO_CONTENT) {
    throw new Error('Contenu introuvable — assets/data/content.js doit être chargé avant ce script.');
  }
  return window.PORTFOLIO_CONTENT;
};
