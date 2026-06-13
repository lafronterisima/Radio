
    document.addEventListener('DOMContentLoaded', function() {
    // Abrir el modal de chat al hacer clic en la imagen
    document.querySelectorAll('#weather-img').forEach(function(icon) {
     icon.addEventListener('click', function() {
      document.querySelector('#modal_box').classList.add('active'); // Mostrar el modal
    });
  });

  // Cerrar el modal cuando se hace clic en el botón de cerrar
  document.querySelectorAll('#cerrar_modal').forEach(function(button) {
    button.addEventListener('click', function() {
      document.querySelector('#modal_box').classList.remove('active'); // Ocultar el modal
    });
  });

  // Cerrar el modal al hacer clic fuera del contenedor del modal
  document.addEventListener('click', function(event) {
    var modal = document.querySelector('#modal_box');
    var modalContent = document.querySelector('.modal_containers');
    var isClickInsideModal = modalContent.contains(event.target);
    var isClickOnLiveIcon = event.target.closest('#weather-img');

    // Cierra el modal si el clic es fuera del modal y fuera del ícono
    if (!isClickInsideModal && !isClickOnLiveIcon) {
      modal.classList.remove('active');
    }
  });  

 
 //async function enviarMensaje(event){
   // event.preventDefault(); 

  //  const usuario = document.getElementById('usuario').value.trim();
   // const comentario = document.getElementById('comentario').value.trim();

  //  if (usuario === '' || comentario === '') return; 

   // try {
   //  const response = await fetch('send_message.php', {
     //   method: 'POST',
     //   headers: {
     //     'Content-Type': 'application/x-www-form-urlencoded'
     //   },
      //  body: new URLSearchParams({
       //   usuario: usuario,
       //   comentario: comentario
    //    })
    //  });

    //  if (response.ok) {
       
      //  const comentariosDiv = document.getElementById('chat-box');
      //  const comentarioElement = document.createElement('div');
       // comentarioElement.classList.add('comentario');

       // const fecha = new Date().toLocaleTimeString();

     //   comentarioElement.innerHTML = `
        //  <strong>${usuario}</strong>
        //  <small>${fecha}</small>
        //  <p>${comentario}</p>
      //  `;
        
      //  comentariosDiv.insertBefore(comentarioElement, comentariosDiv.firstChild);

      //  document.getElementById('comentario').value = '';
  //    } else {
     //   console.error('Error al enviar el mensaje:', response.statusText);
   //   }
  //  } catch (error) {
  //    console.error('Error en la solicitud:', error);
  //  }
 // }

 
 //  async function fetchMessages() {
  //  try {
   //   const response = await fetch('chat.php');
    //  if (response.ok) {
    //    const chatBox = document.getElementById('chat-box');
     //   chatBox.innerHTML = await response.text();
     //   chatBox.scrollTop = chatBox.scrollHeight; 
   //   } else {
      //  console.error('Error al recuperar los mensajes:', response.statusText);
   //   }
  //  } catch (error) {
   //   console.error('Error en la solicitud:', error);
  //  }
//  }

 // setInterval(fetchMessages, 5000);

//  const form = document.getElementById('form_comentario');
 // if (form) {
  //  form.addEventListener('submit', enviarMensaje);
  //  }
	
  });
