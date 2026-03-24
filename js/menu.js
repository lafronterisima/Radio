
document.addEventListener("DOMContentLoaded", function() {
    let sidenavInstance = null;

    // 1. Inicializar Sidenav (Materialize)
    if (typeof M !== "undefined") {
        const elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems);
        sidenavInstance = M.Sidenav.getInstance(document.querySelector('.sidenav'));
    }

    const bloques = document.querySelectorAll('.elemento');
    const enlaces = document.querySelectorAll('.menu a, .sidenav a, .right a');

    // --- FUNCIÓN PARA CERRAR EL DESPLEGABLE ---
    const cerrarDropdown = () => {
        document.querySelectorAll('.dropdown').forEach(menu => {
            menu.style.display = "none";
        });
    };

    // 2. Lógica de Navegación (Enlaces finales)
    enlaces.forEach(link => {
        link.addEventListener('click', function(e) {
            const hash = this.getAttribute('href');

            // Si es un enlace a sección (#) y NO es el disparador del submenú
            if (hash && hash.startsWith("#")) {
                const target = document.querySelector(hash);
                
                if (target) {
                    // Si el enlace está dentro de un submenú, cerramos el submenú
                    if (this.closest('.dropdown')) {
                        cerrarDropdown();
                    }

                    // Navegación lógica
                    e.preventDefault();
                    bloques.forEach(b => b.classList.remove('visible'));
                    target.classList.add('visible');

                    // Estado activo
                    enlaces.forEach(l => l.classList.remove('activo'));
                    this.classList.add('activo');

                    // Cerrar menús globales
                    if (sidenavInstance) sidenavInstance.close();
                    window.scrollTo(0, 0);
                }
            }
        });
    });

    // 3. Lógica para Abrir/Cerrar "Catálogo" (Submenú)
    const disparadores = document.querySelectorAll('.submenu');

    disparadores.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const parentLi = this.parentElement;
            const dropdown = parentLi.querySelector('.dropdown');

            if (dropdown) {
                const estaVisible = dropdown.style.display === "block";
                
                // Cerramos otros por si acaso
                cerrarDropdown();

                // Alternamos el actual
                dropdown.style.display = estaVisible ? "none" : "block";
            }
        });
    });

    // 4. Cerrar si se hace clic fuera del menú o en un enlace normal del menú principal
    document.addEventListener('click', (e) => {
        // Si el clic no es en el botón de submenú, cerramos cualquier dropdown abierto
        if (!e.target.closest('.submenu')) {
            cerrarDropdown();
        }
    });
});