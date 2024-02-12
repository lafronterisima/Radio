const evento = document.getElementById('submit')
const enviarFormulario =() => {
        let email= document.getElementById('email').value;
        let mensajes = document.getElementById('mensajes').value;
        let numero = +573155276476;
var win= window.open(`https://wa.me/${numero}?text=Hola%20mi%20correo%20es%20${email}, Asunto:%20${mensajes}`,'_blank');       
}
evento.addEventListener('click', enviarFormulario)



$(function() {
  $('form').submit(function() {
    var form = $(this);

    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      data: form.serialize()
      
    }).done(function() {
      
      alert('Mensaje Enviado!');
        $('form')[0].reset();
               
    })
  });
});