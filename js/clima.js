// =======================
// CLIMA (Migrado a Open-Meteo)
// =======================
function obtenerClima(lat, lon, ciudad = "") {
    // URL de Open-Meteo con datos actuales de temperatura, humedad, código de clima y viento
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`;

    fetch(url)
        .then(r => r.json())
        .then(data => {
            const current = data.current;
            const ciudadFinal = ciudad || "Ubicación detectada";

            // 1. Mapeo de códigos de clima (WMO codes) a descripción e iconos
            const code = current.weather_code;
            let descripcion = "Despejado";
            let icon = "sun.png";

            if (code === 0) {
                descripcion = "Cielo despejado";
                icon = "sun.png";
            } else if (code >= 1 && code <= 3) {
                descripcion = "Parcialmente nublado";
                icon = "cloud.png";
            } else if (code >= 45 && code <= 48) {
                descripcion = "Niebla";
                icon = "cloud.png";
            } else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
                descripcion = "Lluvia";
                icon = "rain.png";
            } else if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
                descripcion = "Nieve";
                icon = "snow.png";
            } else if (code >= 95) {
                descripcion = "Tormenta eléctrica";
                icon = "rain.png";
            }

            // 2. Actualizar la interfaz de usuario (UI)
            document.getElementById("locationName").textContent = ciudadFinal;
            document.getElementById("texto-clima").textContent = descripcion;
            document.getElementById("texto-temp").textContent = `Temperatura: ${current.temperature_2m} °C`;
            document.getElementById("humidity").textContent = `Humedad: ${current.relative_humidity_2m}%`;
            document.getElementById("windSpeed").textContent = `Viento: ${current.wind_speed_10m} km/h`;

            // 3. Cambiar imagen según el clima
            const weatherImg = document.getElementById("weather-img");
            if (weatherImg) {
                weatherImg.src = `https://img.icons8.com/color/96/${icon}`;
            }

            // Nota legal obligatoria para la consola (o puedes ponerla en el HTML)
            console.log("Datos meteorológicos por Open-Meteo.com");
        })
        .catch(err => console.error("Error clima Open-Meteo:", err));
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
