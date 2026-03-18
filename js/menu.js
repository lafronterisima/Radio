document.addEventListener("DOMContentLoaded", function() {

    let sidenavInstance = null;

    // Inicializar sidenav (Materialize)
    if (typeof M !== "undefined") {
        const elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems);

        // Obtener instancia (solo uno)
        sidenavInstance = M.Sidenav.getInstance(document.querySelector('.sidenav'));
    }

    const bloques = document.querySelectorAll('.elemento');
    const enlaces = document.querySelectorAll('.menu a, .sidenav a');

    enlaces.forEach(link => {
        link.addEventListener('click', function(e) {
            const hash = this.getAttribute('href');

            if (hash && hash.startsWith("#")) {
                e.preventDefault();

                // Mostrar sección
                bloques.forEach(b => b.classList.remove('visible'));
                document.querySelector(hash)?.classList.add('visible');

                // Activar link
                enlaces.forEach(l => l.classList.remove('activo'));
                this.classList.add('activo');

                // Scroll arriba
                window.scrollTo(0, 0);

                // 🔥 CERRAR SIDENAV
                if (sidenavInstance) {
                    sidenavInstance.close();
                }
            }
        });
    });

    // Submenu
    document.querySelectorAll('.submenu').forEach(menu => {
        menu.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.querySelector('.dropdown');
            if (dropdown) {
                dropdown.style.display =
                    dropdown.style.display === "block" ? "none" : "block";
            }
        });
    });

    // Menú desplegable limpio (sin conflicto)
    document.querySelectorAll('ul li').forEach(li => {
        li.addEventListener('click', function(e) {
            e.stopPropagation();

            this.querySelectorAll(':scope > ul').forEach(sub => {
                sub.style.display =
                    sub.style.display === "block" ? "none" : "block";
            });

            this.parentElement.querySelectorAll('ul ul').forEach(sub => {
                if (!this.contains(sub)) sub.style.display = "none";
            });
        });
    });

    // Touch swipe (abrir menú)
    let initialX = null;

    document.addEventListener('touchstart', function(e) {
        initialX = e.touches[0].clientX;
    });

    document.addEventListener('touchmove', function(e) {
        if (initialX === null) return;

        let currentX = e.touches[0].clientX;
        let diffX = initialX - currentX;

        if (diffX > 50) {
            document.getElementById("nav-mobile").style.display = "block";
            initialX = null;
        }
    });

});