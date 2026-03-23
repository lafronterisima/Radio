document.addEventListener("DOMContentLoaded", function() {
    let sidenavInstance = null;

    // 1. Inicializar Sidenav (Materialize)
    if (typeof M !== "undefined") {
        const elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems);
        sidenavInstance = M.Sidenav.getInstance(document.querySelector('.sidenav'));
    }

    const bloques = document.querySelectorAll('.elemento');
    const enlaces = document.querySelectorAll('.menu a, .sidenav a');

    // 2. Lógica de Navegación y Secciones
    enlaces.forEach(link => {
        link.addEventListener('click', function(e) {
            const hash = this.getAttribute('href');

            // Si el enlace tiene un hash (ej: #contacto)
            if (hash && hash.startsWith("#")) {
                const target = document.querySelector(hash);
                
                // Si la sección existe, manejamos el cambio
                if (target) {
                    e.preventDefault();
                    e.stopPropagation(); // Evitamos que el click llegue al LI del submenú

                    // Mostrar sección
                    bloques.forEach(b => b.classList.remove('visible'));
                    target.classList.add('visible');

                    // Activar link
                    enlaces.forEach(l => l.classList.remove('activo'));
                    this.classList.add('activo');

                    // Scroll arriba y cerrar menú móvil
                    window.scrollTo(0, 0);
                    if (sidenavInstance) sidenavInstance.close();
                }
            }
        });
    });

    // 3. Lógica ÚNICA para Submenús (Dropdowns)
    // Buscamos los elementos LI que contienen un UL (el submenú)
    const submenus = document.querySelectorAll('li.submenu, .menu li:has(ul)');

    submenus.forEach(item => {
        item.addEventListener('click', function(e) {
            // Buscamos el submenú interno directo
            const dropdown = this.querySelector('ul');
            
            if (dropdown) {
                e.stopPropagation(); // Evita que el click cierre otros menús padres
                
                // Alternar visibilidad
                const isVisible = dropdown.style.display === "block";
                
                // Cerramos otros submenús abiertos al mismo nivel para que no se solapen
                this.parentElement.querySelectorAll(':scope > li > ul').forEach(openUl => {
                    openUl.style.display = "none";
                });

                dropdown.style.display = isVisible ? "none" : "block";
            }
        });
    });

    // 4. Cerrar submenús si se hace click fuera
    document.addEventListener('click', () => {
        document.querySelectorAll('.menu ul ul, .sidenav ul ul').forEach(sub => {
            sub.style.display = "none";
        });
    });
});