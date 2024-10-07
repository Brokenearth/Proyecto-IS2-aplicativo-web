document.addEventListener('DOMContentLoaded', () => {
    // Navegación sticky
    const header = document.querySelector('header');
    const sticky = header.offsetTop;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > sticky) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Carrusel de imágenes destacadas
    const featuredImages = document.querySelectorAll('.featured-images img');
    let currentImageIndex = 0;

    function showNextImage() {
        featuredImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % featuredImages.length;
        featuredImages[currentImageIndex].classList.add('active');
    }

    setInterval(showNextImage, 5000);

    // Animación de aparición para las noticias
    const newsItems = document.querySelectorAll('.school-newspaper article');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    newsItems.forEach(item => observer.observe(item));

    // Filtro de eventos del calendario
    const calendarItems = document.querySelectorAll('.calendar li');
    const filterInput = document.createElement('input');
    filterInput.type = 'text';
    filterInput.placeholder = 'Filtrar eventos...';
    filterInput.classList.add('calendar-filter');
    document.querySelector('.calendar').insertBefore(filterInput, document.querySelector('.calendar ul'));

    filterInput.addEventListener('input', (e) => {
        const filterText = e.target.value.toLowerCase();
        calendarItems.forEach(item => {
            const eventText = item.textContent.toLowerCase();
            item.style.display = eventText.includes(filterText) ? 'flex' : 'none';
        });
    });
});

import { checkAuth, logout } from './auth.js';

// Función para cargar componentes HTML
function loadComponent(elementId, componentPath) {
    fetch(componentPath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error cargando el componente:', error));
}

// Cargar componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header', '../components/header.html');
    loadComponent('footer', '../components/footer.html');

    // Verificar autenticación en páginas protegidas
    if (window.location.pathname.includes('dashboard')) {
        const user = checkAuth();
        if (user) {
            document.getElementById('user-name').textContent = user.name;
        }
    }

    // Agregar evento de logout
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});