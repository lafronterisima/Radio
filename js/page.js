// ==================== OPTIMIZACIÓN DE CARGA ====================
document.addEventListener('DOMContentLoaded', function() {
    initFastComponents();
});

// ==========================================
// 1. INICIALIZACIÓN DE COMPONENTES MATERIALIZE
// ==========================================
function initSidenav() {
    var elemsSidenav = document.querySelectorAll('.sidenav');
    if (elemsSidenav.length > 0 && typeof M !== 'undefined') {
        M.Sidenav.init(elemsSidenav, {
            edge: 'left',
            draggable: true
        });
    }
}

function initDropdowns() {
    var elemsDropdown = document.querySelectorAll('.dropdown-trigger');
    if (elemsDropdown.length > 0 && typeof M !== 'undefined') {
        M.Dropdown.init(elemsDropdown, {
            coverTrigger: false,
            constrainWidth: false
        });
    }
}

// ==========================================
// 2. CONTROLADORES DE COMPONENTES
// ==========================================
function initNavigation() {
    // Manejado por el IIFE de navegación más abajo
}

function initPlayer() {
    // Manejado por el IIFE del reproductor más abajo
}

function initNonCritical() {
    // Solo funciones que EXISTEN
    if (typeof initArtistSliders === 'function') initArtistSliders();
    if (typeof initImageSlideshows === 'function') initImageSlideshows();
    if (typeof initShare === 'function') initShare();
    if (typeof initDropdowns === 'function') initDropdowns();
}

function initFastComponents() {
    initSidenav();
    initSlideshows();
    initNavigation();
    initPlayer();
    setTimeout(initNonCritical, 100);
}

// ==================== DATOS ====================
const programsData = [
    { title: "Mañanera Fronteriza", time: "6:00 AM - 9:00 AM", description: "Comienza tu día con energía colombiana", icon: "🌅" },
    { title: "Vallenato Sin Fronteras", time: "9:00 AM - 12:00 PM", description: "Lo mejor del vallenato", icon: "🎵" },
    { title: "Popular al Aire", time: "12:00 PM - 3:00 PM", description: "Música popular", icon: "🎸" },
    { title: "Tarde de Éxitos", time: "3:00 PM - 6:00 PM", description: "Los mejores temas", icon: "🌟" },
    { title: "Carrilera Power", time: "6:00 PM - 9:00 PM", description: "La mejor carrilera", icon: "🚗" },
    { title: "Noche de Recuerdos", time: "9:00 PM - 12:00 AM", description: "Clásicos inolvidables", icon: "🌙" }
];

const featuredContainer = document.getElementById('featuredPrograms');
if (featuredContainer) {
    featuredContainer.innerHTML = programsData.slice(0, 3).map(item => `
        <div class="program-card" onclick="showToast('${item.title} - Próximamente')">
            <div class="card-image">${item.icon}</div>
            <div class="card-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                ${item.time ? `<p style="color:#20B2AA; margin-top:5px;">🕐 ${item.time}</p>` : ''}
            </div>
        </div>
    `).join('');
}

// ==================== SLIDESHOW GENÉRICO ====================
function initSlideshows() {
    let slideIndex = [1, 1, 1];
    let slideId = ["mySlides1", "mySlides2", "mySlides3"];

    window.plusSlides = function(n, no) {
        showSlides(slideIndex[no] += n, no);
    };

    function showSlides(n, no) {
        let x = document.getElementsByClassName(slideId[no]);
        if (x.length === 0) return;
        if (n > x.length) slideIndex[no] = 1;
        if (n < 1) slideIndex[no] = x.length;
        for (let i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        if (x[slideIndex[no] - 1]) {
            x[slideIndex[no] - 1].style.display = "block";
        }
    }

    showSlides(1, 0);
    showSlides(1, 1);
    showSlides(1, 2);
}

// ==================== SLIDESHOW VIDEOS HOME ====================
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('slider1');
    if (!slider) return;

    const slides = slider.querySelectorAll('.slides');
    const prevBtn = slider.querySelector('.slide-arrow.left');
    const nextBtn = slider.querySelector('.slide-arrow.right');
    if (slides.length === 0 || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const totalSlides = slides.length;

    function pauseYouTubeVideo(iframe) {
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(JSON.stringify({
                event: 'command',
                func: 'pauseVideo',
                args: []
            }), '*');
        }
    }

    function showSlide(newIndex) {
        const currentIframe = slides[currentIndex].querySelector('iframe');
        pauseYouTubeVideo(currentIframe);
        slides[currentIndex].classList.remove('active');
        currentIndex = newIndex;
        slides[currentIndex].classList.add('active');
    }

    nextBtn.addEventListener('click', () => {
        showSlide((currentIndex + 1) % totalSlides);
    });
    prevBtn.addEventListener('click', () => {
        showSlide((currentIndex - 1 + totalSlides) % totalSlides);
    });
});

// ==================== SLIDERS ARTISTAS ====================
function initArtistSliders() {
    const sliders = document.querySelectorAll('.sliders');
    if (sliders.length === 0) return;

    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.slides');
        const prevButton = slider.querySelector('.prev');
        const nextButton = slider.querySelector('.next');
        let currentSlide = 0;

        if (slides.length > 0) {
            slides.forEach((slide, i) => {
                if (i !== 0) slide.style.transform = 'translateX(100%)';
            });
        }

        function showSlide(index) {
            if (index >= slides.length) currentSlide = 0;
            else if (index < 0) currentSlide = slides.length - 1;
            else currentSlide = index;

            slides.forEach((slide, i) => {
                slide.style.transform = `translateX(${(i - currentSlide) * 100}%)`;
            });
        }

        if (prevButton) prevButton.addEventListener('click', () => showSlide(currentSlide - 1));
        if (nextButton) nextButton.addEventListener('click', () => showSlide(currentSlide + 1));
    });
}

// ==================== CHANGE SLIDE GENÉRICO ====================
function changeSlide(direction, sliderId) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;

    const slides = slider.querySelectorAll('.slides');
    if (slides.length === 0) return;

    let currentIndex = 0;
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) currentIndex = index;
    });

    let newIndex = currentIndex + direction;
    if (newIndex >= slides.length) newIndex = 0;
    if (newIndex < 0) newIndex = slides.length - 1;

    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        slide.style.display = 'none';
        if (index === newIndex) {
            slide.classList.add('active');
            slide.style.display = 'block';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const videoSlider = document.querySelector('#slider1');
    if (videoSlider) {
        const slides = videoSlider.querySelectorAll('.slides');
        if (slides.length > 0) {
            slides.forEach((slide, index) => {
                if (index === 0) {
                    slide.classList.add('active');
                    slide.style.display = 'block';
                } else {
                    slide.classList.remove('active');
                    slide.style.display = 'none';
                }
            });
        }
    }
});

// ==================== NAVEGACIÓN ====================
(function() {
    'use strict';

    const sections = ['RADIO', 'INICIO', 'NOTAS', 'VIDEOS', 'ARTISTAS', 'PRIVACIDAD'];

    function cerrarDropdowns() {
        document.querySelectorAll('.dropdown-container').forEach(container => {
            container.classList.remove('active');
            const dropdown = container.querySelector('.dropdown');
            if (dropdown) dropdown.style.display = 'none';
        });
        document.querySelectorAll('.dropdown').forEach(d => {
            d.style.display = 'none';
        });
    }

    function cerrarSidenav() {
        const sidenavElem = document.querySelector('#nav-mobile');
        if (sidenavElem && typeof M !== 'undefined' && M.Sidenav) {
            try {
                const instance = M.Sidenav.getInstance(sidenavElem);
                if (instance && instance.isOpen) instance.close();
            } catch (e) {}
        }
    }

    function abrirSidenav() {
        const sidenavElem = document.querySelector('#nav-mobile');
        if (sidenavElem && typeof M !== 'undefined' && M.Sidenav) {
            try {
                const instance = M.Sidenav.getInstance(sidenavElem);
                if (instance && !instance.isOpen) instance.open();
            } catch (e) {}
        }
    }

    function showSection(id) {
        if (!sections.includes(id)) return;

        sections.forEach(s => {
            const el = document.getElementById(s);
            if (el) el.style.display = s === id ? 'block' : 'none';
        });

        if (window.location.hash !== `#${id}`) {
            window.location.hash = id;
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
        cerrarDropdowns();
        cerrarSidenav();
    }

    function handleSubmenuClick(e) {
        e.preventDefault();
        e.stopPropagation();

        const container = this.closest('.dropdown-container');
        if (!container) return;

        const isActive = container.classList.contains('active');

        document.querySelectorAll('.dropdown-container').forEach(c => {
            if (c !== container) {
                c.classList.remove('active');
                const d = c.querySelector('.dropdown');
                if (d) d.style.display = 'none';
            }
        });

        if (isActive) {
            container.classList.remove('active');
            const dropdown = container.querySelector('.dropdown');
            if (dropdown) dropdown.style.display = 'none';
        } else {
            container.classList.add('active');
            const dropdown = container.querySelector('.dropdown');
            if (dropdown) dropdown.style.display = 'block';
        }
    }

    function configurarSubmenu() {
        document.querySelectorAll('.submenu').forEach(submenu => {
            submenu.removeEventListener('click', handleSubmenuClick);
            submenu.addEventListener('click', handleSubmenuClick);
        });
    }

    function configurarEnlaces() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            if (link.classList.contains('submenu')) return;
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const id = href.substring(1);
                    if (sections.includes(id)) {
                        e.preventDefault();
                        showSection(id);
                    }
                }
            });
        });
    }

    function configurarSidenav() {
        const sidenavElem = document.querySelector('#nav-mobile');
        if (sidenavElem && typeof M !== 'undefined' && M.Sidenav) {
            try {
                const existing = M.Sidenav.getInstance(sidenavElem);
                if (existing) existing.destroy();
                M.Sidenav.init(sidenavElem, {
                    edge: 'left',
                    draggable: true,
                    inDuration: 250,
                    outDuration: 200
                });
            } catch (e) {}
        }
    }

    function handleTriggerClick(e) {
        e.preventDefault();
        e.stopPropagation();

        const sidenavElem = document.querySelector('#nav-mobile');
        if (sidenavElem && typeof M !== 'undefined' && M.Sidenav) {
            try {
                const instance = M.Sidenav.getInstance(sidenavElem);
                if (instance) {
                    if (instance.isOpen) instance.close();
                    else instance.open();
                } else {
                    configurarSidenav();
                    setTimeout(() => {
                        const inst = M.Sidenav.getInstance(sidenavElem);
                        if (inst) inst.open();
                    }, 100);
                }
            } catch (e) {}
        }
    }

    function configurarTriggerSidenav() {
        const trigger = document.querySelector('.sidenav-trigger');
        if (trigger) {
            trigger.removeEventListener('click', handleTriggerClick);
            trigger.addEventListener('click', handleTriggerClick);
        }
    }

    function configurarCierreExterior() {
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.submenu') &&
                !e.target.closest('.dropdown') &&
                !e.target.closest('.dropdown-container')) {
                cerrarDropdowns();
            }
        });
    }

    function handleHash() {
        const hash = window.location.hash.substring(1);
        if (hash && sections.includes(hash)) showSection(hash);
        else showSection('INICIO');
    }

    function init() {
        setTimeout(() => {
            configurarSidenav();
            configurarTriggerSidenav();
            configurarSubmenu();
            configurarEnlaces();
            configurarCierreExterior();
            window.addEventListener('hashchange', handleHash);
            handleHash();
        }, 300);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.showSection = showSection;
    window.cerrarDropdowns = cerrarDropdowns;
    window.abrirSidenav = abrirSidenav;
    window.cerrarSidenav = cerrarSidenav;
})();

// ==================== SLIDESHOW IMÁGENES ====================
function initImageSlideshows() {
    const slidex = document.getElementById("slidex");
    if (slidex) {
        const slideImages = ["imagenes/1.jpg", "imagenes/2.jpg", "imagenes/3.jpg"];
        let currentImageIndex = 0;
        setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % slideImages.length;
            slidex.src = slideImages[currentImageIndex];
        }, 2500);
    }

    const imgAdd = document.getElementById("imgAdd");
    if (imgAdd) {
        const imagenes = ["imagenes/3.jpg", "imagenes/1.jpg", "imagenes/2.jpg"];
        let indice = 0;
        setInterval(() => {
            indice = (indice + 1) % imagenes.length;
            imgAdd.src = imagenes[indice];
        }, 5000);
    }
}

// ==================== MODAL NOTICIAS ====================
document.addEventListener("DOMContentLoaded", function () {
    const newsModal = document.getElementById("NewsModals");
    const abrirNews = document.querySelector(".player-cover");
    const cerrarNews = document.querySelector(".cerrar");
    const newsBox = document.querySelector(".news-modals-boxs");
    const mainContentNews = document.querySelector(".main-content");

    if (!newsModal || !abrirNews || !cerrarNews || !newsBox) return;

    abrirNews.addEventListener("click", function (e) {
        e.stopPropagation();
        newsModal.classList.add("active");
        document.body.style.overflow = "hidden";
    });

    cerrarNews.addEventListener("click", function (e) {
        e.stopPropagation();
        newsModal.classList.remove("active");
        document.body.style.overflow = "";
    });

    if (mainContentNews) {
        mainContentNews.addEventListener("click", function (e) {
            if (newsModal.classList.contains("active")) {
                if (e.target === mainContentNews || e.target.closest('.main-content') === mainContentNews) {
                    newsModal.classList.remove("active");
                    document.body.style.overflow = "";
                }
            }
        });
    }

    newsBox.addEventListener("click", function (e) {
        e.stopPropagation();
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && newsModal.classList.contains("active")) {
            newsModal.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
});

// ==================== CLIMA ====================
$(document).ready(function () {
    var iconLink = {
        "01d": "https://www.walldevil.com/wallpapers/w04/163410-clear-sky-hot-air-balloons-nature.jpg",
        "01n": "https://www.walldevil.com/wallpapers/a80/scenic-water-night-contrast-storm-bright-wallpaper-light-rain-lightning-nature-landscapes-wallpapers-trees-forest-reflection-lakes.jpg",
        "02d": "https://www.walldevil.com/wallpapers/w01/heaven-clouds-fields-grass-landscapes-wallpaper.jpg",
        "02n": "https://www.walldevil.com/wallpapers/w01/430984-clouds-skyscapes.jpg",
        "03d": "https://www.walldevil.com/wallpapers/w01/sun-clouds-wallpaper.jpg",
        "03n": "https://www.walldevil.com/wallpapers/w01/430984-clouds-skyscapes.jpg",
        "04d": "https://www.walldevil.com/wallpapers/w01/430984-clouds-skyscapes.jpg",
        "04n": "https://www.walldevil.com/wallpapers/w01/430984-clouds-skyscapes.jpg",
        "09d": "https://www.walldevil.com/wallpapers/w01/541653-rain.jpg",
        "09n": "https://www.walldevil.com/wallpapers/w01/541653-rain.jpg",
        "10d": "https://www.walldevil.com/wallpapers/w01/430720-rain-raindrops.jpg",
        "10n": "https://www.walldevil.com/wallpapers/w01/430720-rain-raindrops.jpg",
        "11d": "https://www.walldevil.com/wallpapers/a80/scenic-water-night-contrast-storm-bright-wallpaper-light-rain-lightning-nature-landscapes-wallpapers-trees-forest-reflection-lakes.jpg",
        "11n": "https://www.walldevil.com/wallpapers/a80/scenic-water-night-contrast-storm-bright-wallpaper-light-rain-lightning-nature-landscapes-wallpapers-trees-forest-reflection-lakes.jpg",
        "13d": "https://www.walldevil.com/wallpapers/a41/screensavers-wallpapers-lake-screensaver-china-snowing-walls.jpg",
        "13n": "https://www.walldevil.com/wallpapers/a41/screensavers-wallpapers-lake-screensaver-china-snowing-walls.jpg",
        "50d": "https://www.walldevil.com/wallpapers/w02/859093-burj-al-arab-burj-khalifa-cityscapes-dubai-mist-skyscapes-skyscrapers-united-arab-emirates.jpg",
        "50n": "https://www.walldevil.com/wallpapers/w02/859093-burj-al-arab-burj-khalifa-cityscapes-dubai-mist-skyscapes-skyscrapers-united-arab-emirates.jpg"
    };

    var defaultBg = "https://www.walldevil.com/wallpapers/w04/163410-clear-sky-hot-air-balloons-nature.jpg";

    function obtenerIconoMaterial(iconCode) {
        var code = iconCode.substring(0, 2);
        var isNight = iconCode.endsWith("n");
        switch (code) {
            case "01": return isNight ? "bedtime" : "wb_sunny";
            case "02": return isNight ? "nights_stay" : "wb_cloudy";
            case "03":
            case "04": return "cloud";
            case "09": return "shower";
            case "10": return isNight ? "nights_stay" : "grain";
            case "11": return "flash_on";
            case "13": return "ac_unit";
            case "50": return "blur_on";
            default: return isNight ? "bedtime" : "wb_sunny";
        }
    }

    $.getJSON("https://ipinfo.io/json")
        .done(function (info) {
            if (!info.loc) return;
            var loc = info.loc.split(",");
            var lat = loc[0];
            var lon = loc[1];

            var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" +
                lat + "&lon=" + lon + "&units=metric&lang=es&appid=1049904eff61a8f80e9cbe66c3278bab";

            $.getJSON(weatherUrl)
                .done(function (data) {
                    var temperatura = Math.round(data.main.temp);
                    var iconCode = data.weather[0].icon;
                    var materialIcon = obtenerIconoMaterial(iconCode);

                    $("#weatherIcon, #weatherSidenavIcon").text(materialIcon);
                    $("#weatherText, #weatherSidenavText").text(temperatura + "°C");

                    var bgUrl = iconLink[iconCode] || defaultBg;
                    $(".bgimg").css("background-image", "url('" + bgUrl + "')");
                })
                .fail(function () {
                    console.error("Error al obtener los datos del clima.");
                });
        })
        .fail(function () {
            console.error("Error al obtener la ubicación geográfica por IP.");
        });
});

// ==================== COMPARTIR ====================
function initShare() {
    const modalWrapper = document.querySelector('.modal_wraper');
    const shareBtn = document.getElementById('shareNavBtn');
    const closeBtnShare = document.querySelector('.modal_container .close');
    const copyBtn = document.querySelector('.copy_url_btn');
    const urlInput = document.querySelector('.copy_url_wraper input');

    if (!modalWrapper) return;

    function abrirModal(e) {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        modalWrapper.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (urlInput) urlInput.value = 'https://lafronterisima.stream';
    }

    function cerrarModal(e) {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        modalWrapper.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (shareBtn) {
        shareBtn.removeEventListener('click', abrirModal);
        shareBtn.addEventListener('click', abrirModal);
    }

    if (closeBtnShare) {
        closeBtnShare.removeEventListener('click', cerrarModal);
        closeBtnShare.addEventListener('click', cerrarModal);
    }

    modalWrapper.addEventListener('click', function(e) {
        if (e.target === this) cerrarModal();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalWrapper.classList.contains('active')) cerrarModal();
    });

    const shareUrl = encodeURIComponent('https://lafronterisima.stream');
    const shareText = encodeURIComponent('La Fronterisima - Notas surcando fronteras');

    const redes = {
        '.social_media .fb': `https://www.facebook.com/sharer.php?u=${shareUrl}`,
        '.social_media .wa': `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`,
        '.social_media .tl': `https://telegram.me/share/url?url=${shareUrl}&text=${shareText}`,
        '.social_media .ce': `mailto:?subject=${shareText}&body=${shareUrl}`,
        '.social_media .tt': 'https://www.instagram.com/'
    };

    Object.keys(redes).forEach(selector => {
        const el = document.querySelector(selector);
        if (el) {
            el.href = redes[selector];
            el.target = '_blank';
            el.rel = 'noopener noreferrer';
        }
    });

    async function handleCopy(e) {
        e.preventDefault();
        e.stopPropagation();
        const url = urlInput.value;
        try {
            await navigator.clipboard.writeText(url);
            window.showToast('✅ Enlace copiado');
        } catch (err) {
            try {
                urlInput.select();
                document.execCommand('copy');
                window.showToast('✅ Enlace copiado');
            } catch (err2) {
                window.showToast('❌ No se pudo copiar');
            }
        }
    }

    if (copyBtn && urlInput) {
        copyBtn.removeEventListener('click', handleCopy);
        copyBtn.addEventListener('click', handleCopy);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShare);
} else {
    initShare();
}

// ==================== FUNCIONES GLOBALES ====================
window.showToast = function(message, duration = 2500) {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), duration);
};

window.loadNews = function(url) {
    fetch(url)
        .then(r => r.text())
        .then(data => {
            const contex = document.getElementById('contex');
            if (contex) {
                contex.innerHTML = data + `<button onclick="goBack()" class="back-button">← Volver</button>`;
                window.scrollTo(0, 0);
            }
        })
        .catch(error => console.error('Error:', error));
};

window.goBack = function() {
    const contex = document.getElementById('contex');
    if (contex && typeof originalContent !== 'undefined' && originalContent) contex.innerHTML = originalContent;
    else location.reload();
    window.scrollTo(0, 0);
};

window.cargarNoticias = function() {
    window.showToast('Cargando más noticias...');
};

const originalContent = document.getElementById('contex')?.innerHTML;

// ==================== SCROLL TOP BTN ====================
const scrollBtn = document.createElement('button');
scrollBtn.className = 'scroll-top-btn';
scrollBtn.id = 'scrollTopBtn';
scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
    if (scrollBtn) {
        if (window.scrollY > 300) scrollBtn.classList.add('show');
        else scrollBtn.classList.remove('show');
    }
});
scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== MODAL EN VIVO ====================
const liveModal = document.getElementById("liveModal");
const timeInfo = document.getElementById("timeInfo");
const liveDot = document.querySelector(".live-dot");
const closeBtnLive = document.querySelector(".live-modal .close");
const liveBox = document.querySelector(".live-modal-box");
const mainContentLive = document.querySelector(".main-content");

function openModal(e) {
    if (!liveModal) return;
    if (e) e.stopPropagation();
    liveModal.classList.add("active");
}

if (timeInfo) timeInfo.addEventListener("click", openModal);
if (liveDot) liveDot.addEventListener("click", openModal);

function closeModal() {
    if (liveModal) liveModal.classList.remove("active");
}

if (closeBtnLive) {
    closeBtnLive.addEventListener("click", (e) => {
        e.stopPropagation();
        closeModal();
    });
}

if (mainContentLive) {
    mainContentLive.addEventListener("click", (e) => {
        if (liveModal && liveModal.classList.contains("active")) {
            if (!liveBox || !liveBox.contains(e.target)) closeModal();
        }
    });
}

if (liveBox) {
    liveBox.addEventListener("click", (e) => e.stopPropagation());
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && liveModal?.classList.contains("active")) closeModal();
});

// ==================== REPRODUCTOR DE AUDIO ====================
(function() {
    function initMainPlayer() {
        const audio = document.getElementById('track') || document.getElementById('radio');
        const playPauseBtn = document.getElementById('playPauseBtn');

        if (!audio || !playPauseBtn) return;

        // CARGA RÁPIDA: preload auto desde el inicio
        audio.preload = 'auto';
        audio.load();

        function pauseSecondaryRadios() {
            document.querySelectorAll('.radio-player audio').forEach(radio => {
                if (!radio.paused) {
                    radio.pause();
                    radio.currentTime = 0;
                }
            });
            document.querySelectorAll('.player-btns').forEach(btn => {
                btn.textContent = '▶';
                btn.classList.remove('playing');
            });
        }

        function updateMainButton() {
            const isPaused = audio.paused;
            playPauseBtn.classList.toggle('playing', !isPaused);
            const faIcon = playPauseBtn.querySelector('i');
            if (faIcon) {
                faIcon.classList.toggle('fa-pause', !isPaused);
                faIcon.classList.toggle('fa-play', isPaused);
            }
            const playIcon = playPauseBtn.querySelector('.play-icon');
            const pauseIcon = playPauseBtn.querySelector('.pause-icon');
            if (playIcon && pauseIcon) {
                playIcon.style.display = isPaused ? 'block' : 'none';
                pauseIcon.style.display = isPaused ? 'none' : 'block';
            }
        }

        playPauseBtn.addEventListener('click', function() {
            if (audio.paused) {
                pauseSecondaryRadios();
                audio.play().then(updateMainButton).catch(e => {
                    console.warn('Error reproduciendo:', e);
                    audio.load();
                    setTimeout(() => audio.play().catch(e2 => console.warn(e2)), 500);
                });
            } else {
                audio.pause();
                updateMainButton();
            }
        });

        audio.addEventListener('play', updateMainButton);
        audio.addEventListener('pause', updateMainButton);
        updateMainButton();
    }

    window.toggleRadio = function(id, btn) {
        const audioEl = document.getElementById(id);
        if (!audioEl) return;

        const allSecondary = document.querySelectorAll('.radio-player audio');
        const allButtons = document.querySelectorAll('.player-btns');
        const mainAudio = document.getElementById('track') || document.getElementById('radio');
        const mainBtn = document.getElementById('playPauseBtn');

        allSecondary.forEach(radio => {
            if (radio.id !== id && !radio.paused) {
                radio.pause();
                radio.currentTime = 0;
            }
        });

        allButtons.forEach(button => {
            if (button !== btn) {
                button.textContent = '▶';
                button.classList.remove('playing');
            }
        });

        if (mainAudio && !mainAudio.paused) {
            mainAudio.pause();
            if (mainBtn) {
                mainBtn.classList.remove('playing');
                const faIcon = mainBtn.querySelector('i');
                if (faIcon) {
                    faIcon.classList.remove('fa-pause');
                    faIcon.classList.add('fa-play');
                }
            }
        }

        // CARGA RÁPIDA: forzar preload alto la primera vez
        if (!audioEl.dataset.loaded) {
            audioEl.preload = 'auto';
            audioEl.load();
            audioEl.dataset.loaded = '1';
        }

        if (audioEl.paused) {
            audioEl.play()
                .then(() => {
                    btn.textContent = '❚❚';
                    btn.classList.add('playing');
                })
                .catch(err => {
                    console.log('❌ Error:', err);
                    btn.textContent = '▶';
                    btn.classList.remove('playing');
                });
        } else {
            audioEl.pause();
            btn.textContent = '▶';
            btn.classList.remove('playing');
        }
    };

    window.stopAllRadios = function() {
        const mainAudio = document.getElementById('track') || document.getElementById('radio');
        const mainBtn = document.getElementById('playPauseBtn');

        if (mainAudio && !mainAudio.paused) {
            mainAudio.pause();
            if (mainBtn) {
                mainBtn.classList.remove('playing');
                const faIcon = mainBtn.querySelector('i');
                if (faIcon) {
                    faIcon.classList.remove('fa-pause');
                    faIcon.classList.add('fa-play');
                }
            }
        }

        document.querySelectorAll(".radio-player audio").forEach(audio => {
            if (!audio.paused) {
                audio.pause();
                audio.currentTime = 0;
            }
        });

        document.querySelectorAll(".player-btns").forEach(btn => {
            btn.textContent = "▶";
            btn.classList.remove('playing');
        });
    };

    window.stopRadio = function(id) {
        const audio = document.getElementById(id);
        if (audio && !audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        }
        document.querySelectorAll(".player-btns").forEach(btn => {
            const btnId = btn.getAttribute('onclick');
            if (btnId && btnId.includes(id)) {
                btn.textContent = "▶";
                btn.classList.remove('playing');
            }
        });
    };

    window.getRadioStatus = function(id) {
        const audio = document.getElementById(id);
        if (!audio) return null;
        return {
            id, isPlaying: !audio.paused,
            currentTime: audio.currentTime,
            duration: audio.duration
        };
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMainPlayer);
    } else {
        initMainPlayer();
    }
})();