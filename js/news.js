
$(document).ready(function() {
  
    function handleScroll() {
        if ($(window).width() < 960) {
            if ($(window).scrollTop() === 0) {
                $(".advert-container").show(); 
            } else {
                $(".advert-container").hide(); 
            }
        } else {
            $(".advert-container").show(); 
        }
    }

    $(window).on("scroll", handleScroll);
    $(window).on("resize", handleScroll);

    handleScroll();
});