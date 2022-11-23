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

let citiesArray = JSON.parse(localStorage.getItem("Cities")) || [];
// Functions
function init() {
  console.log(citiesArray[0].city);
  citiesArray.forEach((city) => {
    let pastCity = document.createElement("div");
    pastCity.innerHTML = city.city;
    asidePastEl.append(pastCity);
  });
  // Grab last search results from local storage,
  //  and put them on the left side of the page
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
  citiesArray.push(citiesObject);

  localStorage.setItem("Cities", JSON.stringify(citiesArray));
}

// Function calls
init();
// Event Listeners
btnSearchEl.addEventListener("click", search);
// search button event listener
// click on the past results, similiar to search button
