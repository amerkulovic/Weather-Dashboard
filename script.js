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

let citiesArray = JSON.parse(localStorage.getItem("Cities")) || [];
// Functions
function init() {
  // Grab last search results from local storage,
  //  and put them on the left side of the page
}

function search() {
  divCityEl.classList.remove("hidden");
  let city = searchInputEl.value;

  let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=517f19dc586407c39701b016a6edf914`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.list);
      console.log(data.list[0].main);
      console.log(data.list[0].main.temp);
      for (let i = 0; i < data.list.length; i++) {
        dtText = data.list[i].dt_txt.split(" ")[1];
        if (dtText === "00:00:00") {
          let cityCard = document.createElement("div");

          // cityCard.innerHTML += `<h1>City name: ${data.city.name}</h1>`;
          cityCard.innerHTML += `<h1>Date: ${data.list[i].dt_txt}</h1>`;
          // let icon = data.list[0].weather[0].icon;
          // cityIconEl.innerHTML = `${icon}.png`
          cityCard.innerHTML += `<h2>Temp: ${data.list[i].main.temp}</h2>`;
          cityCard.innerHTML += `<h2>Humidity: ${data.list[i].main.humidity}</h2>`;
          cityCard.innerHTML += `<h2>Wind Speed: ${data.list[i].wind.speed}</h2>`;
          divCityEl.append(cityCard);
        }
      }
    });
  let citiesObject = {
    city: city,
  };
  citiesArray.push(citiesObject);

  localStorage.setItem("Cities", JSON.stringify(citiesArray));
}

// Function calls
init();
// Event Listeners
btnSearchEl.addEventListener("click", search);
// search button event listener
// click on the past results, similiar to search button
