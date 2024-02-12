$('document').ready(function(){

  

  var bloque = $('.elemento'),

      enlaces = $('.menu').find('a');

  

  enlaces.click(function(){

  

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



$(function(){ $('a').click(function(){ var href =$(this).attr("href"); 
$('html').animate({ scrollTop: $(href).offset().top }, 100) });
 });

    
// Navegation Menu

let btnMenu = document.querySelector('.btn-menu');

let barIconX = document.querySelector('.btn-menu i');

let menu = document.querySelector('.list-container');

let menuContent = document.querySelector('.menu');

var activador = true;



btnMenu.addEventListener('click', (event) => {



  //Icon X

  barIconX.classList.toggle('fa-times');



   if(activador){

     menu.style.left = '0%'; 

     menu.style.transition = '0.5s';

  

     activador = false;

   }

   else{

    activador = false;

    menu.style.left = '-100';



    activador = true;

   }



});






 $(document).ready(function() {

	 $(".btn-menu").click(function(){

		 $(".nav-menu").slideToggle(100, function() {

	         

    $(".lists li a").click(function(){

		

       $(".nav-menu").addClass("hide").css("display", ""); 

       $("this").toggleClass("nav-expanded").css('display', ".sidenav");

       

      });         

	 

     });

    });

   });

   

   

   $(document).ready(function(){

          

       $(".submenu").click(function(){

            $(".dropdown").slideToggle();

            $("ul ul").css("display", "none");

        });

    

        $('ul li').click(function () {

              $(this).siblings().find('ul').slideUp();

            $(this).find('ul').slideToggle();

        

  }); 



   });
   
   
   
   
    $(window).scroll(function(){
        if ($(this).scrollTop() > 400) {
            $('.scrollup').fadeIn('slow');
        } else {
            $('.scrollup').fadeOut('slow');
        }
    });
    $('.scrollup').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 1000);
        return false;
    });	



  





  



   

  

   

   

  
   

  /*scroll to top*/
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $("#arrow i").fadeIn();
        }
        else {
            $("#arrow i").fadeOut();
        }

    });
    $("#arrow i").on('click', function () {
        $("html,body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

});

    




  



   

  

   

   

  

   

   

  