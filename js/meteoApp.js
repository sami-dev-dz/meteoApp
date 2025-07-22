document.addEventListener('DOMContentLoaded', function() {


        const apiKey = "5fca5d637e765230fab7b34d611a3d8f";
        const cityInput = document.getElementById('cityInput');
        const searchBtn = document.querySelector('.search-btn');
        const weatherInfo = document.querySelector('.weather-info');
        const loadingDiv = document.getElementById('loading');
        const errorDiv = document.getElementById('error');
        const weatherImage = document.getElementById('weatherImage');
           searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();

    errorDiv.style.display = 'none';

    if (city === "") {
        errorDiv.textContent = "Veuillez entrer une ville.";
        errorDiv.style.display = 'block';
        return; 
    }

    loadingDiv.style.display = 'block'; 

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ville introuvable ou problème avec le réseau.');
            }
            return response.json();
        })
        .then(data => {
            loadingDiv.style.display = 'none';
            document.getElementById('cityName').textContent = data.name;
            document.getElementById('temperature').textContent = `${data.main.temp} °C`;
            document.getElementById('description').textContent = data.weather[0].description;
            document.getElementById('humidity').textContent = `${data.main.humidity} %`;
            document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
            document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
            document.getElementById('feelsLike').textContent = `${data.main.feels_like} °C`;

            weatherInfo.style.display = 'block';
            errorDiv.style.display = 'none';

            const temperature = data.main.temp;

            if (temperature <= 0) {
                weatherImage.setAttribute('src', 'images/neige.png');
                weatherImage.setAttribute('alt', 'Température sous zéro - Neige');
            } else if (temperature >= 30) {
                weatherImage.setAttribute('src', 'images/soleil.png');
                weatherImage.setAttribute('alt', 'Température élevée - Soleil');
            } else {
                weatherImage.setAttribute('src', 'images/nuages.png');
                weatherImage.setAttribute('alt', 'Température modérée - Nuages');
            }
        })
        .catch(error => {
            loadingDiv.style.display = 'none';
            errorDiv.textContent = error.message;
            errorDiv.style.display = 'block';
        });
  });

});