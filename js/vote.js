
const api="https://script.google.com/macros/s/AKfycbwj3aBcHzOnOK3iAg_oSfRpq2qELyZg4CUeYMfK74vZrdxLjA7CcPy3NTBN6g8U-yh6Ow/exec";

/* CARGAR VOTOS */

function cargarArtistas(){

fetch(api)
.then(res=>res.json())
.then(data=>{

/* ordenar ranking */

data.sort((a,b)=>b.votes-a.votes);

data.forEach(a=>{

let contador=document.getElementById("vote-"+a.id);

if(contador){

animarVotos(contador,a.votes);

}

});

});

}

/* ANIMACION DE VOTOS */

function animarVotos(elemento,valorFinal){

let inicio=0;

let intervalo=setInterval(()=>{

if(inicio>=valorFinal){

clearInterval(intervalo);

}else{

inicio++;

elemento.innerText=inicio+" votos";

}

},20);

}

/* BOTONES */

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


/* CARGAR AL ABRIR */

cargarArtistas();

/* ACTUALIZAR CADA 15 SEGUNDOS */

setInterval(cargarArtistas,15000);