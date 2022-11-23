// Global variables
let btnSearchEl = document.querySelector("#btnSearch");
let searchInputEl = document.querySelector("#searchInput");
// let cityNameE = document.getElementById("city-name");
// let cityDateEl = document.getElementById("city-date");
// let cityIconEl = document.getElementById("city-icon");
// let cityTempEl = document.getElementById("city-temp");
// let cityHumidityEl = document.getElementById("city-humidity");
// let cityWindSpeedEl = document.getElementById("city-windspeed");
let divCityEl = document.querySelector("#div-city");
let divCurrentEl = document.querySelector("#div-current");
let asidePastEl = document.querySelector("#aside-past");
let pastBtnEl = document.querySelectorAll(".past-styling");

let citiesArray = JSON.parse(localStorage.getItem("Cities")) || [];
// Functions
function init() {
  let count = 0;
  citiesArray.forEach((object) => {
    if (count < 10) {
      let pastCity = document.createElement("div");
      pastCity.innerHTML = object.city;
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
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  return today.toString();
}

function pastSearch(event) {
  divCityEl.classList.remove("hidden");
  let city = event.target.innerHTML;

  let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=1216c6d8b1f2b30f4fcbb22eb9353470&units=imperial`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      divCityEl.innerHTML = "";
      console.log(divCityEl.innerHTML);
      for (let i = 0; i < data.list.length; i++) {
        let dtText = data.list[i].dt_txt.split(" ")[1];
        if (dtText === "15:00:00") {
          let cityCard = document.createElement("div");
          cityCard.innerHTML += `<img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"/>`;
          cityCard.innerHTML += `<h1>Date: ${data.list[i].dt_txt.split(" ")[0]}</h1>`;
          cityCard.innerHTML += `<h2>Temp: ${data.list[i].main.temp}°F</h2>`;
          cityCard.innerHTML += `<h2>Humidity: ${data.list[i].main.humidity}%</h2>`;
          cityCard.innerHTML += `<h2>Wind Speed: ${data.list[i].wind.speed} mph</h2>`;
          cityCard.classList.add("styling");
          divCityEl.append(cityCard);
        }
      }
    });
}

function search() {
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
          cityCard.innerHTML += `<img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"/>`;
          cityCard.innerHTML += `<h1>Date: ${data.list[i].dt_txt.split(" ")[0]}</h1>`;
          cityCard.innerHTML += `<h2>Temp: ${data.list[i].main.temp}°F</h2>`;
          cityCard.innerHTML += `<h2>Humidity: ${data.list[i].main.humidity}%</h2>`;
          cityCard.innerHTML += `<h2>Wind Speed: ${data.list[i].wind.speed} mph</h2>`;
          cityCard.classList.add("styling");
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
      let currentCard = document.createElement("div");
      currentCard.innerHTML += `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>`;
      currentCard.innerHTML += `<h1>Date: ${getToday()}</h1>`;
      currentCard.innerHTML += `<h2>Temp: ${data.main.temp}°F</h2>`;
      currentCard.innerHTML += `<h2>Humidity: ${data.main.humidity}%</h2>`;
      currentCard.innerHTML += `<h2>Wind Speed: ${data.wind.speed} mph</h2>`;
      currentCard.classList.add("styling");
      divCurrentEl.append(currentCard);
      console.log(data.main.temp);
      console.log(data.main.humidity);
      console.log(data.wind.speed);
      console.log(data.weather[0].icon);
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
// search button event listener
// click on the past results, similiar to search button
