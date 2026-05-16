const apiKey = "c2e0767cf4af7a9ad2f6701d4bd02de1";
let currentCity = "Kyiv";

const uiTranslations = {
    ru: { search:"Поиск города...", today:"Сегодня", days5:"5 дней", hourly:"Почасовой прогноз", sun:"Солнце", sunrise:"Восход", sunset:"Закат", aqi_title:"Воздух (AQI)", aqi_desc:"Качество воздуха влияет на ваше здоровье.", comfort:"Детали комфорта", humidity:"Влажность", wind:"Ветер", pressure:"Давление", visibility:"Видимость", forecast_title:"Прогноз на 5 дней", aqi_states:["Отлично","Хорошо","Средне","Плохо","Вредно"], not_found:"Город не найден!", now:"Сейчас" },
    en: { search:"Search city...", today:"Today", days5:"5 Days", hourly:"Hourly Forecast", sun:"Sun", sunrise:"Sunrise", sunset:"Sunset", aqi_title:"Air Quality (AQI)", aqi_desc:"Air quality affects your health.", comfort:"Comfort Details", humidity:"Humidity", wind:"Wind", pressure:"Pressure", visibility:"Visibility", forecast_title:"5-Day Forecast", aqi_states:["Excellent","Good","Moderate","Poor","Hazardous"], not_found:"City not found!", now:"Now" },
    de: { search:"Stadt suchen...", today:"Heute", days5:"5 Tage", hourly:"Vorhersage", sun:"Sonne", sunrise:"Sonnenaufgang", sunset:"Sonnenuntergang", aqi_title:"Luftqualität (AQI)", aqi_desc:"Luftqualität beeinflusst Ihre Gesundheit.", comfort:"Komfort", humidity:"Feuchtigkeit", wind:"Wind", pressure:"Druck", visibility:"Sichtweite", forecast_title:"5-Tage-Vorhersage", aqi_states:["Ausgezeichnet","Gut","Mittel","Schlecht","Gefährlich"], not_found:"Stadt nicht gefunden!", now:"Jetzt" },
    fr: { search:"Rechercher...", today:"Aujourd'hui", days5:"5 Jours", hourly:"Prévisions horaires", sun:"Soleil", sunrise:"Lever", sunset:"Coucher", aqi_title:"Qualité de l'air (AQI)", aqi_desc:"La qualité de l'air affecte votre santé.", comfort:"Confort", humidity:"Humidité", wind:"Vent", pressure:"Pression", visibility:"Visibilité", forecast_title:"Prévisions 5 jours", aqi_states:["Excellent","Bon","Modéré","Mauvais","Dangereux"], not_found:"Ville introuvable!", now:"Maintenant" },
    es: { search:"Buscar ciudad...", today:"Hoy", days5:"5 Días", hourly:"Pronóstico por hora", sun:"Sol", sunrise:"Amanecer", sunset:"Atardecer", aqi_title:"Calidad del aire (AQI)", aqi_desc:"La calidad del aire afecta su salud.", comfort:"Confort", humidity:"Humedad", wind:"Viento", pressure:"Presión", visibility:"Visibilidad", forecast_title:"Pronóstico 5 días", aqi_states:["Excelente","Bueno","Moderado","Malo","Peligroso"], not_found:"Ciudad no encontrada!", now:"Ahora" },
    it: { search:"Cerca città...", today:"Oggi", days5:"5 Giorni", hourly:"Previsioni orarie", sun:"Sole", sunrise:"Alba", sunset:"Tramonto", aqi_title:"Qualità dell'aria (AQI)", aqi_desc:"La qualità dell'aria influisce sulla salute.", comfort:"Comfort", humidity:"Umidità", wind:"Vento", pressure:"Pressione", visibility:"Visibilità", forecast_title:"Previsioni 5 giorni", aqi_states:["Eccellente","Buono","Moderato","Scarso","Pericoloso"], not_found:"Città non trovata!", now:"Ora" }
};

function getWeatherSVG(iconCode) {
    const isNight = iconCode.endsWith('n');
    const code = iconCode.replace('d','').replace('n','');
    const svgs = {
        sun: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="sg" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FFE566"/><stop offset="100%" stop-color="#FF9A00"/></radialGradient></defs><circle cx="32" cy="32" r="12" fill="url(#sg)" class="svg-sun-core"/><g class="svg-sun-rays" stroke="#FFD230" stroke-width="2.5" stroke-linecap="round"><line x1="32" y1="6" x2="32" y2="13"/><line x1="32" y1="51" x2="32" y2="58"/><line x1="6" y1="32" x2="13" y2="32"/><line x1="51" y1="32" x2="58" y2="32"/><line x1="13.5" y1="13.5" x2="18.5" y2="18.5"/><line x1="45.5" y1="45.5" x2="50.5" y2="50.5"/><line x1="50.5" y1="13.5" x2="45.5" y2="18.5"/><line x1="18.5" y1="45.5" x2="13.5" y2="50.5"/></g></svg>`,
        moon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="mg" cx="40%" cy="30%" r="60%"><stop offset="0%" stop-color="#E8D5FF"/><stop offset="100%" stop-color="#8B5CF6"/></radialGradient></defs><path d="M38 10 C24 14 16 26 20 40 C24 54 38 60 50 56 C36 56 24 46 24 32 C24 20 32 12 44 10 Z" fill="url(#mg)" class="svg-moon"/><circle cx="46" cy="14" r="1.5" fill="#C4B5FD" opacity="0.8"/><circle cx="52" cy="22" r="1" fill="#C4B5FD" opacity="0.6"/></svg>`,
        fewClouds: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="sg2" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FFE566"/><stop offset="100%" stop-color="#FF9A00"/></radialGradient><linearGradient id="cg2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#E2E8F0"/><stop offset="100%" stop-color="#CBD5E1"/></linearGradient></defs><circle cx="22" cy="26" r="9" fill="url(#sg2)" opacity="0.95"/><g stroke="#FFD230" stroke-width="2" stroke-linecap="round" opacity="0.7"><line x1="22" y1="10" x2="22" y2="15"/><line x1="9" y1="26" x2="14" y2="26"/><line x1="13" y1="15" x2="17" y2="19"/><line x1="13" y1="37" x2="17" y2="33"/></g><rect x="10" y="34" width="44" height="16" rx="8" fill="url(#cg2)" class="svg-cloud"/><ellipse cx="30" cy="34" rx="12" ry="10" fill="url(#cg2)" class="svg-cloud"/><ellipse cx="42" cy="36" rx="9" ry="7" fill="url(#cg2)" class="svg-cloud"/></svg>`,
        fewCloudsNight: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="mn" cx="40%" cy="30%" r="60%"><stop offset="0%" stop-color="#C4B5FD"/><stop offset="100%" stop-color="#7C3AED"/></radialGradient><linearGradient id="cgn" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#94A3B8"/><stop offset="100%" stop-color="#64748B"/></linearGradient></defs><path d="M24 12 C16 15 12 22 14 30 C16 38 24 42 32 40 C24 40 18 34 18 26 C18 18 22 14 28 12 Z" fill="url(#mn)" opacity="0.9"/><rect x="10" y="34" width="44" height="16" rx="8" fill="url(#cgn)" class="svg-cloud"/><ellipse cx="30" cy="34" rx="12" ry="10" fill="url(#cgn)" class="svg-cloud"/><ellipse cx="42" cy="36" rx="9" ry="7" fill="url(#cgn)" class="svg-cloud"/></svg>`,
        clouds: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="cg3" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#94A3B8"/><stop offset="100%" stop-color="#64748B"/></linearGradient><linearGradient id="cg3b" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#CBD5E1"/><stop offset="100%" stop-color="#94A3B8"/></linearGradient></defs><ellipse cx="26" cy="30" rx="16" ry="12" fill="url(#cg3)" class="svg-cloud"/><rect x="8" y="34" width="48" height="16" rx="8" fill="url(#cg3b)" class="svg-cloud"/><ellipse cx="36" cy="32" rx="14" ry="11" fill="url(#cg3b)" class="svg-cloud"/><ellipse cx="48" cy="36" rx="10" ry="8" fill="url(#cg3b)" class="svg-cloud"/></svg>`,
        rain: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="rcg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#64748B"/><stop offset="100%" stop-color="#475569"/></linearGradient></defs><ellipse cx="26" cy="24" rx="15" ry="11" fill="url(#rcg)" class="svg-cloud"/><rect x="8" y="27" width="48" height="14" rx="7" fill="url(#rcg)" class="svg-cloud"/><ellipse cx="38" cy="26" rx="13" ry="10" fill="url(#rcg)" class="svg-cloud"/><g class="svg-rain" stroke="#60A5FA" stroke-width="2" stroke-linecap="round"><line x1="20" y1="44" x2="17" y2="54"/><line x1="30" y1="44" x2="27" y2="54"/><line x1="40" y1="44" x2="37" y2="54"/><line x1="50" y1="44" x2="47" y2="54"/><line x1="25" y1="50" x2="22" y2="60"/><line x1="45" y1="50" x2="42" y2="60"/></g></svg>`,
        thunderstorm: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="tg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#334155"/><stop offset="100%" stop-color="#1E293B"/></linearGradient></defs><ellipse cx="26" cy="22" rx="15" ry="11" fill="url(#tg)" class="svg-cloud"/><rect x="8" y="25" width="48" height="14" rx="7" fill="url(#tg)" class="svg-cloud"/><ellipse cx="38" cy="24" rx="13" ry="10" fill="url(#tg)" class="svg-cloud"/><polygon points="35,38 28,50 33,50 27,62 42,46 36,46 41,38" fill="#FDE047" class="svg-bolt"/></svg>`,
        snow: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sg3" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#94A3B8"/><stop offset="100%" stop-color="#64748B"/></linearGradient></defs><ellipse cx="26" cy="24" rx="15" ry="11" fill="url(#sg3)" class="svg-cloud"/><rect x="8" y="27" width="48" height="14" rx="7" fill="url(#sg3)" class="svg-cloud"/><ellipse cx="38" cy="26" rx="13" ry="10" fill="url(#sg3)" class="svg-cloud"/><g fill="#BAE6FD" class="svg-snow"><circle cx="20" cy="48" r="2.5"/><circle cx="32" cy="52" r="2.5"/><circle cx="44" cy="48" r="2.5"/><circle cx="26" cy="56" r="2"/><circle cx="38" cy="57" r="2"/></g></svg>`,
        mist: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g class="svg-mist" stroke="#94A3B8" stroke-width="3" stroke-linecap="round" opacity="0.7"><line x1="10" y1="24" x2="54" y2="24"/><line x1="16" y1="32" x2="48" y2="32"/><line x1="10" y1="40" x2="54" y2="40"/><line x1="18" y1="48" x2="46" y2="48"/></g></svg>`,
        drizzle: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="dg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#94A3B8"/><stop offset="100%" stop-color="#64748B"/></linearGradient></defs><ellipse cx="26" cy="24" rx="15" ry="11" fill="url(#dg)" class="svg-cloud"/><rect x="8" y="27" width="48" height="14" rx="7" fill="url(#dg)" class="svg-cloud"/><ellipse cx="38" cy="26" rx="13" ry="10" fill="url(#dg)" class="svg-cloud"/><g class="svg-drizzle" stroke="#7DD3FC" stroke-width="1.5" stroke-linecap="round"><line x1="22" y1="44" x2="20" y2="52"/><line x1="32" y1="44" x2="30" y2="52"/><line x1="42" y1="44" x2="40" y2="52"/></g></svg>`
    };
    if (code==='01') return isNight ? svgs.moon : svgs.sun;
    if (code==='02') return isNight ? svgs.fewCloudsNight : svgs.fewClouds;
    if (code==='03'||code==='04') return svgs.clouds;
    if (code==='09') return svgs.drizzle;
    if (code==='10') return svgs.rain;
    if (code==='11') return svgs.thunderstorm;
    if (code==='13') return svgs.snow;
    if (code==='50') return svgs.mist;
    return isNight ? svgs.moon : svgs.sun;
}

async function checkWeather() {
    const langEl  = document.getElementById("langSelect");
    const unitEl  = document.getElementById("unitSelect");
    const lang    = langEl  ? langEl.value  : "ru";
    const units   = unitEl  ? unitEl.value  : "metric";

    try {
        const res  = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=${units}&lang=${lang}`);
        const data = await res.json();

        if (data.cod != 200) { alert(uiTranslations[lang]?.not_found || "City not found."); return; }

        // Город и дата
        document.getElementById("cityName").textContent   = data.name;
        document.getElementById("temp").textContent       = Math.round(data.main.temp);
        document.getElementById("feelsLike").textContent  = Math.round(data.main.feels_like);
        document.getElementById("description").textContent = data.weather[0].description;
        document.getElementById("date").textContent = new Date().toLocaleDateString(lang, { weekday:'long', day:'numeric', month:'long' });

        // Иконка — НЕ используем outerHTML, только innerHTML
        const iconEl = document.getElementById("weatherIcon");
        if (iconEl) {
            iconEl.innerHTML  = getWeatherSVG(data.weather[0].icon);
            iconEl.className  = "main-icon floating main-weather-svg";
        }

        // Восход / закат
        const fmt = t => new Date(t * 1000).toLocaleTimeString(lang, { hour:'2-digit', minute:'2-digit' });
        const srEl = document.getElementById("sunrise");
        const ssEl = document.getElementById("sunset");
        if (srEl) srEl.textContent = fmt(data.sys.sunrise);
        if (ssEl) ssEl.textContent = fmt(data.sys.sunset);

        // Детали комфорта
        const humEl  = document.getElementById("humidity");
        const winEl  = document.getElementById("wind");
        const presEl = document.getElementById("pressure");
        const visEl  = document.getElementById("visibility");
        if (humEl)  humEl.textContent  = data.main.humidity + "%";
        if (winEl)  winEl.textContent  = data.wind.speed.toFixed(1) + (units === "metric" ? " m/s" : " mph");
        if (presEl) presEl.textContent = data.main.pressure + " hPa";
        if (visEl)  visEl.textContent  = (data.visibility / 1000).toFixed(1) + " km";

        getAirQuality(data.coord.lat, data.coord.lon, lang);

        const fRes  = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${apiKey}&units=${units}&lang=${lang}`);
        const fData = await fRes.json();
        renderHourly(fData.list, units, lang);
        render5Day(fData.list, lang);

    } catch(e) { console.error(e); }
}

async function getAirQuality(lat, lon, lang) {
    try {
        const res  = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const data = await res.json();
        const aqi  = data.list[0].main.aqi;
        const labels = (uiTranslations[lang] || uiTranslations['en']).aqi_states;
        const states = { 1:[labels[0],"#4ade80","20%"], 2:[labels[1],"#f8d800","40%"], 3:[labels[2],"#ffb347","60%"], 4:[labels[3],"#ff8c8c","80%"], 5:[labels[4],"#ff4b2b","100%"] };
        const s = states[aqi];
        const aqiEl  = document.getElementById("aqi-text");
        const aqiBar = document.getElementById("aqi-progress");
        if (aqiEl)  { aqiEl.textContent = s[0]; aqiEl.style.color = s[1]; }
        if (aqiBar) { aqiBar.style.width = s[2]; aqiBar.style.backgroundColor = s[1]; }
    } catch(e) { console.error(e); }
}

function renderHourly(list, units, lang) {
    const container = document.getElementById("hourlyList");
    if (!container) return;
    container.innerHTML = "";
    const nowLabel = uiTranslations[lang]?.now || "Now";
    list.slice(0, 12).forEach((item, i) => {
        const hours = new Date(item.dt * 1000).getHours();
        const timeLabel = hours.toString().padStart(2,'0') + ":00";
        const isNight = hours < 6 || hours >= 21;
        const pop = item.pop ? Math.round(item.pop * 100) : 0;
        const popHtml = pop > 20 ? `<span class="hour-pop">💧 ${pop}%</span>` : '';
        container.innerHTML += `
            <div class="hour-item ${i===0?'hour-item--now':''} hour-item--${isNight?'night':'day'}">
                <span class="hour-time">${i===0 ? nowLabel : timeLabel}</span>
                <div class="hour-icon">${getWeatherSVG(item.weather[0].icon)}</div>
                <b class="hour-temp">${Math.round(item.main.temp)}°</b>
                ${popHtml}
            </div>`;
    });
}

function render5Day(list, lang) {
    const container = document.getElementById("fiveDayForecast");
    if (!container) return;
    container.innerHTML = "";
    const dayMap = {};
    list.forEach(item => {
        const key = item.dt_txt.split(" ")[0];
        if (!dayMap[key]) dayMap[key] = { items:[], noon:null };
        dayMap[key].items.push(item);
        if (item.dt_txt.includes("12:00:00")) dayMap[key].noon = item;
    });
    Object.keys(dayMap).slice(0,5).forEach((key, idx) => {
        const d   = dayMap[key];
        const rep = d.noon || d.items[Math.floor(d.items.length/2)];
        const temps = d.items.map(i => i.main.temp);
        const tMax = Math.round(Math.max(...temps));
        const tMin = Math.round(Math.min(...temps));
        const pop  = Math.round((rep.pop||0)*100);
        const dayLabel = idx===0 ? (uiTranslations[lang]?.today||'Сегодня') : new Date(rep.dt*1000).toLocaleDateString(lang,{weekday:'short',day:'numeric'});
        container.innerHTML += `
            <div class="forecast-item">
                <div class="fd-left">
                    <b class="f-day">${dayLabel}</b>
                    ${pop>20?`<span class="fd-pop">💧 ${pop}%</span>`:''}
                </div>
                <div class="f-icon f-icon-svg">${getWeatherSVG(rep.weather[0].icon)}</div>
                <span class="fd-desc">${rep.weather[0].description}</span>
                <div class="fd-temps">
                    <b class="fd-max">${tMax}°</b>
                    <span class="fd-min">${tMin}°</span>
                </div>
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
    if (val) { currentCity = val; checkWeather(); document.getElementById("cityInput").value = ""; }
}
document.getElementById("searchBtn").onclick = search;
document.getElementById("cityInput").onkeydown = e => { if (e.key==="Enter") search(); };
document.getElementById("langSelect").onchange  = checkWeather;
document.getElementById("unitSelect").onchange  = checkWeather;

checkWeather();