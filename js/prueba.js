var sticky_closed = false;
  $(window).scroll(function(){
    if(!sticky_closed){
      var docScroll = $(document).scrollTop();
      if(docScroll = 0){
        $(".sticky_footer").slideUp();
      }else{
        $(".sticky_footer").slideDown();
      }
    }
  });
  
