# 🌤️ Weather Dashboard

A beautiful and responsive weather dashboard that fetches real-time weather data from OpenWeatherMap API.

## ✨ Features

🌍 **Real-time Weather Data**
- Current weather conditions with detailed information
- Temperature, feels-like, humidity, pressure, and more
- Wind speed, direction, and gust information
- Visibility and UV index

📍 **Location Services**
- Search weather by city name
- Use geolocation for automatic location detection
- Support for cities worldwide

📅 **Forecasts**
- 5-day weather forecast with high/low temperatures
- Hourly forecast for the next 24 hours
- Weather icons and descriptions

🌅 **Additional Information**
- Sunrise and sunset times
- Air quality index
- Wind details (direction and gust)
- Responsive design for all devices

## 🚀 How to Run

### Option 1: Direct File Opening
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Search for any city or use your location

### Option 2: Using a Local Server (Recommended)

**Python 3:**
```bash
python -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

Then open `http://localhost:8000` in your browser.

### Option 3: Using Node.js
```bash
npm install -g http-server
http-server
```

Open the URL shown in your terminal.

### Option 4: Using Live Server (VS Code)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html` and select "Open with Live Server"
3. The dashboard will open automatically in your default browser

## 🔑 API Configuration

This dashboard uses the **OpenWeatherMap API** (free tier).

### Getting Your Own API Key:
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key from the account page
4. Replace the `API_KEY` in `script.js` with your own key

### Current API Key Status:
- **Current Key**: Included (free tier)
- **Limitations**: 
  - 1000 requests per day
  - 60 requests per minute
  - Perfect for personal use

## 📁 Files Included

- `index.html` - Main HTML structure with dashboard layout
- `styles.css` - Complete styling with responsive design
- `script.js` - Weather API integration and logic
- `README.md` - Documentation

## 🎨 Features Breakdown

### Current Weather Display
- Large temperature display
- Weather description (Sunny, Cloudy, Rainy, etc.)
- Feels-like temperature
- Humidity percentage
- Atmospheric pressure
- Wind speed and direction
- Visibility distance
- Sunrise and sunset times

### 5-Day Forecast
- Daily high and low temperatures
- Weather conditions for each day
- Beautiful card layout with hover effects

### 24-Hour Forecast
- Hourly temperature and conditions
- Horizontal scroll for easy navigation
- Weather icons for each hour

### Search & Location
- **Search by City**: Type any city name and search
- **Geolocation**: Click the location button to use your device's location
- **Default City**: London loads by default on first visit

## 🌡️ Temperature Units

- **Temperature**: Celsius (°C)
- **Wind Speed**: Meters per second (m/s)
- **Pressure**: Millibars (mb)
- **Visibility**: Kilometers (km)

## 📊 API Endpoints Used

1. **Current Weather**: `/weather`
   - Basic weather information
   - Temperature, humidity, wind data

2. **5-Day Forecast**: `/forecast`
   - Forecast data for next 5 days
   - Updated every 3 hours

3. **One Call API**: `/onecall`
   - Hourly forecast
   - Additional weather details

## 🎯 Usage Examples

### Search a City
1. Type a city name (e.g., "New York", "Tokyo", "Paris")
2. Click "Search" or press Enter
3. View weather information instantly

### Use Your Location
1. Click the "📍" button
2. Allow location access when prompted
3. Dashboard updates with your local weather

### View Different Forecasts
- Scroll through the 5-day forecast cards
- See hourly changes in the hourly forecast section
- Check additional weather details in the info cards below

## 🌐 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ⚠️ Troubleshooting

### "City not found" Error
- Check spelling of the city name
- Try with country code (e.g., "London, UK")
- Some small towns may not be available

### Location not working
- Check if browser has location permission
- Some browsers require HTTPS for geolocation
- Try allowing location access in browser settings

### No data displaying
- Check internet connection
- Verify API key is valid
- Check browser console for errors (F12)
- API might be rate limited (wait a few minutes)

### Slow loading
- Check internet speed
- API response may vary depending on server load
- Close other applications using bandwidth

## 🔒 Privacy & Security

- No personal data is stored
- Location data is only used for weather lookup
- API requests are made directly from your browser
- No tracking or analytics

## 📡 API Response Time

- Typical response: < 2 seconds
- Forecast data: < 3 seconds
- Depends on internet speed and API server load

## 🚀 Future Enhancements

Potential features to add:
- [ ] Historical weather data
- [ ] Weather alerts and warnings
- [ ] Multiple location bookmarks
- [ ] Weather charts and graphs
- [ ] Dark/Light theme toggle
- [ ] Localization for different languages
- [ ] Pollen and allergen information
- [ ] Air quality detailed breakdown

## 📝 License

This project is free to use for personal and educational purposes.

## 🤝 Contributing

Feel free to fork, modify, and improve this dashboard!

## 📞 Support

If you encounter any issues:
1. Check the Troubleshooting section
2. Verify your internet connection
3. Check browser console (F12) for error messages
4. Try a different browser

## 🎓 Learning Resources

- [OpenWeatherMap API Documentation](https://openweathermap.org/api)
- [Fetch API Reference](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)

## 🌟 Enjoy Your Weather Dashboard!

Start exploring weather information for cities around the world! 🌍
