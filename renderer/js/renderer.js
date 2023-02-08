const API_KEY = "";
const citySearchInput = document.getElementById("city-search-input");
const searchButton = document.getElementById("search-button");
const city = document.getElementById("city-name");
const time = document.getElementById("time");
const todayTemp = document.getElementById("todayTemp");
const wind = document.getElementById("wind");
const currentWeatherIcon = document.getElementById("currentWeatherIcon");
console.log(currentWeatherIcon);

searchButton.addEventListener("click", () => {
  const cityName = citySearchInput.value;
  getWeather(cityName);
});

function getWeather(cityName) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayWeather(data);
    })
    .catch((err) => console.error(err));
}

function displayWeather(data) {
  city.innerHTML = `<h1 class="fw-bolder">${data.name}</h1>`;
  const formattedTime = convertTime(data.timezone);
  time.innerHTML = `<h3>${formattedTime}</h3>`;
  todayTemp.innerText = `${Math.floor(data.main.temp)}°`;
  wind.innerText = `${Math.floor(data.wind.speed)} km/h`;
  currentWeatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
}

function convertTime(timezone) {
  var now = new Date();
  var timezoneOffset = timezone;
  var time =
    now.getTime() + now.getTimezoneOffset() * 60000 + timezoneOffset * 1000;
  var convertedTime = new Date(time);
  var hours = convertedTime.getHours();
  var minutes = convertedTime.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;

  var timeString =
    (hours % 12 || 12) + ":" + minutes + " " + (hours < 12 ? "AM" : "PM");
  return timeString;
}
