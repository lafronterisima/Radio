document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('track');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const video = document.getElementById('video');
    const audioPlayers = Array.from(document.querySelectorAll('audio'));
    let players = {};

    // Forzar inicio de carga apenas el DOM esté listo
    if (track) {
        track.load(); 
    }

    /* =========================
       CENTRAL DE PAUSAS (Exclusividad)
       ========================= */
    function silenceAllExcept(exception) {
        // Pausar Radio Principal
        if (track && track !== exception && !track.paused) {
            track.pause();
        }
        // Pausar Audios Secundarios
        audioPlayers.forEach(audio => {
            if (audio !== exception && !audio.paused) {
                audio.pause();
                if (audio.id !== 'track') audio.currentTime = 0;
            }
        });
        // Pausar Videos
        if (video && video !== exception && !video.paused) {
            video.pause();
        }
        // Pausar YouTube
        Object.values(players).forEach(p => {
            if (p && typeof p.pauseVideo === 'function') p.pauseVideo();
        });
        
        updateButton();
    }

    /* =========================
       BOTÓN VISUAL
       ========================= */
    function updateButton() {
        if (!track || !playPauseBtn) return;
        const isPaused = track.paused;
        playPauseBtn.classList.toggle('play', isPaused);
        playPauseBtn.classList.toggle('pause', !isPaused);
    }

    /* =========================
       EVENTOS
       ========================= */
    playPauseBtn.addEventListener('click', () => {
        if (track.paused) {
            silenceAllExcept(track);
            // El catch previene errores si el streaming tarda en responder
            track.play().catch(e => console.warn("Error de reproducción:", e));
        } else {
            track.pause();
        }
        updateButton();
    });

    // Detectar cuando cualquier audio empieza a sonar
    audioPlayers.forEach(audio => {
        audio.addEventListener('play', () => silenceAllExcept(audio));
    });

    if (video) {
        video.addEventListener('play', () => silenceAllExcept(video));
    }

    /* =========================
       YOUTUBE
       ========================= */
    window.onYouTubeIframeAPIReady = function() {
        document.querySelectorAll('iframe[id^="video-iframe-"]').forEach(iframe => {
            players[iframe.id] = new YT.Player(iframe.id, {
                events: {
                    onStateChange: (event) => {
                        if (event.data === YT.PlayerState.PLAYING) silenceAllExcept(null);
                    }
                }
            });
        });
    };

    if (window.YT && YT.Player) onYouTubeIframeAPIReady();

    // Sincronización nativa
    if (track) {
        track.addEventListener('play', updateButton);
        track.addEventListener('pause', updateButton);
    }

    updateButton();
});