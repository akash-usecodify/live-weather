// ================================================
// LIVE WEATHER APP - JAVASCRIPT
// ================================================

document.addEventListener('DOMContentLoaded', function() {
    const locationInput = document.getElementById('locationInput');
    const searchBtn = document.getElementById('searchBtn');
    const weatherDisplay = document.getElementById('weatherDisplay');
    
    // Search weather function
    async function searchWeather() {
        const location = locationInput.value.trim();
        
        if (!location) {
            showError('Please enter a location');
            return;
        }
        
        showLoading();
        
        try {
            // Using WeatherAPI.com
            const API_KEY = '89092ac79961489ba90194843252510';
            const response = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`
            );
            
            if (!response.ok) {
                throw new Error('Location not found');
            }
            
            const data = await response.json();
            displayWeather(data);
            
        } catch (error) {
            console.error('Weather fetch error:', error);
            showError('Location not found. Please try a different city.');
        }
    }
    
    // Get country flag emoji
    function getCountryFlag(countryCode) {
        const flagMap = {
            'AD': '🇦🇩', 'AE': '🇦🇪', 'AF': '🇦🇫', 'AG': '🇦🇬', 'AI': '🇦🇮', 'AL': '🇦🇱', 'AM': '🇦🇲', 'AO': '🇦🇴', 'AQ': '🇦🇶', 'AR': '🇦🇷',
            'AS': '🇦🇸', 'AT': '🇦🇹', 'AU': '🇦🇺', 'AW': '🇦🇼', 'AX': '🇦🇽', 'AZ': '🇦🇿', 'BA': '🇧🇦', 'BB': '🇧🇧', 'BD': '🇧🇩', 'BE': '🇧🇪',
            'BF': '🇧🇫', 'BG': '🇧🇬', 'BH': '🇧🇭', 'BI': '🇧🇮', 'BJ': '🇧🇯', 'BL': '🇧🇱', 'BM': '🇧🇲', 'BN': '🇧🇳', 'BO': '🇧🇴', 'BQ': '🇧🇶',
            'BR': '🇧🇷', 'BS': '🇧🇸', 'BT': '🇧🇹', 'BV': '🇧🇻', 'BW': '🇧🇼', 'BY': '🇧🇾', 'BZ': '🇧🇿', 'CA': '🇨🇦', 'CC': '🇨🇨', 'CD': '🇨🇩',
            'CF': '🇨🇫', 'CG': '🇨🇬', 'CH': '🇨🇭', 'CI': '🇨🇮', 'CK': '🇨🇰', 'CL': '🇨🇱', 'CM': '🇨🇲', 'CN': '🇨🇳', 'CO': '🇨🇴', 'CR': '🇨🇷',
            'CU': '🇨🇺', 'CV': '🇨🇻', 'CW': '🇨🇼', 'CX': '🇨🇽', 'CY': '🇨🇾', 'CZ': '🇨🇿', 'DE': '🇩🇪', 'DJ': '🇩🇯', 'DK': '🇩🇰', 'DM': '🇩🇲',
            'DO': '🇩🇴', 'DZ': '🇩🇿', 'EC': '🇪🇨', 'EE': '🇪🇪', 'EG': '🇪🇬', 'EH': '🇪🇭', 'ER': '🇪🇷', 'ES': '🇪🇸', 'ET': '🇪🇹', 'FI': '🇫🇮',
            'FJ': '🇫🇯', 'FK': '🇫🇰', 'FM': '🇫🇲', 'FO': '🇫🇴', 'FR': '🇫🇷', 'GA': '🇬🇦', 'GB': '🇬🇧', 'GD': '🇬🇩', 'GE': '🇬🇪', 'GF': '🇬🇫',
            'GG': '🇬🇬', 'GH': '🇬🇭', 'GI': '🇬🇮', 'GL': '🇬🇱', 'GM': '🇬🇲', 'GN': '🇬🇳', 'GP': '🇬🇵', 'GQ': '🇬🇶', 'GR': '🇬🇷', 'GS': '🇬🇸',
            'GT': '🇬🇹', 'GU': '🇬🇺', 'GW': '🇬🇼', 'GY': '🇬🇾', 'HK': '🇭🇰', 'HM': '🇭🇲', 'HN': '🇭🇳', 'HR': '🇭🇷', 'HT': '🇭🇹', 'HU': '🇭🇺',
            'ID': '🇮🇩', 'IE': '🇮🇪', 'IL': '🇮🇱', 'IM': '🇮🇲', 'IN': '🇮🇳', 'IO': '🇮🇴', 'IQ': '🇮🇶', 'IR': '🇮🇷', 'IS': '🇮🇸', 'IT': '🇮🇹',
            'JE': '🇯🇪', 'JM': '🇯🇲', 'JO': '🇯🇴', 'JP': '🇯🇵', 'KE': '🇰🇪', 'KG': '🇰🇬', 'KH': '🇰🇭', 'KI': '🇰🇮', 'KM': '🇰🇲', 'KN': '🇰🇳',
            'KP': '🇰🇵', 'KR': '🇰🇷', 'KW': '🇰🇼', 'KY': '🇰🇾', 'KZ': '🇰🇿', 'LA': '🇱🇦', 'LB': '🇱🇧', 'LC': '🇱🇨', 'LI': '🇱🇮', 'LK': '🇱🇰',
            'LR': '🇱🇷', 'LS': '🇱🇸', 'LT': '🇱🇹', 'LU': '🇱🇺', 'LV': '🇱🇻', 'LY': '🇱🇾', 'MA': '🇲🇦', 'MC': '🇲🇨', 'MD': '🇲🇩', 'ME': '🇲🇪',
            'MF': '🇲🇫', 'MG': '🇲🇬', 'MH': '🇲🇭', 'MK': '🇲🇰', 'ML': '🇲🇱', 'MM': '🇲🇲', 'MN': '🇲🇳', 'MO': '🇲🇴', 'MP': '🇲🇵', 'MQ': '🇲🇶',
            'MR': '🇲🇷', 'MS': '🇲🇸', 'MT': '🇲🇹', 'MU': '🇲🇺', 'MV': '🇲🇻', 'MW': '🇲🇼', 'MX': '🇲🇽', 'MY': '🇲🇾', 'MZ': '🇲🇿', 'NA': '🇳🇦',
            'NC': '🇳🇨', 'NE': '🇳🇪', 'NF': '🇳🇫', 'NG': '🇳🇬', 'NI': '🇳🇮', 'NL': '🇳🇱', 'NO': '🇳🇴', 'NP': '🇳🇵', 'NR': '🇳🇷', 'NU': '🇳🇺',
            'NZ': '🇳🇿', 'OM': '🇴🇲', 'PA': '🇵🇦', 'PE': '🇵🇪', 'PF': '🇵🇫', 'PG': '🇵🇬', 'PH': '🇵🇭', 'PK': '🇵🇰', 'PL': '🇵🇱', 'PM': '🇵🇲',
            'PN': '🇵🇳', 'PR': '🇵🇷', 'PS': '🇵🇸', 'PT': '🇵🇹', 'PW': '🇵🇼', 'PY': '🇵🇾', 'QA': '🇶🇦', 'RE': '🇷🇪', 'RO': '🇷🇴', 'RS': '🇷🇸',
            'RU': '🇷🇺', 'RW': '🇷🇼', 'SA': '🇸🇦', 'SB': '🇸🇧', 'SC': '🇸🇨', 'SD': '🇸🇩', 'SE': '🇸🇪', 'SG': '🇸🇬', 'SH': '🇸🇭', 'SI': '🇸🇮',
            'SJ': '🇸🇯', 'SK': '🇸🇰', 'SL': '🇸🇱', 'SM': '🇸🇲', 'SN': '🇸🇳', 'SO': '🇸🇴', 'SR': '🇸🇷', 'SS': '🇸🇸', 'ST': '🇸🇹', 'SV': '🇸🇻',
            'SX': '🇸🇽', 'SY': '🇸🇾', 'SZ': '🇸🇿', 'TC': '🇹🇨', 'TD': '🇹🇩', 'TF': '🇹🇫', 'TG': '🇹🇬', 'TH': '🇹🇭', 'TJ': '🇹🇯', 'TK': '🇹🇰',
            'TL': '🇹🇱', 'TM': '🇹🇲', 'TN': '🇹🇳', 'TO': '🇹🇴', 'TR': '🇹🇷', 'TT': '🇹🇹', 'TV': '🇹🇻', 'TW': '🇹🇼', 'TZ': '🇹🇿', 'UA': '🇺🇦',
            'UG': '🇺🇬', 'UM': '🇺🇲', 'US': '🇺🇸', 'UY': '🇺🇾', 'UZ': '🇺🇿', 'VA': '🇻🇦', 'VC': '🇻🇨', 'VE': '🇻🇪', 'VG': '🇻🇬', 'VI': '🇻🇮',
            'VN': '🇻🇳', 'VU': '🇻🇺', 'WF': '🇼🇫', 'WS': '🇼🇸', 'YE': '🇾🇪', 'YT': '🇾🇹', 'ZA': '🇿🇦', 'ZM': '🇿🇲', 'ZW': '🇿🇼'
        };
        return flagMap[countryCode] || '🏳️';
    }

    // Get weather-based background colors
    function getWeatherBackground(condition, temp) {
        const conditionText = condition.toLowerCase();
        
        // Weather-based color schemes
        if (conditionText.includes('sunny') || conditionText.includes('clear')) {
            return {
                colors: ['#ff9a56', '#ff6b35', '#f7931e', '#ffd700', '#ffed4e'],
                name: 'sunny'
            };
        } else if (conditionText.includes('cloudy') || conditionText.includes('overcast')) {
            return {
                colors: ['#bdc3c7', '#95a5a6', '#7f8c8d', '#6c7b7d', '#5d6d7e'],
                name: 'cloudy'
            };
        } else if (conditionText.includes('rain') || conditionText.includes('drizzle')) {
            return {
                colors: ['#74b9ff', '#0984e3', '#6c5ce7', '#a29bfe', '#fd79a8'],
                name: 'rainy'
            };
        } else if (conditionText.includes('snow') || conditionText.includes('blizzard')) {
            return {
                colors: ['#ddd6fe', '#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed'],
                name: 'snowy'
            };
        } else if (conditionText.includes('storm') || conditionText.includes('thunder')) {
            return {
                colors: ['#2d3436', '#636e72', '#74b9ff', '#0984e3', '#6c5ce7'],
                name: 'stormy'
            };
        } else if (conditionText.includes('fog') || conditionText.includes('mist')) {
            return {
                colors: ['#ddd6fe', '#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed'],
                name: 'foggy'
            };
        } else {
            // Default based on temperature
            if (temp > 25) {
                return {
                    colors: ['#ff9a56', '#ff6b35', '#f7931e', '#ffd700', '#ffed4e'],
                    name: 'warm'
                };
            } else if (temp < 5) {
                return {
                    colors: ['#74b9ff', '#0984e3', '#6c5ce7', '#a29bfe', '#fd79a8'],
                    name: 'cold'
                };
            } else {
                return {
                    colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'],
                    name: 'mild'
                };
            }
        }
    }

    // Apply weather-based background
    function applyWeatherBackground(condition, temp) {
        const weatherBg = getWeatherBackground(condition, temp);
        const body = document.body;
        
        // Create gradient string
        const gradientColors = weatherBg.colors.join(', ');
        body.style.background = `linear-gradient(-45deg, ${gradientColors})`;
        body.style.backgroundSize = '400% 400%';
        
        // Add weather-specific animation
        body.style.animation = `weatherShift 20s ease infinite`;
        
        // Add weather-specific keyframes
        if (!document.getElementById('weather-keyframes')) {
            const style = document.createElement('style');
            style.id = 'weather-keyframes';
            style.textContent = `
                @keyframes weatherShift {
                    0% { background-position: 0% 50%; }
                    25% { background-position: 100% 50%; }
                    50% { background-position: 100% 100%; }
                    75% { background-position: 0% 100%; }
                    100% { background-position: 0% 50%; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Display weather information
    function displayWeather(data) {
        const flag = getCountryFlag(data.location.country);
        const condition = data.current.condition.text;
        const temp = data.current.temp_c;
        
        // Apply weather-based background
        applyWeatherBackground(condition, temp);
        
        const weatherInfo = `
            <div class="weather-info">
                <h2><span class="flag">${flag}</span> ${data.location.name}, ${data.location.country}</h2>
                <div class="temperature">${Math.round(data.current.temp_c)}°C</div>
                <div class="description">${data.current.condition.text}</div>
                
                <div class="weather-details">
                    <div class="weather-detail">
                        <div class="label">Feels Like</div>
                        <div class="value">${Math.round(data.current.feelslike_c)}°C</div>
                    </div>
                    <div class="weather-detail">
                        <div class="label">Humidity</div>
                        <div class="value">${data.current.humidity}%</div>
                    </div>
                    <div class="weather-detail">
                        <div class="label">Wind Speed</div>
                        <div class="value">${data.current.wind_kph} km/h</div>
                    </div>
                    <div class="weather-detail">
                        <div class="label">Pressure</div>
                        <div class="value">${data.current.pressure_mb} mb</div>
                    </div>
                </div>
            </div>
        `;
        
        weatherDisplay.innerHTML = weatherInfo;
    }
    
    // Show loading state
    function showLoading() {
        weatherDisplay.innerHTML = '<div class="loading">Loading weather data...</div>';
    }
    
    // Show error message
    function showError(message) {
        weatherDisplay.innerHTML = `<div class="error">${message}</div>`;
    }
    
    // Event listeners
    searchBtn.addEventListener('click', searchWeather);
    
    locationInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchWeather();
        }
    });
    
    // Demo with sample data (remove this when you have API key)
    function showDemo() {
        const demoData = {
            location: { name: "London", country: "GB" },
            current: {
                temp_c: 15,
                feelslike_c: 13,
                humidity: 75,
                pressure_mb: 1013,
                condition: { text: "partly cloudy" },
                wind_kph: 12
            }
        };
        
        displayWeather(demoData);
    }
    
    // Uncomment the line below to show demo data
    // showDemo();
});

// ================================================
// WEATHER APP READY TO USE
// ================================================

/*
WEATHER APP IS NOW READY!

✅ API Key: Configured with WeatherAPI.com
✅ Real-time weather data for any city
✅ Beautiful responsive design
✅ Error handling included

Just open index.html in your browser and start searching for weather!
*/