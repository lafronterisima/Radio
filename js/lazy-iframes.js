// Lazy loading para iframes optimizado
document.addEventListener('DOMContentLoaded', function() {
    // Función para cargar iframes cuando sean visibles
    const loadIframe = (iframe) => {
        if (iframe.dataset.src && !iframe.src) {
            iframe.src = iframe.dataset.src;
            iframe.removeAttribute('data-src');
        }
    };

    // Configurar Intersection Observer para iframes
    if ('IntersectionObserver' in window) {
        const iframeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadIframe(entry.target);
                    iframeObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px' // Cargar 50px antes de que sea visible
        });

        // Observar todos los iframes con data-src
        document.querySelectorAll('iframe[data-src]').forEach(iframe => {
            iframeObserver.observe(iframe);
        });
    } else {
        // Fallback para navegadores sin Intersection Observer
        document.querySelectorAll('iframe[data-src]').forEach(iframe => {
            setTimeout(() => loadIframe(iframe), 1000);
        });
    }

    // Optimización específica para YouTube iframes
    const optimizeYouTubeIframes = () => {
        document.querySelectorAll('iframe[src*="youtube.com"]').forEach(iframe => {
            // Agregar parámetros de rendimiento
            const src = iframe.src;
            if (!src.includes('loading=')) {
                iframe.src = src + (src.includes('?') ? '&' : '?') + 'loading=lazy&rel=0&modestbranding=1';
            }
        });
    };

    // Retrasar carga de widgets de redes sociales
    const delaySocialWidgets = () => {
        setTimeout(() => {
            // Facebook widget
            if (typeof FB !== 'undefined') {
                FB.XFBML.parse();
            }
            // SoundCloud widget
            if (typeof SC !== 'undefined') {
                document.querySelectorAll('iframe[src*="soundcloud"]').forEach(iframe => {
                    if (iframe.dataset.src && !iframe.src) {
                        loadIframe(iframe);
                    }
                });
            }
        }, 2000); // Retrasar 2 segundos
    };

    optimizeYouTubeIframes();
    delaySocialWidgets();
});

// Prevenir layout shift para iframes
document.querySelectorAll('iframe').forEach(iframe => {
    if (!iframe.style.aspectRatio && iframe.width && iframe.height) {
        iframe.style.aspectRatio = `${iframe.width}/${iframe.height}`;
    }
});
