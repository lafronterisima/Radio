// Variables para gestionar los índices de las diapositivas de cada slider
let slideIndices = [1, 1, 1,1]; // Cada slider empieza con el índice 1

// Función para mostrar diapositivas
function showSlides(n, no) {
    let i;
    const slides = document.getElementsByClassName(`mySlides${no + 1}`);
    if (n > slides.length) { slideIndices[no] = 1; }
    if (n < 1) { slideIndices[no] = slides.length; }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slides[slideIndices[no] - 1].style.display = "block";  
}

// Función para avanzar o retroceder diapositivas
function plusSlides(n, no) {
    showSlides(slideIndices[no] += n, no);
}

// Inicialización de los sliders
function initializeSliders() {
    let i;
    for (i = 0; i < slideIndices.length; i++) {
        showSlides(slideIndices[i], i);
    }
}

// Inicializa los sliders cuando el contenido del DOM se ha cargado
document.addEventListener("DOMContentLoaded", initializeSliders);