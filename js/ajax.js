
$(document).ready(function(){
    
    $("#pulsar1").click(function(){
        $("#contex").load("sub/news1.html");
      
    });
    
    $("#pulsar2").click(function(){
        $("#contex").load("sub/news2.html");
       
    });
    
    $("#pulsar3").click(function(){
        $("#contex").load("sub/news3.html");
       
    });
    
    $("#pulsar4").click(function(){
        $("#contex").load("sub/news4.html");
       
    });
    
     $("#pulsar5").click(function(){
        $("#contex").load("sub/news5.html");
       
    });
    
     $("#pulsar6").click(function(){
        $("#contex").load("sub/news6.html");
       
    });
    
     $("#pulsar7").click(function(){
        $("#contex").load("sub/news7.html");
      
    });
    
     $("#pulsar8").click(function(){
        $("#contex").load("sub/news8.html");
      
    });
    
     $("#pulsar9").click(function(){
        $("#contex").load("sub/news9.html");
        
    });
    
     $("#pulsar10").click(function(){
        $("#contex").load("sub/news10.html");
        
    });
    
 
     
      $(document).ready(function(){

	window.onresize = function() {
    	$(window).scroll(function(){
    		if ($(window).width() <= 960) {
    			if ($(window).scrollTop() == 0){
					$(".container-fluids").show();
				} else  {
					$(".container-fluids").hide();
				}
    		} else {
    			$(".container-fluids").show();
    		}			
		});	
	}

});
  
    	
 
       $(".right a").click(function(){
       $("html, .main-contain").animate({scrollTop:20}, "fast");
          return false;
       });
  
     
});

