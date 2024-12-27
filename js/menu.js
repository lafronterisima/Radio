
$(document).ready(function() {
    $('.sidenav').sidenav();

    var bloque = $('.elemento'),
        enlaces = $('.menu, .sidenav').find('a');

    enlaces.click(function(e){
        e.preventDefault();
        var hash = $(this).attr('href');
        bloque.filter(hash).addClass('visible').siblings().removeClass('visible');
        enlaces.removeClass('activo');
        $(this).addClass('activo');
    });

    $(".submenu").click(function(){
        $(".submenu .dropdown").slideToggle();
        $("ul ul").css("display", "none");
    });

    $('ul li').click(function () {
        $(this).siblings().find('ul').slideUp();
        $(this).find('ul').slideToggle();
    });

    $("a").click(function(){
        $('html,body').scrollTop(0);
    });

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