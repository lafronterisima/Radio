
var track = document.getElementById('track');


var controlBtn = document.getElementById('play-pause');


function playPause() {
    if (track.paused) {
        track.play();
      
        controlBtn.className = "pause";
    } else { 
        track.pause();
      
        controlBtn.className = "play";
    }
}


controlBtn.addEventListener("click", playPause);
track.addEventListener("ended", function() {
  controlBtn.className = "play";
});


    $(document).ready(function( $ ) {
	       $('audio').on("play", function (me) {
		    $('audio').each(function (i,e) {
		    	if (e !== me.currentTarget) {
				this.pause(); 
                this.currentTime = 0;
			}
		  });
	   });
      })