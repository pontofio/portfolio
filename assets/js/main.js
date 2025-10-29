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


/**
 * NOUVEAU : Initialise le graphique Chart.js 
 * sur la page d'accueil.
 */
// Attend que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {

  // Tente de trouver le canvas du graphique
  const chartCanvas = document.getElementById('skillsRadarChart');

  // Si le canvas existe (on est sur la page d'accueil)
  if (chartCanvas) {
    
    // Données pour le graphique
    const data = {
      labels: [
        'Rigueur',
        'Organisation',
        'Technique',
        'Curiosité',
        'Pédagogie',
        'Adaptabilité'
      ],
      datasets: [{
        label: 'Mes Compétences',
        data: [8, 9, 7, 9, 8, 7], 
        fill: true,
        backgroundColor: 'rgba(52, 211, 153, 0.2)',
        borderColor: 'rgb(52, 211, 153)',
        pointBackgroundColor: 'rgb(52, 211, 153)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(52, 211, 153)'
      }]
    };

    // Configuration du graphique
    const config = {
      type: 'radar',
      data: data,
      options: {
        // Style pour le thème sombre
        scales: {
          r: {
            angleLines: {
              color: 'rgba(255, 255, 255, 0.2)'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)'
            },
            pointLabels: {
              color: '#F9FAFB',
              font: {
                family: "'Inter', sans-serif",
                size: 13
              }
            },
            ticks: {
              color: '#F9FAFB',
              backdropColor: '#1F2937' // Fond des chiffres
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#F9FAFB',
              font: {
                family: "'Montserrat', sans-serif"
              }
            }
          }
        }
      }
    };

    // Création du graphique dans le canvas
    new Chart(chartCanvas, config);
  }
});