const API_KEY = "";
const citySearchInput = document.getElementById("city-search-input");
const searchButton = document.getElementById("search-button");
const city = document.getElementById("city-name");
const time = document.getElementById("time");
const todayTemp = document.getElementById("todayTemp");
const wind = document.getElementById("wind");
const currentWeatherIcon = document.getElementById("currentWeatherIcon");
const weatherForecast = document.getElementById("weatherForecast");
const body = document.querySelector("body");

searchButton.addEventListener("click", () => {
  const cityName = citySearchInput.value;
  weatherForecast.innerHTML = "";
  getWeather(cityName);
});

function getWeather(cityName) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      displayCurrentWeather(data);
    })
    .catch((err) => console.error(err));

  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      displayForecastWeather(data);
    })
    .catch((err) => console.error(err));
}

function displayCurrentWeather(data) {
  body.style.backgroundImage = `url('img/${data.name}.jpg')`;
  city.innerHTML = `<h1 class="fw-bolder">${data.name}</h1>`;
  const formattedTime = convertTime(data.timezone);
  time.innerHTML = `<h3>${formattedTime}</h3>`;
  const currentWeather = document.createElement("div");
  const classesToAdd = ["col-lg-4", "col-md-4", "col-sm-6", "currentWeather"];
  currentWeather.classList.add(...classesToAdd);
  currentWeather.innerHTML = `<div class="row align-items-center">
          <div class="col currentWeatherTemp text-center" id="todayTemp">
          ${Math.floor(data.main.temp)}°
          </div>
          <div class="col">
            <img
              src="http://openweathermap.org/img/wn/${data.weather[0].icon.replace(
                "n",
                "d"
              )}@4x.png"
              alt="weather icon"
              style="width: 150px"
              class="mx-auto d-block"
              id="currentWeatherIcon"
            />
          </div>
        </div>
        <div class="row align-items-center p-0">
          <div class="col text-center">
            <span class="today-background rounded-pill">Aujourd'hui</span>
          </div>

          <div class="col text-center" id="wind">${Math.floor(
            data.wind.speed
          )} km/h</div>
        </div>
      </div>`;
  weatherForecast.appendChild(currentWeather);
}

function displayForecastWeather(data) {
  const today = new Date();
  const month =
    today.getMonth() + 1 < 10
      ? "0" + (today.getMonth() + 1)
      : today.getMonth() + 1;
  const date = today.getDate() ? "0" + today.getDate() : today.getDate();

  const todayFormatted = `${today.getFullYear()}-${month}-${date}`;
  var avgTemp = 0;
  var counter = 0;

  for (let i = 0; i < 39; i++) {
    // first we have to check if the date is different from today's date because we only want the days after
    if (data.list[i].dt_txt.includes(todayFormatted) === false) {
      // check if every 3 hours the date is the same, if it is we add the temperature of that time to avgTemp variable
      const dt = data.list[i].dt_txt.split(" ")[0];
      if (data.list[i + 1].dt_txt.includes(dt) === true) {
        avgTemp += data.list[i].main.temp;
        counter += 1;
      } else {
        avgTemp += data.list[i].main.temp;
        const forecastDiv = document.createElement("div");
        const classesToAdd = [
          "col-lg",
          "col-md-4",
          "col-sm-6",
          "d-flex",
          "flex-column",
          "align-items-center",
          "p-3",
          "vline",
        ];
        forecastDiv.classList.add(...classesToAdd);
        forecastDiv.innerHTML = `<span class="day-background rounded-pill">${getDayName(
          data.list[i].dt_txt
        )}</span>
        <span
          ><img
            src="http://openweathermap.org/img/wn/${data.list[
              i
            ].weather[0].icon.replace("n", "d")}@4x.png"
            style="width: 100px"
            alt="cloudy icon"
        /></span>
        <span class="temp">${Math.floor(avgTemp / counter)}°</span>`;
        weatherForecast.appendChild(forecastDiv);
        avgTemp = counter = 0;
      }
    }
  }
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

function getDayName(dateString) {
  var date = new Date(dateString);
  var days = ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."];
  return days[date.getUTCDay()];
}
