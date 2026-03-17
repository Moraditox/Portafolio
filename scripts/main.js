// Obtener elementos del DOM
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

// Alternar el menú desplegable al hacer clic en el botón de hamburguesa
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Cerrar el menú automáticamente cuando se hace clic en un enlace
document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// Efecto Fade-out para la imagen principal cuando el usuario hace scroll hacia abajo
const descriptionSection = document.querySelector(".description");

window.addEventListener("scroll", () => {
    // Calculamos cuánto hemos bajado (en píxeles) y cuánto de alto es la ventana
    const scrollPos = window.scrollY;
    const windowHeight = window.innerHeight;

    // Calculamos la opacidad que queremos (comienza en 1, va a 0)
    // Reducimos la opacidad un 1% por cada % que el usuario baje del "primer pantallazo"
    // Hacemos que cuando baje más o menos la mitad de su pantalla (windowHeight / 1.5), ya esté semi-transparente
    let newOpacity = 1 - (scrollPos / (windowHeight / 1.5));
    
    // Evitamos que baje más de 0
    if (newOpacity < 0) {
        newOpacity = 0;
    }

    // Aplicar la opacidad si existe la sección
    if (descriptionSection) {
        descriptionSection.style.opacity = newOpacity;
    }
});

// Funcionalidad del carrusel de proyectos
const track = document.querySelector('.carousel-track');
const cards = Array.from(document.querySelectorAll('.project-card'));
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

if (track && cards.length > 0) {
    const updateCarousel = () => {
        const trackCenter = track.getBoundingClientRect().left + track.getBoundingClientRect().width / 2;
        let closestCard = null;
        let minDistance = Infinity;

        cards.forEach(card => {
            const cardCenter = card.getBoundingClientRect().left + card.getBoundingClientRect().width / 2;
            const distance = Math.abs(trackCenter - cardCenter);

            if (distance < minDistance) {
                minDistance = distance;
                closestCard = card;
            }
        });

        cards.forEach(card => card.classList.remove('active'));
        if (closestCard) {
            closestCard.classList.add('active');
        }
    };

    // Actualizar cuando el usuario hace scroll para que la del centro crezca
    track.addEventListener('scroll', updateCarousel);
    window.addEventListener('resize', updateCarousel);
    
    // Iniciar con un ligero retardo para asegurar que los anchos de las tarjetas ya se han calculado
    setTimeout(updateCarousel, 100);

    // Lógica de botones prev y next
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            const activeIndex = cards.findIndex(card => card.classList.contains('active'));
            if (activeIndex > 0) {
                // Hacer scroll del contenedor hacia el elemento previo
                cards[activeIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        });

        nextBtn.addEventListener('click', () => {
            const activeIndex = cards.findIndex(card => card.classList.contains('active'));
            if (activeIndex < cards.length - 1) {
                // Hacer scroll del contenedor hacia el siguiente elemento
                cards[activeIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        });
    }

    // Permitir clic en las tarjetas laterales para activarlas o traerlas al medio
    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (!card.classList.contains('active')) {
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        });
    });
}
