
  async function fetchWeatherByIP() {
    try {
        // 1️⃣ Obtener ubicación aproximada por IP
        const ipRes = await fetch("https://ipwho.is/");
        const ipData = await ipRes.json();

        if (!ipData.success) throw new Error("No se pudo obtener ubicación por IP");

        const lat = ipData.latitude;
        const lon = ipData.longitude;
        const ciudad = ipData.city || "Ciudad desconocida";

        // 2️⃣ Consultar Open-Meteo con coordenadas obtenidas
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
        const weatherRes = await fetch(weatherUrl);
        if (!weatherRes.ok) throw new Error(`Error en clima: ${weatherRes.status}`);

        const weatherData = await weatherRes.json();

        if (weatherData.current_weather && weatherData.current_weather.temperature !== undefined) {
            const temp = Math.round(weatherData.current_weather.temperature);

            // 3️⃣ Mostrar en navbar y sidenav
            const texto = `${temp}°C ${ciudad}`;
            const weatherTextNav = document.getElementById('weatherText');
            const weatherTextSidenav = document.getElementById('weatherTextSidenav');

            if (weatherTextNav) weatherTextNav.textContent = texto;
            if (weatherTextSidenav) weatherTextSidenav.textContent = texto;
        } else {
            throw new Error("Datos de clima no disponibles");
        }
    } catch (error) {
        console.error("Error obteniendo clima por IP:", error);
        // Fallback
        const weatherTextNav = document.getElementById('weatherText');
        const weatherTextSidenav = document.getElementById('weatherTextSidenav');

        if (weatherTextNav) weatherTextNav.textContent = "Bogotá 🌤️";
        if (weatherTextSidenav) weatherTextSidenav.textContent = "Bogotá 🌤️";
    }
}

// Ejecutar al cargar la página
fetchWeatherByIP();