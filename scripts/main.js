// =============================================
// MENÚ HAMBURGUESA
// =============================================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// =============================================
// FADE OUT HERO AL HACER SCROLL
// =============================================
const descriptionSection = document.querySelector(".description");

window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;
    const windowHeight = window.innerHeight;
    let newOpacity = 1 - (scrollPos / (windowHeight / 1.3));
    if (newOpacity < 0) newOpacity = 0;
    if (descriptionSection) {
        descriptionSection.style.opacity = newOpacity;
    }
});

// =============================================
// CARRUSEL DE PROYECTOS
// =============================================
const track = document.querySelector('.carousel-track');
const cards = Array.from(document.querySelectorAll('.project-card'));
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

if (track && cards.length > 0) {
    const updateCarousel = () => {
        const trackRect = track.getBoundingClientRect();
        const trackCenter = trackRect.left + trackRect.width / 2;
        let closestCard = null;
        let minDistance = Infinity;

        cards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distance = Math.abs(trackCenter - cardCenter);
            if (distance < minDistance) {
                minDistance = distance;
                closestCard = card;
            }
        });

        cards.forEach(card => card.classList.remove('active'));
        if (closestCard) closestCard.classList.add('active');
    };

    track.addEventListener('scroll', updateCarousel);
    window.addEventListener('resize', updateCarousel);
    setTimeout(updateCarousel, 100);

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            const activeIndex = cards.findIndex(c => c.classList.contains('active'));
            if (activeIndex > 0) {
                cards[activeIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        });

        nextBtn.addEventListener('click', () => {
            const activeIndex = cards.findIndex(c => c.classList.contains('active'));
            if (activeIndex < cards.length - 1) {
                cards[activeIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        });
    }

    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (!card.classList.contains('active')) {
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        });
    });
}

// =============================================
// ANIMACIÓN BARRAS DE HABILIDADES (Intersection Observer)
// =============================================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-fill').forEach(bar => {
    bar.style.animationPlayState = 'paused';
    skillObserver.observe(bar);
});

// =============================================
// FADE IN SECCIONES AL HACER SCROLL
// =============================================
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.cv-block, .project-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// Aplicar visible
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);
});

// =============================================
// CANVAS PARTÍCULAS
// =============================================
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrameId;

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.3;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.color = Math.random() > 0.6 ? '#00d2ff' : '#7b2fff';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        animFrameId = requestAnimationFrame(animate);
    };

    animate();
}
