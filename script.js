document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('cityInput').value.trim();
    if (city === '') {
        alert('Please enter a city name.');
        return;
    }
    getWeather(city);
});

function getWeather(city) {
    const apiKey = '76f15e3ce568971322a5de2ebb6ac272';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    const temperature = Math.round(data.main.temp - 273.15); // Convert from Kelvin to Celsius
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

    const weatherHTML = `
        <h2>${data.name}</h2>
        <img src="${iconUrl}" alt="Weather icon">
        <p>${description}</p>
        <p>Temperature: ${temperature}°C</p>
    `;

    weatherInfo.innerHTML = weatherHTML;
}
