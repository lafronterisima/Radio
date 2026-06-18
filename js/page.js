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

(function() {
    'use strict';
    
    console.log('🚀 Iniciando navegación...');
    
    const sections = ['RADIO', 'INICIO', 'NOTAS', 'VIDEOS', 'ARTISTAS', 'PRIVACIDAD'];
    
    // ==================== FUNCIÓN: CERRAR DROPDOWNS ====================
    function cerrarDropdowns() {
        document.querySelectorAll('.dropdown-container').forEach(container => {
            container.classList.remove('active');
            const dropdown = container.querySelector('.dropdown');
            if (dropdown) {
                dropdown.style.display = 'none';
            }
        });
        document.querySelectorAll('.dropdown').forEach(d => {
            d.style.display = 'none';
        });
    }
    
    // ==================== FUNCIÓN: CERRAR SIDENAV ====================
    function cerrarSidenav() {
        const sidenavElem = document.querySelector('#nav-mobile');
        if (sidenavElem && typeof M !== 'undefined' && M.Sidenav) {
            try {
                const instance = M.Sidenav.getInstance(sidenavElem);
                if (instance && instance.isOpen) {
                    instance.close();
                }
            } catch (e) {
                console.log('Sidenav no disponible');
            }
        }
    }
    
    // ==================== FUNCIÓN: ABRIR SIDENAV ====================
    function abrirSidenav() {
        const sidenavElem = document.querySelector('#nav-mobile');
        if (sidenavElem && typeof M !== 'undefined' && M.Sidenav) {
            try {
                const instance = M.Sidenav.getInstance(sidenavElem);
                if (instance && !instance.isOpen) {
                    instance.open();
                    console.log('✅ Sidenav abierto');
                }
            } catch (e) {
                console.log('Sidenav no disponible');
            }
        }
    }
    
    // ==================== FUNCIÓN: MOSTRAR SECCIÓN ====================
    function showSection(id) {
        console.log('📂 Mostrando sección:', id);
        
        if (!sections.includes(id)) return;
        
        sections.forEach(s => {
            const el = document.getElementById(s);
            if (el) {
                el.style.display = s === id ? 'block' : 'none';
            }
        });
        
        if (window.location.hash !== `#${id}`) {
            window.location.hash = id;
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        cerrarDropdowns();
        cerrarSidenav();
    }
    
    // ==================== CONFIGURAR SUBMENÚ ====================
    function configurarSubmenu() {
        console.log('🔧 Configurando submenús...');
        
        const submenus = document.querySelectorAll('.submenu');
        console.log('📌 Submenús encontrados:', submenus.length);
        
        if (submenus.length === 0) {
            console.warn('⚠️ No se encontraron elementos con clase .submenu');
            return;
        }
        
        submenus.forEach((submenu, index) => {
            console.log(`  Submenú ${index + 1}:`, submenu);
            submenu.removeEventListener('click', handleSubmenuClick);
            submenu.addEventListener('click', handleSubmenuClick);
        });
    }
    
    // ==================== MANEJADOR DE CLIC EN SUBMENÚ ====================
    function handleSubmenuClick(e) {
        console.log('🖱️ Clic en submenú');
        e.preventDefault();
        e.stopPropagation();
        
        const container = this.closest('.dropdown-container');
        console.log('📦 Contenedor encontrado:', container);
        
        if (!container) {
            console.warn('⚠️ No se encontró .dropdown-container');
            return;
        }
        
        const isActive = container.classList.contains('active');
        console.log('📌 Estado actual:', isActive ? 'activo' : 'inactivo');
        
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
            console.log('👆 Submenú cerrado');
        } else {
            container.classList.add('active');
            const dropdown = container.querySelector('.dropdown');
            if (dropdown) {
                dropdown.style.display = 'block';
                console.log('👆 Submenú abierto');
            } else {
                console.warn('⚠️ No se encontró .dropdown dentro del contenedor');
            }
        }
    }
    
    // ==================== CONFIGURAR ENLACES ====================
    function configurarEnlaces() {
        console.log('🔗 Configurando enlaces...');
        
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
    
    // ==================== CONFIGURAR SIDENAV ====================
    function configurarSidenav() {
        console.log('📱 Configurando Sidenav...');
        
        // Inicializar Sidenav de Materialize
        const sidenavElem = document.querySelector('#nav-mobile');
        if (sidenavElem && typeof M !== 'undefined' && M.Sidenav) {
            try {
                // Si ya tiene una instancia, destruirla primero
                const existingInstance = M.Sidenav.getInstance(sidenavElem);
                if (existingInstance) {
                    existingInstance.destroy();
                }
                
                // Crear nueva instancia
                const instance = M.Sidenav.init(sidenavElem, {
                    edge: 'left',
                    draggable: true,
                    inDuration: 250,
                    outDuration: 200,
                    onOpenStart: function() {
                        console.log('📱 Sidenav abriendo...');
                    },
                    onCloseEnd: function() {
                        console.log('📱 Sidenav cerrado');
                    }
                });
                console.log('✅ Sidenav inicializado correctamente');
                return instance;
            } catch (e) {
                console.error('❌ Error al inicializar Sidenav:', e);
            }
        } else {
            console.warn('⚠️ Materialize Sidenav no disponible o elemento no encontrado');
            console.log('   - Elemento #nav-mobile:', document.querySelector('#nav-mobile'));
            console.log('   - M.Sidenav disponible:', typeof M !== 'undefined' && M.Sidenav);
        }
    }
    
    // ==================== CONFIGURAR TRIGGER DEL SIDENAV ====================
    function configurarTriggerSidenav() {
        console.log('🔘 Configurando trigger del Sidenav...');
        
        // Buscar el botón que abre el Sidenav
        const trigger = document.querySelector('.sidenav-trigger');
        console.log('📌 Trigger encontrado:', trigger);
        
        if (trigger) {
            // Eliminar eventos existentes
            trigger.removeEventListener('click', handleTriggerClick);
            trigger.addEventListener('click', handleTriggerClick);
        } else {
            console.warn('⚠️ No se encontró .sidenav-trigger');
        }
    }
    
    // ==================== MANEJADOR DE CLIC EN TRIGGER ====================
    function handleTriggerClick(e) {
        console.log('🖱️ Clic en trigger del Sidenav');
        e.preventDefault();
        e.stopPropagation();
        
        const sidenavElem = document.querySelector('#nav-mobile');
        if (sidenavElem && typeof M !== 'undefined' && M.Sidenav) {
            try {
                const instance = M.Sidenav.getInstance(sidenavElem);
                if (instance) {
                    if (instance.isOpen) {
                        instance.close();
                        console.log('📱 Cerrando Sidenav');
                    } else {
                        instance.open();
                        console.log('📱 Abriendo Sidenav');
                    }
                } else {
                    console.warn('⚠️ Instancia de Sidenav no encontrada');
                    // Intentar inicializar de nuevo
                    configurarSidenav();
                    // Intentar abrir después de inicializar
                    setTimeout(() => {
                        const newInstance = M.Sidenav.getInstance(sidenavElem);
                        if (newInstance) {
                            newInstance.open();
                        }
                    }, 100);
                }
            } catch (e) {
                console.error('❌ Error al abrir/cerrar Sidenav:', e);
            }
        } else {
            console.warn('⚠️ Sidenav no disponible');
        }
    }
    
    // ==================== CERRAR AL CLIC FUERA ====================
    function configurarCierreExterior() {
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.submenu') && 
                !e.target.closest('.dropdown') && 
                !e.target.closest('.dropdown-container')) {
                cerrarDropdowns();
            }
        });
    }
    
    // ==================== MANEJAR HASH ====================
    function handleHash() {
        const hash = window.location.hash.substring(1);
        console.log('🔗 Hash detectado:', hash || '(vacío)');
        if (hash && sections.includes(hash)) {
            showSection(hash);
        } else {
            showSection('INICIO');
        }
    }
    
    // ==================== INICIALIZAR ====================
    function init() {
        console.log('✅ Inicializando navegación...');
        
        // Esperar un momento para que el DOM esté completamente listo
        setTimeout(() => {
            // Primero inicializar el Sidenav
            configurarSidenav();
            
            // Luego configurar el trigger
            configurarTriggerSidenav();
            
            // Configurar el resto
            configurarSubmenu();
            configurarEnlaces();
            configurarCierreExterior();
            
            window.addEventListener('hashchange', handleHash);
            handleHash();
            
            console.log('✅ Navegación inicializada correctamente');
            console.log('📊 Estado final:');
            console.log(`  - Submenús: ${document.querySelectorAll('.submenu').length}`);
            console.log(`  - Dropdowns: ${document.querySelectorAll('.dropdown').length}`);
            console.log(`  - Contenedores: ${document.querySelectorAll('.dropdown-container').length}`);
            console.log(`  - Sidenav: ${document.querySelector('#nav-mobile') ? '✅ Encontrado' : '❌ No encontrado'}`);
            
            // Verificar instancia de Sidenav
            const sidenavElem = document.querySelector('#nav-mobile');
            if (sidenavElem && typeof M !== 'undefined' && M.Sidenav) {
                const instance = M.Sidenav.getInstance(sidenavElem);
                console.log(`  - Instancia Sidenav: ${instance ? '✅ Activa' : '❌ No existe'}`);
            }
        }, 300);
    }
    
    // ==================== EJECUTAR ====================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Exponer funciones globalmente
    window.showSection = showSection;
    window.cerrarDropdowns = cerrarDropdowns;
    window.abrirSidenav = abrirSidenav;
    window.cerrarSidenav = cerrarSidenav;
    
})();


// ==================== SIDENAV OPTIMIZADO ====================
function initSidenav() {
    const elems = document.querySelectorAll('.sidenav');
    if (elems.length && typeof M !== 'undefined' && M.Sidenav) {
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

// ==================== COMPARTIR OPTIMIZADO Y CORREGIDO ====================
function initShare() {
    console.log('🔄 Inicializando compartir...');
    
    // ==================== OBTENER ELEMENTOS ====================
    const modalWrapper = document.querySelector('.modal_wraper');
    const shareBtn = document.getElementById('shareNavBtn');
    const closeBtn = document.querySelector('.modal_container .close');
    const copyBtn = document.querySelector('.copy_url_btn');
    const urlInput = document.querySelector('.copy_url_wraper input');
    
    // ==================== VERIFICAR ELEMENTOS ====================
    console.log('📌 Elementos encontrados:');
    console.log('  - modal_wraper:', modalWrapper ? '✅' : '❌');
    console.log('  - shareNavBtn:', shareBtn ? '✅' : '❌');
    console.log('  - closeBtn:', closeBtn ? '✅' : '❌');
    console.log('  - copyBtn:', copyBtn ? '✅' : '❌');
    console.log('  - urlInput:', urlInput ? '✅' : '❌');
    
    if (!modalWrapper) {
        console.error('❌ Modal .modal_wraper no encontrado');
        return;
    }
    
    // ==================== FUNCIÓN: ABRIR MODAL ====================
    function abrirModal(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        console.log('📂 Abriendo modal de compartir');
        modalWrapper.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evitar scroll
        
        // Actualizar URL en el input
        if (urlInput) {
            urlInput.value = 'https://lafronterisima.stream';
        }
    }
    
    // ==================== FUNCIÓN: CERRAR MODAL ====================
    function cerrarModal(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        console.log('📂 Cerrando modal de compartir');
        modalWrapper.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll
    }
    
    // ==================== CONFIGURAR BOTÓN DE ABRIR ====================
    if (shareBtn) {
        shareBtn.removeEventListener('click', abrirModal);
        shareBtn.addEventListener('click', abrirModal);
        console.log('✅ Botón de compartir configurado');
    } else {
        console.warn('⚠️ Botón #shareNavBtn no encontrado. Buscando alternativas...');
        
        // Buscar cualquier botón con clase share_btn
        const altBtn = document.querySelector('.share_btn');
        if (altBtn) {
            console.log('📌 Usando botón alternativo:', altBtn);
            altBtn.removeEventListener('click', abrirModal);
            altBtn.addEventListener('click', abrirModal);
        }
    }
    
    // ==================== CONFIGURAR BOTÓN DE CERRAR ====================
    if (closeBtn) {
        closeBtn.removeEventListener('click', cerrarModal);
        closeBtn.addEventListener('click', cerrarModal);
        console.log('✅ Botón de cerrar configurado');
    }
    
    // ==================== CERRAR AL CLIC FUERA ====================
    modalWrapper.addEventListener('click', function(e) {
        if (e.target === this) {
            console.log('🖱️ Clic fuera del modal - cerrando');
            cerrarModal();
        }
    });
    
    // ==================== CERRAR CON ESC ====================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalWrapper.classList.contains('active')) {
            console.log('⌨️ Tecla ESC - cerrando modal');
            cerrarModal();
        }
    });
    
    // ==================== CONFIGURAR ENLACES DE REDES SOCIALES ====================
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
            console.log(`✅ Enlace configurado: ${selector}`);
        } else {
            console.warn(`⚠️ Elemento ${selector} no encontrado`);
        }
    });
    
    // ==================== COPIAR URL ====================
    if (copyBtn && urlInput) {
        copyBtn.removeEventListener('click', handleCopy);
        copyBtn.addEventListener('click', handleCopy);
        console.log('✅ Botón de copiar configurado');
    }
    
    async function handleCopy(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('📋 Copiando URL...');
        
        const url = urlInput.value;
        
        try {
            await navigator.clipboard.writeText(url);
            console.log('✅ URL copiada (Clipboard API)');
            mostrarMensaje('✅ Enlace copiado al portapapeles');
        } catch (err) {
            console.log('⚠️ Fallback a método tradicional');
            try {
                urlInput.select();
                urlInput.setSelectionRange(0, 99999);
                document.execCommand('copy');
                console.log('✅ URL copiada (Fallback)');
                mostrarMensaje('✅ Enlace copiado al portapapeles');
            } catch (err2) {
                console.error('❌ Error al copiar:', err2);
                mostrarMensaje('❌ No se pudo copiar el enlace');
            }
        }
    }
    
    // ==================== MOSTRAR MENSAJE ====================
    function mostrarMensaje(texto) {
        console.log('📢 Mensaje:', texto);
        
        // Usar toast si existe
        if (window.showToast) {
            window.showToast(texto);
            return;
        }
        
        // Crear toast temporal
        const toast = document.createElement('div');
        toast.textContent = texto;
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: #1a1a2e;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            animation: fadeInUp 0.3s ease;
            max-width: 90%;
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    // ==================== INYECTAR CSS PARA EL TOAST ====================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translate(-50%, 20px); }
            to { opacity: 1; transform: translate(-50%, 0); }
        }
    `;
    document.head.appendChild(style);
    
    console.log('✅ Compartir inicializado correctamente');
}

// ==================== INICIALIZAR ====================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShare);
} else {
    initShare();
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
    fetchWeatherByIP(); // ✅ Corregido el nombre para evitar el error de interrupción catastrófico
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

// ==================== CONTROLES DE MODAL EN VIVO ====================
const liveModal = document.getElementById("liveModal");
const timeInfo = document.getElementById("timeInfo");
const liveDot = document.querySelector(".live-dot");
const closeBtn = document.querySelector(".live-modal .close");

/* =======================
   ABRIR MODAL
======================= */
function openModal(e) {
    if (!liveModal) return;
    e.stopPropagation();
    liveModal.classList.add("active");
}

timeInfo?.addEventListener("click", openModal);
liveDot?.addEventListener("click", openModal);

/* =======================
   CERRAR MODAL (SIN PARAR AUDIO)
======================= */
function closeModal() {
    if (liveModal) liveModal.classList.remove("active");
}

// botón X
closeBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    closeModal();
});

// click fuera del contenido
liveModal?.addEventListener("click", (e) => {
    if (e.target === liveModal) {
        closeModal();
    }
});


document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("NewsModals");
    const abrir = document.querySelector(".player-cover");
    const cerrar = document.querySelector(".cerrar");

    // Abrir modal
    abrir.addEventListener("click", function () {
        modal.style.display = "block";
    });

    // Cerrar modal
    cerrar.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Cerrar al hacer clic fuera del contenido
    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

});

(function() {
    // Variables para control de pausas
    let players = {};
    
    function initMainPlayer() {
        // Buscar audio principal (track o radio)
        const audio = document.getElementById('track') || document.getElementById('radio');
        const playPauseBtn = document.getElementById('playPauseBtn');
        
        if (!audio) {
            console.log('❌ No se encontró el audio principal');
            return;
        }
        if (!playPauseBtn) {
            console.log('❌ No se encontró el botón #playPauseBtn');
            return;
        }
        
        console.log('✅ Reproductor encontrado con ID:', audio.id);
        
        audio.preload = 'metadata';
        audio.crossOrigin = 'anonymous';
        audio.load();
        
        // ==================== PAUSAR RADIOS SECUNDARIAS ====================
        function pauseSecondaryRadios() {
            const secondaryRadios = document.querySelectorAll('.radio-player audio');
            const secondaryButtons = document.querySelectorAll('.player-btns');
            
            secondaryRadios.forEach(radio => {
                if (!radio.paused) {
                    radio.pause();
                    radio.currentTime = 0;
                }
            });
            
            secondaryButtons.forEach(btn => {
                btn.textContent = '▶';
                btn.classList.remove('playing');
            });
        }
        
        // ==================== ACTUALIZAR BOTÓN PRINCIPAL ====================
        function updateMainButton() {
            if (audio.paused) {
                playPauseBtn.classList.remove('playing');
                // Para FontAwesome
                const faIcon = playPauseBtn.querySelector('i');
                if (faIcon) {
                    faIcon.classList.remove('fa-pause');
                    faIcon.classList.add('fa-play');
                }
                // Para SVG
                const playIcon = playPauseBtn.querySelector('.play-icon');
                const pauseIcon = playPauseBtn.querySelector('.pause-icon');
                if (playIcon && pauseIcon) {
                    playIcon.style.display = 'block';
                    pauseIcon.style.display = 'none';
                }
            } else {
                playPauseBtn.classList.add('playing');
                const faIcon = playPauseBtn.querySelector('i');
                if (faIcon) {
                    faIcon.classList.remove('fa-play');
                    faIcon.classList.add('fa-pause');
                }
                const playIcon = playPauseBtn.querySelector('.play-icon');
                const pauseIcon = playPauseBtn.querySelector('.pause-icon');
                if (playIcon && pauseIcon) {
                    playIcon.style.display = 'none';
                    pauseIcon.style.display = 'block';
                }
            }
        }
        
        // ==================== CLICK DEL BOTÓN PRINCIPAL ====================
        playPauseBtn.addEventListener('click', function() {
            if (audio.paused) {
                // Detener todas las radios secundarias ANTES de reproducir
                pauseSecondaryRadios();
                
                audio.play()
                    .then(() => {
                        console.log('🎵 Radio principal reproduciendo');
                        updateMainButton();
                    })
                    .catch(e => {
                        console.warn('Error reproduciendo:', e);
                        // Intentar recargar
                        audio.load();
                        setTimeout(() => {
                            audio.play().catch(e2 => console.warn('Error again:', e2));
                        }, 500);
                    });
            } else {
                audio.pause();
                console.log('⏸️ Radio principal pausada');
                updateMainButton();
            }
        });
        
        audio.addEventListener('play', updateMainButton);
        audio.addEventListener('pause', updateMainButton);
        updateMainButton();
        
        console.log('🚀 Reproductor principal listo');
    }
    
    // ==================== RADIOS SECUNDARIAS ====================
    window.toggleRadio = function(id, btn) {
        const audioEl = document.getElementById(id);
        if (!audioEl) {
            console.log('❌ Radio no encontrada:', id);
            return;
        }
        
        const allSecondary = document.querySelectorAll('.radio-player audio');
        const allButtons = document.querySelectorAll('.player-btns');
        const mainAudio = document.getElementById('track') || document.getElementById('radio');
        const mainBtn = document.getElementById('playPauseBtn');
        
        // 1. Detener las demás radios secundarias
        allSecondary.forEach(radio => {
            if (radio.id !== id && !radio.paused) {
                radio.pause();
                radio.currentTime = 0;
            }
        });
        
        // 2. Resetear los otros botones secundarios
        allButtons.forEach(button => {
            if (button !== btn) {
                button.textContent = '▶';
                button.classList.remove('playing');
            }
        });
        
        // 3. Pausar radio principal si está sonando
        if (mainAudio && !mainAudio.paused) {
            mainAudio.pause();
            if (mainBtn) {
                mainBtn.classList.remove('playing');
                const faIcon = mainBtn.querySelector('i');
                if (faIcon) {
                    faIcon.classList.remove('fa-pause');
                    faIcon.classList.add('fa-play');
                }
                const playIcon = mainBtn.querySelector('.play-icon');
                const pauseIcon = mainBtn.querySelector('.pause-icon');
                if (playIcon && pauseIcon) {
                    playIcon.style.display = 'block';
                    pauseIcon.style.display = 'none';
                }
            }
        }
        
        // 4. Reproducir o pausar la radio seleccionada
        if (audioEl.paused) {
            audioEl.play()
                .then(() => {
                    console.log('🎵 Reproduciendo radio:', id);
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
            console.log('⏸️ Radio pausada:', id);
            btn.textContent = '▶';
            btn.classList.remove('playing');
        }
    };
    
    // ==================== STOP TOTAL ====================
    window.stopAllRadios = function() {
        // Pausar radio principal
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
                const playIcon = mainBtn.querySelector('.play-icon');
                const pauseIcon = mainBtn.querySelector('.pause-icon');
                if (playIcon && pauseIcon) {
                    playIcon.style.display = 'block';
                    pauseIcon.style.display = 'none';
                }
            }
        }
        
        // Pausar todas las radios secundarias
        const allAudios = document.querySelectorAll(".radio-player audio");
        allAudios.forEach(audio => {
            if (!audio.paused) {
                audio.pause();
                audio.currentTime = 0;
            }
        });
        
        // Resetear botones secundarios
        const allButtons = document.querySelectorAll(".player-btns");
        allButtons.forEach(btn => {
            btn.textContent = "▶";
            btn.classList.remove('playing');
        });
        
        console.log('🛑 Todos los audios detenidos');
    };
    
    // ==================== DETENER RADIO ESPECÍFICA ====================
    window.stopRadio = function(id) {
        const audio = document.getElementById(id);
        if (audio && !audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        }
        
        const buttons = document.querySelectorAll(".player-btns");
        buttons.forEach(btn => {
            const btnId = btn.getAttribute('onclick');
            if (btnId && btnId.includes(id)) {
                btn.textContent = "▶";
                btn.classList.remove('playing');
            }
        });
        
        console.log('⏹️ Radio detenida:', id);
    };
    
    // ==================== VERIFICAR ESTADO ====================
    window.getRadioStatus = function(id) {
        const audio = document.getElementById(id);
        if (!audio) return null;
        return {
            id: id,
            isPlaying: !audio.paused,
            currentTime: audio.currentTime,
            duration: audio.duration
        };
    };
    
    // Iniciar el reproductor principal
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMainPlayer);
    } else {
        initMainPlayer();
    }
})();