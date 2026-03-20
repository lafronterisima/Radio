const newsFiles = ["sub/carga1.html", "sub/carga2.html"];
let currentNewsIndex = 0;
let expanded = false; // 👈 controla estado

function cargarNoticias() {
    const contenedor = document.getElementById("contenedor5");
    const boton = document.getElementById("boton");
    const gif = document.getElementById("gif");

    gif.style.display = "block";

    // 👉 SI YA ESTÁ TODO CARGADO → VOLVER ATRÁS
    if (expanded) {
        contenedor.innerHTML = "";
        currentNewsIndex = 0;
        expanded = false;

        boton.innerHTML = "Cargar más";
        boton.disabled = false;

        gif.style.display = "none";
        return;
    }

    // 👉 CARGAR NOTICIAS
    if (currentNewsIndex < newsFiles.length) {
        fetch(newsFiles[currentNewsIndex])
            .then(res => res.text())
            .then(data => {
                contenedor.innerHTML += data;
                currentNewsIndex++;

                // 🔥 Llegó al final
                if (currentNewsIndex >= newsFiles.length) {
                    boton.innerHTML = "Ver menos";
                    expanded = true;
                }

                gif.style.display = "none";
            })
           .catch(() => {
    if (!errorMostrado) {
        document.getElementById("contenedor5").innerHTML += "<p>Error al cargar.</p>";
        errorMostrado = true;
    }
    gif.style.display = "none";
});
    }
}