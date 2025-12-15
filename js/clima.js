
const apiKeyClima = "185dbcc57e27f9315a49d3f1c762ebd7";

// =======================
// CLIMA
// =======================
function obtenerClima(lat, lon, ciudad = "") {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKeyClima}&units=metric&lang=es`;

    fetch(url)
        .then(r => r.json())
        .then(data => {
            const ciudadFinal = ciudad || data.name || "Ubicación desconocida";

            document.getElementById("locationName").textContent = ciudadFinal;
            document.getElementById("texto-clima").textContent = data.weather[0].description;
            document.getElementById("texto-temp").textContent = `Temperatura: ${data.main.temp} °C`;
            document.getElementById("humidity").textContent = `Humedad: ${data.main.humidity}%`;
            document.getElementById("windSpeed").textContent = `Viento: ${data.wind.speed} m/s`;

            const weather = data.weather[0].main.toLowerCase();
            const weatherImg = document.getElementById("weather-img");

            if (weather.includes("clear")) {
                weatherImg.src = "https://img.icons8.com/color/96/sun.png";
            } else if (weather.includes("cloud")) {
                weatherImg.src = "https://img.icons8.com/color/96/cloud.png";
            } else if (weather.includes("rain") || weather.includes("drizzle")) {
                weatherImg.src = "https://img.icons8.com/color/96/rain.png";
            } else if (weather.includes("snow")) {
                weatherImg.src = "https://img.icons8.com/color/96/snow.png";
            } else {
                weatherImg.src = "https://img.icons8.com/color/96/weather.png";
            }
        })
        .catch(err => console.error("Error clima:", err));
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
            obtenerClima(latitude, longitude);
        },
        error => {
            console.warn("GPS falló, usando IP", error);
            obtenerUbicacionIP();
        },
        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        }
    );
}

// =======================
// EJECUCIÓN
// =======================
obtenerUbicacionPrecisa();
