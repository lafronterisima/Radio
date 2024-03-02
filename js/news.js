$(document).ready(function(){

	window.onresize = function() {
    	$(window).scroll(function(){
    		if ($(window).width() < 768) {
    			if ($(window).scrollTop() == 0){
					$(".advert-container").show();
				} else  {
					$(".advert-container").hide();
				}
    		} else {
    			$(".advert-container").show();
    		}			
		});	
	}

});


function preloadImgs(image, url) {
  fetch(url).then(request => request.blob()).then(() => {
    image.src = url;
  });
}
