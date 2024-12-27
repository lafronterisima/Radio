
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('track');
    const playPauseBtn = document.getElementById('playPauseBtn');
    let lastAudio = null;
    const audioPlayers = Array.from(document.querySelectorAll('audio'));
    let players = {};
    let wasAudioPlayingBeforeVideo = false; // To track if audio was playing before a video started
      function playPause() {
        if (track.paused) {
            track.play();
             playPauseBtn.classList.add('paused');
        } else {
            track.pause();
             playPauseBtn.classList.remove('paused');
        }

        // Pause all YouTube videos if audio is playing
        Object.values(players).forEach(player => player.pauseVideo());
    }

    audioPlayers.forEach(audio => {
        audio.addEventListener("play", function() {
            if (lastAudio && lastAudio !== this) {
                lastAudio.pause();
                lastAudio.currentTime = 0;
            }
            lastAudio = this;

            // Pause all YouTube videos when audio starts
            Object.values(players).forEach(player => player.pauseVideo());
        });
    });

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.PLAYING) {
            // Store if audio was playing before video started
            wasAudioPlayingBeforeVideo = !track.paused;

            // Pause all other YouTube videos
            Object.values(players).forEach(player => {
                if (player.getIframe().id !== event.target.getIframe().id) {
                    player.pauseVideo();
                }
            });

            // Pause the audio if it was playing
            if (track && !track.paused) {
                track.pause();
               
			       playPauseBtn.classList.remove('pausa'); // Quitar la clase de 'pausa'

            }
        } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
            // Resume audio if it was playing before the video
            if (wasAudioPlayingBeforeVideo) {
                track.play();
                  playPauseBtn.classList.remove('play'); // Quitar la clase de 'play'
           
            }
        }
    }

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

    playPauseBtn.addEventListener('click', playPause);

    if (typeof YT !== 'undefined' && YT.Player) {
        onYouTubeIframeAPIReady();
    } else {
        console.error('YouTube IFrame API is not loaded.');
    }
});