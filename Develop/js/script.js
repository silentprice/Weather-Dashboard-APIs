const weatherAPIKey = "10c964033c59d83e5d9d1b2413eb1de5";
const apiUrl = `https://api.openweathermap.org/data/2.5/`;
// const dayjs = dayjs();

// Get DOM elements for search input, search button, current weather container, and forecast container
const searchInput = document.getElementById("search-input");
const searchBtn = document.querySelector("#search-btn");
const currentWeatherContainer = document.querySelector(".current-weather");
const forecastContainer = document.querySelector(".forecast");

const currentCity = document.getElementById("city-name");
const weatherIcon = document.querySelector(".weather-icon");

// Define arrays for search history and city names
let searchHistory = [];

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

        const lat = data.coord.lat;
        const lon = data.coord.lon;
        getFiveDayWeather(lat, lon);

        currentCity.textContent = data.name;
        weatherIcon.setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        );

        document.getElementById("date").textContent =
          dayjs().format("dddd MMMM DD, YYYY");
      });
  } catch (error) {
    console.log(error);
  }
}

function getFiveDayWeather(lat, lon) {
  try {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}&units=imperial`
    )
      .then((res) => res.json())
      .then((fiveDayData) => {
        console.log(fiveDayData);
        
        let dayIndex = 1
        for (let i = 0; i < fiveDayData.list.length; i++) {
            if (i % 8 === 0) {

                let fiveDayDate =document.createElement("p");
                fiveDayTemp.setAttribute("class", "five-day-date");
                fiveDayDate = dayjs().add(dayIndex, "days").format('dddd');
                forecastContainer.append(fiveDayDate);
                dayIndex++

                let fiveDayTemp = document.createElement('p');
                fiveDayTemp.setAttribute("class", "five-day-temp");
                fiveDayTemp.textContent = fiveDayData.list[i].main.temp_max
                forecastContainer.append(fiveDayTemp);

                let fiveDayHumid = document.createElement('p');
                fiveDayHumid.setAttribute("class", "five-day-humid");
                fiveDayHumid.textContent = fiveDayData.list[i].main.humidity
                forecastContainer.append(fiveDayHumid);

                let fiveDayWind = document.createElement('p');
                fiveDayWind.setAttribute("class", "five-day-wind");
                fiveDayWind.textContent = fiveDayData.list[i].wind.speed
                forecastContainer.append(fiveDayWind);



            }
        }

      });
  } catch (error) {
    console.log(error);
  }
}


function addToSearchHistory(cityName) {
  // Add the city name to the search history array
  searchHistory.push(cityName);

  // Create an HTML element for the new search history item
  const searchHistoryItem = document.createElement("li");
  searchHistoryItem.textContent = cityName;
}