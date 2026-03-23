
document.addEventListener('DOMContentLoaded', () => {
    // 1. Cambiamos nombres de variables (guion por guion bajo o camelCase)
    const track = document.getElementById('track');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const videoCanvas = document.getElementById('video-canvas'); // Variable válida
    const audioPlayers = Array.from(document.querySelectorAll('audio'));
    let lastAudio = null;
    let players = {};

    /* =========================
        BOTÓN VISUAL (SVG)
       ========================= */
    function updateButton() {
        if (!playPauseBtn || !track) return;
        if (track.paused) {
            playPauseBtn.classList.add('play');
            playPauseBtn.classList.remove('pause');
        } else {
            playPauseBtn.classList.add('pause');
            playPauseBtn.classList.remove('play');
        }
    }

    /* =========================
        FUNCIONES DE PAUSA
       ========================= */
    function pauseAllYouTubeVideos() {
        Object.values(players).forEach(player => {
            if (player && typeof player.pauseVideo === 'function') {
                player.pauseVideo();
            }
        });
    }

    function pauseAudio() {
        if (track && !track.paused) {
            track.pause();
            updateButton();
        }
    }

    function pauseVideo() {
        // Corregido: videoCanvas es un elemento HTML, no tiene propiedad .paused si es iframe
        // Si es un <video> local, esto funciona. Si es iframe, se maneja con YouTube API
        if (videoCanvas && videoCanvas.tagName === 'VIDEO' && !videoCanvas.paused) {
            videoCanvas.pause();
        }
    }

    /* =========================
        CLICK PLAY / PAUSE PRINCIPAL
       ========================= */
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (track.paused) {
                track.play();
                // Al reproducir audio, pausamos el video
                pauseAllYouTubeVideos();
                pauseVideo();
            } else {
                track.pause();
            }
            updateButton();
        });
    }

    /* =========================
        GESTIÓN DE OTROS AUDIOS
       ========================= */
    audioPlayers.forEach(audio => {
        audio.addEventListener('play', function () {
            if (lastAudio && lastAudio !== this) {
                lastAudio.pause();
                lastAudio.currentTime = 0;
            }
            lastAudio = this;

            pauseAudio(); // Pausa el track principal
            pauseAllYouTubeVideos();
            pauseVideo();
            updateButton();
        });
    });

    /* =========================
        YOUTUBE API (Ajustado)
       ========================= */
    window.onYouTubeIframeAPIReady = function() {
        // Buscamos el iframe por su ID real
        const iframe = document.getElementById('video-canvas');
        if (iframe) {
            players[iframe.id] = new YT.Player(iframe.id, {
                events: {
                    'onStateChange': (event) => {
                        // Si el video de YouTube se reproduce, pausamos todo lo demás
                        if (event.data === YT.PlayerState.PLAYING) {
                            pauseAudio();
                            if (lastAudio) lastAudio.pause();
                        }
                    }
                }
            });
        }
    };

    // Cargar API de YouTube si no está presente
    if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
    } else {
        window.onYouTubeIframeAPIReady();
    }

    updateButton();
});