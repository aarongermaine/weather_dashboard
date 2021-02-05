//my beautiful document variables <3
var cityNameEl = document.querySelector("#cityName");

var citySubmit = document.querySelector("#city");

var cityForm = document.querySelector("#user-form");

var cityDetailsEl = document.querySelector("#cityDetails");

var lastSearchEl = document.querySelector("#lastSearch");

var weatherDisplayEl = document.querySelector("#weather-content");

var warningIconEl = document.querySelector("#warning");

//this function determines validity
var submitClick = function (event) {
  event.preventDefault();
  var cityID = citySubmit.value;
  console.log(cityID);
  if (cityID) {
    cityGetter(cityID);

    cityNameEl.textContent = cityID;

    cityNameEl.value = "";
  } else {
    alert("You shall not pass");
  }
};

var cityGetter = function (cityID) {
  var weatherApiKey = "aac7a25ab14d5f437c627c978531f784";

  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityID +
      "&appid=" +
      weatherApiKey
  )
    .then(function (resp) {
      console.log(resp.json());
      return resp.json();
    })
    .then(function (data) {
      showWeather(data);
    })
    .catch(function () {
      weatherDisplayEl.textContent = "That's not real";
    });
};

var showWeather = function (cityID) {
  if (cityID === 404) {
    return;
  }
};

cityForm.addEventListener("submit", submitClick);
