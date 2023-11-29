var input = document.querySelector('#cityinput');
var submitButton = document.querySelector('#submitButton');
var cityOutput = document.querySelector('#cityoutput');
var description = document.querySelector('#description');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');
var humidity = document.querySelector('#humidity');

var apiKey = "04b624efbf168bf5f4071ebd383aa079";

function convertTemperature(val) {
    return (val - 273).toFixed(2) + ' °C';
}

document.getElementById('weatherForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var city = input.value.trim();
    if (city !== '') {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .then(res => res.json())
            .then(data => updateWeather(data))
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('Failed to fetch weather data. Please try again later.');
            });
    }
});

function success(position) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => updateWeather(data))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather data. Please try again later.');
        });
}

function error() {
    alert('Unable to retrieve your location. Please enter a city manually.');
}

function updateWeather(data) {
    var cityName = data['name'];
    var descriptionText = data['weather'][0]['description'];
    var temperature = data['main']['temp'];
    var windSpeed = data['wind']['speed'];
    var humidityValue = data['main']['humidity'];

    cityOutput.innerHTML = 'Weather in <span>' + cityName + '</span>';
    temp.innerHTML = 'Temperature: <span>' + convertTemperature(temperature) + '</span>';
    description.innerHTML = 'Sky conditions: <span>' + descriptionText + '</span>';
    wind.innerHTML = 'Wind Speed: <span>' + windSpeed + ' m/s</span>';
    humidity.innerHTML = 'Humidity: <span>' + humidityValue + '%</span>';
}

// Auto-detect location on page load
window.addEventListener('load', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert('Geolocation is not supported by your browser');
    }
});


        








