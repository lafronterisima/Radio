 function isMobile() {

    if (sessionStorage.desktop)
        return false;
    else if (localStorage.mobile)
        return true;
    var mobile = ['iphone', 'ipad', 'android', 'blackberry', 'nokia', 'opera mini', 'windows mobile', 'windows phone', 'iemobile'];
    for (var i in mobile)
        if (navigator.userAgent.toLowerCase().indexOf(mobile[i].toLowerCase()) > 0) return true;
    return false;
}

const formulario = document.querySelector('#formulario');
const buttonSubmit = document.querySelector('#submit');
const urlDesktop = 'https://web.whatsapp.com/';
const urlMobile = 'whatsapp://';
const telefono = '+573214437177';

formulario.addEventListener('submit', (event) => {
    event.preventDefault()
    buttonSubmit.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>'
    buttonSubmit.disabled = true
    setTimeout(() => {
        let nombre = document.querySelector('#nombre').value
        let email = document.querySelector('#email').value
        let mensajes = document.querySelector('#mensajes').value
        let mensaje = 'send?phone=' + telefono + '&text=*_La Fronterísima_*%0A*Su nombre es*%0A' + nombre + '%0A*Su correo es*%0A' + email + '%0A*Su mensaje es*%0A' + mensajes + ''
        if(isMobile()) {
            window.open(urlMobile + mensaje, '_blank')
         
        }else{
            window.open(urlDesktop + mensaje, '_blank')
         
        }
        buttonSubmit.innerHTML = '<i class="fab fa-whatsapp"></i> Enviar WhatsApp'
        buttonSubmit.disabled = false
    }, 3000);
});
