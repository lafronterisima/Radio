const apiKeyClima = "185dbcc57e27f9315a49d3f1c762ebd7";

// Función para mostrar el clima y cambiar la imagen
function obtenerClima(lat, lon, ciudad) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKeyClima}&units=metric&lang=es`;

    fetch(url)
        .then(r => r.json())
        .then(data => {
            const ciudadFinal = ciudad || data.name;

            document.getElementById("locationName").textContent = `${ciudadFinal}`;
            document.getElementById("texto-clima").textContent = data.weather[0].description;
            document.getElementById("texto-temp").textContent = `Temperatura: ${data.main.temp} °C`;
            document.getElementById("humidity").textContent = `Humedad: ${data.main.humidity}%`;
            document.getElementById("windSpeed").textContent = `Viento: ${data.wind.speed} m/s`;

            // Cambiar imagen según el clima
            const weather = data.weather[0].main.toLowerCase();
            const weatherImg = document.getElementById("weather-img");

            if (weather.includes("clear")) {
                weatherImg.src = "https://img.icons8.com/color/96/000000/sun.png";
            } else if (weather.includes("clouds")) {
                weatherImg.src = "https://img.icons8.com/color/96/000000/cloud.png";
            } else if (weather.includes("rain") || weather.includes("drizzle")) {
                weatherImg.src = "https://img.icons8.com/color/96/000000/rain.png";
            } else if (weather.includes("snow")) {
                weatherImg.src = "https://img.icons8.com/color/96/000000/snow.png";
            } else {
                weatherImg.src = "https://img.icons8.com/color/96/000000/weather.png"; // Imagen por defecto
            }
        })
        .catch(err => console.error("Error clima:", err));
}

// Obtener ubicación por IP sin pedir GPS
function obtenerUbicacionIP() {
    fetch("https://ipwho.is/")
        .then(r => r.json())
        .then(data => {
            if (!data.success) {
                console.error("No se pudo obtener la ubicación por IP");
                return;
            }

            const lat = data.latitude;
            const lon = data.longitude;
            const ciudad = data.city;
           
            obtenerClima(lat, lon, ciudad);
        })
        .catch(err => console.error("Error IP:", err));
}

// Ejecutar automáticamente
obtenerUbicacionIP();