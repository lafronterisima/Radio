
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('track'); // El audio con id="track"
    const playPauseBtn = document.getElementById('playPauseBtn');
    const video = document.getElementById('video'); // El video con id="video"
    let lastAudio = null;
    const audioPlayers = Array.from(document.querySelectorAll('audio'));
    let players = {};

    // Pausar todos los videos de YouTube
    function pauseAllYouTubeVideos() {
        Object.values(players).forEach(player => player.pauseVideo());
    }

    // Pausar el audio
    function pauseAudio() {
        if (!track.paused) {
            track.pause();
            playPauseBtn.classList.remove('paused'); // Quitar la clase 'paused' del botón
        }
    }

    // Pausar el video
    function pauseVideo() {
        if (!video.paused) {
            video.pause();
        }
    }

    // Reproducir o pausar el audio al hacer clic en el botón de play/pause
    function playPause() {
        if (track.paused) {
            track.play();
            playPauseBtn.classList.add('paused');
        } else {
            track.pause();
            playPauseBtn.classList.remove('paused');
        }

        // Pausar todos los videos de YouTube si el audio está reproduciéndose
        pauseAllYouTubeVideos();

        // Pausar el video cuando el audio está reproduciéndose
        if (!track.paused) {
            pauseVideo();
        }
    }

    // Escuchar el evento "play" en cada audio
    audioPlayers.forEach(audio => {
        audio.addEventListener("play", function() {
            if (lastAudio && lastAudio !== this) {
                lastAudio.pause();
                lastAudio.currentTime = 0;
            }
            lastAudio = this;

            // Pausar todos los videos de YouTube cuando el audio comienza
            pauseAllYouTubeVideos();

            // Pausar el video cuando comienza a reproducirse el audio
            pauseVideo();
        });
    });

    // Escuchar el evento "play" en el video local
    video.addEventListener('play', function() {
        // Pausar el audio y los videos de YouTube cuando el video local comienza
        pauseAudio();
        pauseAllYouTubeVideos();
    });

    // Manejar el estado de los iframes de YouTube
    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.PLAYING) {
            // Pausar el audio y el video cuando comienza a reproducirse un video de YouTube
            pauseAudio();
            pauseVideo();
        } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
            // Si el video de YouTube se pausa o termina, y el audio estaba pausado, reproducirlo
            if (track.paused) {
                track.play();
                playPauseBtn.classList.add('paused'); // Añadir la clase 'paused' al botón
            }
        }
    }

    // Inicializar los reproductores de YouTube
    function onYouTubeIframeAPIReady() {
        const iframes = document.querySelectorAll('iframe[id^="video-iframe-"]');
        iframes.forEach(iframe => {
            players[iframe.id] = new YT.Player(iframe.id, {
                events: {
                    'onStateChange': onPlayerStateChange
                }
            });
        });
    }

    // Evento de click para el botón play/pause
    playPauseBtn.addEventListener('click', playPause);

    // Si la API de YouTube está cargada, inicializamos los reproductores de YouTube
    if (typeof YT !== 'undefined' && YT.Player) {
        onYouTubeIframeAPIReady();
    } else {
        console.error('La API de YouTube IFrame no se ha cargado.');
    }
});
