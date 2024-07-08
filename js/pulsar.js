document.addEventListener("DOMContentLoaded", function() {
    for (let i = 1; i <= 10; i++) {D
        let pulsar = document.getElementById("pulsar" + i);
        
  
        pulsar.addEventListener("click", function() {
            loadContent("sub/news" + i + ".html");
        });
    }
});

function loadContent(url) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            document.getElementById("contex").innerHTML = xhr.responseText;
        }
    };
    
    xhr.send();
}
 
 
     
   
      
         
       




 

 
    
   


 
     
   
      
         
       




 

 
    
   

