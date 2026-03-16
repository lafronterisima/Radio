
const api="https://script.google.com/macros/s/AKfycbwj3aBcHzOnOK3iAg_oSfRpq2qELyZg4CUeYMfK74vZrdxLjA7CcPy3NTBN6g8U-yh6Ow/exec";

/* CARGAR VOTOS */

function cargarArtistas(){

fetch(api)
.then(res=>res.json())
.then(data=>{

data.forEach(a=>{

let contador = document.getElementById("vote-"+a.id);

if(contador){
contador.innerText = a.votes + " votos";
}

});

});

}

/* EVENTO BOTONES */

document.querySelectorAll(".vote-button").forEach(btn=>{

btn.addEventListener("click",function(){

let id=this.dataset.artist;

votar(id);

});

});


/* VOTAR */

function votar(id){

if(localStorage.getItem("vote")){
alert("Ya votaste");
return;
}

fetch("https://api.ipify.org?format=json")
.then(res=>res.json())
.then(ip=>{

fetch(api,{
method:"POST",
headers:{
"Content-Type":"application/x-www-form-urlencoded"
},
body:"id="+id+"&ip="+ip.ip
})
.then(res=>res.text())
.then(data=>{

if(data=="already voted"){

alert("Ya votaste");

}else{

localStorage.setItem("vote","true");

alert("Voto registrado");

cargarArtistas();

}

});

});

}

/* cargar votos al abrir */

cargarArtistas();

/* actualizar cada 10 segundos */

setInterval(cargarArtistas,10000);

