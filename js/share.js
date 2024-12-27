const shareButton = document.getElementById("button-share");


shareButton.addEventListener("click", (event) => {

 
  if ("share" in navigator) {
    navigator
      .share({
      
        title: "Comparte la página web",
        message: "La Fronterisima"
        url: 'https://lafronterisima.com'
      }) 
  } 
});




  const shareBtnRef = document.querySelector('#button-share');
    shareBtnRef.onclick = async () => {
    if(navigator.share) {
      try {
        const shareData = {
          title: "Comparte la página web",
          url: 'https://lafronterisima.com'
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




