const apiKey = "c2e0767cf4af7a9ad2f6701d4bd02de1";
let currentCity = "Kyiv";

const uiTranslations = {
    ru: {
        search: "Поиск города...",
        today: "Сегодня",
        days5: "5 дней",
        hourly: "Почасовой прогноз",
        sun: "Солнце",
        sunrise: "Восход",
        sunset: "Закат",
        aqi_title: "Воздух (AQI)",
        aqi_desc: "Качество воздуха влияет на ваше здоровье.",
        comfort: "Детали комфорта",
        humidity: "Влажность",
        wind: "Ветер",
        pressure: "Давление",
        visibility: "Видимость",
        forecast_title: "Прогноз на 5 дней",
        aqi_states: ["Отлично", "Хорошо", "Средне", "Плохо", "Вредно"],
        not_found: "Город не найден. Проверьте правильность написания!"
    },
    en: {
        search: "Search city...",
        today: "Today",
        days5: "5 Days",
        hourly: "Hourly Forecast",
        sun: "Sun",
        sunrise: "Sunrise",
        sunset: "Sunset",
        aqi_title: "Air Quality (AQI)",
        aqi_desc: "Air quality affects your health.",
        comfort: "Comfort Details",
        humidity: "Humidity",
        wind: "Wind",
        pressure: "Pressure",
        visibility: "Visibility",
        forecast_title: "5-Day Forecast",
        aqi_states: ["Excellent", "Good", "Moderate", "Poor", "Hazardous"],
        not_found: "City not found. Please check the spelling!"
    },
    de: {
        search: "Stadt suchen...",
        today: "Heute",
        days5: "5 Tage",
        hourly: "Stündliche Vorhersage",
        sun: "Sonne",
        sunrise: "Sonnenaufgang",
        sunset: "Sonnenuntergang",
        aqi_title: "Luftqualität (AQI)",
        aqi_desc: "Luftqualität beeinflusst Ihre Gesundheit.",
        comfort: "Komfortdetails",
        humidity: "Feuchtigkeit",
        wind: "Wind",
        pressure: "Druck",
        visibility: "Sichtweite",
        forecast_title: "5-Tage-Vorhersage",
        aqi_states: ["Ausgezeichnet", "Gut", "Mittel", "Schlecht", "Gefährlich"],
        not_found: "Stadt nicht gefunden. Bitte überprüfen Sie die Schreibweise!"
    },
    fr: {
        search: "Rechercher...",
        today: "Aujourd'hui",
        days5: "5 Jours",
        hourly: "Prévisions horaires",
        sun: "Soleil",
        sunrise: "Lever",
        sunset: "Coucher",
        aqi_title: "Qualité de l'air (AQI)",
        aqi_desc: "La qualité de l'air affecte votre santé.",
        comfort: "Détails de confort",
        humidity: "Humidité",
        wind: "Vent",
        pressure: "Pression",
        visibility: "Visibilité",
        forecast_title: "Prévisions sur 5 jours",
        aqi_states: ["Excellent", "Bon", "Modéré", "Mauvais", "Dangereux"],
        not_found: "Ville introuvable. Veuillez vérifier l'orthographe!"
    },
    es: {
        search: "Buscar ciudad...",
        today: "Hoy",
        days5: "5 Días",
        hourly: "Pronóstico por hora",
        sun: "Sol",
        sunrise: "Amanecer",
        sunset: "Atardecer",
        aqi_title: "Calidad del aire (AQI)",
        aqi_desc: "La calidad del aire afecta su salud.",
        comfort: "Detalles de confort",
        humidity: "Humedad",
        wind: "Viento",
        pressure: "Presión",
        visibility: "Visibilidad",
        forecast_title: "Pronóstico de 5 días",
        aqi_states: ["Excelente", "Bueno", "Moderado", "Malo", "Peligroso"],
        not_found: "Ciudad no encontrada. ¡Por favor, compruebe la ortografía!"
    },
    it: {
        search: "Cerca città...",
        today: "Oggi",
        days5: "5 Giorni",
        hourly: "Previsioni orarie",
        sun: "Sole",
        sunrise: "Alba",
        sunset: "Tramonto",
        aqi_title: "Qualité de l'air (AQI)",
        aqi_desc: "La qualità dell'aria influisce sulla salute.",
        comfort: "Dettagli comfort",
        humidity: "Umidità",
        wind: "Vento",
        pressure: "Pressione",
        visibility: "Visibilità",
        forecast_title: "Previsioni 5 giorni",
        aqi_states: ["Eccellente", "Buono", "Moderato", "Scarso", "Pericoloso"],
        not_found: "Città non trovata. Controlla l'ortografia!"
    }
};

async function checkWeather() {
    const lang = document.getElementById("langSelect").value;
    const units = document.getElementById("unitSelect").value;
    
    updateInterfaceLanguage(lang);

    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=${units}&lang=${lang}`);
        const data = await res.json();
        
        if(data.cod != 200) {
            alert(uiTranslations[lang].not_found);
            return;
        }

        document.getElementById("cityName").innerText = data.name;
        document.getElementById("temp").innerText = Math.round(data.main.temp);
        document.getElementById("feelsLike").innerText = Math.round(data.main.feels_like);
        document.getElementById("description").innerText = data.weather[0].description;
        document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        document.getElementById("date").innerText = new Date().toLocaleDateString(lang, { weekday: 'long', day: 'numeric', month: 'long' });

        const fmt = t => new Date(t * 1000).toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });
        document.getElementById("sunrise").innerText = fmt(data.sys.sunrise);
        document.getElementById("sunset").innerText = fmt(data.sys.sunset);

        document.getElementById("humidity").innerText = data.main.humidity + "%";
        document.getElementById("pressure").innerText = data.main.pressure + " hPa";
        document.getElementById("wind").innerText = data.wind.speed + (units === "metric" ? " m/s" : " mph");
        document.getElementById("visibility").innerText = (data.visibility / 1000).toFixed(1) + " km";

        getAirQuality(data.coord.lat, data.coord.lon, lang);

        const fRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${apiKey}&units=${units}&lang=${lang}`);
        const fData = await fRes.json();
        renderHourly(fData.list);
        render5Day(fData.list, lang);

    } catch (e) { console.error(e); }
}

function updateInterfaceLanguage(lang) {
    const text = uiTranslations[lang];
    if (!text) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (text[key]) el.innerText = text[key];
    });
    const input = document.querySelector('[data-i18n-placeholder]');
    if(input) input.placeholder = text[input.getAttribute('data-i18n-placeholder')];
}

async function getAirQuality(lat, lon, lang) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    const data = await res.json();
    const aqi = data.list[0].main.aqi; 
    
    const text = uiTranslations[lang] || uiTranslations['en'];
    const labels = text.aqi_states;
    const states = {
        1: [labels[0], "#a3ffb4", "20%"],
        2: [labels[1], "#f8d800", "40%"],
        3: [labels[2], "#ffb347", "60%"],
        4: [labels[3], "#ff8c8c", "80%"],
        5: [labels[4], "#ff4b2b", "100%"]
    };
    const status = states[aqi];
    document.getElementById("aqi-text").innerText = status[0];
    document.getElementById("aqi-text").style.color = status[1];
    document.getElementById("aqi-progress").style.width = status[2];
    document.getElementById("aqi-progress").style.backgroundColor = status[1];
}

function renderHourly(list) {
    const container = document.getElementById("hourlyList");
    if (!container) return;
    container.innerHTML = "";
    list.slice(0, 10).forEach(item => {
        const time = new Date(item.dt * 1000).getHours() + ":00";
        container.innerHTML += `<div class="hour-item"><span>${time}</span><img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png"><b>${Math.round(item.main.temp)}°</b></div>`;
    });
}

function render5Day(list, lang) {
    const container = document.getElementById("fiveDayForecast");
    if (!container) return;
    container.innerHTML = "";
    const daily = list.filter(i => i.dt_txt.includes("12:00:00"));
    daily.forEach(item => {
        const day = new Date(item.dt * 1000).toLocaleDateString(lang, { weekday: 'short', day: 'numeric' });
        container.innerHTML += `
            <div class="forecast-item">
                <b>${day}</b>
                <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png">
                <span>${item.weather[0].description}</span>
                <b style="text-align:right">${Math.round(item.main.temp)}°</b>
            </div>`;
    });
}

document.getElementById("btnToday").onclick = () => {
    document.getElementById("today-view").classList.add("active");
    document.getElementById("forecast-view").classList.remove("active");
    document.getElementById("btnToday").classList.add("active");
    document.getElementById("btn5Days").classList.remove("active");
};

document.getElementById("btn5Days").onclick = () => {
    document.getElementById("forecast-view").classList.add("active");
    document.getElementById("today-view").classList.remove("active");
    document.getElementById("btn5Days").classList.add("active");
    document.getElementById("btnToday").classList.remove("active");
};

function search() {
    const val = document.getElementById("cityInput").value.trim();
    if(val) { 
        currentCity = val; 
        checkWeather(); 
        document.getElementById("cityInput").value = ""; 
    }
}

document.getElementById("searchBtn").onclick = search;
document.getElementById("cityInput").onkeydown = e => { if(e.key === "Enter") search(); };
document.getElementById("langSelect").onchange = checkWeather;
document.getElementById("unitSelect").onchange = checkWeather;

checkWeather();
