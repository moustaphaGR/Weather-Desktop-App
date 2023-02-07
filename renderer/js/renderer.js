const citySearchInput = document.getElementById("city-search-input");
const searchButton = document.getElementById("search-button");
const city = document.getElementById("city-name");
const time = document.getElementById("time");

searchButton.addEventListener("click", () => {
  const cityName = citySearchInput.value;
  getWeather(cityName);
});

function getWeather(cityName) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    });
}

function displayWeather(data) {
  city.innerHTML = `<h1 class="fw-bolder">${data.name}</h1>`;
  const weatherTime = new Date(data.dt * 1000);
  const formattedTime = weatherTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  console.log(formattedTime);
  time.innerHTML = `<h3>${formattedTime}</h3>`;
}
