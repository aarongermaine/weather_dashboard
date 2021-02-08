//my beautiful document variables <3
var cityNameEl = document.querySelector("#cityName");

var citySubmit = document.querySelector("#city");

var cityForm = document.querySelector("#user-form");

var cityDetailsEl = document.querySelector("#cityDetails");

var lastSearchEl = document.querySelector("#lastSearch");

var weatherDisplayEl = document.querySelector("#weather-content");

var warningIconEl = document.querySelector("#warning");

var local;

let forecastAlign = [];

let history = ["Denver"];

//this function determines validity
var submitClick = function (event) {
  event.preventDefault();

  var cityID = citySubmit.value;

  if (cityID !== null) {
    cityGetter(cityID);
    history.some((h) =>
      h === cityID ? console.log("Invalid") : history.push(cityID)
    );
    localStorage.setItem("history", JSON.stringify(history));
    cityNameEl.textContent = cityID;

    cityNameEl.value = "";
  } else {
    alert("You shall not pass");
  }
};

var cityGetter = async function (cityID) {
  var weatherApiKey = "aac7a25ab14d5f437c627c978531f784";
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityID}&appid=${weatherApiKey}&units=imperial`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      // Weather Search History
      var localHistory = JSON.parse(localStorage.getItem("history"));

      var historyUl = document.getElementById("weather-history");
      var historyList = document.createElement("li");
      historyList.setAttribute("class", "list-group-item");
      historyList.innerHTML = null;
      localHistory.map((history) => {
        historyList.innerHTML = `${history}`;
        return historyUl.appendChild(historyList);
      });

      // Weather Cards
      var weatherDash = document.getElementById("weather-dash");

      var data = result.list;

      forecastAlign.push(data[0], data[7], data[15], data[23], data[31]);

      forecastAlign.map((index) => {
        var weatherCol = document.createElement("div");
        weatherCol.setAttribute("class", "col-2");
        var weatherCard = document.createElement("div");
        weatherCard.setAttribute("class", "card");
        var format = (i) =>
          new Date(i).toLocaleDateString("en-us", { weekday: "long" });
        weatherCard.innerHTML = `
        <div class="card-header bg-transparent">${format(
          index.dt_txt
        )} <img src="../../assets/images/${index.weather[0].icon}.png" alt="${
          index.weather.description
        }"/></div>
        <ul class="list-group list-group-flush"><li class="list-group-item"><strong>Low: </strong>${Math.floor(
          index.main.temp_min
        )}</li><li class="list-group-item"> <strong>High: </strong>${Math.round(
          index.main.temp_max
        )}</li></ul>`;
        weatherCol.appendChild(weatherCard);
        return weatherDash.appendChild(weatherCol);
      });
    })
    .catch((error) => console.log("error", error));
};

var showWeather = function (cityID) {
  if (cityID === 404) {
    return;
  }
};

function clearForecast() {
  document.getElementById("weather-dash").innerHTML = "";
}

cityForm.addEventListener("submit", submitClick);
