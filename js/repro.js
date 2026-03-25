document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('track');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const video = document.getElementById('video-canvas');
    const audioPlayers = Array.from(document.querySelectorAll('audio'));
    let lastAudio = null;
    let players = {};

    /* =========================================
       ACTUALIZACIÓN VISUAL DEL BOTÓN
       ========================================= */
    function updateButton() {
        if (!playPauseBtn || !track) return;

        // Si el track está pausado o ha terminado, mostramos PLAY (clase .play)
        if (track.paused || track.ended) {
            playPauseBtn.classList.add('play');
            playPauseBtn.classList.remove('pause');
        } else {
            // Si el track está sonando, mostramos PAUSE (clase .pause)
            playPauseBtn.classList.add('pause');
            playPauseBtn.classList.remove('play');
        }
    }

    /* =========================================
       FUNCIONES DE CONTROL DE PAUSA
       ========================================= */
    function pauseAllYouTubeVideos() {
        Object.values(players).forEach(player => {
            if (player && typeof player.pauseVideo === 'function') {
                player.pauseVideo();
            }
        });
    }

    function pauseMainTrack() {
        if (track && !track.paused) {
            track.pause();
            updateButton();
        }
    }

    function pauseLocalVideo() {
        if (video && !video.paused) {
            video.pause();
        }
    }

    /* =========================================
       EVENTOS DE CLICK
       ========================================= */
    if (playPauseBtn && track) {
        playPauseBtn.addEventListener('click', () => {
            if (track.paused) {
                track.play().catch(error => console.log("Error al reproducir:", error));
            } else {
                track.pause();
            }

            // Al hacer clic, pausamos todo lo demás
            pauseAllYouTubeVideos();
            pauseLocalVideo();
            updateButton();
        });
    }

    /* =========================================
       GESTIÓN DE OTROS AUDIOS (No el principal)
       ========================================= */
    audioPlayers.forEach(audio => {
        // Evitamos afectar al track principal si está en la lista de audioPlayers
        if (audio.id === 'track') return; 

        audio.addEventListener('play', function () {
            // Pausar el anterior audio extra si existe
            if (lastAudio && lastAudio !== this) {
                lastAudio.pause();
                lastAudio.currentTime = 0;
            }
            lastAudio = this;

            // Al sonar un audio secundario, pausamos el principal y videos
            pauseMainTrack();
            pauseAllYouTubeVideos();
            pauseLocalVideo();
        });
    });

    /* =========================================
       VIDEO LOCAL
       ========================================= */
    if (video) {
        video.addEventListener('play', () => {
            pauseMainTrack();
            pauseAllYouTubeVideos();
        });
    }

    /* =========================================
       YOUTUBE API
       ========================================= */
    function onPlayerStateChange(event) {
        // Si un video de YT empieza a sonar (State 1 = PLAYING)
        if (event.data === YT.PlayerState.PLAYING) {
            pauseMainTrack();
            pauseLocalVideo();
        }
        updateButton();
    }

    window.onYouTubeIframeAPIReady = function () {
        document.querySelectorAll('iframe[id^="video-iframe-"]').forEach(iframe => {
            players[iframe.id] = new YT.Player(iframe.id, {
                events: {
                    'onStateChange': onPlayerStateChange
                }
            });
        });
    };

    // Verificación manual si la API ya cargó antes que el script
    if (window.YT && YT.Player) {
        window.onYouTubeIframeAPIReady();
    }

    /* =========================================
       ESCUCHADORES DE ESTADO (Sincronización extra)
       ========================================= */
    if (track) {
        // Si el audio se pausa o reproduce por otros medios (ej. controles del sistema)
        track.addEventListener('play', updateButton);
        track.addEventListener('pause', updateButton);
        track.addEventListener('ended', updateButton);
    }

    // Estado inicial al cargar la página
    updateButton();
});