// Get references to the DOM elements
const cityInput = document.getElementById('city-input');
const submitBtn = document.getElementById('submit-btn');
const weatherInfo = document.getElementById('weather-info');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const weatherIcon = document.getElementById('weather-icon');
const errorMessage = document.getElementById('error-message');

// OpenWeatherMap API key (Replace 'YOUR_API_KEY' with your actual API key)
const API_KEY = 'c87bc01a036d47bb638c5c0e7ca768ae';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Function to fetch weather data
async function fetchWeather(city) {
    try {
        const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found'); // Handle city not found error
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError(error.message); // Display error message
    }
}

// Function to display weather data
function displayWeather(data) {
    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp} °C`;
    description.textContent = `Description: ${data.weather[0].description}`;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weatherInfo.style.display = 'block'; // Show weather info
    errorMessage.textContent = ''; // Clear any previous error messages
}

// Function to display error messages
function displayError(message) {
    errorMessage.textContent = message; // Show error message
    weatherInfo.style.display = 'none'; // Hide weather info
}

// Event listener for the submit button
submitBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city); // Fetch weather data for the entered city
    } else {
        displayError('Please enter a city name'); // Error for empty input
    }
});
