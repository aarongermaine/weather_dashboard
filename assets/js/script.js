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

  var city = cityNameEl.value.trim();
  console.log(city);
  if (city) {
    cityGetter(city);

    cityDetailsEl.textContent = "";

    cityNameEl.value = "";
  } else {
    alert("You shall not pass");
  }
};

var cityGetter = function (city) {
  var weatherApi =
    "api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=45b1eaead4d9d57e63fccb644a6d266c";

  fetch(weatherApi)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          showWeather(data, city);
        });
      } else {
        alert(response.statusText);
      }
    })
    .catch(function (error) {
      alert("Connection Error");
    });
};

var showWeather = function (city, searchInquiry) {
  if (city.length === 0) {
    weatherDisplayEl.textContent = "That's not real";

    return;
  }

  cityNameEl.textContent = cityName;
};

cityForm.addEventListener("submit", submitClick);
