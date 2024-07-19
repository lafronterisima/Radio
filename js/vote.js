
document.addEventListener('DOMContentLoaded', () => {
    fetchVotes();  // Llama a la función para obtener los votos iniciales

    // Verifica si el usuario ya votó
    if (localStorage.getItem('hasVoted')) {
        disableForm();  // Desactiva el formulario si ya ha votado
    }

    // Configura los botones de votar
    document.querySelectorAll('.vote-button').forEach(button => {
        button.addEventListener('click', () => {
            const artistId = button.getAttribute('data-artist');
            voteForArtist(artistId);  // Vota para el artista seleccionado
        });
    });
});

// Función para votar por un artista
function voteForArtist(artistId) {
    // Prepara los datos del formulario
    const formData = new FormData();
    formData.append('artist', artistId);

    fetch('vote.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);  // Muestra mensaje de éxito
            localStorage.setItem('hasVoted', 'true');  // Marca que el usuario ya votó
            disableForm();  // Desactiva el formulario
            fetchVotes();  // Actualiza los votos después de votar
        } else {
            alert(data.message);  // Muestra mensaje de error
        }
    })
    .catch(error => {
        console.error('Error de red:', error);
        alert('Error al conectar con el servidor.');
    });
}

// Función para obtener los votos de cada artista
function fetchVotes() {
    fetch('get_votes.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Actualiza los votos en el HTML
                data.votes.forEach(vote => {
                    const voteElement = document.getElementById(`vote-${vote.artist_id}`);
                    if (voteElement) {
                        voteElement.textContent = `${vote.votes} votos`;
                    }
                });
            } else {
                console.error('Error al obtener los votos:', data.message);
            }
        })
        .catch(error => {
            console.error('Error de red:', error);
        });
}

// Función para desactivar el formulario después de votar
function disableForm() {
    document.querySelectorAll('.vote-button').forEach(button => {
        button.disabled = true;  // Desactiva el botón de votar
    });
}
