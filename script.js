/**
 * script.js
 *
 * Ce fichier contient l'ensemble des scripts JavaScript pour le portfolio.
 * Il gère les interactions utilisateur, les animations et l'initialisation
 * des bibliothèques tierces.
 */

// S'assure que le DOM est entièrement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', function () {

  // =====================================================================
  // GESTION DU MODAL (FENÊTRE POP-UP) POUR LE TÉLÉCHARGEMENT DU CV
  // =====================================================================

  const cvButton = document.querySelector('.cv-button'); // Bouton "Téléchargez mon CV"
  const modal = document.getElementById('cvModal');     // L'élément modal (la fenêtre pop-up)
  const closeButton = document.querySelector('.modal .close'); // Bouton de fermeture du modal (le 'x')

  /**
   * Ouvre le modal en modifiant son style d'affichage.
   */
  function openModal() {
    if (modal) { // Vérifie si le modal existe avant de tenter de le manipuler
      modal.style.display = 'flex'; // Utilise 'flex' pour centrer le contenu
    }
  }

  /**
   * Ferme le modal en modifiant son style d'affichage.
   */
  function closeModal() {
    if (modal) { // Vérifie si le modal existe
      modal.style.display = 'none'; // Cache le modal
    }
  }

  // Ajoute un écouteur d'événement au bouton CV pour ouvrir le modal
  if (cvButton) {
    cvButton.addEventListener('click', function (event) {
      event.preventDefault(); // Empêche le comportement par défaut du lien/bouton
      openModal();
    });
  }

  // Ajoute un écouteur d'événement au bouton de fermeture du modal
  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  // Ferme le modal si l'utilisateur clique en dehors de son contenu (sur l'overlay)
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // =====================================================================
  // GESTION DU THÈME (CLAIR/SOMBRE) - Si un bouton de thème est présent
  // =====================================================================

  const toggleThemeButton = document.getElementById('toggle-theme'); // Bouton de bascule du thème
  const savedTheme = localStorage.getItem('theme'); // Récupère le thème sauvegardé dans le stockage local

  // Applique le thème sauvegardé ou définit le thème par défaut au chargement
  if (savedTheme) {
    // Si un thème est sauvegardé, on l'applique à la balise <body>
    document.body.classList.add(savedTheme);
  } else {
    // Si aucun thème n'est sauvegardé, on définit 'dark' comme thème par défaut
    // et s'assure que la classe 'light' n'est pas présente sur le body.
    if (document.body.classList.contains('light')) {
      document.body.classList.remove('light');
    }
    localStorage.setItem('theme', 'dark'); // Sauvegarde 'dark' comme défaut initial
  }

  // Ajoute un écouteur d'événement au bouton de bascule du thème
  if (toggleThemeButton) {
    toggleThemeButton.addEventListener('click', () => {
      // Bascule la classe 'light' sur le <body> pour changer de thème
      document.body.classList.toggle('light');
      // Met à jour le thème sauvegardé dans le stockage local
      if (document.body.classList.contains('light')) {
        localStorage.setItem('theme', 'light');
      } else {
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  // =====================================================================
  // ANIMATIONS AU DÉFILEMENT (SCROLLREVEAL)
  // =====================================================================

  // Initialise ScrollReveal pour animer l'apparition des sections, cartes et compétences
  // lors du défilement de la page.
  // Documentation: https://scrollrevealjs.org/
  ScrollReveal().reveal('section, .card, .skill', {
    duration: 500,     // Durée de l'animation en millisecondes
    distance: '50px',  // Distance de déplacement de l'élément
    easing: 'ease-in-out', // Fonction d'accélération/décélération
    origin: 'bottom',  // Direction d'où l'élément apparaît
    interval: 20,      // Délai entre l'animation de chaque élément (pour les listes)
    reset: false       // Ne réinitialise pas l'animation si l'élément sort et revient dans le viewport
  });

  // =====================================================================
  // GRAPHIQUES DE COMPÉTENCES (CHART.JS)
  // =====================================================================

  // Récupère les contextes 2D des éléments canvas pour les graphiques
  const ctx = document.getElementById('skillsChart')?.getContext('2d');
  const ctxFrameworks = document.getElementById('frameworksChart')?.getContext('2d');
  const ctxTools = document.getElementById('toolsChart')?.getContext('2d');

  const optionsBase = {
    responsive: true,
    animation: false,
    interaction: {
      mode: 'nearest',
      intersect: true,
      axis: 'r'
    },
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            return context.dataset.label + ': ' + context.parsed.r;
          }
        }
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20
        },
        grid: {
          color: 'rgba(0, 123, 255, 0.5)',
          lineWidth: 3
        },
        angleLines: {
          color: 'rgba(0, 123, 255, 0.7)',
          lineWidth: 3
        }
      }
    }
  };



  // Crée le graphique des langages informatiques
  if (ctx) {
    new Chart(ctx, {
      type: 'radar', // Type de graphique: radar
      data: {
        labels: ['Python', 'SQL', 'Java', 'C#', 'JavaScript'], // Libellés des points
        datasets: [{
          label: 'Niveau de compétence / 100 ', // Légende du dataset
          data: [85, 85, 90, 90, 75], // Données pour chaque compétence
          backgroundColor: 'rgba(0, 123, 255, 0.2)', // Couleur de fond de la zone du graphique
          borderColor: 'rgba(0, 123, 255, 1)',     // Couleur de la bordure
          borderWidth: 4,                          // Largeur de la bordure
          pointBackgroundColor: 'rgba(0, 123, 255, 1)', // Couleur des points
        }]
      },
      options: optionsBase // Applique les options de base
    });
  }

  // Crée le graphique des frameworks
  if (ctxFrameworks) {
    new Chart(ctxFrameworks, {
      type: 'radar',
      data: {
        labels: ['ASP .NET', 'Django', 'Flutter', 'GitHub Actions', 'Entity Framework', 'Spring Boot'],
        datasets: [{
          label: 'Niveau de maîtrise / 100 ',
          data: [90, 75, 70, 70, 85, 85],
          backgroundColor: 'rgba(40, 167, 69, 0.3)', // Vert
          borderColor: 'rgba(40, 167, 69, 1)',
          borderWidth: 4,
          pointBackgroundColor: 'rgba(40, 167, 69, 1)'
        }]
      },
      options: optionsBase
    });
  }

  // Crée le graphique des outils
  if (ctxTools) {
    new Chart(ctxTools, {
      type: 'radar',
      data: {
        labels: ['Git', 'Méthodologie Agile', 'dbt', 'Snowflake', 'Tableau'],
        datasets: [{
          label: 'Niveau de maîtrise / 100 ',
          data: [80, 95, 70, 70, 70],
          backgroundColor: 'rgba(255, 193, 7, 0.3)', // Jaune/Orange
          borderColor: 'rgba(255, 193, 7, 1)',
          borderWidth: 4,
          pointBackgroundColor: 'rgba(255, 193, 7, 1)'
        }]
      },
      options: optionsBase
    });
  }

  // =====================================================================
  // GESTION DU MENU BURGER (NAVIGATION MOBILE)
  // =====================================================================

  // La fonction `toggleMenu` est rendue globale pour être accessible via `onclick` dans le HTML.
  // Il est recommandé d'utiliser des écouteurs d'événements JavaScript plutôt que `onclick` directs.
  window.toggleMenu = function () {
    const navLinksElement = document.getElementById('navLinks');
    const burgerElement = document.querySelector('.burger');

    if (navLinksElement) {
      navLinksElement.classList.toggle('active');
      console.log("Menu burger togglé. Classe 'active' :", navLinksElement.classList.contains('active'));
    } else {
      console.warn("Élément #navLinks non trouvé pour le menu burger.");
    }
    if (burgerElement) {
      burgerElement.classList.toggle('open'); // optionnel : pour une animation burger
    }
  };




  // =====================================================================
  // GESTION DU FORMULAIRE DE CONTACT (ENVOI VIA FORMSPREE)
  // =====================================================================

  const form = document.getElementById('contact-form'); // Le formulaire de contact
  const statusMsg = document.getElementById('form-status'); // Le paragraphe pour afficher le statut de l'envoi

  // Ajoute un écouteur d'événement à la soumission du formulaire
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // Empêche le rechargement de la page par défaut

      const formData = new FormData(form); // Crée un objet FormData à partir du formulaire

      try {
        // Envoie les données du formulaire à Formspree via une requête fetch
        const response = await fetch(form.action, {
          method: form.method,
          headers: { 'Accept': 'application/json' }, // Indique que nous attendons une réponse JSON
          body: formData, // Les données du formulaire
        });

        // Gère la réponse de Formspree
        if (response.ok) {
          statusMsg.textContent = "✅ Merci ! Je vous réponds vite."; // Message de succès
          statusMsg.style.color = "green"; // Couleur verte pour le succès
          form.reset(); // Réinitialise le formulaire
        } else {
          statusMsg.textContent = "❌ Une erreur est survenue. Réessayez plus tard."; // Message d'erreur
          statusMsg.style.color = "red"; // Couleur rouge pour l'erreur
        }
      } catch (error) {
        // Gère les erreurs réseau ou autres exceptions
        statusMsg.textContent = "❌ Échec de l'envoi. Vérifiez votre connexion.";
        statusMsg.style.color = "red";
        console.error("Erreur lors de l'envoi du formulaire:", error); // Affiche l'erreur dans la console
      }
    });
  }

  // =====================================================================
  // BOUTON "RETOUR EN HAUT"
  // =====================================================================

  const backToTopButton = document.getElementById('back-to-top'); // Le bouton "Retour en haut"

  // Gère l'affichage/masquage du bouton en fonction du défilement de la page
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      // Affiche le bouton si le défilement vertical dépasse 100px
      if (window.scrollY > 100) {
        backToTopButton.style.display = 'block';
      } else {
        backToTopButton.style.display = 'none'; // Cache le bouton
      }
    });

    // Fait défiler la page vers le haut en douceur au clic sur le bouton
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,           // Défilement vers le haut de la page
        behavior: 'smooth' // Animation de défilement fluide
      });
    });
  }

}); // Fin de DOMContentLoaded

// =====================================================================
// INITIALISATION DE PARTICLES.JS (HORS DOMContentLoaded car parfois nécessaire plus tôt)
// =====================================================================

// Initialise la bibliothèque particles.js pour l'animation de fond.
// Cette fonction est appelée directement car particles.js peut nécessiter
// d'être initialisé avant que le DOM ne soit entièrement prêt pour des raisons de performance.
// Documentation: https://vincentgarreau.com/particles.js/
particlesJS("particles-js", {
  particles: {
    number: { value: 50, density: { enable: true, value_area: 800 } }, // Nombre de particules et densité
    color: { value: "#1e90ff" }, // Couleur des particules (bleu vif)
    shape: { type: "circle" },   // Forme des particules
    opacity: { value: 0.3, random: false, anim: { enable: false } }, // Opacité
    size: { value: 2, random: true, anim: { enable: false } }, // Taille
    line_linked: { enable: true, distance: 150, color: "#1e90ff", opacity: 0.4, width: 1 }, // Lignes de liaison
    move: { enable: true, speed: 1, direction: "none", random: false, straight: false, out_mode: "out", bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } }, // Mouvement
  },
  interactivity: {
    detect_on: "canvas", // Détection des interactions sur le canvas
    events: {
      onhover: { enable: true, mode: "repulse" }, // Effet de répulsion au survol
      onclick: { enable: true, mode: "push" },    // Ajout de particules au clic
      resize: true // Redimensionnement réactif
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true, // Détecte les écrans Retina pour un meilleur rendu
});

// =====================================================================
// EFFET DE TEXTE TAPÉ (TYPING EFFECT)
// =====================================================================

const textToType = "Développeur Full-Stack Junior & Passionné de Data"; // Texte à afficher
let charIndex = 0; // Index du caractère actuel

/**
 * Fonction récursive pour simuler l'effet de frappe.
 * Ajoute un caractère à la fois à l'élément HTML.
 */
function typeEffect() {
  const typingTextElement = document.getElementById("typing-text");
  if (typingTextElement && charIndex < textToType.length) {
    typingTextElement.innerHTML += textToType.charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 50); // Délai entre chaque caractère (50ms)
  }
}

// Déclenche l'effet de frappe une fois que la fenêtre est entièrement chargée
window.onload = typeEffect;

// =====================================================================
// GESTION DE L'AUDIO DE FOND
// =====================================================================

const audio = document.getElementById('space-audio'); // L'élément audio
const toggleSoundBtn = document.getElementById('toggle-sound'); // Bouton de bascule du son

// Définit le volume initial de l'audio
if (audio) {
  audio.volume = 0.1; // Volume faible
}

let isMuted = false; // État du son (muté ou non)

// Ajoute un écouteur d'événement au bouton de bascule du son
if (toggleSoundBtn && audio) {
  toggleSoundBtn.addEventListener('click', () => {
    isMuted = !isMuted; // Inverse l'état du son
    audio.muted = isMuted; // Applique l'état de mutisme à l'audio
    toggleSoundBtn.textContent = isMuted ? '🔇' : '🔊'; // Met à jour l'icône du bouton
  });
}

/**
 * Tente de jouer l'audio. Cette fonction est appelée au premier clic ou appui
 * sur une touche pour contourner les restrictions de lecture automatique des navigateurs.
 */
const startAudioOnInteraction = () => {
  if (audio) {
    audio.play().catch(error => {
      // Gère l'erreur si la lecture automatique est bloquée
      console.warn("La lecture automatique de l'audio a été bloquée:", error);
    });
  }
  // Supprime les écouteurs d'événements après la première interaction réussie
  document.removeEventListener('click', startAudioOnInteraction);
  document.removeEventListener('keydown', startAudioOnInteraction);
};

// Ajoute des écouteurs d'événements pour démarrer l'audio au premier clic ou appui sur une touche
document.addEventListener('click', startAudioOnInteraction);
document.addEventListener('keydown', startAudioOnInteraction);
