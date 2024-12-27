
const apiKey = '185dbcc57e27f9315a49d3f1c762ebd7';

function obtenerClima(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`; // Añadido lang=es

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('locationName').textContent = data.name + ', ' + data.sys.country; 
            document.getElementById('texto-clima').textContent = data.weather[0].description;
            document.getElementById('texto-temp').textContent = `Temperatura: ${data.main.temp} °C`;
            document.getElementById('humidity').textContent = `Humedad: ${data.main.humidity}%`;
            document.getElementById('windSpeed').textContent = `Viento: ${data.wind.speed} m/s`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function obtenerUbicacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            obtenerClima(lat, lon);
        }, () => {
            alert('No se pudo obtener la ubicación.');
        });
    } else {
        alert('La geolocalización no está soportada en este navegador.');
    }
}

obtenerUbicacion();