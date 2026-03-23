
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('track');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const video = document.getElementById('video');
    const audioPlayers = Array.from(document.querySelectorAll('audio'));
    let lastAudio = null;
    let players = {};

    /* =========================
       BOTÓN VISUAL (SVG)
       ========================= */
    function updateButton() {
        if (track.paused) {
            playPauseBtn.classList.add('play');
            playPauseBtn.classList.remove('pause');
        } else {
            playPauseBtn.classList.add('pause');
            playPauseBtn.classList.remove('play');
        }
    }

    /* =========================
       PAUSAS
       ========================= */
    function pauseAllYouTubeVideos() {
        Object.values(players).forEach(player => player.pauseVideo());
    }

    function pauseAudio() {
        if (!track.paused) {
            track.pause();
            updateButton();
        }
    }

    function pauseVideo() {
        if (video && !video.paused) {
            video.pause();
        }
    }

    /* =========================
       CLICK PLAY / PAUSE
       ========================= */
    playPauseBtn.addEventListener('click', () => {
        if (track.paused) {
            track.play();
        } else {
            track.pause();
        }

        pauseAllYouTubeVideos();
        pauseVideo();
        updateButton();
    });

    /* =========================
       OTROS AUDIOS
       ========================= */
    audioPlayers.forEach(audio => {
        audio.addEventListener('play', function () {
            if (lastAudio && lastAudio !== this) {
                lastAudio.pause();
                lastAudio.currentTime = 0;
            }
            lastAudio = this;

            pauseAllYouTubeVideos();
            pauseVideo();
            updateButton();
        });
    });

    /* =========================
       VIDEO LOCAL
       ========================= */
    if (video) {
        video.addEventListener('play', () => {
            pauseAudio();
            pauseAllYouTubeVideos();
            updateButton();
        });
    }

    /* =========================
       YOUTUBE
       ========================= */
    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.PLAYING) {
            pauseAudio();
            pauseVideo();
        }
        updateButton();
    }

    function onYouTubeIframeAPIReady() {
        document
            .querySelectorAll('iframe[id^="video-iframe-"]')
            .forEach(iframe => {
                players[iframe.id] = new YT.Player(iframe.id, {
                    events: { onStateChange }
                });
            });
    }

    if (window.YT && YT.Player) {
        onYouTubeIframeAPIReady();
    }

    /* =========================
       ESTADO INICIAL
       ========================= */
    updateButton();
});