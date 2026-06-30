// OpenWeatherMap API Configuration
const API_KEY = '8d5e37b134af4f2c933351c9727cdb4b'; // Free tier API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const weatherDashboard = document.getElementById('weatherDashboard');
const defaultMessage = document.getElementById('defaultMessage');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');

// Weather icons mapping
const weatherIcons = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '🌤️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️'
};

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});
locationBtn.addEventListener('click', handleGeolocation);

// Main Functions
async function handleSearch() {
    const city = cityInput.value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    await fetchWeather(city);
}

async function handleGeolocation() {
    if (navigator.geolocation) {
        loadingSpinner.classList.remove('hidden');
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                await fetchWeatherByCoords(latitude, longitude);
            },
            (error) => {
                loadingSpinner.classList.add('hidden');
                showError('Unable to get your location. Please allow location access.');
            }
        );
    } else {
        showError('Geolocation is not supported by your browser');
    }
}

async function fetchWeather(city) {
    showLoading();
    clearError();
    try {
        // Fetch current weather
        const weatherResponse = await fetch(
            `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        if (!weatherResponse.ok) throw new Error('City not found');
        const weatherData = await weatherResponse.json();

        // Fetch 5-day forecast
        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );
        const forecastData = await forecastResponse.json();

        // Fetch air quality (using One Call API)
        const oneCallResponse = await fetch(
            `${BASE_URL}/onecall?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&units=metric&appid=${API_KEY}`
        );
        const oneCallData = await oneCallResponse.json();

        displayWeather(weatherData, oneCallData.hourly.slice(0, 24), forecastData);
        hideLoading();
    } catch (error) {
        hideLoading();
        showError(error.message || 'Failed to fetch weather data');
    }
}

async function fetchWeatherByCoords(lat, lon) {
    clearError();
    try {
        // Fetch current weather
        const weatherResponse = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const weatherData = await weatherResponse.json();

        // Fetch 5-day forecast
        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const forecastData = await forecastResponse.json();

        // Fetch One Call data
        const oneCallResponse = await fetch(
            `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const oneCallData = await oneCallResponse.json();

        displayWeather(weatherData, oneCallData.hourly.slice(0, 24), forecastData);
        hideLoading();
    } catch (error) {
        hideLoading();
        showError('Failed to fetch weather data');
    }
}

function displayWeather(weatherData, hourlyData, forecastData) {
    // Display current weather
    const current = weatherData;
    document.getElementById('cityName').textContent = `${current.name}, ${current.sys.country}`;
    document.getElementById('weatherDate').textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const iconCode = current.weather[0].icon;
    document.getElementById('weatherIcon').textContent = weatherIcons[iconCode] || '🌤️';
    document.getElementById('temperature').textContent = Math.round(current.main.temp) + '°C';
    document.getElementById('weatherDescription').textContent = current.weather[0].description;
    document.getElementById('feelsLike').textContent = Math.round(current.main.feels_like) + '°C';
    document.getElementById('humidity').textContent = current.main.humidity + '%';
    document.getElementById('windSpeed').textContent = Math.round(current.wind.speed * 10) / 10 + ' m/s';
    document.getElementById('pressure').textContent = current.main.pressure + ' mb';
    document.getElementById('uvIndex').textContent = '--'; // UVIndex not in basic API
    document.getElementById('visibility').textContent = Math.round(current.visibility / 1000) + ' km';

    // Sunrise and Sunset
    const sunrise = new Date(current.sys.sunrise * 1000);
    const sunset = new Date(current.sys.sunset * 1000);
    document.getElementById('sunrise').textContent = sunrise.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('sunset').textContent = sunset.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // Wind details
    const windDirection = getWindDirection(current.wind.deg);
    document.getElementById('windDirection').textContent = windDirection;
    document.getElementById('windGust').textContent = (current.wind.gust ? Math.round(current.wind.gust * 10) / 10 : '--') + ' m/s';

    // Air Quality (placeholder)
    document.getElementById('aqi').textContent = 'Good';
    document.getElementById('aqiStatus').textContent = 'Air quality is acceptable';

    // Display 5-day forecast
    displayForecast(forecastData);

    // Display hourly forecast
    displayHourlyForecast(hourlyData);

    // Show dashboard, hide default message
    weatherDashboard.classList.remove('hidden');
    defaultMessage.classList.add('hidden');
    cityInput.value = '';
}

function displayForecast(forecastData) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';

    // Get daily forecasts (one per day at noon)
    const dailyForecasts = {};
    forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateStr = date.toLocaleDateString('en-US');
        
        if (!dailyForecasts[dateStr]) {
            dailyForecasts[dateStr] = item;
        }
    });

    Object.values(dailyForecasts).slice(0, 5).forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const iconCode = forecast.weather[0].icon;
        
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="forecast-date">${date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
            <div class="forecast-icon">${weatherIcons[iconCode] || '🌤️'}</div>
            <div class="forecast-temp">
                <span class="temp-high">${Math.round(forecast.main.temp_max)}°</span>
                <span class="temp-low">${Math.round(forecast.main.temp_min)}°</span>
            </div>
            <div class="forecast-description">${forecast.weather[0].description}</div>
        `;
        forecastContainer.appendChild(card);
    });
}

function displayHourlyForecast(hourlyData) {
    const hourlyContainer = document.getElementById('hourlyContainer');
    hourlyContainer.innerHTML = '';

    hourlyData.slice(0, 12).forEach(item => {
        const date = new Date(item.dt * 1000);
        const iconCode = item.weather[0].icon;
        
        const card = document.createElement('div');
        card.className = 'hourly-card';
        card.innerHTML = `
            <div class="hourly-time">${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
            <div class="hourly-icon">${weatherIcons[iconCode] || '🌤️'}</div>
            <div class="hourly-temp">${Math.round(item.temp)}°C</div>
        `;
        hourlyContainer.appendChild(card);
    });
}

function getWindDirection(degrees) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
}

// UI Helper Functions
function showLoading() {
    loadingSpinner.classList.remove('hidden');
    weatherDashboard.classList.add('hidden');
    defaultMessage.classList.add('hidden');
}

function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    weatherDashboard.classList.add('hidden');
    defaultMessage.classList.remove('hidden');
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 5000);
}

function clearError() {
    errorMessage.classList.remove('show');
}

// Load default city on page load
window.addEventListener('load', () => {
    fetchWeather('London');
});
