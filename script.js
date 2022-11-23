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

function pastSearch(event) {
  divCityEl.classList.remove("hidden");
  let city = event.target.innerHTML;

  let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=517f19dc586407c39701b016a6edf914&units=imperial`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
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
