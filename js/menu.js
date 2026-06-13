document.addEventListener("DOMContentLoaded", function() {
    let sidenavInstance = null;

    // 1. Inicializar Sidenav (Materialize)
    if (typeof M !== "undefined") {
        const elems = document.querySelectorAll('.sidenav');
        if (elems.length) {
            M.Sidenav.init(elems);
            sidenavInstance = M.Sidenav.getInstance(elems[0]);
        }
    }

    const bloques = document.querySelectorAll('.elemento');
    const enlaces = document.querySelectorAll('.menu a, .sidenav a, .right a');

    // --- FUNCIÓN PARA CERRAR EL DESPLEGABLE ---
    const cerrarDropdown = () => {
        document.querySelectorAll('.dropdown').forEach(menu => {
            menu.style.display = "none";
        });
    };

    // 2. Lógica de Navegación
    enlaces.forEach(link => {
        link.addEventListener('click', function(e) {
            const hash = this.getAttribute('href');

            if (hash && hash.startsWith("#") && hash !== "#") {
                const target = document.querySelector(hash);
                
                if (target && !this.classList.contains('submenu')) {
                    e.preventDefault();
                    bloques.forEach(b => b.classList.remove('visible'));
                    target.classList.add('visible');

                    // Cerrar submenús
                    cerrarDropdown();
                    
                    // Cerrar sidenav en móvil
                    if (sidenavInstance && window.innerWidth <= 992) {
                        sidenavInstance.close();
                    }
                    
                    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                
                // Cerramos otros dropdowns
                cerrarDropdown();

                // Si estaba cerrado, lo abrimos
                if (!estaVisible) {
                    dropdown.style.display = "block";
                }
                // Si estaba abierto, ya se cerró
            }
        });
    });

    // 4. Cerrar SOLO si se hace clic fuera del submenú Y fuera del dropdown
    document.addEventListener('click', (e) => {
        const esSubmenu = e.target.closest('.submenu');
        const esDropdown = e.target.closest('.dropdown');
        const esEnlaceDropdown = e.target.closest('.dropdown a');
        
        // Si el clic es en un enlace del dropdown, NO cerramos inmediatamente
        if (esEnlaceDropdown) {
            return; // Dejamos que el enlace haga su trabajo
        }
        
        // Si el clic no es en el submenu Y no es en el dropdown, cerramos
        if (!esSubmenu && !esDropdown) {
            cerrarDropdown();
        }
    });

    // 5. Cerrar dropdown DESPUÉS de que el enlace del dropdown haya navegado
    document.querySelectorAll('.dropdown a').forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            // Dejamos que la navegación ocurra primero
            setTimeout(() => {
                cerrarDropdown();
            }, 100);
        });
    });

    // 6. Mostrar sección inicial
    const hashInicial = window.location.hash.substring(1) || 'RADIO';
    const seccionInicial = document.getElementById(hashInicial);
    if (seccionInicial) {
        bloques.forEach(b => b.classList.remove('visible'));
        seccionInicial.classList.add('visible');
    } else {
        const radioSeccion = document.getElementById('RADIO');
        if (radioSeccion) radioSeccion.classList.add('visible');
    }
});