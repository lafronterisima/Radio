  // ==================== OPTIMIZACIÓN DE CARGA ====================
// Usar DOMContentLoaded solo para lo esencial
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar solo lo necesario al inicio
    initFastComponents();
});

// Función para cargar componentes críticos primero
function initFastComponents() {
    // Slideshows (crítico)
    initSlideshows();
    
    // Navegación (crítico)
    initNavigation();
    
    // Sidenav (crítico)
    initSidenav();
    
    // Reproductor (crítico)
    initPlayer();
    
    // El resto carga después
    setTimeout(() => {
        initNonCritical();
    }, 100);
}

// ==================== DATOS (optimizado) ====================
const programsData = [
    { title: "Mañanera Fronteriza", time: "6:00 AM - 9:00 AM", description: "Comienza tu día con energía colombiana", icon: "🌅" },
    { title: "Vallenato Sin Fronteras", time: "9:00 AM - 12:00 PM", description: "Lo mejor del vallenato", icon: "🎵" },
    { title: "Popular al Aire", time: "12:00 PM - 3:00 PM", description: "Música popular", icon: "🎸" },
    { title: "Tarde de Éxitos", time: "3:00 PM - 6:00 PM", description: "Los mejores temas", icon: "🌟" },
    { title: "Carrilera Power", time: "6:00 PM - 9:00 PM", description: "La mejor carrilera", icon: "🚗" },
    { title: "Noche de Recuerdos", time: "9:00 PM - 12:00 AM", description: "Clásicos inolvidables", icon: "🌙" }
];

// Renderizado rápido (sin esperar DOMContentLoaded si el elemento ya existe)
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

// ==================== SLIDESHOW OPTIMIZADO ====================
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

// ==================== SLIDERS ARTISTAS (optimizado con delegación de eventos) ====================
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

// ==================== VIDEO SLIDER OPTIMIZADO ====================
function initVideoSlider() {
    const sliderContainer = document.querySelector("#slider1");
    if (!sliderContainer) return;
    
    let slideIndexVideo = 1;
    let videoSlides = document.querySelectorAll("#slider1 .slides");
    
    function showVideoSlides(n) {
        if (!videoSlides.length) return;
        if (n > videoSlides.length) slideIndexVideo = 1;
        if (n < 1) slideIndexVideo = videoSlides.length;
        for (let i = 0; i < videoSlides.length; i++) {
            videoSlides[i].style.display = "none";
        }
        if (videoSlides[slideIndexVideo - 1]) {
            videoSlides[slideIndexVideo - 1].style.display = "block";
        }
    }
    
    showVideoSlides(1);
    
    const leftArrow = document.querySelector("#slider1 .slide-arrow.left");
    const rightArrow = document.querySelector("#slider1 .slide-arrow.right");
    
    if (leftArrow) leftArrow.addEventListener("click", () => showVideoSlides(slideIndexVideo += -1));
    if (rightArrow) rightArrow.addEventListener("click", () => showVideoSlides(slideIndexVideo += 1));
}

// ==================== NAVEGACIÓN OPTIMIZADA ====================
function initNavigation() {
    const sectionsList = ['INICIO', 'NOTAS', 'VIDEOS', 'ARTISTAS', 'PRIVACIDAD'];
    
    window.showSection = function(sectionId) {
        sectionsList.forEach(sec => {
            const element = document.getElementById(sec);
            if (element) element.style.display = sec === sectionId ? 'block' : 'none';
        });
        window.location.hash = sectionId;
        const sidenavInstance = M.Sidenav.getInstance(document.querySelector('.sidenav'));
        if (sidenavInstance && sidenavInstance.isOpen) sidenavInstance.close();
    };
    
    document.querySelectorAll('.right a, .sidenav .navigation a, .dropdown a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const section = href.substring(1);
                if (sectionsList.includes(section)) window.showSection(section);
            }
        });
    });
    
    function handleHash() {
        const hash = window.location.hash.substring(1);
        if (hash && sectionsList.includes(hash)) window.showSection(hash);
        else window.showSection('INICIO');
    }
    
    window.addEventListener('hashchange', handleHash);
    handleHash();
}

// ==================== SIDENAV OPTIMIZADO ====================
function initSidenav() {
    const elems = document.querySelectorAll('.sidenav');
    if (elems.length && M.Sidenav) {
        M.Sidenav.init(elems, { edge: 'left', draggable: true });
    }
}

// ==================== SLIDESHOW IMÁGENES (lazy con requestIdleCallback) ====================
function initImageSlideshows() {
    // Slidex images
    const slidex = document.getElementById("slidex");
    if (slidex) {
        const slideImages = ["imagenes/1.jpg", "imagenes/2.jpg", "imagenes/3.jpg"];
        let currentImageIndex = 0;
        setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % slideImages.length;
            slidex.src = slideImages[currentImageIndex];
        }, 2500);
    }
    
    // Add images
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

// ==================== REPRODUCTOR OPTIMIZADO ====================
const audio = document.getElementById("radio");
const btn = document.getElementById("playPauseBtn");
const icon = btn.querySelector("i");

btn.addEventListener("click", async () => {
    try {
        if (audio.paused) {
            await audio.play();
            icon.classList.remove("fa-play");
            icon.classList.add("fa-pause");
        } else {
            audio.pause();
            icon.classList.remove("fa-pause");
            icon.classList.add("fa-play");
        }
    } catch (error) {
        console.log("Error reproduciendo audio:", error);
    }
});

// ==================== CLIMA (carga diferida) ====================
async function fetchWeatherByIP() {
    try {
        // 1️⃣ Obtener ubicación aproximada por IP
        const ipRes = await fetch("https://ipwho.is/");
        const ipData = await ipRes.json();

        if (!ipData.success) throw new Error("No se pudo obtener ubicación por IP");

        const lat = ipData.latitude;
        const lon = ipData.longitude;
        const ciudad = ipData.city || "Ciudad desconocida";

        // 2️⃣ Consultar Open-Meteo con coordenadas obtenidas
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
        const weatherRes = await fetch(weatherUrl);
        if (!weatherRes.ok) throw new Error(`Error en clima: ${weatherRes.status}`);

        const weatherData = await weatherRes.json();

        if (weatherData.current_weather && weatherData.current_weather.temperature !== undefined) {
            const temp = Math.round(weatherData.current_weather.temperature);

            // 3️⃣ Mostrar en navbar y sidenav
            const texto = `${temp}°C ${ciudad}`;
            const weatherTextNav = document.getElementById('weatherText');
            const weatherTextSidenav = document.getElementById('weatherTextSidenav');

            if (weatherTextNav) weatherTextNav.textContent = texto;
            if (weatherTextSidenav) weatherTextSidenav.textContent = texto;
        } else {
            throw new Error("Datos de clima no disponibles");
        }
    } catch (error) {
        console.error("Error obteniendo clima por IP:", error);
        // Fallback
        const weatherTextNav = document.getElementById('weatherText');
        const weatherTextSidenav = document.getElementById('weatherTextSidenav');

        if (weatherTextNav) weatherTextNav.textContent = "Bogotá 🌤️";
        if (weatherTextSidenav) weatherTextSidenav.textContent = "Bogotá 🌤️";
    }
}

// Ejecutar al cargar la página
fetchWeatherByIP();

// ==================== COMPARTIR OPTIMIZADO ====================
function initShare() {
    const shareModal = document.getElementById('shareModal');
    if (!shareModal) return;
    
    const shareUrl = encodeURIComponent('https://lafronterisima.stream');
    const shareText = encodeURIComponent('La Fronterisima - Notas surcando fronteras');
    
    document.getElementById('shareNavBtn')?.addEventListener('click', () => shareModal.classList.add('active'));
    document.getElementById('closeModal')?.addEventListener('click', () => shareModal.classList.remove('active'));
    
    const shareFb = document.getElementById('shareFb');
    const shareWa = document.getElementById('shareWa');
    const shareEmail = document.getElementById('shareEmail');
    const shareTg = document.getElementById('shareTg');
    const shareIg = document.getElementById('shareIg');
    
    if (shareFb) shareFb.href = `https://www.facebook.com/sharer.php?u=${shareUrl}`;
    if (shareWa) shareWa.href = `https://wa.me/?text=${shareText}%20${shareUrl}`;
    if (shareEmail) shareEmail.href = `mailto:?subject=${shareText}&body=${shareUrl}`;
    if (shareTg) shareTg.href = `https://telegram.me/share/url?url=${shareUrl}&text=${shareText}`;
    if (shareIg) shareIg.href = `https://www.instagram.com/?url=${shareUrl}`;
    
    document.getElementById('copyUrlBtn')?.addEventListener('click', () => {
        const input = document.getElementById('shareable_url');
        if (input) {
            input.select();
            document.execCommand('copy');
            showToast('✅ Enlace copiado al portapapeles');
        }
    });
    
    shareModal.addEventListener('click', (e) => {
        if (e.target === shareModal) shareModal.classList.remove('active');
    });
}

// ==================== FUNCIONES GLOBALES ====================
window.showToast = function(message, duration = 2500) {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) existingToast.remove();
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), duration);
};

window.loadNews = function(url) {
    fetch(url)
        .then(response => response.text())
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
    if (contex && originalContent) contex.innerHTML = originalContent;
    else location.reload();
    window.scrollTo(0, 0);
};

window.cargarNoticias = function() {
    window.showToast('Cargando más noticias...');
};

// ==================== CARGA NO CRÍTICA (diferida) ====================
function initNonCritical() {
    initArtistSliders();
    initVideoSlider();
    initImageSlideshows();
    initShare();
    fetchWeather();
}

// Guardar contenido original para noticias
const originalContent = document.getElementById('contex')?.innerHTML;

// ==================== SCROLL TOP BTN ====================
// Crear y agregar botón dinámicamente
const scrollBtn = document.createElement('button');
scrollBtn.className = 'scroll-top-btn';
scrollBtn.id = 'scrollTopBtn';
scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollBtn);

const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
    if (scrollTopBtn) {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }
});
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}



const liveModal = document.getElementById("liveModal");
const timeInfo = document.getElementById("timeInfo");
const liveDot = document.querySelector(".live-dot");
const closeBtn = document.querySelector(".live-modal .close");

/* =======================
   ABRIR MODAL
======================= */
function openModal(e) {
    e.stopPropagation();
    liveModal.classList.add("active");
}

timeInfo?.addEventListener("click", openModal);
liveDot?.addEventListener("click", openModal);

/* =======================
   CERRAR MODAL (SIN PARAR AUDIO)
======================= */
function closeModal() {
    liveModal.classList.remove("active");
}

// botón X
closeBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    closeModal();
});

// click fuera del contenido
liveModal.addEventListener("click", (e) => {
    if (e.target === liveModal) {
        closeModal();
    }
});

/* =======================
   RADIO PLAYER LOGIC
======================= */
function toggleRadio(id, btn) {
    const audio = document.getElementById(id);
    const allAudio = document.querySelectorAll("audio");
    const allButtons = document.querySelectorAll(".player-btn");

    // detener otros radios
    allAudio.forEach(a => {
        if (a !== audio) {
            a.pause();
            a.currentTime = 0;
        }
    });

    // reset botones
    allButtons.forEach(b => b.textContent = "▶");

    // play / pause actual
    if (audio.paused) {
        audio.play();
        btn.textContent = "❚❚";
    } else {
        audio.pause();
        btn.textContent = "▶";
    }
}

/* =======================
   OPCIONAL: STOP TOTAL (manual)
======================= */
function stopAllRadios() {
    document.querySelectorAll("audio").forEach(a => {
        a.pause();
        a.currentTime = 0;
    });

    document.querySelectorAll(".player-btn").forEach(b => {
        b.textContent = "▶";
    });
}
