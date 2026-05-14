// ─── Navbar ───────────────────────────────────────────────
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

// ─── Slideshow ─────────────────────────────────────────────
function initSlideshow(el) {
    const slides = el.querySelectorAll('.slide');
    let current = 0;
    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 3500); // change ms to adjust speed
}
document.querySelectorAll('.slideshow').forEach(initSlideshow);

// ─── Canvas prices ─────────────────────────────────────────────

const canvasButtons = document.querySelectorAll('.button2');
const thumbnails = document.querySelectorAll('.canvasthumbnail');
const priceEls = document.querySelectorAll('.canvas-price');

const basePrices = [150, 250, 350];
const stretchedPrices = [170, 270, 370];

const panelStyle = {
    border: '2px solid #d9d9d9',
    boxShadow: 'none',
};

const stretchedStyle = {

    boxShadow: '#bababa 3px 3px 0px',
};

function updatePrices(prices) {
    priceEls.forEach((el, i) => {
        el.style.transition = 'opacity 0.3s ease';
        el.style.opacity = '0';
        setTimeout(() => {
            el.textContent = '$' + prices[i];
            el.style.opacity = '1';
        }, 300);
    });
}

function setThumbnailStyle(style) {
    thumbnails.forEach(thumb => {
        thumb.style.border = style.border;
        thumb.style.boxShadow = style.boxShadow;
    });
}

function setActiveButton(activeBtn) {
    canvasButtons.forEach(b => {
        b.style.backgroundColor = '';
        b.style.filter = '';
    });
    activeBtn.style.backgroundColor = '#f4f3fa';
    activeBtn.style.filter = 'saturate(1.5)';
}

setActiveButton(canvasButtons[0]);

canvasButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        setActiveButton(this);
        const isStretched = this.textContent.trim() === 'Stretched Canvas';
        setThumbnailStyle(isStretched ? stretchedStyle : panelStyle);
        updatePrices(isStretched ? stretchedPrices : basePrices);
    });
});

// ─── Gallery Lightbox ─────────────────────────────────────────────

function openLightbox(figure) {
    const img = figure.querySelector('img').src;
    const title = figure.querySelector('.gallerytitle').textContent;
    const info = figure.querySelector('.galleryinfo').textContent;

    document.getElementById('lightboximg').src = img;
    document.getElementById('lightboxtitle').textContent = title;
    document.getElementById('lightboxinfo').textContent = info;

    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'flex';
}