  

document.addEventListener('DOMContentLoaded', function() {
  // Initialize sidenav
  var sidenavElems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenavElems);

  var bloque = document.querySelector('.elemento');
  var enlaces = document.querySelectorAll('.teal a, .sidenav a');

  enlaces.forEach(function(enlace) {
    enlace.addEventListener('click', function(e) {
      var target = this.getAttribute('target');
      if (target === '_blank') return; // Let browser handle new tab/window
      e.preventDefault();
      var hash = this.getAttribute('href');
      var targetBlock = document.querySelector(hash);

      // Remove 'visible' class from all blocks
      document.querySelectorAll('.elemento').forEach(function(elem) {
        elem.classList.remove('visible');
      });

      // Add 'visible' class to target block
      if (targetBlock) {
        targetBlock.classList.add('visible');
      }

      // Remove 'activo' class from all links
      enlaces.forEach(function(link) {
        link.classList.remove('activo');
      });

      // Add 'activo' class to clicked link
      this.classList.add('activo');

      // Redirect to target if specified
      if (target && target !== '_self') {
        window.open(hash, target);
      }
    });
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
 
