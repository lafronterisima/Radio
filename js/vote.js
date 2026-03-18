const api = "https://script.google.com/macros/s/AKfycbwj3aBcHzOnOK3iAg_oSfRpq2qELyZg4CUeYMfK74vZrdxLjA7CcPy3NTBN6g8U-yh6Ow/exec";

/* CONTROL */
let cargando = false;
let ultimaVersion = 0;

/* CARGAR VOTOS */
function cargarArtistas() {
  if(cargando) return;
  cargando = true;

  fetch(api + "?version=" + ultimaVersion)
    .then(res => res.json())
    .then(data => {

      if(!data) return;

      // manejar sin cambios
      if(data.status === "nochange"){
        return;
      }

      let artistas = data.artistas || data;

      if(!Array.isArray(artistas)){
        console.error("Formato inválido:", data);
        return;
      }

      if(data.version){
        ultimaVersion = data.version;
      }

      artistas.sort((a,b)=>b.votes - a.votes);

      artistas.forEach(a => {
        let contador = document.getElementById("vote-" + a.id);

        if(contador){
          let actual = parseInt(contador.innerText) || 0;

          if(actual !== a.votes){
            animarVotos(contador, a.votes);
          }
        }
      });

    })
    .catch(err => console.error("Error fetch:", err))
    .finally(()=>{ cargando = false; });
}

/* ANIMACION SUAVE */
function animarVotos(elemento, valorFinal){
  let actual = parseInt(elemento.innerText) || 0;

  function frame(){
    if(actual < valorFinal){
      actual++;
      elemento.innerText = actual + " votos";
      requestAnimationFrame(frame);
    } else {
      elemento.innerText = valorFinal + " votos";
    }
  }

  frame();
}

/* BOTONES */
document.querySelectorAll(".vote-button").forEach(btn => {
  btn.addEventListener("click", function(){
    let id = this.dataset.artist;
    votar(id);
  });
});

/* VOTAR */
function votar(id){
  if(localStorage.getItem("vote")){
    mostrarMensaje("Ya votaste");
    return;
  }

  fetch("https://api.ipify.org?format=json")
    .then(res => res.json())
    .then(ip => {
      return fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "id=" + id + "&ip=" + ip.ip
      });
    })
    .then(res => res.text())
    .then(data => {

      if(data === "already voted"){
        mostrarMensaje("Ya votaste");
      } else {
        localStorage.setItem("vote","true");

        // actualización inmediata
        cargarArtistas();

        mostrarMensaje("Voto registrado");
      }

    })
    .catch(err => {
      mostrarMensaje("Error al votar");
      console.error(err);
    });
}

/* MENSAJES */
function mostrarMensaje(msg){
  let box = document.getElementById("mensaje");

  if(box){
    box.innerText = msg;
    box.style.display = "block";

    setTimeout(()=>{
      box.style.display = "none";
    }, 3000);
  }
}

/* INICIAR */
cargarArtistas();

/* AUTO-UPDATE INTELIGENTE */
setInterval(()=>{
  if(!document.hidden){
    cargarArtistas();
  }
}, 2000);