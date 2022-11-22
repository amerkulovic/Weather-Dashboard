// Global variables
let btnSearchEl = document.querySelector("#btnSearch");
// Functions
function init() {
  // Grab last search results from local storage,
  //  and put them on the left side of the page
}

function search() {
  alert("I clicked");
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        
    });
}
// Function calls
init();
// Event Listeners
btnSearchEl.addEventListener("click", search);
// search button event listener
// click on the past results, similiar to search button
