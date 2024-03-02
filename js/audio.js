	
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
 