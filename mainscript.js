─── Navbar ───────────────────────────────────────────────
const navmenu = document.getElementById('navmenu');
const navbar = document.getElementById('navbar');

navmenu.addEventListener('click', function(e) {
    if (window.innerWidth > 820) return;
    e.stopPropagation();
    navbar.classList.toggle('open');
});

document.addEventListener('click', function(e) {
    if (window.innerWidth > 820) return;
    if (navbar.classList.contains('open') && !navbar.contains(e.target)) {
        navbar.classList.remove('open');
    }
});


// ─── Intersection Observer (scroll-in animations) ─────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.container, .galleryborder').forEach((el, i) => {
    el.style.transitionDelay = `${i * 80}ms`;
    observer.observe(el);
});

document.querySelectorAll('.galleryimg').forEach((img, i) => {
    img.style.transitionDelay = `${i * 60}ms`;
    observer.observe(img);
});


// ─── Lightbox ─────────────────────────────────────────────
const lightbox = document.getElementById('lightbox');
const lightboximg = document.getElementById('lightboximg');

document.querySelectorAll('.galleryimg').forEach(img => {
    img.addEventListener('click', () => {
        lightboximg.src = img.src;
        lightbox.style.display = 'flex';
    });
});

lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});