$(function() {
  $('form').submit(function(e) {
    var form = $(this);

    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      data: form.serialize()
      
    }).done(function() {
      
      alert('Mensaje Enviado!');
        $('form')[0].reset();

                    
    }).fail(function() {
     
      alert('Mensaje Fallido');
    });
  
        e.preventDefault();
  });
});



	

