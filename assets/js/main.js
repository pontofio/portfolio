/**
 * Gère la navigation vers une nouvelle page
 * avec une animation de fondu en sortie.
 * @param {string} url - L'URL de la page de destination
 */
function navigateTo(url) {
  // 1. Ajoute une classe au body pour démarrer l'animation de fondu
  document.body.classList.add('fade-out');

  // 2. Attend la fin de l'animation (400ms, doit correspondre au CSS)
  setTimeout(() => {
    // 3. Change de page
    window.location.href = url;
  }, 400); 
}

/**
 * Gère le bouton "Retour" du navigateur.
 * Si la page est chargée depuis le cache (bfcache),
 * le corps peut encore avoir la classe 'fade-out'.
 * On la retire pour que la page soit visible.
 */
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    document.body.classList.remove('fade-out');
  }
});
