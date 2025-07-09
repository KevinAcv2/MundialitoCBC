// definir una constante global para la url base
const BASE_URL = "http://127.0.0.1:5000";

document.addEventListener('DOMContentLoaded', function() {
  // Inicialización única
  AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-in-out'
  });

  // Carga de datos
  cargarPosiciones();

  // Navbar transparente que se colorea al hacer scroll
  const navbar = document.querySelector('.navbar');

  // Función para manejar el scroll
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Ejecutar al cargar para verificar posición inicial
  handleScroll();

  // Escuchar eventos de scroll
  window.addEventListener('scroll', handleScroll);

  // Cargar próximos partidos
  const proximosPartidos = [
    {
      fecha: '2024-06-20',
      hora: '10:00',
      equipo1: { nombre: 'Brasil', bandera: 'https://flagcdn.com/w80/br.png' },
      equipo2: { nombre: 'Argentina', bandera: 'https://flagcdn.com/w80/ar.png' },
      lugar: 'Cancha Principal'
    },
    {
      fecha: '2024-06-21',
      hora: '12:00',
      equipo1: { nombre: 'Francia', bandera: 'https://flagcdn.com/w80/fr.png' },
      equipo2: { nombre: 'Alemania', bandera: 'https://flagcdn.com/w80/de.png' },
      lugar: 'Cancha 2'
    }
  ];



  // Cargar tabla de goleadores
  const goleadores = [
    { posicion: 1, nombre: 'Kevin Acevedo', equipo: 'Argentina', goles: 5, avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { posicion: 2, nombre: 'Neymar Jr', equipo: 'Brasil', goles: 4, avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { posicion: 3, nombre: 'Kylian Mbappé', equipo: 'Francia', goles: 3, avatar: 'https://randomuser.me/api/portraits/men/3.jpg' }
  ];

  const goleadoresTable = document.getElementById('goleadores-table');
  if (goleadoresTable) {
    goleadoresTable.innerHTML = ''; // Limpiar tabla primero
    goleadores.forEach(jugador => {
      const filaHTML = `
        <tr data-aos="fade-up" data-aos-delay="${jugador.posicion * 100}">
          <td>${jugador.posicion}</td>
          <td>
            <img src="${jugador.avatar}" alt="${jugador.nombre}" class="player-avatar">
            ${jugador.nombre}
          </td>
          <td>${jugador.equipo}</td>
          <td>${jugador.goles}</td>
        </tr>
      `;
      goleadoresTable.innerHTML += filaHTML;
    });
  }

  // Smooth scrolling para navbar
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Ajuste para navbar fijo
          behavior: 'smooth'
        });

        // Cerrar menú en móviles
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          navbarCollapse.classList.remove('show');
        }
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // Efecto de cambio de navbar al hacer scroll
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Smooth scrolling para todos los enlaces
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Inicializar AOS 
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out'
    });
  }
});

// Función para filtrar partidos
function setupMatchFilters() {
  const filterButtons = document.querySelectorAll('.match-filters .btn');
  const fixtureItems = document.querySelectorAll('.fixture-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Remover clase active de todos los botones
      filterButtons.forEach(btn => btn.classList.remove('active'));

      // Agregar clase active al botón clickeado
      this.classList.add('active');

      const filterValue = this.textContent.trim();

      // Mostrar/ocultar partidos según el filtro
      fixtureItems.forEach(item => {
        if (filterValue === 'Todos' || item.dataset.stage.includes(filterValue.toLowerCase())) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Función para cargar partidos dinámicamente (ejemplo)
function loadMatches() {
  const matches = [
    {
      date: '25 OCT 2024 - 15:00',
      stage: 'Grupo A - Jornada 1',
      team1: { name: 'Brasil', flag: 'https://countryflagsapi.com/png/brazil' },
      team2: { name: 'Argentina', flag: 'https://countryflagsapi.com/png/argentina' },
      location: 'Cancha Principal',
      referee: 'Carlos Pérez',
      type: 'group'
    },
    {
      date: '26 OCT 2024 - 10:00',
      stage: 'Grupo B - Jornada 1',
      team1: { name: 'Francia', flag: 'https://countryflagsapi.com/png/france' },
      team2: { name: 'Alemania', flag: 'https://countryflagsapi.com/png/germany' },
      location: 'Cancha 2',
      referee: 'Laura Gómez',
      type: 'group'
    },
    // Puedes agregar más partidos aquí
  ];

  const matchesContainer = document.querySelector('.row');

  // Limpiar contenedor (excepto los filtros si los hay)
  matchesContainer.innerHTML = '';

  // Agregar partidos al DOM
  matches.forEach(match => {
    const matchElement = document.createElement('div');
    matchElement.className = 'col-md-6 fixture-item';
    matchElement.dataset.stage = match.type;

    matchElement.innerHTML = `
      <div class="fixture-card">
        <div class="fixture-date">${match.date}</div>
        <div class="fixture-stage">${match.stage}</div>
        <div class="fixture-teams">
          <div class="fixture-team">
            <img src="${match.team1.flag}" alt="${match.team1.name}">
            <span class="fixture-team-name">${match.team1.name}</span>
          </div>
          <div class="fixture-vs">VS</div>
          <div class="fixture-team text-end">
            <span class="fixture-team-name">${match.team2.name}</span>
            <img src="${match.team2.flag}" alt="${match.team2.name}">
          </div>
        </div>
        <div class="fixture-info">
          <span><i class="fas fa-map-marker-alt"></i> ${match.location}</span>
          <span><i class="fas fa-whistle"></i> Árbitro: ${match.referee}</span>
        </div>
      </div>
    `;

    matchesContainer.appendChild(matchElement);
  });

  // Configurar los filtros después de cargar los partidos
  setupMatchFilters();
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
  // Cargar partidos
  loadMatches();

  // Inicializar AOS si es necesario
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out'
    });
  }

});

function visualizar(data) {
  console.log('Datos recibidos para visualizar:', data); // Verifica los datos
  let tabla = "";

  if (data && Array.isArray(data)) {
    data.forEach((item, index) => {
      tabla += `
        <tr data-id="${item.id || index}">
          <td>${index + 1}</td>
          <td>${item.seleccion || 'N/A'}</td>
          <td>${item.ficha || 'N/A'}</td>
          <td>${item.partidos_jugados || 0}</td>
          <td>${item.partidos_ganados || 0}</td>
          <td>${item.partidos_empatados || 0}</td>
          <td>${item.partidos_perdidos || 0}</td>
          <td>${item.goles_a_favor || 0}</td>
          <td>${item.goles_en_contra || 0}</td>
          <td>${item.diferencia_goles || 0}</td>
          <td>${item.puntos || 0}</td>
          <td class="text-center">
            <button class="btn-img-action btn-editar" data-id="${item.id || index}" title="Editar">
              <img src="img/Editar.png" alt="Editar">
            </button>
          </td>
          <td class="text-center">
            <button class="btn-img-action btn-eliminar" data-id="${item.id || index}" title="Eliminar">
              <img src="img/Eliminar.png" alt="Eliminar">
            </button>
          </td>
        </tr>`;
    });
  } else {
    tabla = `<tr><td colspan="13" class="text-center">No hay datos disponibles</td></tr>`;
  }

  document.getElementById('data').innerHTML = tabla;
  agregarEventListenersBotones();
}

// Función para agregar event listeners
function agregarEventListenersBotones() {
  document.querySelectorAll('.btn-editar').forEach(btn => {
    btn.addEventListener('click', function () {
      const id = this.getAttribute('data-id');
      console.log('Editar registro con ID:', id);
      // Lógica para editar
    });
  });

  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', function () {
      const id = this.getAttribute('data-id');
      if (confirm('¿Estás seguro de que deseas eliminar esta selección?')) {
        console.log('Eliminar registro con ID:', id);
        // Lógica para eliminar
      }
    });
  });
}

// Llamar a la función para cargar datos
document.addEventListener('DOMContentLoaded', function () {
  // Tu función para cargar datos de la BD
  cargarPosiciones();
})

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.btn-agregar')?.addEventListener('click', function () {
    console.log('Agregar nueva selección');
    // Aquí implementarías la lógica para agregar
  });
});

// Cambia la función cargarPosiciones así:
function cargarPosiciones() {
  fetch(`${BASE_URL}/api/posiciones`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log('Datos recibidos:', data); // Para depuración
      if (Array.isArray(data)) {
        visualizar(data);
      } else if (data && Array.isArray(data.data)) {
        visualizar(data.data);
      } else {
        throw new Error('Formato de datos no válido');
      }
    })
    .catch(error => {
      console.error('Error en fetch:', error);
      document.getElementById('data').innerHTML = `
            <tr>
                <td colspan="11" class="text-center text-danger">
                    Error: ${error.message}<br>
                    Verifica la conexión y que la API esté disponible
                </td>
            </tr>`;
    });
}
// Llamar a cargarPosiciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', cargarPosiciones);

// busqueda rapida de las selecciones 
document.addEventListener('DOMContentLoaded', function () {
  const inputBusqueda = document.getElementById('busqueda');
  const contenedorCards = document.getElementById('contenedor-cards');
  const cards = contenedorCards.querySelectorAll('.card');

  inputBusqueda.addEventListener('input', function () {
    const textoBusqueda = this.ariaValueMax.toLocaleLowerCase().trim();

    cards.forEach(function (card) {
      const nombre = card.getAttribute('data-nombre').toLowerCase().trim();
      const ficha = card.getAttribute('data-ficha').toLowerCase().trim();
      const grupo = card.getAttribute('data-grupo').toLowerCase().trim();
      const padreCard = card.closest('.col-md-4'); // obtiene el contenedor padre para ocultar toda la columna

      if (
        nombre.includes(textoBusqueda) ||
        ficha.includes(textoBusqueda) ||
        grupo.includes(textoBusqueda)
      ) {
        padreCard.style.display = 'block;' // muestra la columna
      } else {
        padreCard.style.display = 'none' // oculta la columna
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // Botón para agregar nueva selección
  document.querySelector('.btn-agregar')?.addEventListener('click', function () {
    console.log('Agregar nueva selección');
    // Aquí puedes implementar la lógica para agregar
    // Por ejemplo, abrir un modal con el formulario de creación
  });
});
