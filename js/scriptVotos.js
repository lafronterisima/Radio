$(function(){
  
  //Creando un token unico de votacion para evitar inyeccion SQL
  var caracteres   = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ23467890";
  var tokenVotacion = "";
  for (i=1; i<=100; i++) tokenVotacion +=caracteres.charAt(Math.floor(Math.random()*caracteres.length)); 
  //console.log(tokenVotacion.length + tokenVotacion );

  //Accion para el Boton me Gusta Like
  $('.iconVotoLike').click(function(e){
      e.preventDefault();
      var idvotoArtistaLike   = $(this).attr("data-id"); //capturando el id de quien recibira el voto
      var like =1;
      
    //enviando voto con Ajax
    dataStringLike = 'accion='+ like + '&idvotoArtista=' + idvotoArtistaLike + '&token=' + tokenVotacion;
    $.ajax({
         url: "likes_msql.php",
        type: "POST",
        dataType: "json",
        data: dataStringLike,
        success: function(data){
          if(data.success === 0){
            console.log('succes: ' + data.success);
            $("#yavote" + idvotoArtistaLike).delay(500).fadeIn("slow");
            setTimeout(
              ()=>{
                  $("#yavote" + idvotoArtistaLike).hide(); 
              } , 2000
          );  
          console.log(data.success);
          }else if(data.success === 1){
            console.log('succes: ' + data.success);
            $("#like" + idvotoArtistaLike).addClass("checkenlike"); //Agrego clase de checke like
            $("#respuestaVotoLike" + idvotoArtistaLike).html(data.mensaje); // Mostrar la respuestas del script PHP.
          }

        }
      });
      return false;
  });



  //Accion para el Boton No me Gusta DisLike  
  $('.iconVotoDislike').click(function(e){
    e.preventDefault();
    var idvotodislike   = $(this).attr("data-id");
    var dislike = 0;
    
    //enviando voto con Ajax
    dataStringDislike = 'accion='+ dislike + '&idvotoArtista=' + idvotodislike + '&token=' + tokenVotacion;
    $.ajax({
        url: "likes_msql.php",
        type: "POST",
        data: dataStringDislike,
        success: function(data){
          if(data.success === 2){
            console.log('succes: ' + data.success);
            $("#yavote" + idvotodislike).delay(500).fadeIn("slow");
            setTimeout(
              ()=>{
                  $("#yavote" + idvotodislike).hide(); 
              } , 2000
          );  
          }else if(data.success === 3){
            console.log('succes: ' + data.success);
            $("#respuestaVotoDisLike" + idvotodislike).html(data.mensaje); // Mostrar la respuestas del script PHP.
           // $('#dislike' + idvotodislike).removeClass('checkenlike'); //quito la clase
          }

        }
      });
      return false;
    });
  
  });