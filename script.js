// Global variables
let btnSearchEl = document.querySelector("#btnSearch");
let searchInputEl = document.querySelector("#searchInput");
let divCityEl = document.querySelector("#div-city");
let divCurrentEl = document.querySelector("#div-current");
let asidePastEl = document.querySelector("#aside-past");
let forecastH1El = document.querySelector("#h1-forecast");

let citiesArray = JSON.parse(localStorage.getItem("Cities")) || [];
// Functions
function init() {
  let count = 0;
  citiesArray.forEach((object) => {
    if (count < 10) {
      let pastCity = document.createElement("div");
      pastCity.innerHTML = object.city[0].toUpperCase() + object.city.slice(1);
      asidePastEl.append(pastCity);
      count++;
      pastCity.classList.add("past-styling");
      pastCity.addEventListener("click", pastSearch);
    }
  });
}

function getToday() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  return today.toString();
}

function pastSearch(event) {
  forecastH1El.classList.remove("hidden");
  divCityEl.classList.remove("hidden");
  divCurrentEl.classList.remove("hidden");
  let city = event.target.innerHTML;

  let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=1216c6d8b1f2b30f4fcbb22eb9353470&units=imperial`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      divCityEl.innerHTML = "";
      for (let i = 0; i < data.list.length; i++) {
        let dtText = data.list[i].dt_txt.split(" ")[1];
        if (dtText === "15:00:00") {
          let cityCard = document.createElement("div");
          cityCard.innerHTML += `<img class="mx-auto" src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"/>`;
          cityCard.innerHTML += `<h1>Date: ${data.list[i].dt_txt.split(" ")[0]}</h1>`;
          cityCard.innerHTML += `<h2>Temp: ${data.list[i].main.temp}°F</h2>`;
          cityCard.innerHTML += `<h2>Humidity: ${data.list[i].main.humidity}%</h2>`;
          cityCard.innerHTML += `<h2>Wind Speed: ${data.list[i].wind.speed} mph</h2>`;
          if (data.list[i].main.temp > 65) {
            cityCard.classList.add("styling-hot");
          } else {
            cityCard.classList.add("styling-cold");
          }
          divCityEl.append(cityCard);
        }
      }
    });

  let currentDayUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=517f19dc586407c39701b016a6edf914&units=imperial`;

  fetch(currentDayUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      divCurrentEl.innerHTML = "";
      let currentCard = document.createElement("div");
      currentCard.innerHTML += `<img class="mx-auto" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>`;
      currentCard.innerHTML += `<h1>Today: ${getToday()}</h1>`;
      currentCard.innerHTML += `<h2>Temp: ${data.main.temp}°F</h2>`;
      currentCard.innerHTML += `<h2>Humidity: ${data.main.humidity}%</h2>`;
      currentCard.innerHTML += `<h2>Wind Speed: ${data.wind.speed} mph</h2>`;
      if (data.main.temp > 65) {
        currentCard.classList.add("current-styling-hot");
      } else {
        currentCard.classList.add("current-styling-cold");
      }
      divCurrentEl.append(currentCard);
    });
}

function search() {
  forecastH1El.classList.remove("hidden");
  divCurrentEl.classList.remove("hidden");
  divCityEl.classList.remove("hidden");
  let city = searchInputEl.value;

  let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=517f19dc586407c39701b016a6edf914&units=imperial`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      divCityEl.innerHTML = "";
      for (let i = 0; i < data.list.length; i++) {
        let dtText = data.list[i].dt_txt.split(" ")[1];
        if (dtText === "18:00:00") {
          let cityCard = document.createElement("div");
          cityCard.innerHTML += `<img class="mx-auto" src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"/>`;
          cityCard.innerHTML += `<h1>Date: ${data.list[i].dt_txt.split(" ")[0]}</h1>`;
          cityCard.innerHTML += `<h2>Temp: ${data.list[i].main.temp}°F</h2>`;
          cityCard.innerHTML += `<h2>Humidity: ${data.list[i].main.humidity}%</h2>`;
          cityCard.innerHTML += `<h2>Wind Speed: ${data.list[i].wind.speed} mph</h2>`;
          if (data.list[i].main.temp > 65) {
            cityCard.classList.add("styling-hot");
          } else {
            cityCard.classList.add("styling-cold");
          }
          divCityEl.append(cityCard);
        }
      }
    });

  let currentDayUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=517f19dc586407c39701b016a6edf914&units=imperial`;

  fetch(currentDayUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      divCurrentEl.innerHTML = "";
      let currentCard = document.createElement("div");
      currentCard.innerHTML += `<img class="mx-auto" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>`;
      currentCard.innerHTML += `<h1>Today: ${getToday()}</h1>`;
      currentCard.innerHTML += `<h2>Temp: ${data.main.temp}°F</h2>`;
      currentCard.innerHTML += `<h2>Humidity: ${data.main.humidity}%</h2>`;
      currentCard.innerHTML += `<h2>Wind Speed: ${data.wind.speed} mph</h2>`;
      if (data.main.temp > 65) {
        currentCard.classList.add("current-styling-hot");
      } else {
        currentCard.classList.add("current-styling-cold");
      }
      divCurrentEl.append(currentCard);
    });

  let citiesObject = {
    city: city,
  };
  citiesArray.unshift(citiesObject);

  localStorage.setItem("Cities", JSON.stringify(citiesArray));
}

// Function calls
init();
// Event Listeners
btnSearchEl.addEventListener("click", search);
