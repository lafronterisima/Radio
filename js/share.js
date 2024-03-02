const shareButton = document.getElementById("button-share");


shareButton.addEventListener("click", (event) => {

 
  if ("share" in navigator) {
    navigator
      .share({
      
        title: "Descarga la aplicación en este línk",
        message: "lafronterisima.online"
        url: 'https://www.amazon.com/dp/B0BD2J85V4/ref=apps_sf_sta'
      }) 
  } 
});




  const shareBtnRef = document.querySelector('#button-share');
    shareBtnRef.onclick = async () => {
    if(navigator.share) {
      try {
        const shareData = {
          title: "Descarga la aplicación de la radio",
          url: 'https://www.amazon.com/dp/B0BD2J85V4/ref=apps_sf_sta'
        }
        await navigator.share(shareData);
        console.log('Share successfull');
      } catch(err) {
        console.log('Error: ', err);
      }
    } else {
      console.warn('Native Web');
    }
  }




