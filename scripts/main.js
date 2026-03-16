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
