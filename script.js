function openModal() {
  document.getElementById("cvModal").style.display = "block";
}

function closeModal() {
  document.getElementById("cvModal").style.display = "none";
}

// Fermer le modal si on clique en dehors
window.addEventListener("click", function (event) {
  const modal = document.getElementById("cvModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

/* scroll reveal */
ScrollReveal().reveal('section, .card, .skill', {
  duration: 500,
  distance: '50px',
  easing: 'ease-in-out',
  origin: 'bottom',
  interval: 20,
  reset: false
});

const ctx = document.getElementById('skillsChart').getContext('2d');
const ctxFrameworks = document.getElementById('frameworksChart').getContext('2d');
const ctxTools = document.getElementById('toolsChart').getContext('2d');

//Langages informatique
const skillsChart = new Chart(ctx, {
  type: 'radar',
  data: {
    labels: ['Python', 'SQL', 'Java', 'C#', 'JavaScript'],
    datasets: [{
      label: 'Niveau de compétence / 100 ',
      data: [85, 85, 90, 90, 75],
      backgroundColor: 'rgba(0, 123, 255, 0.2)',
      borderColor: 'rgba(0, 123, 255, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(0, 123, 255, 1)',
    }]
  },
  options: {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20
        }
      }
    }
  }
});

// Frameworks
const frameworksChart = new Chart(ctxFrameworks, {
  type: 'radar',
  data: {
    labels: ['ASP .NET', 'Django', 'Flutter', 'GitHub Actions', 'Entity Framework', 'Spring Boot'],
    datasets: [{
      label: 'Niveau de maîtrise / 100 ',
      data: [90, 75, 70, 70, 85, 85],
      backgroundColor: 'rgba(40, 167, 69, 0.3)',
      borderColor: 'rgba(40, 167, 69, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(40, 167, 69, 1)'
    }]
  },
  options: {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20
        }
      }
    }
  }
});

// Outils
const toolsChart = new Chart(ctxTools, {
  type: 'radar',
  data: {
    labels: ['Git', 'Méthodologie Agile', 'dbt', 'Snowflake', 'Tableau'],
    datasets: [{
      label: 'Niveau de maîtrise / 100 ',
      data: [80, 95, 70, 70, 70],
      backgroundColor: 'rgba(255, 193, 7, 0.3)',
      borderColor: 'rgba(255, 193, 7, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(255, 193, 7, 1)'
    }]
  },
  options: {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20
        }
      }
    }
  }
});

//toggle menu
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
}


//script d'envoie du formulaire
const form = document.getElementById('contact-form');
const statusMsg = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const plainFormData = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(form.action, {
      method: form.method,
      headers: { 'Accept': 'application/json' },
      body: formData,
    });

    if (response.ok) {
      statusMsg.textContent = "✅ Merci ! Je vous réponds vite.";
      statusMsg.style.color = "green";
      form.reset();
    } else {
      statusMsg.textContent = "❌ Une erreur est survenue. Réessayez plus tard.";
      statusMsg.style.color = "red";
    }
  } catch (error) {
    statusMsg.textContent = "❌ Échec de l'envoi. Vérifiez votre connexion.";
    statusMsg.style.color = "red";
  }
});

