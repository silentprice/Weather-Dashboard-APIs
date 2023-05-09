var weatherAPIKey = "10c964033c59d83e5d9d1b2413eb1de5";
var apiUrl = `https://api.openweathermap.org/data/2.5/`;

// Get DOM elements for search input, search button, current weather container, and forecast container
var searchInput = document.getElementById("search-input");
var searchBtn = document.querySelector("#search-btn");
var currentWeatherContainer = document.querySelector(".current-weather");
var forecastContainer = document.querySelector(".forecast");

// Define arrays for search history and city names
let searchHistory = [];
// let cityNames = [];

searchBtn.addEventListener("click", function () {
  let city = searchInput.value;
  getWeatherData(city);
});

// Define function to fetch weather data from API for a given city name
function getWeatherData(cityName) {
  try {
    fetch(
      `${apiUrl}weather?q=${cityName}&appid=${weatherAPIKey}&units=imperial`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        
        var lat = data.coord.lat
        var lon = data.coord.lon
        
      });
  } catch (error) {
    console.log(error);
  }
}
