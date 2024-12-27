


$(document).ready(function(){
    
    $("#boton1").click(function(){
        $("#contex").load("sub/news1.html");
      
    });
    
    $("#boton2").click(function(){
        $("#contex").load("sub/news2.html");
       
    });
    
    $("#boton3").click(function(){
        $("#contex").load("sub/news3.html");
       
    });
    
    $("#boton4").click(function(){
        $("#contex").load("sub/news4.html");
       
    });
    
     $("#boton5").click(function(){
        $("#contex").load("sub/news5.html");
       
    });
    
     $("#boton6").click(function(){
        $("#contex").load("sub/news6.html");
       
    });
    
     $("#boton7").click(function(){
        $("#contex").load("sub/news7.html");
      
    });
    
     $("#boton8").click(function(){
        $("#contex").load("sub/news8.html");
      
    });
    
     $("#boton9").click(function(){
        $("#contex").load("sub/news9.html");
        
    });
    
     $("#boton10").click(function(){
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

