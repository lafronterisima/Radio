const apiKeyClima = "185dbcc57e27f9315a49d3f1c762ebd7";

function obtenerClima(lat, lon, ciudad = "") {
    // URL con unidades métricas y lenguaje en español
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKeyClima}&units=metric&lang=es`;

    fetch(url)
        .then(r => r.json())
        .then(data => {
            // Sincronización con tus IDs de HTML
            const ciudadFinal = ciudad || data.name || "Ubicación desconocida";

            // Inyectar datos en los divs correspondientes
            document.getElementById("locationName").textContent = ciudadFinal;
            document.getElementById("texto-clima").textContent = `- ${data.weather[0].description}`;
            document.getElementById("texto-temp").textContent = `Temperatura: ${Math.round(data.main.temp)} °C`;
            document.getElementById("humidity").textContent = `Humedad: ${data.main.humidity}%`;
            document.getElementById("windSpeed").textContent = `Viento: ${data.wind.speed} m/s`;

            // Lógica de iconos (usando tu sistema de icons8)
            const weatherMain = data.weather[0].main.toLowerCase();
            const weatherImg = document.getElementById("weather-img");
            
            let icon = "weather.png"; // Icono por defecto
            if (weatherMain.includes("clear")) icon = "sun.png";
            else if (weatherMain.includes("cloud")) icon = "cloud.png";
            else if (weatherMain.includes("rain") || weatherMain.includes("drizzle")) icon = "rain.png";
            else if (weatherMain.includes("snow")) icon = "snow.png";

            if (weatherImg) {
                weatherImg.src = `https://img.icons8.com/color/96/${icon}`;
            }
        })
        .catch(err => console.error("Error con OpenWeatherMap:", err));
}

// =======================
// UBICACIÓN POR IP (backup)
// =======================
function obtenerUbicacionIP() {
    fetch("https://ipwho.is/")
        .then(r => r.json())
        .then(data => {
            if (!data.success) throw new Error("IP no válida");
            obtenerClima(data.latitude, data.longitude, data.city);
        })
        .catch(err => console.error("Error IP:", err));
}

// =======================
// UBICACIÓN GPS (precisa)
// =======================
function obtenerUbicacionPrecisa() {
    if (!navigator.geolocation) {
        console.warn("Geolocalización no soportada");
        obtenerUbicacionIP();
        return;
    }

    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
            // Al ser GPS no tenemos el nombre de la ciudad directamente
            obtenerClima(latitude, longitude, "Tu ubicación actual");
        },
        error => {
            console.warn("GPS falló o fue denegado, usando IP", error);
            obtenerUbicacionIP();
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

// Ejecutar al cargar
obtenerUbicacionPrecisa();
