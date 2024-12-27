

function updateBackground() {
 
    let fecha = new Date(); 
    let hora = fecha.getHours();

 
    let img = document.getElementById("tiempo");

  
    if (hora >= 0 && hora < 8) {
        img.src = "imagenes/dia.png";
    } else if (hora >= 8 && hora < 12) {
        img.src = "imagenes/tiempo.png";
    } else if (hora >= 12 && hora < 18) {
        img.src = "imagenes/tarde.png";
    } else if (hora >= 18 && hora < 24) {
        img.src = "imagenes/noche.png";
    }
}

window.onload = function() {
    updateBackground(); 
};
   

  
  
