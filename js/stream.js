
 var mysound = document.getElementById("mysound");
      
 
        // Creating a function that will change
        // pause to play and vice-versa
        play.onclick = function() {
            if (mysound.paused) {
                // If playing then pause the
                // music and change the image
                mysound.play();
                 play.src = "images/pausa.png";
             }
              else {
 
                // If playing then pause the
                // music and change the image
                mysound.pause();
                 play.src = "images/play.png";      
              }
        }