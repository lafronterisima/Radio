const shareButton = document.getElementById("button-share");


shareButton.addEventListener("click", (event) => {

 
  if ("share" in navigator) {
    navigator
      .share({
      
        title: "Descarga la aplicación en este línk",
        url: 'https://www.amazon.com/dp/B0BD2J85V4/ref=apps_sf_sta'
      }) 
  } 
});