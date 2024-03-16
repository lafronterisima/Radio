
$('document').ready(function(){
  	$('.sidenav').sidenav();
	
  var bloque = $('.elemento'),

      enlaces = $('.teal, .sidenav').find('a');
	  
      enlaces.click(function(e){
      e.preventDefault();
    
    var hash = $(this).attr('href');
    
    bloque
      .filter(hash)
      .addClass('visible')
      .siblings()
      .removeClass('visible');
      
    enlaces
      .removeClass('activo');
    
    $(this)
      .addClass('activo'); 
  });
  
});


$(document).ready(function () {
 $(".sub_item").click(function (e) {
       e.stopPropagation(); 
   }); 
			
 $('.sub_item').click(function () {
     $(this).next("").slideToggle(".drop");	   
           });
      });
		 	 
  
$(document).ready(function () {
    function cerrarSidenav() {
        $(".sidenav").hide();
    }

    $('ul li').on('click', function() {
        $("#nav-mobile").show(); 
        $('.sidenav-overlay').click(); 
    });

    $(".sidenav-trigger").click(function () {
        $("#nav-mobile").show();
        $('.sidenav-overlay').click();
    });

    var initialX = null;
    $(document).on('touchstart', function(e) {
        initialX = e.touches[0].clientX;
    });

    $(document).on('touchmove', function(e) {
        if (initialX === null) {
            return;
        }

        var currentX = e.touches[0].clientX;
        var diffX = initialX - currentX;
        if (diffX > 50) { 
            $("#nav-mobile").show();
            initialX = null;
        }
    });
});


   $(document).ready(function(){
       $(".submenu").click(function(){
         $(".submenu .dropdown").slideToggle();
         $("ul ul").css("display", "none");
        });

        $('ul li').click(function () {
           $(this).siblings().find('ul').slideUp();
           $(this).find('ul').slideToggle();
        }); 
   });


$(document).ready(function(){
    $("a").click(function(){
        ($('html,body').scrollTop(0));
    });
});
 
