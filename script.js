// Global variables
let btnSearchEl = document.querySelector("#btnSearch");
let searchInputEl = document.querySelector("#searchInput");
let cityNameEl = document.getElementById("city-name");
let cityDateEl = document.getElementById("city-date");
let cityIconEl = document.getElementById("city-icon");
let cityTempEl = document.getElementById("city-temp");
let cityHumidityEl = document.getElementById("city-humidity");
let cityWindSpeedEl = document.getElementById("city-windspeed");
let citiesArray = JSON.parse(localStorage.getItem("Cities")) || [];
// Functions
function init() {
  // Grab last search results from local storage,
  //  and put them on the left side of the page
}

function search() {
  let city = searchInputEl.value;
  console.log(city);

  let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=517f19dc586407c39701b016a6edf914`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.list[0].main);
      console.log(data.list[0].main.temp);
      cityNameEl.textContent = `City name: ${data.city.name}`;
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
