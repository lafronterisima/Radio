
const newsFiles = ["sub/carga1.html", "sub/carga2.html"];
let currentNewsIndex = 0;

function cargarNoticias() {
    document.getElementById("gif").style.display = "block";

    if (currentNewsIndex < newsFiles.length) {
        var xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if (xhr.status === 200) {
                document.getElementById("contenedor5").innerHTML += xhr.responseText; 
                currentNewsIndex++;

                if (currentNewsIndex >= newsFiles.length) {
                    document.getElementById("boton").innerHTML = "No hay más";
                    document.getElementById("boton").disabled = true; 
                }
            } else {
                document.getElementById("contenedor5").innerHTML += "<p>Error al cargar.</p>";
            }

            document.getElementById("gif").style.display = "none";
        };

        xhr.open("GET", newsFiles[currentNewsIndex], true);
        xhr.send();
    } else {
     
        currentNewsIndex = 0; 
        document.getElementById("contenedor5").innerHTML = ""; 
        document.getElementById("boton").innerHTML = "Cargar más"; 
        document.getElementById("boton").disabled = false;
        cargarNoticias(); 
    }
}


 function loadNews(url) {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.statusText);
                    }
                    return response.text();
                })
                .then(data => {
                    document.getElementById('contex').innerHTML = data + `
                        <button onclick="goBack()" class="back-button">Volver</button>
                    `;
                    // Desplazar hacia arriba después de cargar la noticia
                    window.scrollTo(0, 0);
                })
                .catch(error => {
                    console.error('Error fetching the news:', error);
                    document.getElementById('contex').innerHTML = `<p>Error al cargar la noticia.</p>`;
                });
        }